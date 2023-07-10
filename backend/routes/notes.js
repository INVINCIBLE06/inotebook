
const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes.controller');
const fetchUser = require('../middlewares/fetch.user');

router.get('/fetchAll', fetchUser.fetchUserDetail, notesController.getAllNotes);

module.exports = router;