const File = require('../models/File');
const transform = require('../dto/transform');
// Fetch children of a parent folder
exports.getItems = async (req, res) => {
  try {
    const parentId = req.query.parentId || null;
    const items = await File.find({ parentId });
   
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fetching failed",
      error: error.message
    });
  }
};
exports.deletefile = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await File.findByIdAndDelete(id);
    return res.status(202).json({ message: "file Suceesfuly delete" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ messsage: "serverside error" });
  }
}

exports.transform = async (req, res) => {
  try {
    const parentId = req.query.parentId || null;

    const items = await File.find({ parentId });

    const transformedData = transform(items); // your custom logic

    // Update each document instead of deleting
    for (const item of transformedData) {
      await File.updateOne(
        { _id: item._id },  // match existing document
        { $set: { position: item.position } } // update only needed field
      );
    }

    res.status(200).json(transformedData);

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "serverSideError" });
  }
};

exports.addItems = async (req, res) => {
  try {
    console.log(req.body);
    let { name, type, parentId } = req.body;

    
    if (!parentId) {
      parentId = null;
    }

    const item = new File({ name, type, parentId });

    await item.save();

    res.status(201).json({
      success: true,
      data: item
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Adding item failed",
      error: error.message
    });
  }
};

exports.getItemsbyId=async(req,res)=>{
  try{
    const {id}=req.params;
    console.log(id)
    const result=await File.findById(id);
    return res.status(200).json(result)
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"server Side Error"})
  }
}