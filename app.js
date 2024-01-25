const express = require("express");
const morgan = require("morgan"); //for logging requests
const userRoutes = require("./routes/users");
const fruitRoutes = require("./routes/fruits");
const vegetableRoutes = require("./routes/vegetables");
const proteinRoutes = require("./routes/proteins");
const beverageRoutes = require("./routes/beverages");
const desertRoutes = require("./routes/deserts");
const mealRoutes = require("./routes/meals");
const app = express();

app.use(express.json());
app.use(morgan("combined"));
app.use("/users", userRoutes);
app.use("/fruits", fruitRoutes);
app.use("/vegetables", vegetableRoutes);
app.use("/proteins", proteinRoutes);
app.use("/deserts", desertRoutes);
app.use("/beverages", beverageRoutes);
app.use("/meals", mealRoutes);

module.exports = app;
