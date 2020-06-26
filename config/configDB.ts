import "https://deno.land/x/dotenv/load.ts";

import { dso } from "https://deno.land/x/dso@v1.0.0/mod.ts";

const { DB_URL, JAWSDB_URL } = Deno.env.toObject()

const url_patt = /^mysql:\/\/([^:@]+):?([^@]+)?@([^:]+):([^\/]+)\/(.+)$/i
const db_url = DB_URL || JAWSDB_URL
const res: any = db_url.match(url_patt)
const [_, username, pass, hostname, sql_port, db] = res
const password = pass || ""
const port = Number(sql_port)

await dso.connect({
    hostname,
    port,
    username,
    password,
    db
});

export default dso