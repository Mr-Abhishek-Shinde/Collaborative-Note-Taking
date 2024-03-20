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
    noteName : {
        type : String,
        required : true
    }
   
});


noteSchema.statics.notes = async function(time,blocks,version,email,noteName){

    let note = await this.create({time, blocks, version,email,noteName});
    return note;
}

noteSchema.statics.getNotes = async function (email) {
    console.log('Email value:', email);
    const users = await this.find(
        { email: { $in: [email] } },
    
    );


    if (!users || users.length === 0) {
        throw new Error('Incorrect email or user not found!');
    }

    // Extract blocks array from all users
    const blocksArrays = users.map(user => user.blocks);
    console.log(blocksArrays);

    return JSON.stringify(blocksArrays);
};

noteSchema.statics.addUser = async function (email, name){
    console.log(email , name)
    if(!email ){
        throw new Error("Incorrcet email or user not found");
    } 

    const detail = await this.findOneAndUpdate(
        { name }, // Filter criteria
        { $push: { email } }, // Update criteria
        { new: true } // Return the modified document
    );
    console.log("Details " ,detail)
    if(!detail){
        throw new Error("No notes named ")
    }

    return detail;


}


const Note = mongoose.model('Note', noteSchema);

module.exports = Note;