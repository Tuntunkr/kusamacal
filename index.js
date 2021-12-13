const express = require("express");
const axios = require("axios");
const cors = require("cors");
const calcRoute = require("./routes/calc.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", calcRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
