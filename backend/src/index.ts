import express from "express";
import cors from "cors";
import { config } from "./config/environment";
import { connectDB } from "./config/database";
import authRoutes from "./routes/auth";
import passwordRoutes from "./routes/passwords";
import activityRoutes from "./routes/activity";
import cardRoutes from './routes/cardRoutes';
import testRoutes from './routes/testRoutes';
import { startNotificationCron } from './cron/notificationCron';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/passwords", passwordRoutes);
app.use("/api/activity", activityRoutes);
app.use('/api/cards', cardRoutes);
app.use("/api/test", testRoutes);

// DB Connection
connectDB().then(() => {
  // Server
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
    startNotificationCron();
  });
});
