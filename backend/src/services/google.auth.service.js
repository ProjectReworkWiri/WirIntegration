<<<<<<< HEAD
import pool from "../configuration/posgresdb.js";

export const findOrCreateGoogleUser = async (profile) => {

=======
// PostgreSQL connection pool
import pool from "../configuration/posgresdb.js";

// Finds an existing user by email or creates a new one using Google profile data
export const findOrCreateGoogleUser = async (profile) => {

  // Extract basic information from the Google profile
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
  const email = profile.emails?.[0]?.value;
  const name = profile.displayName;
  const googleId = profile.id;

<<<<<<< HEAD
  // 1 buscar usuario por email
=======
  // 1. Search user by email
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
  const userQuery = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  let user;

<<<<<<< HEAD
  if (userQuery.rows.length === 0) {

    // 2 crear usuario
=======
  // If the user does not exist, create it
  if (userQuery.rows.length === 0) {

    // 2. Create user
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
    const newUser = await pool.query(
      `INSERT INTO users(full_name,email,google_id,auth_provider)
       VALUES($1,$2,$3,'google')
       RETURNING *`,
      [name,email,googleId]
    );

    user = newUser.rows[0];

<<<<<<< HEAD
    // 3 crear profile
    await pool.query(
      `INSERT INTO profile(user_id) VALUES($1)`,
      [user.id]
    );

    // 4 crear puntos iniciales
=======
    // 3. Create profile linked to the user
    await pool.query(
      `INSERT INTO profile(id) VALUES($1)`,
      [user.id]
    );

    // 4. Initialize user points and streak values
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
    await pool.query(
      `INSERT INTO user_points(user_id,current_balance,current_streak,best_streak)
       VALUES($1,0,0,0)`,
      [user.id]
    );

  } else {

    user = userQuery.rows[0];

<<<<<<< HEAD
    // si existe pero no tenía google_id lo agregamos
=======
    // If the user exists but doesn't have a google_id yet, update it
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
    if (!user.google_id) {

      await pool.query(
        `UPDATE users
         SET google_id=$1
         WHERE id=$2`,
        [googleId,user.id]
      );

    }

  }

  return user;

};