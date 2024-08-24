const Document = require('../models/Document');

exports.createDocument = async (req, res) => {
  try {
    const newDoc = await Document.create({ content: req.body.content });
    res.json(newDoc);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.getDocument = async (req, res) => {
  try {
    const doc = await Document.findByPk(req.params.id);
    res.json(doc);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const doc = await Document.findByPk(req.params.id);
    doc.content = req.body.content;
    await doc.save();
    res.json(doc);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
