const Notes = require('../model/Noteschema');

const Notecontroller = {
    postNote : async(req,res)=>{
        const {Title, Description}= req.body;
        try{

            const newPost = await Notes.create({Title,Description})
            res.json(newPost);
            console.log('note created successfully');
        }catch(err){
            console.log('error creating note: ' + err.message)
        }
    },
    getAllNote : async(req,res)=>{
        try{
            const note = await Notes.find();
            res.json(note);
        }catch(err){
            console.log('error getting note:'+ err.message)
        }
    },
    getOneNote: async(req,res)=>{
       try{
        const {id} = req.params;
        const note = await Notes.findById(id);
        res.status(200).json(note);

       }catch(error){
        console.log('error getting note:'+ error.message)
       }
    }
}


module.exports = Notecontroller;