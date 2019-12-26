main();

function main() {
    functionOne().then((data) => {
        console.log(data);
        functionTwo();
    });
}

function functionOne() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('functionOne');
        }, 1000);
    })
}

function functionTwo() {
    setTimeout(() => {
        console.log('functionTwo');
    }, 1000);
}
