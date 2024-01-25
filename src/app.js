const express = require("express");
const app = express();
const morgan = require("morgan");
const createError = require("http-errors");
const { userRouter } = require("./routers/userRouter");
const todoRoute = require("./routers/todoRoute");
const test = require("./routers/test");

const cors = require("cors");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRouter);
app.use("/test", test);
app.use("/todos", todoRoute);
app.get("/", () => {
	console.log("home");
});

app.use((req, res, next) => {
	next(createError(404, "route not found"));
});
app.use((err, req, res, next) => {
	return res.status(err.status || 500).json({
		success: false,
		message: err.message,
	});
});

module.exports = app;
