import { Router } from "express";
import {cancelTicketsHandler, createTicketsHandllers, getByAllPropHandller, getTicketsHandlers, ticketUpdationHandler  } from "../ticketsController/ticketsController";

const routerMiddleware = Router()


routerMiddleware.post('/createTickets',createTicketsHandllers)


routerMiddleware.get('/getTickets',getTicketsHandlers)


routerMiddleware.get('/getProp/:id',getByAllPropHandller)

routerMiddleware.patch('/updateTickets/:id',ticketUpdationHandler)


routerMiddleware.delete('/cancelTickets/:id',cancelTicketsHandler)

export default routerMiddleware