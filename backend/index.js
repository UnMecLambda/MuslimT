const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importer le middleware CORS


const app = express();
const PORT = 3001;
// Utiliser CORS pour permettre les requêtes cross-origin
app.use(cors());

app.get('/prayer-times', async (req, res) => {
  try {
    const response = await axios.get('http://api.aladhan.com/v1/timingsByCity', {
      params: {
        city: 'Paris',
        country: 'France',
        method: 2
      }
    });

        // Extraire les données des horaires et la date actuelle
        const timings = response.data.data.timings;
        const date = response.data.data.date;  // Date actuelle
        const cityName = response.data.data.meta.city;
    
        // Renvoi de la réponse avec les horaires, la ville et la date
        res.json({
          city: cityName,
          date: date,
          timings: timings
        });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des horaires de prière' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

