const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/equipment', require('./routes/equipmentRoutes'));
app.use('/api/labour', require('./routes/labourRoutes'));
app.use('/api/dairy', require('./routes/dairyRoutes'));
app.use('/api/advisory', require('./routes/advisoryRoutes'));
app.use('/api/guides', require('./routes/guideRoutes'));
app.use('/api/schemes', require('./routes/schemeRoutes'));
app.use('/api/community', require('./routes/communityRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
