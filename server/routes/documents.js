// This is a 'routes' file which contains each type of request for a specific data group or
// directory.
// ============================
// This file is for routing of documents, or the pages the user writes and uploads.
const express = require('express');
const router = express.Router();

const {
  getDocument, 
  getAllDocuments,
  createDocument, 
  deleteDocument,
  deleteManyDocuments,
  updateDocument
} = require('../controllers/documentController');

// ==========================
// CRUD Operations
// ==========================

// Router for CREATE requests.
router.post('/', createDocument);

// Router for GET All requests.
router.get('/', getAllDocuments);

// Router for GET requests.
router.get('/:id', getDocument);

// Router for PUT requests.
router.put('/:id', updateDocument);

// Router for DELETE requests.
router.delete('/:id', deleteDocument);

// Router for DELETE many requests.
router.delete('/', deleteManyDocuments);

module.exports = router;