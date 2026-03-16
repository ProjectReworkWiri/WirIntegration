import pool from "../configuration/posgresdb.js"
import bcrypt from "bcrypt";
<<<<<<< HEAD


const registerUser = async (full_name, email, password ) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

=======
import crypto from 'crypto';


const registerUser = async (full_name, email, password ) => {

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const verificationToken = crypto.randomUUID();

>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

<<<<<<< HEAD
        // 1. Insertamos el usuario en la tabla 'users'
        const userQuery = "INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING id";
        const userResult = await client.query(userQuery, [full_name, email, hashedPassword]);
=======
        const userQuery = "INSERT INTO users (full_name, email, password, verification_token, is_verified) VALUES ($1, $2, $3, $4, false) RETURNING id";
        const userResult = await client.query(userQuery, [full_name, email, hashedPassword, verificationToken]);
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
        const userId = userResult.rows[0].id;

    
        const profileQuery = `
            INSERT INTO profile (id, description, language, phone, country, photo) 
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        
<<<<<<< HEAD
        // Valores por defecto seguros
        const defaultDescription = "¡Bienvenido a mi perfil , te invito a que modifiques mi informacion con el boton que esta por aqui -->!";
        const defaultLang = "Spanish";
        const defaultPhone = "0";   // Si esto falla, prueba con null
        const defaultCountry = "0"; // Si esto falla, prueba con null
        const defaultPhoto = "";    // Si esto falla, prueba con null
=======
        //Values per defect sures
        // ¡Bienvenido a mi perfil , te invito a que modifiques mi informacion con el boton que esta por aqui -->!
        const defaultDescription = "";
        const defaultLang = "Spanish";
        const defaultPhone = "0";   
        const defaultCountry = "0"; 
        const defaultPhoto = "";   
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c

        await client.query(profileQuery, [
            userId, 
            defaultDescription, 
            defaultLang, 
            defaultPhone, 
            defaultCountry,
            defaultPhoto
        ]);

        await client.query('COMMIT');
<<<<<<< HEAD
        return { id: userId, full_name, email };

    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error.message)
        throw error; 
    } finally {
        client.release();
=======
        return { id: userId, full_name, email, verificationToken };

    } catch (error) {

        await client.query('ROLLBACK');
        console.error(error.message)
        throw error;

    } finally {

        client.release();

>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
    }   
}

const logedUser = async (email, password) => {

    const userSelect = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(userSelect, [email]);

    if(result.rows.length === 0) return { error: "user_not_found" }

    const userFound = result.rows[0];
<<<<<<< HEAD
=======

    if (!userFound.is_verified) {
        return { error: "email_not_verified" };
    }

>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
    const match = await bcrypt.compare(password, userFound.password);

    return { match, userFound };

}

<<<<<<< HEAD
export {logedUser, registerUser}
=======
const verifyUserToken = async (token) => {

    const result = await pool.query(
        "UPDATE users SET is_verified=true, verification_token=null WHERE verification_token=$1 RETURNING *",
        [token]
    );
    
    return result.rowCount > 0;

};

export {logedUser, registerUser, verifyUserToken}
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
