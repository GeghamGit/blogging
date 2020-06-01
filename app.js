const express = require("express");
const path = require("path");
const logger = require("morgan");
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const conf = require('./config');

const blogRouter = require("./routes/blogs");
const userRouter = require("./routes/users");

const app = express();
const specs = swaggerJsdoc(conf.swagger);

app.use(helmet());
app.use(logger("dev"));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/blogs", blogRouter);
app.use("/auth", userRouter);

require('./middlewares/error')(app);

module.exports = app;