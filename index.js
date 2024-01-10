const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoHandler = require("./routeHandler/todoHandler");

// express app initialization
const app = express();
app.use(express.json());

dotenv.config({ path: "./config.env" });
mongoose
	.connect(process.env.DATABASE)
	.then(() => console.log("DB connection successful!"));



// application routes
app.use("/todo", todoHandler);

// default error handler
function errorHandler(err, req, res, next) {
	if (res.headersSent) {
		return next(err);
	}
	res.status(500).json({ error: err });
}

app.listen(3000, () => {
	console.log("app listening at port 3000");
});
