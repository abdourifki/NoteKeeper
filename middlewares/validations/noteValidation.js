const Joi = require('joi');

// Checking Note ID validation
const noteIdSchema = Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'));

// Validation for creating a new note
const createNoteSchema = Joi.object({
    Title: Joi.string().required(),
    Description: Joi.string().required()
});

// Validation for updating a note
const updateNoteSchema = Joi.object({
    Title: Joi.string(),
    Description: Joi.string()
}).min(1);

module.exports = {
    noteIdSchema,
    createNoteSchema,
    updateNoteSchema
}