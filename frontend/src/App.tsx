import React from "react"
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Home as HomeIcon, FolderGit2, Code2, Sparkles  } from "lucide-react";


import Home from "./pages/Home";
import Projects from "./pages/projects";
import Skills from "./pages/Skills"

function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: HomeIcon },
    { path: "/projects", label: "Projects", icon: FolderGit2 },
    { path: "/skills", label: "Skills", icon: Code2 }
  ];

  return (
    <nav className="bg-slate-900/95 backdrop-blur-lg border-b border-purple-500/30 sticky top-0 z-50 shadow-lg shadow-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold text-white">Portfolio</span>
          </div>
          
          <div className="flex gap-2">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                      : "text-purple-200 hover:bg-purple-500/20 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

