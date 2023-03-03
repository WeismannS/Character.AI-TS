import {Character, User} from "./@types.js";
import {Client} from "../index.js";
import {getHistory} from "./Functions.js";


export async function init(this: Client, id: string, newChat: boolean = false): Promise<Character> {
    if (this.token === undefined) await Promise.reject("Token Not Set");
    const res = await (await this.req(`https://beta.character.ai/chat/character/info-cached/${id}/`, '', 'GET')).json().catch(console.log) as { character: Character }
    if (!validate(res?.character, 'name')) throw new Error("Failed to validate, not initiated")

    const ob = {
        character_external_id: res.character.external_id, history_external_id: null
    }
    try {
        const response = await this.req(`https://beta.character.ai/chat/history/${newChat ? "create" : "continue"}/`, JSON.stringify(ob), 'POST')
        const content = await response.text()
        const con = response.statusText == "OK" && content != "there is no history between user and character" ? JSON.parse(content) : content == "there is no history between user and character" ? (console.log("there is no history between user and character, attempting to create one..."), await (await this.req(`https://beta.character.ai/chat/history/create/`, JSON.stringify(ob), 'POST')).json()) : undefined;
        this.historyId = con.external_id;
    } catch (e) {
        throw new Error("something went wrong...")
    }
    this.history = await getHistory.bind(this)(this.historyId)
    this.character = res.character;
    this.id = this.character.external_id;
    this.initialized = true;
    return this.character;
}


export function validate(object: any, s: string): object is Character | User {
    if (object === undefined) return false;
    return s in object;
}

export let request = async function (this: Client | void, url: string, body: string, method: string, token?: string | null) {
    return await fetch(url, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            Authorization: `Token ${this?.token || token}`,
            "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "Referer": "https://beta.character.ai/chat?char=RQrrOj-UNdEV2_PC5D03US-27MZ7EUtaRH_husjbRQA",
            "Referrer-Policy": "same-origin"

        }, "body": body,

        "method": method
    })
}

