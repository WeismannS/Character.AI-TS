import {init, Login,request} from "./SetUp/setup.js";
import {Character, User} from "./SetUp/@types.js";
import {sendMsg} from "./SetUp/Functions.js";

class Client {
    token: string | undefined;
    initialized: boolean = false;
    id: string = '';
    character: Character | undefined;
    me: User | undefined;
    historyId : string ='';
    Login: (token: string) => Promise<Object>
    init: (this: any, id: string) => Promise<Character>;


    req : (url:string,body:string,method:string,token?:string|null)=>Promise<Response>
    sendMsg : (msg:string)=>Promise<string>
    constructor() {
        this.req = request.bind(this);
        this.Login = Login;
        this.init = init;
        this.sendMsg = sendMsg;
    }

}

export default Client;