const { Router } = require('express');
const router = Router();
const { createUser, login, renewToken } = require('../controllers/auth-controller');
const { check } = require('express-validator');
const { validatorFields } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/jwt-validator');


router.post(
    '/register',
    [
        check('name', 'name is needed').not().isEmpty(), // que siempre tenga informacion
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
router.get('/renew', [validateJWT], renewToken);

module.exports = router;
