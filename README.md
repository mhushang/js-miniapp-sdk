# JS MiniApps SDK

JS bridge for iOS/Android platforms which uses Ionic Portals (https://ionic.io/docs/portals)

## Usage

- Install package into project: `yarn add js-miniapp-bridge` or `npm i js-miniapp-bridge`
- Import module in Web project, example: `import { SendMessage } from "js-miniapp-bridge"` (https://github.com/mhushang/js-miniapp-sdk-examples/tree/main/web)
- Available methods: `SendMessage, SubscribeToMessage, UnsubscribeFromMessage, GetInitialContext`

## Examples

- Web: (https://github.com/mhushang/js-miniapp-sdk-examples/tree/main/web)
- React Native (https://github.com/mhushang/js-miniapp-sdk-examples/tree/main/reactNative)

## Available scripts of the library

The project contains the following scripts:

- `dev` - starts dev server
- `build` - generates the following bundles: CommonJS (`.cjs`) ESM (`.mjs`) and IIFE (`.iife.js`). The name of bundle is automatically taked from `package.json` name property
- `test` - starts jest and runs all tests
- `test:coverage` - starts jest and run all tests with code coverage report
- `lint:scripts` - lint `.ts` files with eslint
- `lint:styles` - lint `.css` and `.scss` files with stylelint
- `format:scripts` - format `.ts`, `.html` and `.json` files with prettier
- `format:styles` - format `.cs` and `.scss` files with stylelint
- `format` - format all with prettier and stylelint
- `prepare` - script for setting up husky pre-commit hook
