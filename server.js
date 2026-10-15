const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res) => res.send('<h1>Welcome to Note taking application - Week06 Exercise</h1>'));
app.use(require('./routes/NoteRoutes'));
app.use((req,res) => res.status(404).json({message:'Route not found'}));
app.use((err,req,res,next) => {
 if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(400).json({message:err.message});
 if (err.type === 'entity.parse.failed') return res.status(400).json({message:'Invalid JSON body'});
 if (err.status === 413) return res.status(413).json({message:'Request body too large'});
 console.error(err);
 res.status(500).json({message:'Internal server error'});
});
async function start() {
 const port = process.env.PORT || 8081;
 await mongoose.connect(process.env.DB_URL || 'mongodb://127.0.0.1:27017/notes_app',{serverSelectionTimeoutMS:5000});
 return app.listen(port,() => console.log('Server is listening on port '+port));
}
if (require.main === module) start().catch(err => {console.error('Could not start server:',err.message);process.exitCode=1;});
module.exports = {app,start};
