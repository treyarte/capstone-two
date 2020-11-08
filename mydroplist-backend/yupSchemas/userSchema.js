const yup = require('yup');

const options = {
    message: 'password must contain a capital letter and must be a combination of letters and numbers'
}


const update = yup.object().shape({
    email: yup.string().trim().email().required(),
    password: yup.string().trim().min(8).matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        options
        ).required(),
    first_name: yup.string().trim().required(),
    last_name: yup.string().trim().required(),
    department_id: yup.number().integer().positive().min(1).required(),
    role_id: yup.number().integer().positive().min(1).required(),
})

module.exports = {update}