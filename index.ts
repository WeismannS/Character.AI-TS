import {init, request, validate} from "./SetUp/setup.ts";
import {Character, search, User} from "./SetUp/@types.d.ts";
import {lookFor, sendMsg} from "./SetUp/Functions.ts";

export class Client {
    token: string | undefined;
    initialized: boolean = false;
    id: string = '';
    character: Character | undefined;
    me: User | undefined;
    historyId: string = '';

    init: (this: Client, id: string, b?: boolean) => Promise<Character>;
    lookFor: (this: Client, name: string, sortBy: string) => Promise<Array<any>>;
    req: (url: string, body: string, method: string, token?: string | null) => Promise<Response>
    sendMsg: (this: Client, msg: string) => Promise<Msg>
    history: Array<Msg> = [];

    constructor() {
        this.lookFor = lookFor.bind(this);
        this.req = request.bind(this);
        this.init = init;
        this.sendMsg = sendMsg;
    }

}

export class Msg {
    constructor(public content: string, public author: string, public id: string, public avatar: string) {
        this.content = content;
        this.author = author;
        this.id = id;
        this.avatar = "https://characterai.io/i/80/static/avatars/" + avatar;
    }
}

export class char {
    name: string;
    score: any;
    description: string;
    avatar: string;
    id: string;
    greeting: string;
    title: string;
    author: string;
    interactions: number;

    constructor({
                    participant__name,
                    external_id,
                    user__username,
                    description,
                    greeting,
                    search_score,
                    avatar_file_name,
                    title,
                    participant__num_interactions
                }: search) {
        this.name = participant__name;
        this.id = external_id;
        this.avatar = "https://characterai.io/i/80/static/avatars/" + avatar_file_name;
        this.description = description
        this.greeting = greeting;
        this.score = search_score;
        this.title = title;
        this.author = user__username;
        this.interactions = participant__num_interactions;
    }

}

export default async function Log_in(token: string): Promise<Client> {

    const res = await (await request("https://beta.character.ai/chat/user/", '', 'GET', token)).json().catch(console.error) as { user: User };
    const user: User = res.user;
    if (!validate(res, 'user') || user.user.username == "ANONYMOUS") {
        throw new Error("Failed to fetch user| Token may be invalid")
    }
    const client = new Client();
    client.token = token;
    client.me = user;
    return client;
}
