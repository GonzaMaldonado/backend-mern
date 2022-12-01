const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {API_VERSION} = require("./constants");

const app = express();

//Import Routings
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRoutes = require("./router/menu");
const courseRoutes = require("./router/course");
const postRoutes = require("./router/post");
const newsletterRoutes = require("./router/newsletter");

// Configure Body Parse--- Para que se entiendan los datos que se envian del cliente al servidor o viceversa
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static files--- Para que pueda acceder a archivos estaticos
app.use(express.static("uploads"));

// Configure Header HTTP Cors
app.use(cors());

// Configure Routings
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, courseRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);
app.use(`/api/${API_VERSION}`, newsletterRoutes);

module.exports = app;