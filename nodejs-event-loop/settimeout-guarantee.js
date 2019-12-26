const start = process.hrtime();

setTimeout(() => {
  const end = process.hrtime(start);
  console.log(`time callback executed after ${end[0]}s and ${end[1] / Math.pow(10, 9)}ms`)
}, 1000);