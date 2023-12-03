import mongoose, { Schema } from "mongoose";
import { ServerVocab } from "../ServerVocab";

const ServerVocabSchema = new Schema<ServerVocab>({
  _id: {
    type: String,
    required: true,
  },
  english: {
    type: String,
    required: true,
  },
  romanji: {
    type: String,
    required: true,
  },
  japanese: {
    type: String,
    required: true,
  },
  results: {
    type: [Boolean],
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  lastSeen: {
    type: Number,
    required: true,
  },
});

const ServerVocabModel =
  mongoose.models.Vocab || mongoose.model("Vocab", ServerVocabSchema);

export default ServerVocabModel;
