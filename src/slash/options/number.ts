import {
    SlashCommandIntegerOption,
    SlashCommandNumberOption,
} from "discord.js";
import { makeOption, Option } from "../options";
import {
    BaseOptionConfig,
    ChoicesOptionConfig,
    createBuilder,
    AutoCompleteOptionConfig,
    buildChoices,
} from "./base";

export type NumberOptionConfig<Required extends true | false> =
    BaseOptionConfig<Required> &
        ChoicesOptionConfig<number> &
        AutoCompleteOptionConfig & {
            min?: number;
            max?: number;
        };

export function number<Required extends true | false = true>(
    config: NumberOptionConfig<Required>
) {
    return makeOption<number, Required>(config, {
        build(name) {
            return createNumberBuilder(
                new SlashCommandNumberOption(),
                name,
                config
            );
        },
        parse(v) {
            return (v?.value as number) ?? null;
        },
    });
}

export function createNumberBuilder<Required extends boolean>(
    base: SlashCommandIntegerOption | SlashCommandNumberOption,
    name: string,
    config: NumberOptionConfig<Required>
) {
    const builder = createBuilder(base, name, config);
    if (config.min != null) builder.setMinValue(config.min);
    if (config.max != null) builder.setMaxValue(config.max);

    return builder
        .addChoices(...buildChoices(config))
        .setAutocomplete(config.autoComplete != null);
}