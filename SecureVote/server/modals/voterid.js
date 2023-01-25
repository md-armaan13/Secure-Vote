const mongoose = require('mongoose');

const voterIdSchema= new  mongoose.Schema({
    address :{
        type : String,

    },
    id_number : {
        type : String
    } ,
    age :{
        type : String 
    },
    fathers_name : {
        type : String
    },
    gender : {
        type : String
    } ,
    house_name :{
        type : String
    }  ,
    name_on_card : {
        type : String
    } ,
    pincode : {
        type : String
    } ,
    state : {
        type : String
    } ,
},{
    timestamps: true
});

const Voter = mongoose.model('voterId',voterIdSchema);

module.exports= Voter;