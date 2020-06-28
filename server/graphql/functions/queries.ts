import { checkName } from "../../utils/validators.ts"


export const getPart = (parts: any) => {
    return {
        getPart: (_: any, { name }: { name: string }) => {
            return checkName(parts, name);
        }
    }
}
export const getParts = (parts: any) => {
    return {
        getParts: () => {
            return parts;
        }
    }
}
