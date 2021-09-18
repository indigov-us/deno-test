import { config } from "https://deno.land/x/dotenv@v3.0.0/mod.ts";
import { assert } from "https://deno.land/std@0.107.0/testing/asserts.ts";

import { ZendeskAPI } from "./zendesk.ts";

const { SUBDOMAIN, EMAIL, TOKEN } = config();
const zendeskAPI = new ZendeskAPI(SUBDOMAIN, TOKEN, EMAIL);

Deno.test("getUsers", async () => {
  const res = await zendeskAPI.usersList();
  assert(res.users.length > 0);
});
