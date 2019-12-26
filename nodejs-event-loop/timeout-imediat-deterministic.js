const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('limite time');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});