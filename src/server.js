import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import app from './app.js'
import corsMiddleware from './config/cors.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
app.use(corsMiddleware);

async function start() {
    connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

start();