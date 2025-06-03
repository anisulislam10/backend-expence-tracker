const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()

require('dotenv').config()

//middlewares
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

// Database connection and server start
const startServer = async () => {
    try {
        await db();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed', error);
    }
};

// Export the Express app for Vercel
module.exports = app;

// Start the server only when not in Vercel's serverless environment
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    startServer().then(() => {
        app.listen(PORT, () => {
            console.log('Server listening on port:', PORT);
        });
    });
}