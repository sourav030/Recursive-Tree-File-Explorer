const mongoose =require('mongoose')

const connetDb=async()=>{
    try{
        mongoose.connect("mongodb://127.0.0.1:27017/fractral");
        console.log("db connected");
    }
    catch(err){
        console.log(err);
    }
}

module.exports=connetDb;