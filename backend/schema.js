import mongoose from 'mongoose';

// User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
    address: { type: String },
    gender: { type: String },
    birthday: { type: String },
    image: {
        data: Buffer,
        contentType: String
    },
});

// Doctor Schema
const DoctorSchema = new mongoose.Schema({
    name: { type: String },
    image: {
        data: Buffer,
        contentType: String
    },
    category: { type: String },
    experience: { type: Number },
    about: { type: String },
    address: { type: String },
    appointmentFee: { type: Number }
});

// Appointment Schema
const AppointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
});

AppointmentSchema.index({ doctorId: 1, date: 1, time: 1 }, { unique: true });

// Assets Schema
const AssetsSchema = new mongoose.Schema({
    name: { type: String },
    image: {
        data: Buffer,
        contentType: String
    },
    category: { type: String },
});



const UserModel = mongoose.model('users', UserSchema);
const DoctorModel = mongoose.model('doctors', DoctorSchema);
const AppointmentModel = mongoose.model('appoinment', AppointmentSchema);
const AssetsModel = mongoose.model('assets', AssetsSchema);


export { UserModel, DoctorModel, AppointmentModel, AssetsModel };
