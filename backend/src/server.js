#!/usr/bin/env node
import app from "./app.js";
import "dotenv/config"
import { connectPg } from "./configuration/posgresdb.js";


<<<<<<< HEAD
const PORT = process.env.APP_PORT || 4000;
=======
const PORT = process.env.PORT || process.env.APP_PORT || 4000;
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c

const startServer = async () => {

    try {
        
        await connectPg();

        app.listen(PORT, () =>{
        console.log(`Join to the website: http://localhost:${PORT}`);
        });

    } catch (error) {
        
        console.error("Fail", error)

    }

}

startServer()