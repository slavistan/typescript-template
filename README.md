# A Typescript Project Template

- *mocha* w/ *chai* as test framework
- *eslint* and *prettier* for linting
- exports project version to *./src/version.ts* during `npm run build`.

  ```ts
  import { LIB_VERSION } from "./src/version"
  ```

- format-on-save @ vscode
- neverthrow
- scaffolding for unified configuration parsing (environment variables, commandline arguments and configuration file) in *./src/settings*; todo
- unified logging configuration; todo
