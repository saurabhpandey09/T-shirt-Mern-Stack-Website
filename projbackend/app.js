require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors")


//MY routes
const authRoutes = require("./routes/auth")
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')
const paymentRoutes = require('./routes/paymentRoutes')

//This is my middleware

app.use(express.json());

app.use(express.urlencoded({
    extended: true
  }));

app.use(cookieParser());
app.use(cors());

//This is my DB connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
}).catch((err) => {
    console.log("DB GOT OOPS");
})

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);





// Ports
const port = process.env.PORT || 8000;


//Satrting a Server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
})