# K6Testing

### Description

An introduction to writing performance tests for Web Api using K6

### Dependencies:

- K6: winget install k6 --source winget
    - K6 can be installed in other ways, see [K6 installation](https://grafana.com/docs/k6/latest/set-up/install-k6/) 

### Run performance tests

- Run the project K6Testing.AppHost. Note the project is setup with .NET Aspire.
- Navigate to K6Testing -> Scripts folder and run `k6 run {script file}`.
- To enable Dashboard on http://localhost:5665/ during running of tests, set the environment variable to true `$env:K6_WEB_DASHBOARD = "true"`. Note that the dashboard is only available while the tests are executing. 
Once the tests have completed, the Dashboard is no longer available.

### Enabling ES6 features and NodeJS node modules resolution

- Navigate to K6Testing -> Scripts -> enable-es6-features-webpack folder and run the tests using `k6 run {script file}`. You will see that the test fails because `Lodash` cannot be resolved.
- Run `npm run bundle` to transpile the project into commonjs (Vanilla javascript - ES5) using webpack.
- The transpiled files will be available in the `dist` folder. You can run the tests using `k6 run dist/{script file}`. The tests should now run successfully with the `Lodash` dependency resolved.

##### Setup

- To enable ES6 features and NodeJS node modules resolution, you need to initialize a NodeJS Project by running `npm init -y`.
and install `npm install` the necessary node modules (see package.json) to transpile the project into commonjs (Vanilla javascript - ES5) using webpack.
- Once the dependencies has been resolve, run `npm run bundle` to transpile the project into commonjs (Vanilla javascript - ES5) using webpack.

### References

- https://grafana.com/docs/k6/latest/set-up/install-k6/
- https://grafana.com/docs/k6/latest/results-output/web-dashboard/
