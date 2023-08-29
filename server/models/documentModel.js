// Documents Model + Schema
// This file outline the schema & model for written documents/pages being moved through the database.
// ==========================================
const mongoose = require("mongoose");

// Schema for comment data.
const commentSchema = mongoose.Schema({
  id: String,
  dateCreated: {type: Date, immutable: true},
  type: any,
  color: String,
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
  nodeType: String,
  type: String,
  text: String,
  textBlockStyling: [textStylingSchema],
  elements: [elementSchema]
});

// Create a schema object for the structure of data coming in.
const documentSchema = mongoose.Schema({
  dateCreated: {type: Date, immutable: true, required: false},
  dateModified: {type: Date, immutable: false},
  documentName: {type: String, minLength: 1, required: true},
  documentIcon: {type: String, color: String},
  keywords: [String],
  creator: string,
  wordCount: number,
  version: string,
  body: {
    comments: [commentSchema],
    article: {
      id: [String],
      content: {
          elements: [elementSchema]
        }
      }
    }
  });

  // Create model and export it as Document.
module.exports = mongoose.model("documents", documentSchema);