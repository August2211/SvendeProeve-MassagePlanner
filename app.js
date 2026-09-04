process.loadEnvFile("./.env");

const express = require("express");
const InitSchemas = require("./db/schema.js");
const homeRoutes = require("./routes/homeRoutes.js");
const treatmentRoutes = require("./routes/treatmentRoutes.js");
const bookingRoutes = require('./routes/bookingsRoutes.js')
const bookRoutes = require('./routes/bookRoutes.js')
const availabilityRoutes = require('./routes/availabilityRoutes.js')
const adminRoutes = require('./routes/adminRoutes.js')

const app = express();

const LISTEN_PORT = Number(process.env.PORT) || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use("/", homeRoutes);
app.use("/treatments", treatmentRoutes);
app.use("/bookings", bookingRoutes);
app.use("/book", bookRoutes);
app.use("/availability", availabilityRoutes);
app.use("/admin", adminRoutes);

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