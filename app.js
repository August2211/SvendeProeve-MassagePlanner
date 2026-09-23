const express = require("express");
const session = require("express-session");
const helmet = require("helmet");

const requireAuth = require("./middleware/requireAuth");

const HomeRoutes = require("./routes/homeRoutes.js");
const TreatmentRoutes = require("./routes/treatmentRoutes.js");
const BookingRoutes = require('./routes/bookingsRoutes.js')
const BookRoutes = require('./routes/bookRoutes.js')
const AvailabilityRoutes = require('./routes/availabilityRoutes.js')
const AdminRoutes = require('./routes/adminRoutes.js')
const AuthRoutes = require('./routes/authRoutes.js')


const app = express();

app.set("trust proxy", "loopback");
app.use(session({
    name: "massageplanner.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 8
    }
}));

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
    res.locals.loggedIn = req.session.userId;
    next();
});

app.set("view engine", "ejs");

app.use("/", HomeRoutes);
app.use("/treatments", TreatmentRoutes);
app.use("/bookings", BookingRoutes);
app.use("/book", BookRoutes);
app.use("/availability", AvailabilityRoutes);
app.use("/admin", requireAuth, AdminRoutes);
app.use("/auth", AuthRoutes);

module.exports = app;