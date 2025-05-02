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



### References

- https://grafana.com/docs/k6/latest/set-up/install-k6/
- https://grafana.com/docs/k6/latest/results-output/web-dashboard/
