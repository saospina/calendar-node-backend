const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const indexRoutesAuth = require('./src/routes/auth');
const indexRoutesEvents = require('./src/routes/events');
const { dbConnection } = require('./src/database/config');
const cors = require('cors')




// Create express server
const app = express();

// DB connection
dbConnection();

//CORS
app.use(cors())

//Public directory
app.use(express.static('public'));

// Parse of the body
app.use(express.json());

//ROUTES
//auth
app.use('/api/auth', indexRoutesAuth);
//events all
app.use('/api/events', indexRoutesEvents);


//Listening requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Running on ${PORT} port`);
})
