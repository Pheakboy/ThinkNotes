import mongoose from "mongoose";

// 1 create a schema
// 2 create model base off the schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
