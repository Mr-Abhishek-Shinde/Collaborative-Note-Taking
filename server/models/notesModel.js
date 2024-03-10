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
        type: Array,
        required : true
    },
    name : {
        type : String,
        required : false
    }
   
});


noteSchema.statics.notes = async function(time,blocks,version,email){

    let note = await this.create({time, blocks, version,email});
    return note;
}

noteSchema.statics.getNotes = async function (email) {
    console.log('Email value:', email);
    const users = await this.find({ email });

    if (!users || users.length === 0) {
        throw new Error('Incorrect email or user not found!');
    }

    // Extract blocks array from all users
    const blocksArrays = users.map(user => user.blocks);
    console.log(blocksArrays);

    return JSON.stringify(blocksArrays);
};

noteSchema.statics.addUser = async function (email_id, nameid){
    console.log(email , nameid)
    if(!email || !nameid){
        throw new Error("Incorrcet email or user not found");
    } 

    const detail = await this.findOne({ nameid });
    if(!detail){
        throw new Error("No notes named ")
    }

    console.log(detail)


}


const Note = mongoose.model('Note', noteSchema);

module.exports = Note;