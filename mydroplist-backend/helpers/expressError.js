/**
 * Express error extends normal errors and allows us to easily add a status to it.
 */

 class ExpressError extends Error {
     constructor(message, status){
         super();
         this.message = message;
         this.status = status;
        console.error(this.stack)
     }
 }

 module.exports = ExpressError;