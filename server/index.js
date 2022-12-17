import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

/* Routes */
import generalRoutes from "./routes/general.js";
import clientRoutes from "./routes/client.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

/* Data Imports */
import User from "./models/User.js";
import { dataUser } from "./data/index.js";

/* Configuration */
dotenv.config();
const app = express();

/* 
    In the tutorial the dev did app.use(xyz); app.use(abc),
    however I have refactored as I believe this is a much cleaner way 
*/
app
  .use(express.json)
  .use(helmet())
  /* 
        This allows us to make cross origin sharing request 
        (Needed for making API calls at another server ) 
    */
  .use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
  .use(morgan("common"))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cors());

/* Routes */
/* We will be using 4 different routes in this build */
app
  .use("/general", generalRoutes)
  .use("/clients", clientRoutes)
  .use("/management", managementRoutes)
  .use("sales", salesRoutes);

/*
    The API's have been split as above with general looking after
    the dashboard and user information
*/

/* Mongoose Setup */
/* 
    Initial port is set in the .env folder, however if this port fails
    then it will try launch on 9000 
*/
const PORT = process.env.PORT || 9000;

/* 
    We use mongoose.connect and pass it the URL we set in the .env file,
    the second parameter is an object of setup parameters
*/

mongoose
  .connect(process.env.MONGO_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

    /* Only add the data one time */
    User.insertMany(dataUser);
  })
  .catch((error) => {
    console.log(`${error}`);
  });
