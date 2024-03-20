const Notes = require('../model/Noteschema');

const Notecontroller = {
    postNote: async (req, res) => {
        const { Title, Description } = req.body;
        try {

            const newPost = await Notes.create({ Title, Description })
            res.json(newPost);
            console.log('note created successfully');
        } catch (err) {
            console.log('error creating note: ' + err.message)
        }
    },
    getAllNote: async (req, res) => {
        try {
            const note = await Notes.find();
            res.json(note);
        } catch (err) {
            console.log('error getting note:' + err.message)
        }
    },
    getOneNote: async (req, res) => {
        try {
            const { id } = req.params;
            const note = await Notes.findById(id);
            res.status(200).json(note);

        } catch (error) {
            console.log('error getting note:' + error.message)
        }
    },
    updateNote: async (req, res) => {
        const { id } = req.params;
        const { Title, Description } = req.body;
        try {
           
            await Notes.findByIdAndUpdate(id, { Title, Description });
            res.status(200).send({
                message: "Task Updated Successfully"
            })
        } catch (error) {
            return res.status(500).send({
                message: "Oops something went wrong",
            })
        }
    },
    deleteNote: async (req,res) => {
        try {
          const { id } = req.params;
      
          const taskUpdate = {
            deleted: true
          }
      
          const note = await Notes.findByIdAndDelete(id, taskUpdate)
          if(note) {
              return res.status(200).send({
                message: "Task deleted successufly",
              });

          }
          return res.json({
            message: "note not found"
          })
      
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Oops something went wrong' });
        }
      }
}


module.exports = Notecontroller;