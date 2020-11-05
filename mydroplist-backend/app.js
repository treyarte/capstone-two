const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json);
//cross site origins
app.use(cors());

/**404 error handler */
app.use( (req, res, next) => {
    const error = new Error("NOT FOUND");
    error.status = 404;

    //passing the error to the next middleware
    return next(error)
});

/**General error handler */
app.use((error, req, res, next) => {
    if(error.stack) console.log(error.stack);

    res.status(error.status || 500);

    return res.json({
        error: error,
        message: error.message
    });
});


module.exports = app;