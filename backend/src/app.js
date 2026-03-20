import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { parse } from "yaml";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import errorHandler from "./middlewares/errorHandler.js";
import eventRoutes from "./routes/event.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import userRoutes from "./routes/user.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const swaggerDocument = parse(
  readFileSync(join(__dirname, "../docs/swagger.yaml"), "utf8")
);

app.use(cors({
  origin: process.env.FRONTEND_URL||"*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/events", eventRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);
app.use("/events", attendanceRoutes);

app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;