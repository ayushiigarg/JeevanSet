// Import required modules
const express = require('express'); // Web framework
const dotenv = require('dotenv');   // Environment variables
const cors = require('cors');       // CORS middleware
const morgan = require('morgan');   // HTTP request logger
const connectDB = require('./config/db');

dotenv.config(); // Load environment variables
connectDB();
const app = express(); // Create Express app
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Log HTTP requests

// Set up route handlers
app.use("/api/v1/test", require("./routes/testRoutes"));

// Define port and environment mode
const PORT = process.env.PORT || 5000;
const DEV_MODE = process.env.DEV_MODE;

// Start server
app.listen(PORT, () => {
   console.log(`Server running in ${DEV_MODE} mode on port ${PORT}`);
});
