const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dns = require("dns");

dotenv.config();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const healthRoutes = require("./routes/healthRoutes");
const contactRoutes = require("./routes/contactRoutes");
const sosRoutes = require("./routes/sosRoutes");
const adminRoutes = require("./routes/adminRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ================= HOME =================

app.get("/", (req, res) => {
  res.json({
    message: "🚑 Emergency AI Wrist Band Backend Running...",
  });
});

// ================= ROUTES =================

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);

// ================= START SERVER =================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();