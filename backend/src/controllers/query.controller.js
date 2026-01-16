import Profile from "../models/Profile.js";


// GET /projects?skill=node
export const getProjectsBySkill = async (req, res, next) => {
  try {
    const { skill } = req.query;
    if (!skill) {
      return res.status(400).json({ error: "skill query param required" });
    }

    const profile = await Profile.findOne();
    if (!profile || !profile.projects) return res.json([]);

    const skillLower = skill.toLowerCase();

    const projects = profile.projects.filter(p =>
      Array.isArray(p.skills) &&
      p.skills.some(s => s.toLowerCase() === skillLower)
    );

    res.json(projects);
  } catch (err) {
    next(err);
  }
};

// GET /skills/top
export const getTopSkills = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();
    if (!profile || !profile.projects) return res.json([]);

    const freq = {};

    profile.projects.forEach(project => {
      if (!Array.isArray(project.skills)) return;

      project.skills.forEach(skill => {
        const key = skill.toLowerCase();
        freq[key] = (freq[key] || 0) + 1;
      });
    });

    const topSkills = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .map(([skill]) => skill);

    res.json(topSkills);
  } catch (err) {
    next(err);
  }
};

// GET /search?q=...
export const search = async (req, res, next) => {
  try {
    const q = req.query.q?.toLowerCase();
    if (!q) {
      return res.status(400).json({ error: "q query param required" });
    }

    const profile = await Profile.findOne();
    if (!profile) return res.json([]);

    const results = [];

    // Search projects
    profile.projects?.forEach(project => {
      const match =
        project.title?.toLowerCase().includes(q) ||
        project.description?.toLowerCase().includes(q) ||
        project.skills?.some(s => s.toLowerCase().includes(q));

      if (match) {
        results.push({
          type: "project",
          data: project
        });
      }
    });

    // Search profile fields
    if (
      profile.name?.toLowerCase().includes(q) ||
      profile.education?.toLowerCase().includes(q)
    ) {
      results.push({
        type: "profile",
        data: {
          name: profile.name,
          education: profile.education
        }
      });
    }

    // Search work experience
    profile.work?.forEach(job => {
      if (
        job.company?.toLowerCase().includes(q) ||
        job.role?.toLowerCase().includes(q)
      ) {
        results.push({
          type: "work",
          data: job
        });
      }
    });

    res.json(results);
  } catch (err) {
    next(err);
  }
};

