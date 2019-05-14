# ME:NEW API

## Documentation

You can find the API Documentation at the following link.

- https://github.com/hackvengers/menew-api/wiki/API-Documentation

## Dependency

ME:NEW API has the dependencies for the following libraries:

| Node.js | MongoDB |
| ------- | ------- |
| 12.2.0+ | 4.0.9+  |

## How to start developing ME:NEW API?

For anyone interested in developing ME:NEW API, follow the instructions below.

### Development Environment

Clone the ME:NEW API repository install the dependency modules.

#### 1. Clone the repository

```bash
# Clone the repository.
$ git clone https://github.com/hackvengers/menew-api.git
```

#### 2. Install dependencies

`npm` and `Yarn` are supported.

```bash
# Install the dependency modules.
$ npm install

# or
$ yarn
```

#### 3. Set environment variables

Copy the `.env.example` file and rename it to `.env`

And set the `X_NCP_APIGW_API_KEY_ID`, `X_NCP_APIGW_API_KEY`, `OCP_APIM_SUBSCRIPTION_KEY` and `MONGO_URI` variable.

#### 4. Run server

Use npm script to run ME:NEW API server.

```bash
# Run server listening on port 8000.
$ npm start
```

## License

ME:NEW API is licensed under the [MIT license](LICENSE).
