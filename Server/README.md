## Dependencies

- Node js v12.18.3
- yarn 1.22.4 (package manager)
- [sqlite3][sqlite3]

## Environment Variables

This project uses the [config][config-package-page] package.

If you want to set environment variables, you can do any of the following:

PORT: process.env.PORT  = 4000


## Adobe PDF credentials

For establish the adobe pdf tools api credentials you need stablish two files in `src/adobe-credentials` folder:

- The `pdftools-api-credentials.json` file. By default is:

```
{
	"client_credentials": {
		"client_id": "2df1b7aa550d44f98ca1d9c773c15820",
		"client_secret": "f43c5303-758c-48b1-afe6-c4057913095d"
	},
	"service_account_credentials": {
		"organization_id": "1CAC3D6B602E11360A495FFA@AdobeOrg",
		"account_id": "18AA5E8F602E117D0A495FC5@techacct.adobe.com",
		"private_key_file": "./private.key"
	}
}

```

- The `private.key` file. A default file is provided in `src/adobe-credentials` folder.


## Production deploy

- Install yarn package manager

```bash
npm -g install yarn
```

- Install libaries: Execute in root folder:

```bash
yarn install
```

- Build project

```bash
yarn run build
```

- Execute project in production mode

```bash
yarn run production
```

## Development deploy

- Install yarn package manager

```bash
npm -g install yarn
```

- Install libaries: Execute in root folder:

```bash
yarn install
```

- Execute project in production mode

```bash
yarn run start
```

## Linting

```bash
yarn run lint
```

<!-- Libraries -->
[config-package-page]: https://www.npmjs.com/package/config
[sqlite3]: https://www.npmjs.com/package/sqlite3
