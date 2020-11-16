const yup = require('yup');

const droplist = yup.object().shape({
    description: yup.string().required(),
    department_id: yup.number().integer().positive().min(1).required()
});

module.exports = {droplist}