import "dotenv/config.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Account from "./model/Accounts.js";
import Reservation from "./model/Reservations.js";
import http from 'http';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

import crypto from 'crypto';

const server = http.createServer(async (req, res) => {
    const accountInfo = await database.query("select = from account where email=hdwidhw");
    const html = fs.promises.readFile('./Home.html', 'utf-8');
    
    res.setHeader('Content-Type', 'text/html');
    res.write(await html);
    res.end();
});

fs.readFile('./model/DB.accounts.json', 'utf8', async (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME });
    
        // Check if the Account collection is empty
        const accountCount = await Account.countDocuments();
    
        if (accountCount === 0) {
            // Read the JSON file
            const data = fs.readFileSync('./model/DB.accounts.json', 'utf8');
            const jsonData = JSON.parse(data);
    
            const convertedData = jsonData.map(item => {
                const { _id, ...rest } = item;
                return {
                    ...rest,
                    _id: _id.$oid // Convert nested _id to simple _id
                };
            });
    
            // Insert Accounts if the collection is empty
            await Account.insertMany(convertedData);
    
            console.log('Data imported successfully.');
        } else {
            console.log('Account collection is not empty. Skipping data import.');
        }
    } catch (error) {
        console.error('Error importing data:', error);
    } finally {
        // Close the MongoDB connection
    }
});

fs.readFile('./model/DB.reservations.json', 'utf8', async (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME });
    
        const reservationCount = await Reservation.countDocuments();
    
        if (reservationCount === 0) {
            // Read the JSON file
            const data = fs.readFileSync('./model/DB.reservations.json', 'utf8');
            const jsonData = JSON.parse(data);
    
            const convertedData = jsonData.map(item => {
                const { _id, ...rest } = item;
                return {
                    ...rest,
                    _id: _id.$oid // Convert nested _id to simple _id
                };
            });
    
            // Insert Accounts if the collection is empty
            await Reservation.insertMany(convertedData);
    
            console.log('Data imported successfully.');
        } else {
            console.log('Reservation collection is not empty. Skipping data import.');
        }
    } catch (error) {
        console.error('Error importing data:', error);
    } finally {
        // Close the MongoDB connection
    }
});




const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
})

);

const routes = express.Router();

routes.route("/accounts").get(function(req, res) {
    Account.find().then((accounts) => {
        res.json(accounts);
        res.end();
    });

});

routes.route("/accounts").post(function (req, res) {

    const account = new Account({
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
        image: req.body.image,
        name: req.body.name,
        bio: req.body.bio
    })
    account.save();
    res.json({message: "Account saved"});

});

routes.route("/reservations").get(function(req, res) {
    Reservation.find().then((reservations) => {
        res.json(reservations);
        res.end();
    });

});

routes.route("/reservations").post(function (req, res) {

    const reservation = new Reservation({
        reservationNum: req.body.reservationNum,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        lab: req.body.lab,
        seatNum: req.body.seatNum,
        owner: req.body.owner,
        anonymous: req.body.anonymous,
        bookingDate: req.body.bookingDate,
        bookingTime: req.body.bookingTime
    });
    reservation.save();
    res.json({message: "Reservation saved"});

});

