import { Application } from 'https://deno.land/x/oak/mod.ts'

import graphQL from "./graphql/graphql.ts"
import PORT from "./utils/port.ts"

const app = new Application()

app.use(graphQL.routes());
app.use(graphQL.allowedMethods());

console.log(`http://localhost:${PORT}/graphql`)
await app.listen({ port: PORT });
