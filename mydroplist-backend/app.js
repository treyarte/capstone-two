const express = require('express');
const app = express();
const cors = require('cors');
const ExpressError = require('./helpers/ExpressError');
const {authenticateJWT} = require('./middleware/auth')

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const droplistRoutes = require('./routes/droplists');


app.use(express.json());
//cross site origins
app.use(cors());

//middleware
app.use(authenticateJWT);

app.use('/', authRoutes)
app.use('/users', userRoutes);
app.use('/droplists', droplistRoutes);

/**404 error handler */
app.use( (req, res, next) => {
    const error = new ExpressError("Not Found", 404)

    //passing the error to the next middleware
    return next(error)
});

/**General error handler */
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    console.log(error.stack);

    return res.json({
        status: error.status,
        message: error.message
    });
});


module.exports = app;