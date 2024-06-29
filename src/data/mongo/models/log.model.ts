import mongoose from "mongoose";

/* 
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
 */

const logSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  origin: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})


// por defecto mongo le pondra "logs" a la coleccion
export const LogModel = mongoose.model("Log", logSchema)

