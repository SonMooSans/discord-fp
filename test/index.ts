import { Client, GatewayIntentBits } from "discord.js";
import { start } from "../src/index.js";
import { join } from "path";
import * as dotenv from "dotenv";
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);

    start(client, {
        dir: [join(__dirname, "commands"), join(__dirname, "menu")],
    });
});

client.login(process.env["TOKEN"]);
