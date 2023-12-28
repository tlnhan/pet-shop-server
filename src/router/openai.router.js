const express = require('express');

const router = express.Router();

const openaiController = require('../controller/openai.controller');

router.post('/api/openai', openaiController.ChatOpenAi);

module.exports = router;