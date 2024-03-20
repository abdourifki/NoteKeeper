const express = require('express');
const Notecontroller = require('../controllers/Notecontroller');

const router = express.Router();

router.post('/notes', Notecontroller.postNote);

router.get('/notes', Notecontroller.getAllNote);

router.get('/notes/:id', Notecontroller.getOneNote);

module.exports=  router;