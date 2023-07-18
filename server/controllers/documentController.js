// This file sets up the controllers for a router. Controllers are functions that handle
// the actual subroutine of a router.
const express = require('express');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Document = require('../models/documentModel');

// Controller for CREATE request. Creates a new document.
exports.createDocument = asyncHandler(async (req, res, next) => {
  const page = await Document.create(req.body);
  return res.status(200).json({msg: "New document created!"});
});

// Controller for GET request. Reads ALL documents.
exports.getAllDocuments = asyncHandler(async (req, res, next) => {
  const docs = await Document.find({});
  return res.status(200).json(docs);
});

// Controller for GET request. Reads a single document.
exports.getDocument = asyncHandler(async (req, res, next) => {
  // Check for correct id length.
  if (req.params.id.length !== 24) {
    return res.status(404).json({error: "Id length not valid. Please recheck your query."})
  }
  // Find document by an ID.
    const doc = await Document.findById(req.params.id);
  // Send that document back to the user -OR- display it on screen.
  if (doc == null) {
    return res.status(404).json({msg: "Could not find document."})
  }
  else {
    return res.status(200).json(doc);
  }
});

// Controller for PATCH request. Updates/Modifies a section of document.
exports.updateDocument = asyncHandler(async (req, res, next) => {
  // Find matching document and update it with req body.
  await Document.updateOne({_id: req.params.id}, {$set: req.body})

  // Return "document updated" response.
  .then(() => {
    return res.status(200).json({msg: `Document has been updated.`})
  })
  .catch((e) => {msg: e})
})

// Controller for DELETE request. Deletes many documents.
exports.deleteManyDocuments = async (req, res, next) => {
  // Find the documents matching filter and delete them.
  const result = await Document.deleteMany({documentName: req.query.filter})
  // Return deleted document count and filter query.
  return res.status(200).json({msg: `${result.deletedCount} deleted from database with filter ${req.query.filter}.`})
};

// Controller for DELETE request. Deletes a single document.
exports.deleteDocument = async (req, res, next) => {
  // Check for correct id length.
  if (req.params.id.length !== 24) {
    return res.status(404).json({error: "Id length not valid. Please recheck your query."})
  }
  // Find the document requested for deletion and delete it.
  const doc = await Document.findByIdAndDelete(req.params.id);
  // Return deleted document.
  return res.status(200).json({msg: `Document with ID of ${req.params.id} was deleted from database.`});
};
