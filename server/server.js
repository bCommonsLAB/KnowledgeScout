require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes');

// Funktion zum Testen der Datenbankverbindung
async function testDatabaseConnection() {
  try {
    await mongoose.connection.db.admin().ping();
    return { status: 'success', message: 'Datenbankverbindung erfolgreich' };
  } catch (error) {
    console.error('Datenbankverbindungsfehler:', error);
    return { status: 'error', message: 'Datenbankverbindung fehlgeschlagen', error: error.message };
  }
}

// Datenbankverbindung
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB verbunden');
  const testResult = await testDatabaseConnection();
  console.log(testResult.message);
})
.catch((err) => console.error('MongoDB Verbindungsfehler:', err));

// Routen
app.get('/', (req, res) => {
  res.send('KnowledgeScout API läuft');
});

app.get('/api/test-db-connection', async (req, res) => {
  const result = await testDatabaseConnection();
  if (result.status === 'success') {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
});

app.use('/api/users', userRoutes);


// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
