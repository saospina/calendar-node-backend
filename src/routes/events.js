const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { validatorFields } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/jwt-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events-controller');
const { isDate } = require('../helpers/isDate');


/* Esto le aplica el middleware a todos los en
endpoints sin necesidad de aplicarlo uno por uno */
router.use(validateJWT);

router.get('/', getEvents);
router.post(
    '/',
    [
        check('title', 'Title is mandatory').not().isEmpty(), // que siempre tenga informacion
        check('start', 'Start date is mandatory').custom(isDate),
        check('end', 'End date is mandatory').custom(isDate),
        validatorFields
    ],
    createEvent
);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;