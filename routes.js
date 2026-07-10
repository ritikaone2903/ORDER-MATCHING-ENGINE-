//routing 


const express = require('express');
const router = express.Router();

router.get('/',getAllOrders);
router.post('/',createOrder);
router.delete('/:id',cancelOrder);

module.exports = router;
