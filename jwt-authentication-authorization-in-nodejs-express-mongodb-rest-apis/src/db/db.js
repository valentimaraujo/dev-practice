const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URL, {
mongoose.connect('mongodb+srv://new-evodev:ghetto-v5821@evodev-services-ge9wc.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
