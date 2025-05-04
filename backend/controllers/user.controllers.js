
import mongoose from "mongoose";
import User from "../models/userSchema.js";
import MedicalRecord from "../models/medicalRecordSchema.js";
import bcrypt from "bcryptjs";
import moment from "moment";

const signup=async (req, res) => {
    const { fullname, email, password, gender, dateOfBirth, contact, address } = req.body;
    try {
        // Check if user already exists
        let rawDate = dateOfBirth;
        let [day, month, year] = rawDate.split("-");
        let correctedDate = new Date(`${year}-${month}-${day}`);

        const user= await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "User already exists!" });
        }
        
        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
            gender: gender,
            dateOfBirth: correctedDate,
            medicalHistory: [], 
            contact: contact,
            address: address,
        });

        await createdUser.save();

        res.status(201).json({
            message: "User created successfully!",
            data: {
                _id: createdUser._id,
                email: createdUser.email
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(password);

        // Find user by email
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // console.log(user);
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                email: user.email,
                fullname: user.fullname
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getMedicalRecord= async (req, res) => {
    const { id } = req.body; // Get user ID from the route parameters

    try {
        // Find the user by ID and populate the medicalHistory field
        const user = await User.findById(id).populate("medicalHistory");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User found",
            data: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }


}

const updateMedicalRecord = async (req, res) => {
    const { id } = req.params; // Get user ID from the route parameters
    const { dateOfBirth, gender, contact, address, medicalHistory } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prepare the update object
        const updateFields = {};
        if (dateOfBirth !== undefined) updateFields.dateOfBirth = dateOfBirth;
        if (gender !== undefined) updateFields.gender = gender;
        if (contact !== undefined) updateFields.contact = contact;
        if (address !== undefined) updateFields.address = address;
        if (medicalHistory !== undefined) updateFields.medicalHistory = medicalHistory;

        // Update the user document
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "User updated successfully!",
            user: updatedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

const medicalRecord= async (req, res) => {
    const { patient, doctor, date, diagnosis, prescription, hospital } = req.body;

    try {
        // Create a new medical record instance
        const newMedicalRecord = new MedicalRecord({
            patient,
            doctor,
            date: date || Date.now(), // Use provided date or default to now
            diagnosis,
            prescription,
            hospital: hospital// Use provided hospital or default to a space
        });

        // Save the medical record to the database
        const savedMedicalRecord = await newMedicalRecord.save();

        // Update the user's medicalHistory with the new medical record's ID
        await User.findByIdAndUpdate(patient, {
            $push: { medicalHistory: savedMedicalRecord._id }
        });

        res.status(201).json({
            message: "Medical Record Added",
            data: savedMedicalRecord
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }


}
const check = async (req, res) => {
    res.status(200).json({message:"Hello from check"})
}
const profile= async(req,res)=>{
    const { id}=req.body;
    try{
        const user=await User.find({_id:id});
        if(!user){
            res.status(400).json({message:"user not found"});
        }
        res.status(200).json({data:user});

    }catch(error){

    }
}

export {
    signup,
    login,
    medicalRecord,
    updateMedicalRecord,
    getMedicalRecord,
    check,
    profile
}