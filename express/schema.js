const mongoose = require('mongoose');

const TodoDB= new mongoose.Schema({
    task:String,
    done:{
        type:Boolean,
        default:false,
    }
})


const todoModel=mongoose.model("todos",TodoDB);

module.exports=todoModel;