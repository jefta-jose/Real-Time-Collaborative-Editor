import { Schema, model } from 'mongoose';

// Define schema
const DocumentSchema = new Schema({
  _id: String,
  data: Object,
});

// Create and export the model
export default model('Document', DocumentSchema);
