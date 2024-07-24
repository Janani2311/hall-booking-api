import findIndexById from './../Helper/index.js'

// creating variables for storing data

let rooms = [
    {
        room_ID:"R001",
       seats_available:10,
       amenities:["tv","projector","pantry"],
       price_per_hour:"$50"
    },
    {
        room_ID:"R002",
        seats_available:20,
        amenities:["tv","projector","Ac","Mic"],
        price_per_hour:"$60"
     }
];

let bookings = [
    {
        customer_ID:"C1",
        booking_Date:"2024-07-12",
        start_time:new Date("2024-07-12T10:00:00Z"),
        end_time:new Date("2024-07-12T11:00:00Z"),
        booking_ID:1,
        room_ID:"R001",
        status:true,
        booked_on:"2024-07-10"
    },
    {
        customer_ID:"C2",
        booking_Date:"2024-07-16",
        start_time:new Date("2024-07-16T16:00:00Z"),
        end_time:new Date("2024-07-16T15:00:00Z"),
        booking_ID:2,
        room_ID:"R002",
        status:true,
        booked_on:"2024-07-14"
    }
];

let customers = [
    {
        customer_ID:"C1",
        customer_name:"Janani",
        booking_history:[
            {
                room_ID:"R001",
                booking_Date:"2024-07-12",
                start_time:new Date("2024-07-12T10:00:00Z"),
                end_time:new Date("2024-07-12T11:00:00Z"),
                booking_ID:1,
            }
        ]
    },
    {
        customer_ID:"C2",
        customer_name:"Vinodh",
        booking_history:[
            {
                room_ID:"R002",
                booking_Date:"2024-07-16",
                start_time:new Date("2024-07-16T16:00:00Z"),
                end_time:new Date("2024-07-16T15:00:00Z"),
                booking_ID:2,
            }
        ]
    }
];

//List all rooms details

const getAllRooms = (req,res)=>{
    try {
        res.status(200).send({
            message:"Data Fetch Successfull",
            data:rooms
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

//creating room

const createRoom = (req,res) => {
    try {

        let room = req.body
        let index = findIndexById(rooms,room.room_ID)
        if(index === -1){
            rooms.push(room)
            res.status(201).send({
                message:"Data created Successfully"
            })
        }
        else
        {
            res.status(400).send({
                message:`Room with room_ID ${req.body.room_ID} already exists!`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

// new booking to a room
const bookRoom = (req,res) => {
    try {
        const {id} = req.params;
        let idExists = rooms.find((e) => e.room_ID === id)
        if(idExists){
            let bookedData = bookings.filter((e) => e.room_ID === id)
            let room_available_date = bookedData.filter((e) => (e.booking_Date === req.body.booking_Date))
            if(room_available_date.length){
                res.status(400).send({
                    message:`ROOM NOT AVAILABLE!! Room already booked on ${req.body.booking_Date} date`
                })
            }
            else{
                let newbooking = {
                    ...req.body,
                    booking_ID:bookings.length? bookings[bookings.length-1].booking_ID+1 : 1,
                    room_ID:id,
                    status:true,
                    booked_on:new Date().toLocaleDateString()
                 }
                 bookings.push(newbooking);
                 res.status(200).send({
                    message:` Room booked sucessfully!! Room with ID ${id} booked on ${req.body.booking_Date} from ${req.body.start_time} to ${req.body.end_time}`
                 })
            }
        }
        else{
            res.status(400).send({
                message:"Room ID does not exists"
            })
        }
        
    } catch (error) {
        
    }
}

//LIST ALL THE BOOKED ROOM

const getAllbookedRooms = (req,res) => {
    let bookedRooms = bookings.map((e) => {
      return e;
    })
    if(bookedRooms.length){
        res.status(200).send({
            message:"Booked Rooms fetched sucessfully",
            data:bookedRooms
        })
    }else {
        res.status(400).send({
            message:"No rooms booked yet!!"
        })
    }
    
}

//List all the customers with booked data
const getAllCustomers=(req, res) => {
    const customerBookings = customers.map(customer => {
        const { customer_name, booking_history } = customer;

        const customerDetails = bookings.map(booking => {
          const { room_ID, booking_Date, start_time, end_time } = booking;
          return { room_ID, booking_Date, start_time, end_time};
        });
       
        return {customer_name, booking_history};
      })
    if(customerBookings.length){
        res.status(200).send({
            message:"customers with booked details fetched successfully!!",
            data:customerBookings
        })
    }else {
        res.status(400).send({
            message:"Customers not yet booked rooms yet!!"
        })
    }
  }

  // List how many times the user booked the room
 const getBookingCountByCustomer=(req, res) => {
    const { id } = req.params;
    const customer = customers.find(e => e.customer_ID === id);
    if (customer.length == 0) {
      res.status(404).send({ error: 'Customer not found' });
      return;
    }else{
        const customerBookings = bookings.filter((booking) => { return (booking.customer_ID === id)});
          res.send({
              count:customerBookings.length,
              customerBookings});
    }
  
  }

export default {
    getAllRooms,
    createRoom,
    bookRoom,
    getAllbookedRooms,
    getAllCustomers,
    getBookingCountByCustomer
}