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


noteSchema.statics.createOrUpdateNote = async function(time,blocks,version,email,noteName){
    const note = await this.findOne({noteName});

    if(user){
        note = await this.findOneAndUpdate({ noteName }, { time, blocks, version, email, noteName });
        console.log("Done",note) 
        return note;
    }
    else note = await this.create({time, blocks, version,email,noteName});
    return note;
}

noteSchema.statics.getAllNotesByUser = async function (email) {
    console.log('Email value:', email);
    const users = await this.find(
        { email: { $in: [email] } },
    );


    if (!users || users.length === 0) {
        throw new Error('Incorrect email or user not found!');
    }

    // Extract blocks array from all users
    const blocksArrays = users.map(user => ({ time : user.time, blocks: user.blocks, noteName: user.noteName }));
    console.log(blocksArrays);
    
    return JSON.stringify(blocksArrays);
    

   // return JSON.stringify(blocksArrays);
};

noteSchema.statics.addUserToNote = async function (email, noteName){
    console.log(email , noteName)
    if(!email ){
        throw new Error("Incorrcet email or user not found");
    } 
    if(!noteName) {
        throw new Error("user not found");
    }

    const detail = await this.findOneAndUpdate(
        { noteName }, // Filter criteria
        { $push: { email } }, // Update criteria
        { new: true } // Return the modified document
    );
    console.log("Details " ,detail)
    if(!detail){
        throw new Error("No notes named ")
    }

    return detail;
}

module.exports = mongoose.model('Note', noteSchema);
