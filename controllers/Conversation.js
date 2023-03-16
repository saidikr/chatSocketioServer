const Conversation=require("../models/Conversation")



exports.createConversation= async (req,res)=>{
    const receiverId=req.body.receiverId
    const senderId=req.body.senderId
    const newConversation= new Conversation({
        members:[senderId , receiverId],
    });     
    try{
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    }
    catch(err){
        res.status(500).json(err)
    }
}       


exports.getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
        members: { $in:[req.params.userId]}
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).send(err.message);
  }
};