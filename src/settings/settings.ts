import fs from "fs"
import { ok, err, Result } from "neverthrow"
import * as Utility from "../utility"
import { createLogger, transports, format } from "winston"
import * as errors from "./errors"

/* Export names of envvars for testing purposes. */
export const settingAEnvvar = "SETTING_A"

/* Initialize project-wide logger. */
export const logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
        format.timestamp(),
        format.printf(({ level, message }) => {
            return `[local-module] ${level.slice(0, 4)}: ${message as string}`
        })
    )
})

export interface IApplicationSettings {
    paramFoo: number
}

export function parseApplicationSettings(env = process.env): Result<IApplicationSettings, errors.MissingEnvvar | errors.InvalidEnvvarValue | Error> {
    /* Merge environment with .env file, if provided. Existing envvars are
     * not overwritten by the contents of the .env file. */
    if (fs.existsSync(".env")) {
        const parseRes = Utility.parseKeyValueFile(".env")
        if (parseRes.isErr()) {
            return err(parseRes.error)
        }
        env = { ...parseRes.value, ...env }
    }

    if (env[settingAEnvvar] == undefined) {
        return err(new errors.MissingEnvvar(settingAEnvvar))
    }
    const settingA = Number(env[settingAEnvvar])
    if (isNaN(settingA) || settingA < 0) {
        return err(new errors.InvalidEnvvarValue(settingAEnvvar, env[settingAEnvvar], "Must be ≥0."))
    }

    const result: IApplicationSettings = {
        paramFoo: settingA
    }
    return ok(result)
}
