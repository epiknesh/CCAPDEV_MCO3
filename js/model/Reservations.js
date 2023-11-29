import mongoose from "mongoose";
const {Schema, model} = mongoose;

const reservationSchema = new Schema({
    reservationNum: Number,
    date: String,
    startTime: String,
    endTime: String,
    lab: String,
    seatNum: Number,
    owner: String,
    anonymous: String,
    bookingDate: String,
    bookingTime: String
});

const Reservation = model("Reservation", reservationSchema);

export default Reservation;

