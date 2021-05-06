const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Data base online');

    } catch (error) {
        console.log(error);
        throw new Error('It was not possible to connect to the DB')
    }
};

module.exports = { dbConnection }