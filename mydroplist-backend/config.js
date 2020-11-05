require('dotenv').config();

const SECRET = process.env.SECRET_KEY || 'test';

const PORT = process.env.PORT || 3001;

const BCRYPT_WORK_FACTOR = 12;

let DB_URI;

if(process.env.NODE_ENV === "test"){
    DB_URI = "mydroplist-mobile-test"
} else {
    DB_URI = process.env.DATABASE_URL || "mydroplist-mobile"
}

console.log("using database", DB_URI)

module.exports = {
    SECRET, 
    PORT,
    DB_URI,
    BCRYPT_WORK_FACTOR
}