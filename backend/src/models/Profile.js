import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    education: String,
    skills: [String],

    projects: [
      {
        title: String,
        description: String,
        links: [String],
        skills: [String]
      }
    ],

    work: [
      {
        company: String,
        role: String,
        duration: String
      }
    ],

    links: {
      github: String,
      linkedin: String,
      portfolio: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", ProfileSchema);
