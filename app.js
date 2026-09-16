process.loadEnvFile("./.env");

const express = require("express");
const InitSchemas = require("./db/schema.js");
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

const LISTEN_PORT = Number(process.env.PORT) || 3000;

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use("/", HomeRoutes);
app.use("/treatments", TreatmentRoutes);
app.use("/bookings", BookingRoutes);
app.use("/book", BookRoutes);
app.use("/availability", AvailabilityRoutes);
app.use("/admin", requireAuth, AdminRoutes);
app.use("/auth", AuthRoutes);

async function StartApplication() {
    try {
        await InitSchemas();

        app.listen(LISTEN_PORT, () => {
            console.log(`Server running on http://localhost:${LISTEN_PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start Massage Planner:");
        console.error(error);
        process.exit(1);
    }
}

StartApplication();