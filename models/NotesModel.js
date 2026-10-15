const mongoose = require('mongoose');
const schema = new mongoose.Schema({
 noteTitle: {type: String, required: true, trim: true},
 noteDescription: {type: String, required: true, trim: true},
 priority: {type: String, required: true, enum: ['HIGH','LOW','MEDIUM','MEDUIM']},
 dateAdded: {type: Date, default: Date.now, immutable: true},
 dateUpdated: {type: Date, default: Date.now}
}, {versionKey: false});
module.exports = mongoose.model('Note', schema);
