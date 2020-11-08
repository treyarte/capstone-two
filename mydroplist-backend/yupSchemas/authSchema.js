const yup = require('yup');

const login = yup.object().shape({
    email: yup.string().trim().required(),
    password: yup.string().trim().required()
});

const signUp = yup.object().shape({
    email: yup.string().trim().email().required(),
    password: yup.string().trim().required(),
    first_name: yup.string().trim().required(),
    last_name: yup.string().trim().required(),
    department_id: yup.number().integer().positive().min(1),
    role_id: yup.number().integer().positive().min(1),

});

module.exports = {login, signUp}