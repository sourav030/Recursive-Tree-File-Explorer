const mongoose =require('mongoose')

const connetDb=async()=>{
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("db connected");
    }
    catch(err){
        console.log(err);
    }
}

module.exports=connetDb;