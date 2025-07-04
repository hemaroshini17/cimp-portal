const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // ⬅️ Added
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected ✅'))
.catch(err => console.error('MongoDB connection failed ❌', err));

app.get('/', (req, res) => {
  res.send('CIMP Backend is running ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/clubs', require('./routes/clubRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

