import React, { useEffect, useState } from "react";
import API from "../Api";
import { Code2, Sparkles, TrendingUp, Award, Zap } from "lucide-react";

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<string[]>([]);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-purple-200 text-lg font-medium">Loading skills...</p>
        </div>
      </div>
    );
  }

  const getSkillIcon = (index: number) => {
    const icons = [Award, Zap, TrendingUp, Code2, Sparkles];
    const Icon = icons[index % icons.length];
    return Icon;
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-purple-400 animate-pulse" />
            <h1 className="text-5xl font-bold text-white">Top Skills</h1>
          </div>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            My core competencies and technical expertise
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => {
            const Icon = getSkillIcon(index);
            return (
              <div
                key={skill}
                className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.5s ease-out forwards',
                  opacity: 0
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-12 h-12 text-purple-400 group-hover:text-purple-300 transition-colors" />
                    <span className="text-sm font-bold text-purple-300 bg-purple-500/30 px-4 py-1.5 rounded-full border border-purple-400/50">
                      #{index + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
                    {skill}
                  </h3>
                  
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full transition-all duration-1000 animate-pulse"
                      style={{ width: `${95 - index * 8}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">{skills.length}</div>
            <div className="text-purple-200 font-medium">Total Skills</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-4xl font-bold text-pink-400 mb-2">1+</div>
            <div className="text-purple-200 font-medium">Years Experience</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-4xl font-bold text-indigo-400 mb-2">5+</div>
            <div className="text-purple-200 font-medium">Projects Completed</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Skills;