main();

function main() {
    functionOne();
    functionTwo();
}

function functionOne() {
    setTimeout(() => {
        console.log('functionOne');
    }, 3000);
}

function functionTwo() {
    setTimeout(() => {
        console.log('functionTwo');
    }, 1000);
}
