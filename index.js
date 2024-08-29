const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
// import db from "./config/Database.js";
const db = require("./config/Database");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize");


dotenv.config();


const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db:db 
})

// (async()=>{
//     await db.sync();
// })();

const middlewareUsers = require("./middleware/logs");
const Auth = require("./routes/AuthRoute");
const UserRouter = require("./routes/UserRoute");
const ProductsRouter = require("./routes/ProductRoute");
const ImagesRouter = require("./routes/ImageRoute");
const BannerRouter = require("./routes/BannerRoute");
const BerkinRouter = require("./routes/BerkinRoute");
const BernewsRoute = require("./routes/BernewsRoute");
const DokperRouter = require("./routes/DokperRoute");
const DokperaRouter = require("./routes/DokperaRoute");
const DokpendaRouter = require("./routes/DokpendaRoute");
const DokpenaRouter = require("./routes/DokpenaRoute");
const DokpelaRouter = require("./routes/DokpelaRoute");
const Transpkd = require("./routes/TranspkdRoute");
const Transpad = require("./routes/TranspadRoute");
const DokAnggaran = require("./routes/AnggaranRoute");

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto',
        // expires: new Date(Date.now() + 60 * 60 * 1000), 
    }
}))

app.use(cors({
    credentials: true,
    origin: '*'
}));

app.use(middlewareUsers);
app.use(express.json());
app.use('/assets', express.static('public'));
app.use("/auth", Auth);
app.use("/users", UserRouter);
app.use("/products", ProductsRouter);
app.use("/images", ImagesRouter);
app.use("/banner", BannerRouter);
app.use("/berkin", BerkinRouter);
app.use("/bernews", BernewsRoute);
app.use("/dokper", DokperRouter);
app.use("/dokpera", DokperaRouter);
app.use("/dokpenda", DokpendaRouter);
app.use("/dokpena", DokpenaRouter);
app.use("/dokpela", DokpelaRouter);
app.use("/transpkd", Transpkd);
app.use("/transpad", Transpad);
app.use("/dokanggaran", DokAnggaran);

// store.sync();
 
app.listen(process.env.PORT, () => {
    console.log(`Server sedang berjalan at ${process.env.PORT}`);
});
