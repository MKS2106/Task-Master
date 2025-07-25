import mongoose, { Schema } from "mongoose";

// This is the model you will be modifying
const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
  type: Schema.Types.ObjectId,
  ref: 'User',
  required: true,
},
 task: [{
  type: Schema.Types.ObjectId,
  ref: 'Task',
 
}],

});

const Project = mongoose.model("Project", projectSchema);

export default Project;
