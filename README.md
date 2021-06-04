# Ctas
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Setup
- Unzip datasets.7z in backend/cwi_module into folder backend/cwi_module/datasets 
- Install node packages using `yarn install`
- Create MongoDB atlas cluster with a database named ctasDB - see backend/app.js
- Create a RSA key

- Create .env file with the following attributes: <br/>
MONGO_ATLAS_NAME = username <br/>
MONGO_ATLAS_PW = password <br/>
JWT_KEY = {
	'PRIVATE_KEY': private key,
	'PUBLIC_KEY': public key
}

- Run `ng build` to build the project

## Start
Run `nodemon ./backend/server.js` to launch the backend server and `ng serve` to launch angular

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
