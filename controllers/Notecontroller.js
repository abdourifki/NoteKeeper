const Notes = require('../model/Noteschema');
const {
    noteIdSchema,
    createNoteSchema,
    updateNoteSchema
} = require('../middlewares/validations/noteValidation');

const Notecontroller = {
    postNote: async (req, res) => {

        const { error } = createNoteSchema.validate(req.body);

        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            })
        }

        const { Title, Description } = req.body;

        try {

            const newPost = await Notes.create({ Title, Description })
            res.json({
                message: "note created",
                newPost
            });
            
        } catch (err) {
        
            res.status(500).json({
                message:
                    err.message || "Some error occurred while creating notes."
            })
        }
    },
    getAllNote: async (req, res) => {
        try {
            const note = await Notes.find();
            res.json({
                message: "successfully",
                totalItems: note.length,
                note
            });
        } catch (err) {
            
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving notes."
            })
        }
    },
    getOneNote: async (req, res) => {

        const { error: idError } = noteIdSchema.validate(req.params.id)

        if (idError) {
            return res.status(400).json({
                message: "Note ID is invalid."
            })
        }

        try {
            const { id } = req.params;
            const note = await Notes.findById(id);
            res.status(200).json({
                message: "Item found successfully.",
                note
            });

        } catch (error) {
            res.status(500).json({
                message:
                    error.message || "Some error occurred while getting note."
            })
        }
    },
    updateNote: async (req, res) => {

        const { error: idError } = noteIdSchema.validate(req.params.id);

        if (idError) {
            return res.status(400).json({ message: "Note ID is invalid." })
        }

        const { error: dataError } = updateNoteSchema.validate(req.body, { abortEarly: false });

        if (dataError) {
            const errorMessage = dataError.details.map(detail => detail.message)
            return res.status(400).json({ message: errorMessage });
        }

        const { id } = req.params;
        const { Title, Description } = req.body;

        try {

            const note = await Notes.findByIdAndUpdate(id, { Title, Description });
            res.status(200).json({
                message: "note updated successfully.",
                
            })
        } catch (error) {
            return res.status(500).json({
                message: "Error updating note",
                error: error.message
            })
        }
    },
    deleteNote: async (req, res) => {

        const { error: idError } = noteIdSchema.validate(req.params.id);

        if (idError) {
            return res.status(400).json({ message: "Note ID is invalid." })
        }

        try {
            const { id } = req.params;

            const taskUpdate = {
                deleted: true
            }

            const note = await Notes.findByIdAndDelete(id, taskUpdate)
            if (note) {
                return res.status(200).json({
                    message: `note "${note.Title}" deleted successfully!`
                });

            }
            return res.json({
                message: "note not found"
            })

        } catch (error) {
            res.status(500).json({
                message: `Something went wrong`,
                error: error.message
            });
        }
    }
}


module.exports = Notecontroller;