const { Router } = require('express');
const router = Router();
const { createUser, login, renewToken } = require('../controllers/auth-controller');
const { check } = require('express-validator');
const { validatorFields } = require('../middlewares/fields-validator');


router.post(
    '/register',
    [
        check('name', 'name is needed').not().isEmpty(),
        check('email', 'email is needed').isEmail(),
        check('password', 'password needs more than 3 characters').isLength({ min: 3 }),
        validatorFields
    ],
    createUser
);
router.post(
    '/',
    [
        check('email', 'email is needed').isEmail(),
        check('password', 'password needs more than 3 characters').isLength({ min: 3 }),
        validatorFields
    ],
    login
);
router.get('/renew', renewToken);

module.exports = router;
