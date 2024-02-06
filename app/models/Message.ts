import mongoose from "mongoose";

export interface Messages extends mongoose.Document {
  to: string;
  content: string;
  sender: string;
  timestamp: Date;
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const MessageSchema = new mongoose.Schema<Messages>({
  to: {
    type: String,
    required: [true, "Please provide a valid input."],
  },

  content: {
    type: String,
    required: [true, "Please provide a valid input."],
  },
  sender: {
    type: String,
    required: [true, "Please provide a valid input."],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Message ||
  mongoose.model<Messages>("Message", MessageSchema);
