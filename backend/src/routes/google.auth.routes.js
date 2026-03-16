import express from "express";
import passport from "passport";
<<<<<<< HEAD
import { notifyRegister, notifyLogin } from "../services/n8n.service.js";
 
const router = express.Router();
 
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
 
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
 
    console.log("USER SESSION:", req.user);
 
    const { id, full_name, email, google_id } = req.user;
 
    res.cookie("user_session", id, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
 
    // Usuario nuevo → bienvenida, usuario existente → notificación de login
    if (!google_id) {
      notifyRegister(full_name, email);
    } else {
      notifyLogin(full_name, email);
    }
 
    res.redirect("http://127.0.0.1:5500/frontend/templates/dashboard/dashboard.html");
  }
);
 
export default router;
 
=======

const FRONTEND_URL = process.env.FRONTEND_URL || "http://127.0.0.1:5500";

const router = express.Router();

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: `${FRONTEND_URL}/frontend/templates/auth/index.html` }),
  async (req, res) => {

    try {
      
      console.log("USER SESSION:", req.user);

      const { id, full_name, email, google_id } = req.user;

      res.cookie("user_session", id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
        maxAge: 1000 * 60 * 60 * 24 * 7
      });

      res.redirect(`${FRONTEND_URL}/frontend/templates/dashboard/dashboard.html`);
      
    } catch (error) {
      console.error("Error en Google Callback:", error);
      res.redirect(`${FRONTEND_URL}/frontend/templates/auth/index.html?error=google_auth_failed`);
    }

  }
);

export default router;
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
