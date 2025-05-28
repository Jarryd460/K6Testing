// We must export the scenarios so that they can be found when running the k6 run command
export { firstScenario } from './scenarios/first-scenario-test.ts';
export { secondScenario } from './scenarios/second-scenario-test.ts';

import { Environment } from './common/Environment.ts';
import { ExecutionType } from './common/ExecutionType.ts';
import { Options } from './common/Options.ts'

let environmentToRun = Environment.DEVELOPMENT; // default

if (__ENV.ENVIRONMENT_TO_RUN) {
	environmentToRun = Environment[__ENV.ENVIRONMENT_TO_RUN.toUpperCase()];
}

const ENVIRONMENT = environmentToRun;

let testsToRun = ExecutionType.SMOKE; // default

if (__ENV.TESTS_TO_RUN) {
	testsToRun = ExecutionType[__ENV.TESTS_TO_RUN.toUpperCase()];
}

const EXECUTIONTYPE = testsToRun;

const DEBUG = true;
const start = Date.now();

export const options = Options;

export function setup() {
    DebugOrLog(`== SETUP BEGIN ===========================================================`)
    // log the date & time start of the test
    DebugOrLog(`Start of test: ${formatDate(new Date())}`)

    // log the test type
    DebugOrLog(`Test executed: ${EXECUTIONTYPE}`)

    // Log the environment
    DebugOrLog(`This test will run on the ${ENVIRONMENT} environment.`)

    DebugOrLog(`== SETUP END =============================================================`)
}

function DebugOrLog(textToLog) {
    if (DEBUG) {
        var millis = Date.now() - start; // we get the ms ellapsed from the start of the test
        var time = Math.floor(millis / 1000); // in seconds
        // console.log(`${time}se: ${textToLog}`); // se = Seconds elapsed
        console.log(`${textToLog}`);
    }
}

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}
