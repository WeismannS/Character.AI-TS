import Client from "./index.js";


let client: any =  new  Client()
 await client.Login("");
await client.init("xoRaBW_msA53MMmx3EYYHAMZ03K2MJtFMjtihpS8dZM",true)

console.log(await client.sendMsg("what"))




