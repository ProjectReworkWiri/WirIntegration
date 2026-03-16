import pkg from 'pg';
import "dotenv/config"

const { Pool } = pkg;

//Server connection

<<<<<<< HEAD
/* const pool = new Pool({
=======
const pool = new Pool({
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on("connect", (client) => {
  client.query(`SET search_path TO app_zenith, public`)
<<<<<<< HEAD
}); */
=======
});
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c

//----------------------------------------//

//Local connection with .env

<<<<<<< HEAD
const pool = new Pool({ 
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  options: `-c search_path=${process.env.DB_SCHEMA || 'public'},public`,
  connectionTimeoutMillis: 15000
});
=======
/* const pool = new Pool({ 
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PWD,
  port: process.env.DB_PORT,
  options: `-c search_path=${process. env.DB_SCHEMA || 'public'},public`,
  connectionTimeoutMillis: 15000
}); */
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c

export const connectPg = async () => {

  let client;

  try {

    client = await pool.connect()

    await client.query("SELECT NOW()");
    console.log('connected to PostgreSQL');

  } catch (error) {
    
    console.error('Error connection to PostgreSQL:', error.stack);
    
  }finally{

    if(client){
      client.release()
    }

  }
} 

export default pool