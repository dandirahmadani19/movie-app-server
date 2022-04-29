const express = require("express");
const cors = require("cors");
const errorsHandler = require("./middlewares/errorsHandler");
const app =  express();
const routes = require("./routers");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(routes);

app.use(errorsHandler);

app.listen(port, () => {
    console.log("Running On port ", port);
})