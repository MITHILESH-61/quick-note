const Note = require('../models/Note');

exports.list = async (req, res, next) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { title, content = '' } = req.body;
    const note = await Note.create({ title, content, userId: req.user.id });
    res.status(201).json(note);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
