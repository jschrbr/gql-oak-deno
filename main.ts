import {
  App,
} from "https://deno.land/x/attain/mod.ts";
import { applyGraphQL, gql } from "https://deno.land/x/attain_graphql/mod.ts";
import * as flags from "https://deno.land/std/flags/mod.ts"

const app = new App();

const { args } = Deno;
const DEFAULT_PORT = 3000
const argPort = flags.parse(args).port;
console.log(argPort)
const PORT = argPort ? Number(argPort) : DEFAULT_PORT


if (isNaN(PORT)) {
  console.log("port is not a number")
  Deno.exit(1)
}

interface Input {
  name: string,
  image: string
}

const types = gql`
  type Dino {
    name: String
    image: String
  }
  input DinoInput {
    name: String
    image: String
  }
  type ResolveType {
    done: Boolean
  }
  type Query {
    getDino(name: String): Dino
    getDinos: [Dino!]!
  }
  type Mutation {
    addDino(input: DinoInput!): ResolveType!
  }
`;

const dinos = [
  {
    name: "Tyrannosaurus Rex",
    image: "🦖",
  },
];

const resolvers = {
  Query: {
    getDino: (_: any, { name }: { name: string }) => {
      const dino = dinos.find((dino) => dino.name.includes(name));
      if (!dino) {
        throw new Error(`No dino name includes ${name}`);
      }
      return dino;
    },
    getDinos: () => {
      return dinos;
    },
  },
  Mutation: {
    addDino: (_: any, { input: { name, image } }: { input: Input }) => {
      dinos.push({
        name,
        image,
      });
      return {
        done: true,
      };
    },
  },
};

app.use(
  applyGraphQL({
    typeDefs: types,
    resolvers: resolvers,
  })
);

await app.listen({ port: PORT });
console.log(`Listening on port: ${PORT}`);
