process.loadEnvFile("./.env");

const app = require("./app");
const InitSchemas = require("./db/schema.js");

const LISTEN_PORT = Number(process.env.PORT) || 3000;

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
