import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    patientAdmissions:{
        type: Number,
        default: 0
    },
    totalDoctors: {
        type: Number,
        default: 0
    },
    contact: {
        type: String,
        unique: true,
        required: true
    },
    
}, { timestamps: true });

const Hospital = mongoose.model('Hospital', hospitalSchema);
export default Hospital;
