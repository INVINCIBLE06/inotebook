
const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes.controller');
const fetchUser = require('../middlewares/fetch.user');

router.get('/fetchAll', fetchUser.fetchUserDetail, notesController.getAllNotes);

router.post('/AddNote', fetchUser.fetchUserDetail, notesController.AddNewNote);

router.put ('/UpdateNote/:id', fetchUser.fetchUserDetail, notesController.UpdateExistingNote)

router.delete('/deleteNote/:id', fetchUser.fetchUserDetail, notesController.deleteNote)

module.exports = router;