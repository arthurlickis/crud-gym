require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");
const flash = require("connect-flash");
const csrf = require("csurf");
const { checkCsrf, csrfMiddleare, messagesAndSession } = require("./src/middlewares/middleware");

mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log("Conexão foi");
        app.emit("ready");
    }) .catch(e => console.error(e.message));

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

const sessionOptions = session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(csrf());
app.use(checkCsrf);
app.use(csrfMiddleare);
app.use(messagesAndSession);

app.use(routes);

app.on("ready", () =>{
    app.listen(3000, () => {
        console.log("Servidor no ar, na porta 3000!");
        console.log("Acesse: http://localhost:3000");
    });
});