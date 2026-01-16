import React, { useEffect, useState } from "react";
import API from "../api";
import { Mail, GraduationCap, Briefcase, Github, Linkedin, Globe, Sparkles, Code2, FolderGit2 } from "lucide-react";

interface Links {
  github?: string;
  linkedin?: string;
  portfolio?: string;
}

interface Project {
  title: string;
  description: string;
  links?: string[];
  skills?: string[];
}

interface Work {
  company: string;
  role: string;
  duration: string;
}

interface Profile {
  name: string;
  email: string;
  education: string;
  skills: string[];
  projects: Project[];
  work: Work[];
  links: Links;
}

const Home: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/profile")
      .then(res => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-purple-200 text-lg font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <p className="text-white text-lg">Unable to load profile. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Hero Header Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-lg">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                {profile.name}
              </h1>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-purple-200 justify-center md:justify-start group hover:text-white transition-colors">
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <a href={`mailto:${profile.email}`} className="hover:underline">
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-purple-200 justify-center md:justify-start">
                  <GraduationCap className="w-5 h-5" />
                  <span>{profile.education}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-purple-400" />
            Connect With Me
          </h2>
          <div className="flex flex-wrap gap-4">
            {profile.links.github && (
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-4 rounded-xl border border-white/20 hover:border-purple-400 text-white transition-all hover:scale-105 hover:shadow-lg"
              >
                <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="font-medium">GitHub</span>
              </a>
            )}
            {profile.links.linkedin && (
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-blue-500/20 hover:bg-blue-500/30 px-6 py-4 rounded-xl border border-blue-400/30 hover:border-blue-400 text-white transition-all hover:scale-105 hover:shadow-lg"
              >
                <Linkedin className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="font-medium">LinkedIn</span>
              </a>
            )}
            {profile.links.portfolio && (
              <a
                href={profile.links.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-purple-500/20 hover:bg-purple-500/30 px-6 py-4 rounded-xl border border-purple-400/30 hover:border-purple-400 text-white transition-all hover:scale-105 hover:shadow-lg"
              >
                <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="font-medium">Portfolio</span>
              </a>
            )}
          </div>
        </div>

        {/* Skills Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <Code2 className="w-7 h-7 text-purple-400" />
            Skills & Expertise
          </h2>
          <div className="flex flex-wrap gap-3">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 rounded-full text-white font-medium hover:scale-105 transition-transform cursor-default shadow-lg"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Projects Card */}
        {profile.projects && profile.projects.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">
              <FolderGit2 className="w-7 h-7 text-purple-400" />
              Projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {profile.projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all hover:scale-105 hover:shadow-xl group cursor-pointer"
                  onClick={() => {
                    // Open first link in links array (if exists) in a new tab
                    if (project.links && project.links.length > 0) {
                      window.open(project.links[0], "_blank");
                    }
                  }}
                >
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-purple-200 mb-4">{project.description}</p>
                  {project.skills && project.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Work Experience Card */}
        {profile.work && profile.work.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">
              <Briefcase className="w-7 h-7 text-purple-400" />
              Work Experience
            </h2>
            <div className="space-y-6">
              {profile.work.map((job, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all hover:scale-[1.02] group"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {job.role}
                    </h3>
                    <span className="text-sm text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full w-fit">
                      {job.duration}
                    </span>
                  </div>
                  <p className="text-purple-200 font-medium">{job.company}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;