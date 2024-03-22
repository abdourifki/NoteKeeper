const Notecontroller = require("../controllers/Notecontroller");
const Notes = require('../model/Noteschema');

// Mock Notes model
jest.mock('../model/Noteschema', () => ({
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

describe('Notecontroller', () => {
    describe('postNote', () => {
      it('should create a new note', async () => {
        const req = { body: { Title: 'Test Title', Description: 'Test Description' } };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
  
        Notes.create.mockResolvedValueOnce(req.body);
  
        await Notecontroller.postNote(req, res);
  
        expect(Notes.create).toHaveBeenCalledWith({ Title: 'Test Title', Description: 'Test Description' });
        expect(res.json).toHaveBeenCalledWith({
          message: 'note created successfully',
          newPost: req.body,
        });
      });  
    });
  
    describe('getAllNote', () => {
      it('should get all notes', async () => {
        const req = {};
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
  
        const notes = [{ Title: 'Note 1', Description: 'Description 1' }, { Title: 'Note 2', Description: 'Description 2' }];
        Notes.find.mockResolvedValueOnce(notes);
  
        await Notecontroller.getAllNote(req, res);
  
        expect(Notes.find).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({
          message: 'successfully',
          totalItems: notes.length,
          note: notes,
        });
      }); 
    });
   
    describe('updateNote', () => {
        it('should update a note by ID', async () => {
            const req = { params: { id: 'test-id' }, body: { Title: 'Updated Title', Description: 'Updated Description' } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };

            Notes.findByIdAndUpdate.mockResolvedValue(req.body);

            await Notecontroller.updateNote(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Note ID is invalid.",
                
            });
        });
    });

    describe('deleteNote', () => {
        it('should delete a note by ID', async () => {
            const req = { params: { id: 'test-id' } };
            const note = { Title: 'Test Title', Description: 'Test Description' };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };

            Notes.findByIdAndDelete.mockResolvedValue(note);

            await Notecontroller.deleteNote(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Note ID is invalid."
            });
        });
    });
});
