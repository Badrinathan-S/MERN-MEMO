const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res.status(400);

    throw new Error("Please Fill all the fields");
  } else {
    const note = new Note({ user: req.user._id, title, content, category });

    const createNote = await note.save();

    res.status(201).json(createNote);
  }
});

const getNotebtId = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();

    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("note not found");
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    await note.remove();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("note not found");
  }
});

module.exports = { getNotes, createNote, getNotebtId, updateNote, deleteNote };
