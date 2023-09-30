const { Router } = require('express');
const { getAllFeedbacks,submitFeedback,deleteFeedback,updateSliderStatus } = require('../controllers/FeedbackController');

const router = Router();

router.get('/feedbacks', getAllFeedbacks);
router.post('/feedbacks/save', submitFeedback);
router.delete('/feedbacks/:id', deleteFeedback);
router.put('/feedbacks/:id', updateSliderStatus);



module.exports = router;