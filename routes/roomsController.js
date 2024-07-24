import express from 'express'
import roomsService from './../service/index.js'

const roomController = express.Router()

roomController.get('/all',roomsService.getAllRooms)
roomController.post('/create',roomsService.createRoom)
roomController.post('/bookRoom/:id',roomsService.bookRoom)
roomController.get('/all/bookedRooms',roomsService.getAllbookedRooms)
roomController.get('/all/customerBookings',roomsService.getAllCustomers)
roomController.get('/all/customerBookingCount/:id',roomsService.getBookingCountByCustomer)


export default roomController