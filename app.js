const express = require("express");
const path = require("path");
const logger = require("morgan");
const helmet = require('helmet');
const session = require('express-session');
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
app.use(session({ secret: 'gh94Pass#1t#1Gh', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/blogs", blogRouter);
app.use("/auth", userRouter);

require('./middlewares/error')(app);
require('./schema/User');
require('./utils/passport')

module.exports = app;