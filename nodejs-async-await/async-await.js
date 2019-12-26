main();

async function main() {
    let one = await functionOne();
    let two = await functionTwo();
    let three = await functionThree();

    console.log(one);
    console.log(two);
    console.log(three);
}

async function functionOne() {
    console.log('=======>>>>', 'functionOne: ms 1000');
    await sleep(1000);
    return 'functionOne';
}

async function functionTwo() {
    console.log('=======>>>>', 'functionTwo: ms 500');
    await sleep(500);
    return 'functionTwo';
}

async function functionThree() {
    console.log('=======>>>>', 'functionThree: ms 250');
    await sleep(250);
    return 'functionThree';
}

function sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
}
