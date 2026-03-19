import express from "express";
import passport from "passport";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://127.0.0.1:5500";
const isProduction = process.env.NODE_ENV === "production";

const router = express.Router();

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: `${FRONTEND_URL}/templates/auth/index.html` }),
  async (req, res) => {

    try {
      
      console.log("USER SESSION:", req.user);

      const { id, full_name, email, google_id } = req.user;

      res.cookie("user_session", id, {
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        httpOnly: true,
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7
      });

      res.send(`
        <html>
          <body>
            <script>
              window.location.replace("${FRONTEND_URL}/templates/dashboard/dashboard.html");
            </script>
          </body>
        </html>
      `);
      
    } catch (error) {
      console.error("Error en Google Callback:", error);
      res.redirect(`${FRONTEND_URL}/templates/auth/index.html?error=google_auth_failed`);
    }

  }
);

export default router;