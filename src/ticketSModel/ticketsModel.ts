export interface bookingSchema {
   
    
    bookingId: string;
    passangerDetails:
     [{name :string,
         age : number,
          gender : string,
           seatNo : number
         }];
    source: string;
    destination: string;
    category: string; 
    totalfare: number;
    status: string,
    comments : string,
    ownerId : string,
    DepartureTime : Date,
    bookedOn : Date,
    modifiedOn : Date
  }
