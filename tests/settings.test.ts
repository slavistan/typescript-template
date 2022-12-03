import { describe, test } from "mocha"
import { expect } from "chai"
import * as Settings from "../src/settings"

describe(`Application settings parser`, () => {
    describe(`accepts valid 'A' setting of value`, () => {
        const settings = [8080, 2248, 2048, 80, 32768, 1234]
        for (const n of settings) {
            test(`n`, () => {
                const env = {
                    [Settings.settingAEnvvar]: String(n)
                }
                const result = Settings.parseApplicationSettings(env)
                expect(result.isOk()).to.be.true
                const have = result._unsafeUnwrap()
                const want: Settings.IApplicationSettings = {
                    paramFoo: n
                }
                expect(have).to.deep.equal(want)
            })
        }
    })

    describe(`rejects invalid setting for A`, () => {
        const settingsA = ["ö", "bacon", "-132", ":123"]
        for (const n of settingsA) {
            test(`n`, () => {
                const env = {
                    [Settings.settingAEnvvar]: n
                }
                const result = Settings.parseApplicationSettings(env)
                expect(result.isErr()).to.be.true
                const have = result._unsafeUnwrapErr()
                expect(have).to.be.instanceOf(Settings.Errors.InvalidEnvvarValue)
                expect((have as Settings.Errors.InvalidEnvvarValue).envvar).to.be.equal(Settings.settingAEnvvar)
                expect((have as Settings.Errors.InvalidEnvvarValue).value).to.be.equal(String(n))
            })
        }
    })
})
