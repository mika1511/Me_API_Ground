import React, { useEffect, useState } from "react";
import API from "../Api";
import { Code2, Sparkles, TrendingUp, Award, Zap } from "lucide-react";

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/skills/top")
      .then(res => {
        setSkills(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const fetchProjectsBySkill = async (skill: string) => {
    try {
      setSelectedSkill(skill);
      const res = await API.get(`/projects?skill=${skill}`);
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getSkillIcon = (index: number) => {
    const icons = [Award, Zap, TrendingUp, Code2, Sparkles];
    return icons[index % icons.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
            <h1 className="text-4xl font-bold text-white">Skills</h1>
          </div>
          <p className="text-purple-200 text-sm">
            Click a skill to view related projects
          </p>
        </div>

        {/* Skills Grid (compact) */}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all ${selectedSkill ? "mb-10" : "mb-16"
            }`}
        >
          {skills.map((skill, index) => {
            const Icon = getSkillIcon(index);
            const isActive = selectedSkill === skill;

            return (
              <div
                key={skill}
                onClick={() => fetchProjectsBySkill(skill)}
                className={`cursor-pointer bg-white/10 rounded-xl p-4 border transition-all
                  ${isActive
                    ? "border-purple-400 scale-105"
                    : "border-white/20 hover:border-purple-400"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6 text-purple-400" />
                  <h3 className="text-sm font-semibold text-white">
                    {skill}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Projects Section */}
        {selectedSkill && (
          <div className="mt-6">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
              Projects using{" "}
              <span className="text-purple-400">{selectedSkill}</span>
            </h2>

            {projects.length === 0 ? (
              <p className="text-center text-purple-200">
                No projects found.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((p, i) => (
                  <div
                    key={i}
                    className="bg-white/10 rounded-xl p-6 border border-white/20 hover:border-purple-400 transition"
                    onClick={() => {
                      if (p.links && p.links.length > 0) {
                        window.open(p.links[0], "_blank"); // Opens first link in new tab
                      }
                    }}
                  >
                    <h3 className="text-lg font-bold text-white">
                      {p.title}
                    </h3>
                    <p className="text-purple-200 text-sm mt-2">
                      {p.description}
                    </p>
                    <p className="text-xs text-purple-300 mt-3">
                      Skills: {p.skills.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
