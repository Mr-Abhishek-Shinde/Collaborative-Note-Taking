const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blockSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    data: {
        text: {
            type: String
        }
        
    }
});

const noteSchema = new Schema({
    time: {
        type: Number,
        required: true
    },
    blocks: [blockSchema],
    version: {
        type: String,
        required: true
    }
});

noteSchema.statics.notes = async function(time,blocks,version){
    let note = await this.create({time, blocks, version});
    return note;
}
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;