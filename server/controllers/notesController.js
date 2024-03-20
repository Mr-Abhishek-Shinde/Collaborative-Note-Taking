// noteController.js
const Note = require('../models/notesModel');

const noteUser = async (req, res) => {
    const { data: { time, blocks, version , email , noteName} } = req.body;
    

    try {
        const note = await Note.notes(time, blocks, version, email, noteName);
        
        res.status(200).json({ time, blocks, version ,email, noteName});
    } catch (err) {
       
      console.log("HERE")
        console.log(err.message)
        res.status(400).json({ error: err.message });
    }
};

const uploadNotes = async (req, res) => {
    const { email } = req.query;
  
    try {
      const uploadnotes = await Note.getNotes(email);
      console.log("here")
      console.log(uploadnotes)
      res.json({ uploadnotes });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    } finally {
      res.end();
    }
  };
  

  // notesController.js
const addUser = async (req, res) => { 
  const { email, name } = req.body; 

  console.log(email, name);
  try {
    const detail = await Note.addUser(email, name);
    res.status(200).json({ email, name });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { noteUser, uploadNotes, addUser };


module.exports = { noteUser , uploadNotes, addUser };
