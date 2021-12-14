import { readRecords, saveRecords } from "../ticketsDao/ticketsDao";
import { categoryType } from "../ticketSModel/categoryModel";
import { bookingSchema } from "../ticketSModel/ticketsModel";
var uuid = require('uuid')

//post
export const createTickets = async (ticketsData: bookingSchema[]) => {
    const all = await readRecords()
    const db = [];
    for (let i = 0; i < ticketsData.length; i++) {
        if (ticketsData[i].passangerDetails.length <= 0 ||
            ticketsData[i].passangerDetails.length > 6) {
            return "provide valid number of Passengers";
        } else if (
            ticketsData[i].source =='' ||
            ticketsData[i].destination =='' ||
            ticketsData[i].category == ''
        ) {
            return "provide all required fileds";
        } else if (
            ticketsData[i].category != "businees class" &&
            ticketsData[i].category != "premium class" &&
            ticketsData[i].category != "premium econamy class"
        ) {
            return "category is invalid, provide correct one";
        }

        for (let j = 0; j < ticketsData[i].passangerDetails.length; j++) {
            if(ticketsData[i].passangerDetails[j].name === undefined || ticketsData[i].passangerDetails[j].name.length === 0) {
                return "please provide name field";
              }
              if (ticketsData[i].passangerDetails[j].gender === undefined ||ticketsData[i].passangerDetails[j].gender.length === 0) {
                return "please provide genderr field";
              }
              if(ticketsData[i].passangerDetails[j].age === undefined || ticketsData[i].passangerDetails[j].age === 0) {
                return "please provide age field";
              }
        


            if (ticketsData[i].passangerDetails[j].age > 150) {
                return "Paasenger age should be between 1 to 150";
            } else if (
                ticketsData[i].passangerDetails[j].gender != "male" &&
                ticketsData[i].passangerDetails[j].gender != "female" &&
                ticketsData[i].passangerDetails[j].gender != "others"
            ) {
                return "provide valid Gender";
            } else if (
                ticketsData[i].passangerDetails[j].seatNo < 1 ||
                ticketsData[i].passangerDetails[j].seatNo > 60
            ) {
                return "seat number should be in between 1 to 60";
            }

            for (let k = j + 1; k < ticketsData[i].passangerDetails.length; k++) {
                if (
                    ticketsData[i].passangerDetails[j].seatNo ==
                    ticketsData[i].passangerDetails[k].seatNo
                ) {
                    return "seat number shouldn't be same";
                }
            }
        }

        const caltotalFare = (ticketsData) => {
            for (let i = 0; ticketsData.length; i++) {
                for (let j = 0; categoryType.length; j++) {
                    if (ticketsData[i].category.toLowerCase() === categoryType[j].category.toLowerCase()) {
                        const Tfare = ticketsData[i].passangerDetails.length * categoryType[j].fare
                        return Tfare
                    }
                }
            }
        }

        const time = (ticketsData)=>{
            
            for (let i=0 ; i< ticketsData.length ;i++){
                if (
                    ticketsData[i].DepartureTime < ticketsData[i].bookedOn
                ) {
                    return "time is not valid";
                }
            }
        }
        const res = caltotalFare(ticketsData);
        const unique_id = {
            bookingId: uuid.v1(),
            ownerId: uuid.v1(),
            bookedOn: new Date(),
            status: "booked",
            totalfare: res
            
        }
        const contactData = Object.assign(ticketsData[i], unique_id)
        db.push(contactData)
    }
    const con = db.concat(all)
    return saveRecords(con)

}

//get all tickets details

export const getTicketsDetails = async (): Promise<bookingSchema[]> => {
    // console.log('fetch called')
    const all = await readRecords()
    if (all.length === 0) {
        return Promise.reject('no tickets found')
    } else {

        return (all.sort((a, b) => {

            let x: any = (a.totalfare);
            let y: any = (b.totalfare);

            return x - y;

        })
        )
    }
}
// get by all properties mentioned

export const getByAllProp = async (id: any): Promise<bookingSchema[]> => {
    const all = await readRecords()

    const found = all.filter(e => e.bookingId === id || e.ownerId === id || e.category === id ||
        e.status === id || e.DepartureTime === id || e.bookedOn === id || e.category.toLowerCase().replace(/\s/g, "") ===
        id.toLowerCase().replace(/\s/g, "") ||  e.status.toLowerCase() === id.toLowerCase()
       
    )
    if (!found) {
        return Promise.reject('record not found')
    }
    return found
}


//update
 export const ticketsUpdation = async (data: bookingSchema[] , id :string, Depart:string, bookedIn:string) => {
 const all = await readRecords()
 const dateB: any = new Date(Depart);
 const dateD: any = new Date(bookedIn);
 const cancelTime = Math.abs(dateD - dateB);
  
 if (cancelTime < 21600000) {
    return Promise.reject("Time out...cant cancel");
}
            for (let i = 0; i < data.length; i++) {
          var dataT = all.findIndex((ticket) => ticket.ownerId === id);
          for (let j = 0; j < data[i].passangerDetails.length; j++) {
          if (           
                         data[i].passangerDetails[j].gender  ||
                         data[i].source ||
                        data[i].ownerId ||
                        data[i].bookingId  ||
                        data[i].bookedOn ||
                        data[i].DepartureTime ||
                        data[i].destination ||
                        data[i].status 
                      ) {
                        return Promise.reject("cant modify these field");
                      }
                    }
            if (dataT !== -1) {
            const updateTicket = {
              ...all[dataT],
              ...data[0],
              ModifiedOn: new Date(),
            };
            
            all.splice(dataT, 1, updateTicket);
          }
          const ticket = all.filter((b) => b.ownerId === id);
          return saveRecords(all);
        }
        }

//cancel 

export const cancelTicketsByID = async (data: bookingSchema, id: string, comments: string ,bookedIn:string  , Depart :string) => {
    const all = await readRecords()
    const found = all.find(c => c.ownerId === id)
        const dateB: any = new Date(Depart);
        const dateD: any = new Date(bookedIn);
        const cancelTime = Math.abs(dateD - dateB);

        if (!found) {
            return Promise.reject('record is not there')
        } else if (cancelTime < 21600000) {
            return Promise.reject("Time out  cant cancel");
        } else {
          
                const res = all.findIndex(c => c.ownerId === found.ownerId)
                const updatedRecord = { ...found, ...data, comments }
                all.splice(res, 1, updatedRecord)
                return saveRecords(all)
            
        }
    }
   
