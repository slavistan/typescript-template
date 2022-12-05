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


# Resources

- [How to use eslint with typescript](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)
- [How to use prettier with eslint](https://www.robinwieruch.de/prettier-eslint/)

# Notes

- axios v1.2.0 is affected by two serious fuckups ([1768](https://github.com/axios/axios/issues/1768), [3219](https://github.com/axios/axios/issues/3219)). We pin axios to v1.1.3 until these issues are resoved.