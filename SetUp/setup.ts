import {Character, User} from "./@types.js";
import Client from "../index.js";

export async function Login(this: Client, token: string): Promise<Object> {

    const res = await (await this.req("https://beta.character.ai/chat/user/", '', 'GET', token)).json().catch(console.error) as { user: User };
    const user: User = res.user;
    if (!validate(res, 'user') || user.user.username == "ANONYMOUS") {
        throw new Error("Failed to fetch user| Token may be invalid")
    }

    this.token = token;
    this.me = user;
    return this;
}


export async function init(this: Client, id: string, newChat: boolean = false): Promise<Character> {
    if (this.token === undefined) throw new Error("Token not set");
    const res = await (await this.req(`https://beta.character.ai/chat/character/info-cached/${id}/`, '', 'GET')).json().catch(console.log) as { character: Character }
    if (!validate(res?.character, 'name')) throw new Error("Failed to validate, not initiated")

    const ob = {
        character_external_id: res.character.external_id, history_external_id: null
    }
    let con;
  try {
      const response = await this.req(`https://beta.character.ai/chat/history/${newChat ? "create" : "continue"}/`, JSON.stringify(ob), 'POST')
      const content = await response.text()

      con = response.statusText == "OK" && content != "there is no history between user and character" ? JSON.parse(content) : content == "there is no history between user and character" ? (console.log("there is no history between user and character, attempting to create one..."), await (await this.req(`https://beta.character.ai/chat/history/create/`, JSON.stringify(ob), 'POST')).json()) : undefined;
  } catch (e) {throw new Error("something went wrong...")}
    this.historyId  = con.external_id;
    this.character = res.character;
    this.id = this.character.external_id;
    this.initialized = true;
    return this.character;
}

function validate(object: any, s: string): object is Character | User {
    if (object === undefined) return false;
    return s in object;
}


export let request = async function (this: Client, url: string, body: string, method: string, token?: string | null) {
    return await fetch(url, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            Authorization: `Token ${this.token || token}`,
            "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": "sessionid=y9kqgau2kijldnvik2zhvue8vqlots8t; __cf_bm=Xig3762Gjtn6kQkh9uvu4hl0oZzPrJUc2Y8UIAuUAMA-1677614216-0-AaN9LEAVNaQMerMwrZR1Siw3Q0yh/jV/qmKOI3Vi5srhVguCA0e/Lbls2pZ2Wc7sf8Eb6G5KpAqCaIG7NbYV2JXimwqstw31Qh6KNSEyJUqnyL2J8SYvH5r/Ghfllhu+6CoRbLU9ytzLDj2LU7p1tbmgzO6blRjCGMOj3cOEkdD47LOSaFC/bHRYHTcIACu/cA==; _ga=GA1.2.384933657.1677614218; _gid=GA1.2.107323130.1677614218; csrftoken=9PSzMkYV0Q87nwIB75KDgi8aL2cLTUp3",
            "Referer": "https://beta.character.ai/chat?char=RQrrOj-UNdEV2_PC5D03US-27MZ7EUtaRH_husjbRQA",
            "Referrer-Policy": "same-origin"

        }, "body": body,

        "method": method
    })
}

