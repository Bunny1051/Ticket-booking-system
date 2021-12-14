import { ResponseGenerator } from "../ticketSModel/responceGenerate"

export const createResponse = (code: number, data?: any, err?: string): ResponseGenerator => {
    return {
        code: code,
        data: data,
        errormessage: err
    }
}