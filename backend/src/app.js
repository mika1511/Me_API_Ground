import express from "express";
import cors from "cors";

import profileRoutes from "./routes/profile.routes.js";
import queryRoutes from "./routes/query.routes.js";
import healthRoutes from "./routes/health.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/", profileRoutes);
app.use("/", queryRoutes);
app.use("/", healthRoutes);


// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
