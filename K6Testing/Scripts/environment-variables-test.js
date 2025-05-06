import http from 'k6/http';
import { sleep } from 'k6';
import exec from 'k6/execution';

export const options = {
    vus: 5,
    duration: '10s',
}

export default function () {
    // You can set the below environment variable by setting it in Windows System Environment Variables (doesn't work for k6 cloud for security reasons) or
    // by running k6 run -e ENVVARIABLE={value} {script name} or k6 run --env ENVVARIABLE={value} {script name}
    console.log(`${__ENV.ENVVARIABLE}`);

    console.log(`Execution context

        Instance info
        -------------
        Vus active: ${exec.instance.vusActive}
        Iterations completed: ${exec.instance.iterationsCompleted}
        Iterations interrupted:  ${exec.instance.iterationsInterrupted}
        Iterations completed:  ${exec.instance.iterationsCompleted}
        Iterations active:  ${exec.instance.vusActive}
        Initialized vus:  ${exec.instance.vusInitialized}
        Time passed from start of run(ms):  ${exec.instance.currentTestRunDuration}

        Scenario info
        -------------
        Name of the running scenario: ${exec.scenario.name}
        Executor type: ${exec.scenario.executor}
        Scenario start timestamp: ${exec.scenario.startTime}
        Percenatage complete: ${exec.scenario.progress}
        Iteration in instance: ${exec.scenario.iterationInInstance}
        Iteration in test: ${exec.scenario.iterationInTest}

        Test info
        ---------
        All test options: ${exec.test.options}

        VU info
        -------
        Iteration id: ${exec.vu.iterationInInstance}
        Iteration in scenario: ${exec.vu.iterationInScenario}
        VU ID in instance: ${exec.vu.idInInstance}
        VU ID in test: ${exec.vu.idInTest}
        VU tags: ${exec.vu.tags}`);

    http.get('https://localhost:7140/string/reverse?input=hello');
    sleep(1);
}