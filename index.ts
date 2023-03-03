import {init, Login,request} from "./SetUp/setup.js";
import {Character, User} from "./SetUp/@types.js";
import {sendMsg} from "./SetUp/Functions.js";

class Client {
    token: string | undefined;
    initialized: boolean = false;
    id: string = '';
    character: Character | undefined ;
    me: User | undefined;
    historyId : string ='';
    Login: (token: string) => Promise<Object>
    init: (this: any, id: string, b?: boolean) => Promise<Character>;

    req : (url:string,body:string,method:string,token?:string|null)=>Promise<Response>
    sendMsg : (this: Client, msg: string) => Promise<Msg>
     history: Object | undefined
    constructor() {
        this.req = request.bind(this);
        this.Login = Login;
        this.init = init;
        this.sendMsg = sendMsg;
    }

}

export class Msg {
    constructor(public content: string, public author: string , public id: string, public avatar: string) {
           this.content = content;
            this.author = author;
            this.id = id;
            this.avatar = "https://characterai.io/i/80/static/avatars/"+avatar;
    }
}

export default Client;