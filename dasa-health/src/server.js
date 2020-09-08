const app = require('./app');

const PORT = process.env.PORT || 3000;
const HOST = app.get('env') === 'development' ? 'localhost' : process.env.API_HOST;

app.listen(PORT, HOST, () => console.log(`Server listing in: ${HOST}:${PORT}`));
