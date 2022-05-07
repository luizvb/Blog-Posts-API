const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

const noModifyReturn = (req, res, next) => res.status(405).send()

router.post('/', postsController.create);
router.get('/', postsController.find);
router.get('/:id', postsController.findById);

router.delete('/:id',noModifyReturn);
router.put('/:id', noModifyReturn);
router.patch('/:id', noModifyReturn);


module.exports = router;
