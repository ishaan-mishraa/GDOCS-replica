const express = require('express');
const router = express.Router();
const Document = require('../models/Document');

// Get document by ID
router.get('/:id', async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id);
    if (document) {
      res.json(document);
    } else {
      res.status(404).send('Document not found');
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Create a new document
router.post('/', async (req, res) => {
  try {
    const newDocument = await Document.create({ content: req.body.content });
    res.status(201).json(newDocument);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update document by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedDocument = await Document.update(
      { content: req.body.content },
      { where: { id: req.params.id }, returning: true }
    );
    res.json(updatedDocument[1][0]); // Returning the updated document
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
