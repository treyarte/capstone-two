/**
 * Express error extends normal errors and allows us to easily add a status to it.
 * name change
 */

 class ExpressError extends Error {
     constructor(message, status){
         super();
         this.message = message;
         this.status = status;
        console.error(this.stack)
     }

     static badRequest(msg){
         console.log(msg);
         return new ExpressError(msg, 400);
     }
 }

 module.exports = ExpressError;