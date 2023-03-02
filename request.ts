import Client from "./index.js";


let client: any =  new  Client()
 await client.Login("50958918b9aa2b1821240152d50f008d2be3eb7a");
await client.init("xoRaBW_msA53MMmx3EYYHAMZ03K2MJtFMjtihpS8dZM",true)

console.log(await client.sendMsg("what"))




