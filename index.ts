import {init, Login} from "./SetUp/setup.js";
import {Character, User} from "./SetUp/@types.js";

class Client {
    token: string | undefined;
    id: number = 0;
    character: Character | undefined;
    me: User | undefined;
    Login: (token: string) => Promise<Object>
    init: (this: any, id: string) => Promise<Character>;

    constructor() {
        this.token = undefined;
        this.character = undefined;
        this.me = undefined
        this.Login = Login;
        this.init = init;
    }

}

export default Client;