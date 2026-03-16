<<<<<<< HEAD
import pool from "../configuration/posgresdb.js"

// 1. Obtener perfil completo (Datos de 'users' + 'profile')
const profile = async (userId) => {
    // const userId = req.cookies.user_session; // Sacamos el ID de la cookie segura

    const query = `
        SELECT u.full_name,u.email, profile.description, profile.language, profile.photo, profile.phone, profile.country
        FROM users u
        LEFT JOIN profile ON u.id = profile.id
        WHERE u.id = $1
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
};

// 2. Guardar o Actualizar perfil
const updateProfile = async (userId, data) => {
    const { full_name, email, description, language, phone, country, photo } = data;

    // Usamos una transacción para asegurar que ambas tablas se actualicen o ninguna
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');

        // Actualizamos tabla users
        await client.query(
            "UPDATE users SET full_name = $1, email = $2 WHERE id = $3", 
            [full_name, email, userId]
        );

        // Actualizamos o insertamos en tabla profile (UPSERT)
        const queryProfile = `
            INSERT INTO profile (id, description, language, phone, country, photo) 
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (id) 
            DO UPDATE SET 
                description = EXCLUDED.description, 
                language = EXCLUDED.language, 
                phone = EXCLUDED.phone, 
                country = EXCLUDED.country,
                photo = EXCLUDED.photo
        `;
        await client.query(queryProfile, [userId, description, language, phone, country, photo]);

        await client.query('COMMIT');
        return { success: true };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

export { profile, updateProfile };
=======
import pool from "../configuration/posgresdb.js";

// Obtener perfil completo del usuario (incluye u.id para el frontend)
const profile = async (userId) => {
    const query = `
        SELECT
            u.id,
            u.full_name,
            u.email,
            p.description,
            p.language,
            p.photo,
            p.phone,
            p.country
        FROM users u
        LEFT JOIN profile p ON u.id = p.id
        WHERE u.id = $1
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
};

// Actualizar perfil del usuario
const updateProfile = async (userId, data) => {
    const { full_name, email, description, language, phone, country, photo } = data;

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        await client.query(
            "UPDATE users SET full_name = $1, email = $2 WHERE id = $3",
            [full_name, email, userId]
        );

        await client.query(
            `INSERT INTO profile (id, description, language, phone, country, photo)
             VALUES ($1, $2, $3, $4, $5, $6)
             ON CONFLICT (id) DO UPDATE SET
                description = EXCLUDED.description,
                language    = EXCLUDED.language,
                phone       = EXCLUDED.phone,
                country     = EXCLUDED.country,
                photo       = EXCLUDED.photo`,
            [userId, description, language, phone, country, photo]
        );

        await client.query("COMMIT");
        return { success: true };

    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

export { profile, updateProfile };
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
