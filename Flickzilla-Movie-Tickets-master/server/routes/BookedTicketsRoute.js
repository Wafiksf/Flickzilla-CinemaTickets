const express = require('express');
const router = express.Router();
const bookedTicketController = require('../controllers/BookedTicketsController');


router.post('/', bookedTicketController.createBookedTicket);


router.delete('/:id', bookedTicketController.deleteBookedTicket);

router.get('/:userId',bookedTicketController.GetBookedTicketsByUserId);
router.get('/', bookedTicketController.getMostBookedMovie)
router.get('/:userId/check-ticket-count', bookedTicketController.checkUserTicketCount)
module.exports = router;