// noteController.js
const Note = require('../models/notesModel');

const noteUser = async (req, res) => {
    const { data: { time, blocks, version } } = req.body;
    

    try {
        const note = await Note.notes(time, blocks, version);
        
        res.status(200).json({ time, blocks, version });
    } catch (err) {
       
        console.log(err.message)
        res.status(400).json({ error: err.message });
    }
};

module.exports = { noteUser };
