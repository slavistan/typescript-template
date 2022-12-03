import * as Settings from "./settings"
import { logger } from "./settings"

const result = Settings.parseApplicationSettings()
if (result.isErr()) {
    Settings.logger.error(result.error.message)
    process.exit(1)
}
const settings = result.value

logger.info("Hello World. Settings:")
logger.info(JSON.stringify(settings, null, 4))
