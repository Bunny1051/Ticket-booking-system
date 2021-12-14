import {  readFile , writeFile} from "fs";

import { bookingSchema } from "../ticketSModel/ticketsModel";


// read the records

export const readRecords = (): Promise<bookingSchema[]> => {
    const promise = new Promise<bookingSchema[]>(
        (resolved, rejected) => {
            readFile(process.env.FILE_PATH, (err, data) => {
                if (err) {
                    rejected('unable to get the DATA')
                }

                if (data) {
                    const all = <bookingSchema[]>JSON.parse(data.toString())
                    // console.log(all)
                    resolved(all)
                }
            })
        }
    )
    return promise
}


// save the data
export const saveRecords = (tickets: bookingSchema[]): Promise<string> => {
    const promise = new Promise<string>(
        (resolved, rejected) => {
            writeFile(
                process.env.FILE_PATH,
                JSON.stringify(tickets),
                (err) => {
                    if (err) {
                        rejected('could not write..')

                    } else {
                        resolved('success')
                    }
                })
        }
    )
    return promise
    
}
