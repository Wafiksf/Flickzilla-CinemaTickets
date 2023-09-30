const { Router } = require('express');
const { sendContactEmail } = require('../controllers/ContactController');

const router = Router();

router.post('/contacts/save', sendContactEmail);

module.exports = router;