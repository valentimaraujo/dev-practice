// Used to watch amount of Promises executing in a single moment of time
let counter = 0;
let interval;

// Overall amount of operations
const numberOfOperations = 25;
// Arguments per operation
const listOfArguments = [];
// Delay per operation to fake async request
const listOfDelays = [];

// Fill delays in order to use the same array between all invocations
// Single delay is a value in milliseconds from 1000 to 10000
for (let i = 0; i < numberOfOperations; i++) {
    listOfArguments.push(i);
    listOfDelays.push(Math.ceil(Math.random() * 9) * 1000);
}

// Fake async: resolve an array through arbitrary delay
// Increase a counter in order to watch amount og Pomise executed
const asyncOperation = index => {
    counter++;
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('Operation performed:', index);
            counter--;
            resolve(index);
        }, listOfDelays[index]);
    })
}

//Helper function to see the amount of running Promise each second
const watchCounter = () => {
    console.log('Promise running in the beginning:', counter);

    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(() => console.log('Promise running:', counter), 1000);
};

async function take0() {
    // Harvesting
    const results = [];

    for (const argument of listOfArguments) {
        const index = await asyncOperation(argument);
        results.push(index);
    }

    return results;
}

async function take1() {
    // Running Promises in parallel
    const listOfPromises = listOfArguments.map(asyncOperation);

    // Harvesting
    const results = [];

    for (const promise of listOfPromises) {
        const index = await promise;
        results.push(index);
    }

    return results;
}

async function take2() {
    // Running Promises in parallel
    const listOfPromises = listOfArguments.map(asyncOperation);
    // Harvesting
    return await Promise.all(listOfPromises);
}

async function take3subtake0() {
    const concurrencyLimit = 5;
    let results = [];
    const batchesCount = Math.ceil(numberOfOperations / concurrencyLimit);

    // Running Promises in parallel in batches
    for (let i = 0; i < batchesCount; i++) {
        const batchStart = i * concurrencyLimit;
        const batchArguments = listOfArguments.slice(batchStart, batchStart + concurrencyLimit);
        const batchPromise = batchArguments.map(asyncOperation);

        // Harvesting
        const batchResults = await Promise.all(batchPromise);
        results = results.concat(batchResults);
        console.log('=====>>>', 'TAKE3SUBTAKE0\n');
    }

    return results;
}

async function take3subtake1part0() {
    const concurrencyLimit = 5;
    const argsCopy = listOfArguments.slice();
    const promises = new Array(concurrencyLimit).fill(Promise.resolve());

    // Recursively chain the next Promise to the currently executed Promise
    function chainNext(p) {
        if (argsCopy.length) {
            const arg = argsCopy.shift();
            return p.then(() => {
                const operationPromise = asyncOperation(arg);
                return chainNext(operationPromise);
            })
        }
        return p;
    }

    await Promise.all(promises.map(chainNext));
}

async function take3subtake1part1() {
    const concurrencyLimit = 5;
    // Enhance arguments array to have an index of the argument at hand
    const argsCopy = [].concat(listOfArguments.map((val, ind) => ({val, ind})));
    const result = new Array(listOfArguments.length);
    const promises = new Array(concurrencyLimit).fill(Promise.resolve());

    // Recursively chain the next Promise to the currently executed Promise
    function chainNext(p) {
        if (argsCopy.length) {
            const arg = argsCopy.shift();
            return p.then(() => {
                // Store the result into the array upon Promise completion
                const operationPromise = asyncOperation(arg.val).then(r => {
                    result[arg.ind] = r;
                });
                return chainNext(operationPromise);
            });
        }
        return p;
    }

    await Promise.all(promises.map(chainNext));
    return result;
}


// take2();
// take3subtake0();
// take3subtake1part0();
take3subtake1part1();
