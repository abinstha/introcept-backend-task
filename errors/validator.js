const { body, validationResult } = require('express-validator')

// validation rules for user model
const userValidationRules = () => {
    return [
        body('name')
            .isLength({ max: 5 }).withMessage('Name must be less than 5 characters')
            .not().isEmpty().withMessage('Name is required')
            .trim(),
        body('email').not().isEmpty().trim()
            .isEmail().withMessage('Invalid Email Address'),
        body('phone')
            .not().isEmpty().withMessage('Phone number is required')
            .isNumeric().withMessage('Invalid phone number'),
        body('gender').isIn(['Male', 'Female','Others']).withMessage('Invalid Gender'),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    userValidationRules,
    validate,
}