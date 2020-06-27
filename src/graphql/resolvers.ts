import { dso, Join, Where } from "https://deno.land/x/dso@v1.0.0/mod.ts";
import { partModel, Part } from "../models/models.ts"
import { Date } from "./types.ts"


// const { name } = user
// const userWhere = await userModel.findOne(Where.from({ name }));
// const userAll = await userModel.findAll(Where.from({ name }));
// const userLike = await userModel.findAll(Where.expr("name like 'user%'"));

// console.log("Found user by where eq clause:", userWhere);
// console.log("All users by where eq clause:", userAll);
// console.log("All users by where like clause:", userLike);


interface addInput {
    name: string,
    quantity: number
}
interface editInput {
    id: number,
    quantity: number
}
interface removeInput {
    id: number,
}

const parts: any = await partModel.findAll({ fields: ["*"] });

export const resolvers = {
    Query: {
        getPart: (_: any, { name }: { name: string }) => {
            const part = parts.find((part: Part) => part.name.includes(name));
            if (!part) {
                throw new Error(`No part name includes ${name}`);
            }
            return part;
        },
        getParts: () => {
            return parts;
        },
    },
    Mutation: {
        addPart: async (_: any, { input: { name, quantity } }: { input: addInput }) => {
            const insertId = await partModel.insert({
                name,
                quantity
            });
            const part = await partModel.findById(Number(insertId)) as Part;
            parts.push(part);

            return {
                done: true,
            };
        },
        editPart: async (_: any, { input: { id, quantity } }: { input: editInput }) => {
            const part = parts.find((part: Part) => part.id === id);
            if (!part) {
                throw new Error(`No part with id ${id}`);
            }
            await partModel.update({ quantity }, Where.from({ id }));
            parts.forEach((part: any, index: number) => {
                if (part.id === Number(id)) {
                    parts[index].quantity = quantity
                }
            });

            return {
                done: true,
            };
        },
        removePart: async (_: any, { input: { id } }: { input: removeInput }) => {
            const part = parts.find((part: Part) => part.id === Number(id));
            if (!part) {
                throw new Error(`No part with id ${id}`);
            }
            await partModel.delete(Where.from({ id }));
            parts.forEach((part: any, index: number) => {
                if (part.id === Number(id)) {
                    parts.splice(index, 1)
                }
            });

            return {
                done: true,
            };
        },
    },
    Date,
};