routes.route('/reservationList').get(async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

routes.route("/register").post(async function (req, res) {
    const { email, password, type, image, name, bio } = req.body;

    try {
        // Check if the email already exists in the database
        const existingAccount = await Account.findOne({ email });
        if (existingAccount) {
            return res.status(400).json({ error: "Email already exists", message: "Account with this email already exists. Please use a different email." });
        }

        // Check if the password and re-entered password match
        if (password !== req.body.repassword) {
            return res.status(400).json({ error: "Passwords do not match", message: "Passwords do not match. Please try again." });
        }

        // Hash the password before storing it
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        // Set default values for fields if they are not provided
        const newAccount = new Account({
            email,
            password: hashedPassword,
            type,
            image: image || null,
            name: name || null,
            bio: bio || null,
        });

        // Save the new account to the database
        await newAccount.save();

        res.status(201).json({ message: "Account registered successfully." });
    } catch (error) {
        console.error("Error during account registration:", error);
        res.status(500).json({ error: "Internal Server Error", message: "An internal server error occurred during account registration." });
    }
});
app.get('/accounts/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const user = await Account.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

routes.route("/accounts/:email/name")
  .patch(async function(req, res) {
    const email = req.params.email;
    const newName = req.body.name;

    try {
      const user = await Account.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update the user's name
      user.name = newName;
      await user.save();

      res.json({ message: 'User name updated successfully' });
    } catch (error) {
      console.error('Error updating user name:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  routes.route("/accounts/:email/bio")
  .patch(async function(req, res) {
    const email = req.params.email;
    const newBio = req.body.bio;

    try {
      const user = await Account.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update the user's bio
      user.bio = newBio;
      await user.save();

      res.json({ message: 'User bio updated successfully' });
    } catch (error) {
      console.error('Error updating user bio:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  routes.route("/accounts/:email/image")
  .patch(async function (req, res) {
      const email = req.params.email;
      
      // Assuming you're using the multer middleware to handle file uploads
      const newImagePath = req.file.path;

      try {
          const user = await Account.findOne({ email });

          if (!user) {
              return res.status(404).json({ error: 'User not found' });
          }

          // Update the user's profile image path
          user.image = newImagePath;
          await user.save();

          res.json({ message: 'User profile image path updated successfully' });
      } catch (error) {
          console.error('Error updating user profile image path:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  });

  app.patch("/accounts/:email/image", async (req, res) => {
    const email = req.params.email;
    const newImagePath = req.body.image;

    try {
        const user = await Account.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user's profile image path
        user.image = newImagePath;
        await user.save();

        res.json({ message: 'User profile image path updated successfully' });
    } catch (error) {
        console.error('Error updating user profile image path:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/accounts/:email", async (req, res) => {
    const email = req.params.email;
  
    try {
      // Delete reservations by the owner's email
      const deletedReservations = await Reservation.deleteMany({ owner: email });
  
      // Delete the account
      const deletedAccount = await Account.findOneAndDelete({ email });
  
      if (!deletedAccount) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ message: 'User account and associated reservations deleted successfully' });
    } catch (error) {
      console.error('Error deleting user account:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.delete("/reservations/:reservationNum", async (req, res) => {
  const reservationNum = req.params.reservationNum;

  try {
    // Delete reservations by reservation number
    const deletedReservations = await Reservation.deleteMany({ reservationNum });

    if (deletedReservations.deletedCount === 0) {
      return res.status(404).json({ message: 'Reservations not found' });
    }

    res.json({ message: 'Reservations deleted successfully' });
  } catch (error) {
    console.error('Error deleting reservations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/updateReservation', async (req, res) => {
    try {
        const {
            reservationNum,
            startTime,
            endTime,
            newDate,
            lab,
            anonymous
        } = req.body;

        // Find all reservations by reservation number
        console.log(reservationNum);
        const reservationsToUpdate = await Reservation.find({ reservationNum });

        if (reservationsToUpdate && reservationsToUpdate.length > 0) {
            // Update all found reservations with the new data
            await Promise.all(reservationsToUpdate.map(async (reservation) => {
                reservation.startTime = startTime;
                reservation.endTime = endTime;
                reservation.date = newDate;
                reservation.lab = lab;
                reservation.anonymous = anonymous;
                return await reservation.save();
            }));

            res.status(200).json({ message: 'Reservations updated successfully' });
        } else {
            // Handle if no reservations with the given number are found
            res.status(404).json({ message: 'Reservations not found' });
        }
    } catch (error) {
        // Handle any errors that may occur during the update process
        console.error('Error updating reservations:', error);
        res.status(500).json({ message: 'Error updating reservations', error: error.message });
    }
});

// Assuming your endpoint for making a reservation is '/make-reservation'
app.post('/make-reservation', async (req, res) => {
    try {
        // Fetch the most recent reservation to get the latest reservationNum
        const latestReservation = await Reservation.findOne().sort({ reservationNum: -1 });
        const latestReservationNum = latestReservation ? latestReservation.reservationNum : 0;

        // Extract data from the request body
        const { date, startTime, endTime, lab, seatNum, owner, anonymous } = req.body;

        // Get the current date and time
        const currentDate = new Date();
        const bookingDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`;
        const bookingTime = `${('0' + currentDate.getHours()).slice(-2)}:${('0' + currentDate.getMinutes()).slice(-2)}:${('0' + currentDate.getSeconds()).slice(-2)}`;
        

        // Create a new reservation object for each seat number
        for (let i = 0; i < seatNum.length; i++) {
            const newReservation = new Reservation({
                reservationNum: latestReservationNum + 1, // Incrementing reservationNum
                date,
                startTime,
                endTime,
                lab,
                seatNum: seatNum[i], // Individual seat number from the array
                owner,
                anonymous,
                bookingDate,
                bookingTime
            });

            // Save each new reservation to the database
            await newReservation.save();
        }

        // Respond with a success message
        res.status(200).json({ message: 'Reservations created successfully' });
    } catch (error) {
        console.error('Error creating reservations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.use(routes);


// Your login route handler
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Account.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Hash the input password using the same method used during registration
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        // Compare the hashed password from the database with the hashed input password
        if (hashedPassword !== user.password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // If passwords match, login successful, send user data (email and type)
        res.json({ email: user.email, type: user.type });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.get("/", (req, res) =>{

});

app.listen(3000, "localhost", () => {
    console.log("Server started at port 3000");
    console.log(process.env.MONGODB_URI);
    mongoose.connect(process.env.MONGODB_URI, {dbName: process.env.DB_NAME});
});
