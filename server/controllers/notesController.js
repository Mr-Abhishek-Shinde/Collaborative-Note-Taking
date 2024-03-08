// noteController.js
const Note = require('../models/notesModel');

const noteUser = async (req, res) => {
    const { data: { time, blocks, version , email} } = req.body;
    

    try {
        const note = await Note.notes(time, blocks, version, email);
        
        res.status(200).json({ time, blocks, version ,email});
    } catch (err) {
       
        console.log(err.message)
        res.status(400).json({ error: err.message });
    }
};

const uploadNotes = async (req, res) => {
    const { email } = req.body;
    try {
        const uploadnotes = await Note.getNotes(email);
        res.json(uploadnotes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { noteUser , uploadNotes };
