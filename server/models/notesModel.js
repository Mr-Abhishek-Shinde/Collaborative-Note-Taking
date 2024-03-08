const User = require('../models/userModel');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const noteSchema = new Schema({
    time: {
        type: Number,
        required: true
    },
    blocks:{
        type : Array,
        required : true
    },
    version: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required : true
    }
   
});


noteSchema.statics.notes = async function(time,blocks,version,email){

    let note = await this.create({time, blocks, version,email});
    return note;
}

noteSchema.statics.getNotes = async function(email){
    const user = await this.findOne({ email });
    console.log(user)
    if(!user){
        throw Error('Incorrect email!');
    }

    return user.blocks;
}

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;