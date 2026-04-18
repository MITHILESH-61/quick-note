const router = require('express').Router();
const { body, param } = require('express-validator');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const ctrl = require('../controllers/notes.controller');

router.use(auth);

router.get('/', ctrl.list);

router.post(
  '/',
  [
    body('title').isString().trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }),
    body('content').optional().isString().isLength({ max: 10000 }),
  ],
  validate,
  ctrl.create
);

router.put(
  '/:id',
  [
    param('id').isMongoId(),
    body('title').optional().isString().trim().notEmpty().isLength({ max: 200 }),
    body('content').optional().isString().isLength({ max: 10000 }),
  ],
  validate,
  ctrl.update
);

router.delete('/:id', [param('id').isMongoId()], validate, ctrl.remove);

module.exports = router;
