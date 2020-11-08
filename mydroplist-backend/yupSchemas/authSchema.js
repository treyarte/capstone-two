const yup = require('yup');

const login = yup.object().shape({
    email: yup.string().trim().required(),
    password: yup.string().trim().required()
});

module.exports = login