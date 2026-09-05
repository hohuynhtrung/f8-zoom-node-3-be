require("dotenv").config();
require("module-alias/register");

const cors = require("cors");
const express = require("express");
const appRoute = require("@/routes/index");
const response = require("@/middlewares/responseFormat");
const notFound = require("@/middlewares/notFoundHandler");
const exceptionHandler = require("@/middlewares/exceptionHandler");

const app = express();
const port = 3000;

const corsOptions = {
  origin: ["http://localhost:5173", "https://hohuynhtrung.github.io"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(response);

app.get("/api/test-success", (req, res) => {
  res.success({ message: "Hello World" });
});

app.get("/api/test-error", (req, res) => {
  throw Error("Test exception");
});

app.use("/api", appRoute);

app.use(notFound);
app.use(exceptionHandler);

app.listen(port, () => {
  console.log("Running on http://localhost:" + port);
});
