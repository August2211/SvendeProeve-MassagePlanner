process.loadEnvFile("./.env");
const DB = require("../db/database");
const InitSchemas = require("../db/schema.js");
const argon2 = require("argon2");
const readline = require('node:readline/promises');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function main() {
    try {
        const username = (await rl.question("Brugernavn: ")).trim();
        const password = await rl.question("Adgangskode: ");

        if (username.length == 0 || password.length == 0) {
            console.error("Brugernavn og adgangskode påkrævet.");
            return;
        }

        const passwordHash = await argon2.hash(password);

        await InitSchemas();
        const result = await DB.execute("INSERT INTO users (username, password_hash) VALUES (?, ?);", [username, passwordHash])

        console.log("Oprettet!")
    }
    catch (error) {
        console.error(`Failed to hash password: ${error}`);
    }

    rl.close();
    await DB.end();
}

main();