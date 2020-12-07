const express = require('express');
const app = express();
const cors = require('cors');
const ExpressError = require('./helpers/ExpressError');
const {authenticateJWT, droplistAccess} = require('./middleware/auth')

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const droplistsRoutes = require('./routes/droplists');
const itemsRoutes = require('./routes/items');

 
app.use(express.json());
//cross site origins
app.use(cors());

//middleware
app.use(authenticateJWT);

app.use('/', authRoutes)
app.use('/users', usersRoutes);
app.use('/droplists', droplistsRoutes);
droplistsRoutes.use('/:id/items', itemsRoutes);

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