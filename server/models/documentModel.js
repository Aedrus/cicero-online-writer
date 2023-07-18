// Documents Model + Schema
// This file outline the schema & model for written documents/pages being moved through the database.
// ==========================================
const mongoose = require("mongoose");

// Schema for comments object.
const commentSchema = mongoose.Schema({
  id: String,
  dateCreated: {type: Date, immutable: true},
  comment: String
});

// Schema for specific, styled text within elements on page.
const textStylingSchema = mongoose.Schema({
  startIndex: Number,
  endIndex: Number,
  styleType: String
})

// Schema for elements on page
const elementSchema = new mongoose.Schema();
elementSchema.add({
  class: [String],
  type: String,
  text: String,
  textBlockStyling: [textStylingSchema],
  elements: [elementSchema]
});

// Create a schema object for the structure of data coming in.
const documentSchema = mongoose.Schema({
  documentName: {type: String, minLength: 1, required: true},
  documentIcon: {type: String, color: String},
  dateCreated: {type: Date, immutable: true, required: false},
  dateModified: {type: Date, immutable: false},
  keywords: [String],
  creator: String,
  wordCount: Number,
  version: String,
  body: {
    comments: [commentSchema],
    mainSection: {
      class: [String],
      content: {
        class: [String],
        elements: [elementSchema]
        }
      }
    }
  });

  // Create model and export it as Document.
module.exports = mongoose.model("documents", documentSchema);