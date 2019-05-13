import { camel2Underscore, randomString } from "./util";
import Axios from "axios";
import { VueAuthenticate } from "vue-authenticate";

/// okta variables
const OKTA_DOMAIN = process.env.TOPAZ_OKTA_DOMAIN;
const OKTA_AUTHSERV = process.env.TOPAZ_OKTA_AUTHSERV || "default";
const OKTA_CLIENTID = process.env.TOPAZ_OKTA_CLIENTID;
const OKTA_REDIRECTURI = process.env.TOPAZ_OKTA_REDIRECTURI;

console.assert(OKTA_DOMAIN !== null);
console.assert(OKTA_CLIENTID !== null);

const interceptor = Axios.create({
    transformRequest: [
        function(data, headers) {
            headers["Content-Type"] = "application/json";
            headers["Accept"] = "application/json";

            let fixedData = {};
            for(let key in data) {
                fixedData[camel2Underscore(key)] = data[key];
            }

            return JSON.stringify(fixedData);
        }
    ]
});

export default function createAuth({ cookies, env }) {
    let auth = new VueAuthenticate(interceptor, {
        storageType: "cookieStorage",
        providers: {
            okta: {
                name: "okta",
                url: "/api/users/login",
                clientId: OKTA_CLIENTID,
                authorizationEndpoint: `${OKTA_DOMAIN}/oauth2/${OKTA_AUTHSERV}/v1/authorize`,
                redirectUri: OKTA_REDIRECTURI,
                responseType: "code",
                requiredUrlParams: ["scope", "state", "redirect_uri"],
                scope: ["openid", "profile", "email"],
                state: randomString(64),
                scopeDelimiter: " ",
                oauthType: '2.0',
                responseParams: {
                    code: "code",
                    redirectUri: "redirectUri",
                }
            }
        }
    }) as any;

    if(env === "node") {
        auth.storage.__proto__._getCookie = function() {
            return cookies || '';
        }
    }

    return auth;
}