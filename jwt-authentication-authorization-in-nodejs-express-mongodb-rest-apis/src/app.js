const express = require('express');
const userRouter = require('./routers/user');
const port = process.env.PORT;
require('./db/db');

const app = express();

app.use(express.json());
app.use(userRouter)

app.get('/', (req, res) => {
    res.json({
        name: 'JWT AUTHENTICATION AUTHORIZATION IN NODEJS EXPRESS MONGODB REST APIS',
        version: '1.0.0'
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
