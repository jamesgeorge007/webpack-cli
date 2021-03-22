/* eslint-disable node/no-unpublished-require */
const tests = [require('./missing-packages.test.js'), require('./missing-command-packages.test.js')];

(async () => {
    let isAllPassed = true;
    let isPass = true;
    let pkg = null;
    for await (const test of tests) {
        for (const package of test.packages) {
            pkg = package;
            console.log(`RUN  ${pkg}`);
            for await (const testCase of test.run) {
                isPass = isPass && (await testCase(pkg));
            }
        }
    }
    console.log(isPass);
    if (!isPass) {
        console.log(`FAIL  ${pkg}`);
        isAllPassed = false;
    } else {
        console.log(`PASS  ${pkg}`);
    }

    if (!isAllPassed) {
        process.exit(2);
    }
    process.exit(0);
})();
