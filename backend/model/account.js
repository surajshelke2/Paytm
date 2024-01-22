const mongoose = require('mongoose')


const accountSchema = mongoose.Schema({
   
    userId :{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true  //this means that the field cannot be null or undefined

    },
    balance :{
        type: Number,
        required: true
    },

   

})

const Account = mongoose.model('account',accountSchema);

module.exports =Account;