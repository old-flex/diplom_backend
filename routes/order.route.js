const Router = require('express');
const router = new Router();
const orderController = require('../controller/order.controller')

router.post('/findOrderByCredentials', orderController.findOrderByCredentials)
router.get('/health', orderController.health)


module.exports = router;
