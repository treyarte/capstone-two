const yup = require('yup');

const item = yup.object().shape({
    steel_name: yup.string().trim().lowercase().required(),
    row_letter: yup.string().trim().lowercase().oneOf(['a', 'b', 'c']).required(),
    column_number: yup.number().typeError("column_number must be a number").min(1).positive("column_number must be greater than 0").integer().required(),
    description: yup.string().optional()
});

module.exports = {item};