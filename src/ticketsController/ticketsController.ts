import { bookingSchema } from "../ticketSModel/ticketsModel";

import { createResponse } from "../utility/createResponce"

import { cancelTicketsByID, createTickets, getByAllProp, getTicketsDetails, ticketsUpdation } from "../ticketsManager/ticketsManager";

//post
export const createTicketsHandllers = (req: any, res: any) => {

    const ticketsRecords = <bookingSchema[]>req.body
    console.log(ticketsRecords)
    createTickets(ticketsRecords)
        .then(
            (successMessage: any) => {
                res.status(200).json(createResponse(201, successMessage))
            },
            (reason: any) => {
                res.status(500).json(createResponse(500, null, reason))
            }
        )
}

//get
export const getTicketsHandlers = (req: any, res: any) => {
    // console.log('request received')
    getTicketsDetails()
        .then(
            (successData: any) => {
                res.status(200).json(createResponse(200, successData))
            },
            (failureReason: any) => {
                res.status(500).json(createResponse(500, null, failureReason))
            }
        )
}

//get by properties
export const getByAllPropHandller = (req: any, res: any) => {
    const id = req.params.id
    getByAllProp(id)
        .then(
            (data: any) => {
                res.status(200).json(createResponse(200, data))
            },
            (err: string | undefined) => {
                res.status(500).json(createResponse(500, null, err))
            }
        )
}

//update 
export const ticketUpdationHandler = (req, res) => {
    const data = <bookingSchema[]>req.body
    const id  = req.params.id
    for (let i = 0; i < req.body.length; i++) {
        const Depart = req.body[i].DepartureTime
        const bookedIn = req.body[i].bookedOn
    ticketsUpdation(data ,id ,Depart, bookedIn)
        .then(
            (data: any) => {
                // console.log(data)
                res.status(200).json(createResponse(200, data))
            },
            (err: any) => {
                res.status(500).json(createResponse(500, null, err))
            }
        )
}
}

//cancel

export const cancelTicketsHandler = (req: any, res: any) => {
    const id = req.params.id
    for (let i = 0; i < req.body.length; i++) {
        const comments = req.body[i].comments
        const Depart = req.body[i].DepartureTime
        const bookedIn = req.body[i].bookedOn
        if (comments === undefined || comments === null || comments.length === 0) {
            res.send("please mention the reasons for cancelation")
        }
        const data: any = { status: "cancelled" }
        cancelTicketsByID(data, id, comments, Depart, bookedIn)
            .then(
                (data: any) => {
                    // console.log(data)
                    res.status(200).json(createResponse(200, data))

                },
                (err: any) => {
                    res.status(500).json(createResponse(500, null, err))
                }
            )
    }
}


