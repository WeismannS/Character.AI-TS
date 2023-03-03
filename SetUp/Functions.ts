import Client,{Msg} from "../index.js";

export async function sendMsg(this: Client, msg: string): Promise<Msg> {
    if (!this.initialized) throw new Error("Client not initialized");
    const ob = {
        history_external_id: this.historyId,
        character_external_id: this.id,
        text: msg,
        tgt: this.character?.participant__user__username,
        ranking_method: "random",
        staging: false,
        model_server_address: null,
        override_prefix: null,
        override_rank: null,
        rank_candidates: null,
        filter_candidates: null,
        prefix_limit: null,
        prefix_token_limit: null,
        livetune_coeff: null,
        stream_params: null,
        enable_tti: null,
        initial_timeout: null,
        insert_beginning: null,
        stream_every_n_steps: 16,
        chunks_to_pad: 8,
        is_proactive: false,
        image_rel_path: "",
        image_description: "",
        image_description_type: "",
        image_origin_type: "",
        voice_enabled: false,
        parent_msg_id: null,
        seen_msg_ids: [],
        retry_last_user_msg_id: null,
        num_candidates: 1,
        give_room_introductions: true
    }


    const res = await (await this.req('https://beta.character.ai/chat/streaming/', JSON.stringify(ob), 'POST')).text()
      const finalChunk =   JSON.parse(<string>res.split("\n").find(e => JSON.parse(e).is_final_chunk == true))
         return new Msg(finalChunk.replies[0].text,finalChunk.src_char.participant.name, finalChunk.replies[0].id, finalChunk.src_char.avatar_file_name)
}

export async function getHistory(this: Client, id: string): Promise<Object> {
    const res = await this.req(`https://beta.character.ai/chat/history/msgs/user/?history_external_id=${id}`, '', 'GET') as Response;

    return  (<{ messages:Array<any> }> await res.json().catch(()=> {
        throw new Error("Something went wrong..")
    })).messages.map(e=>new Msg(e.text,e.src__name,e.id,!e.src__is_human ? e.src_char.avatar_file_name: this.me!.user.account.avatar_file_name))
}

