import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { UserModel, DoctorModel,AppointmentModel,AssetsModel } from './schema.js';


const Routing = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


Routing.post("/user", upload.single("image"), async (req, res) => {
  try {
    const { action, userId, name, email, password } = req.body;
    console.log("Received userId:", userId);

    if (action === "getData") {
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const userData = await UserModel.findById(userId);
      if (!userData) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({
        ...userData._doc,
        image: userData.image?.data
          ? {
              contentType: userData.image.contentType,
              data: userData.image.data.toString("base64"),
            }
          : null,
      });
          }

    if (action === "signup") {
      if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered. Please log in." });
      }

      const newUser = new UserModel({ name, email, password });
      await newUser.save();

      return res.status(201).json({
        message: "User registered successfully!",
        user: { _id: newUser._id, name, email }
      });
    }

    if (action === "login") {
      const user = await UserModel.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
      return res.status(200).json({ message: "Login successful", user });
    }

    if (action === "updateData") {
      if (!userId) {
        return res.status(400).json({ error: "User ID is required for update" });
      }

      // Build the update object from fields
      const updateFields = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        gender: req.body.gender,
        birthday: req.body.birthday,
      };

      // Add image path if uploaded
      if (req.file) {
        updateFields.image = {
          data: req.file.buffer,
          contentType: req.file.mimetype
        };
      }
      
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: updateFields },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    }

    return res.status(400).json({ error: "Invalid action." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




Routing.post("/doctors", upload.single("image"), async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const { name, category, experience, about, address, appointmentFee } = req.body;

    if (!name || !category || !experience || !about || !address || !appointmentFee) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const doctorDetails = new DoctorModel({
      name,
      category,
      experience,
      about,
      address,
      appointmentFee,
      image: req.file
        ? { data: req.file.buffer, contentType: req.file.mimetype }
        : null,
    });

    await doctorDetails.save();
    console.log("Doctor saved!");

    return res.status(201).json({
      message: "Doctor added successfully!",
      doctor: doctorDetails,
    });

  } catch (error) {
    console.error("Error saving doctor details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


Routing.get("/doctors/:id?", async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.query; 

    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid doctor ID format" });
      }

      const doctor = await DoctorModel.findById(id);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      return res.json({
        id: doctor._id,
        name: doctor.name,
        category: doctor.category,
        experience: doctor.experience,
        about: doctor.about,
        address: doctor.address,
        appointmentFee: doctor.appointmentFee,
        image: doctor.image
          ? `data:${doctor.image.contentType};base64,${doctor.image.data.toString("base64")}`
          : null,
      });
    } else {
      let query = {};
      if (category) {
        query.category = category; 
      }

      const doctors = await DoctorModel.find(query);
      const doctorsWithImages = doctors.map((doctor) => ({
        id: doctor._id,
        name: doctor.name,
        category: doctor.category,
        experience: doctor.experience,
        about: doctor.about,
        address: doctor.address,
        appointmentFee: doctor.appointmentFee,
        image: doctor.image
          ? `data:${doctor.image.contentType};base64,${doctor.image.data.toString("base64")}`
          : null,
      }));

      return res.json(doctorsWithImages);
    }
  } catch (error) {
    console.error("Error fetching doctor(s):", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


Routing.post("/book-appointment", async (req, res) => {
  try {
    const { userId, doctorId, date, time } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Login to book an appointment" });
    }

    const existingAppointment = await AppointmentModel.findOne({ doctorId, date, time });

    if (existingAppointment) {
      console.log("Doctor is already booked at this time:", doctorId, date, time);
      return res.status(400).json({ message: "This slot is already booked" });
    }

    const newAppointment = new AppointmentModel({ userId, doctorId, date, time });
    await newAppointment.save();

    res.status(201).json({ message: "Appointment booked successfully!" });

  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



Routing.get("/book-appointment/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID" });
    }

    const appointments = await AppointmentModel.find({ userId });

    if (!appointments.length) {
      return res.status(404).json({ message: "No appointments found for this user" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Routing.delete("/book-appointment/:appointmentId", async (req, res) => {
  console.log("DELETE request received. Params:", req.params); 

  const { appointmentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
    console.log("Invalid appointment ID:", appointmentId);
    return res.status(400).json({ error: "Invalid appointment ID" });
  }

  const deletedAppointment = await AppointmentModel.findByIdAndDelete(appointmentId);

  if (!deletedAppointment) {
    console.log("Appointment not found:", appointmentId);
    return res.status(404).json({ message: "Appointment not found" });
  }

  console.log("Deleted appointment:", deletedAppointment);
  res.status(200).json({ message: "Appointment deleted successfully!" });
}); 



Routing.post("/assets", upload.single("image"), async (req, res) => {
  try {
    const { name, category } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });


    const newAsset = new AssetsModel({
      name,
      category,
      image: req.file
        ? { data: req.file.buffer, contentType: req.file.mimetype }
        : null,
    });

    await newAsset.save();

    res.status(200).json({ message: "File uploaded and saved in MongoDB", asset: newAsset });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



Routing.get('/assets', async (req, res) => {
  try {
    const assets = await AssetsModel.find({}, 'name'); // Fetch only the "name" field

    if (!assets || assets.length === 0) {
      return res.status(404).send("No assets found");
    }

    // Respond with an array of asset names
    res.json(assets.map(asset => ({ name: asset.name })));
  } catch (error) {
    console.error("Error fetching asset names:", error);
    res.status(500).send("Server Error");
  }
});


Routing.get('/assets/:filename', async (req, res) => {
  const fileName = req.params.filename;
  try {
    const asset = await AssetsModel.findOne({
      name: { $regex: `^${fileName}$`, $options: 'i' } 
    });

    if (!asset || !asset.image || !asset.image.data) {
      return res.status(404).send("Image not found");
    }

    res.set("Content-Type", asset.image.contentType);
    res.send(asset.image.data);
  } catch (error) {
    console.error("Error fetching asset:", error);
    res.status(500).send("Server Error");
  }
});

Routing.use("/uploads", express.static("uploads"));






export default Routing;






