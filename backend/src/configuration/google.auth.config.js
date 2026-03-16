import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { findOrCreateGoogleUser } from "../services/google.auth.service.js";
import pool from "../configuration/posgresdb.js";
 
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
<<<<<<< HEAD
      callbackURL: "http://127.0.0.1:4000/auth/google/callback" // ← corregido
=======
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://127.0.0.1:4000/auth/google/callback"
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
    },
    async (accessToken, refreshToken, profile, done) => {
 
      try {
 
        const user = await findOrCreateGoogleUser(profile);
 
        return done(null, user);
 
      } catch (error) {
 
        return done(error, null);
 
      }
 
    }
  )
);
 
passport.serializeUser((user, done) => {
  done(null, user.id);
});
<<<<<<< HEAD
 
passport.deserializeUser(async (id, done) => {
  try {
 
=======

passport.deserializeUser(async (id, done) => {
  try {

>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
    const user = await pool.query(
      "SELECT * FROM users WHERE id=$1",
      [id]
    );
<<<<<<< HEAD
 
    done(null, user.rows[0]);
 
  } catch (error) {
 
    done(error, null);
 
  }
});
 
export default passport;
 
=======

    done(null, user.rows[0]);

  } catch (error) {

    done(error, null);

  }
});

export default passport;
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
