import { options, slash } from "../../../../src/index.js";

/**
 * Typesafe discord.js command framework
 */
export default slash({
    description: "Say Hello to you",
    options: {
        name: options.string({
            description: "Your name",
            choices: {
                hello: { value: "Hello World" },
            },
        }),
        enabled: options.boolean({
            required: true,
            description: "Enabled",
        }),
        number: options.number({
            description: "Example number",
            required: true,
        }),
        user: options.user({
            description: "Ping user",
            required: false,
        }),
    },
    execute: async ({ event, options }) => {
        await event.reply(`Hello World, ${options.name}`);
    },
});
