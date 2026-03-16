import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/courses.routes.js";
import googleAuthRoutes from "./routes/google.auth.routes.js";
<<<<<<< HEAD

import "./configuration/google.auth.config.js";

const app = express();

app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
=======
import "./configuration/google.auth.config.js";
import streakRoutes from "./routes/streak.routes.js";
import badgesRoutes from "./routes/badges.routes.js";

const app = express();

app.set("trust proxy", 1);

app.use(cors({
  origin: [process.env.FRONTEND_URL, "http://127.0.0.1:5500", "http://localhost:5500"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
app.use(cookieParser());

/* SESSION */
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
<<<<<<< HEAD
    secure: false,
    sameSite: "lax"
=======
    secure: process.env.NODE_ENV === "production",  
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
  }
}));

/* PASSPORT */
app.use(passport.initialize());
app.use(passport.session());

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/auth", googleAuthRoutes);
<<<<<<< HEAD
=======
app.use("/api/streak", streakRoutes);
app.use("/api/badges", badgesRoutes);
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c

export default app;