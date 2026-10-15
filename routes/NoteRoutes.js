const Note = require('../models/NotesModel');
const router = require('express').Router();
const mongoose = require('mongoose');
router.param('noteId', (req,res,next,id) => {
 if (!mongoose.isObjectIdOrHexString(id)) return res.status(400).json({message:'Invalid note ID'});
 next();
});
function content(req,res,next) {
 const value = req.body?.content;
 if (!value || typeof value !== 'object' || Array.isArray(value)) return res.status(400).json({message:'Note content must be an object'});
 for (const field of ['noteTitle','noteDescription','priority']) {
  if (typeof value[field] !== 'string' || !value[field].trim()) return res.status(400).json({message:field+' must be a non-empty string'});
 }
 req.noteContent = Object.fromEntries(['noteTitle','noteDescription','priority'].map(key => [key,value[key]]));
 next();
}
// Create a note; server manages dates. MEDUIM is accepted as spelled in the lab.
router.post('/notes',content,async(req,res) => {
 const note = await Note.create(req.noteContent);
 res.status(201).location('/notes/'+note.id).json(note);
});
// GET and DELETE need no body.
router.get('/notes',async(req,res) => res.json(await Note.find().sort({dateAdded:-1})));
router.get('/notes/:noteId',async(req,res) => {
 const note = await Note.findById(req.params.noteId);
 if (!note) return res.status(404).json({message:'Note not found'});
 res.json(note);
});
router.put('/notes/:noteId',content,async(req,res) => {
 const note = await Note.findByIdAndUpdate(req.params.noteId,{$set:{...req.noteContent,dateUpdated:new Date()}},{new:true,runValidators:true});
 if (!note) return res.status(404).json({message:'Note not found'});
 res.json(note);
});
router.delete('/notes/:noteId',async(req,res) => {
 const note = await Note.findByIdAndDelete(req.params.noteId);
 if (!note) return res.status(404).json({message:'Note not found'});
 res.json({message:'Note deleted successfully',noteId:note.id});
});
module.exports = router;
