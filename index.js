require("dotenv").config();

const cookieParser = require("cookie-parser");

const cors = require("cors");
const bodyParser = require("body-parser").json;
const express = require("express");
const router = require("./router");

const app = express();

const PORT = process.env.PORT || 3002;

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(bodyParser());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
