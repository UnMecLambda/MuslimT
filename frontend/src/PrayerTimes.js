import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrayerTimes = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/prayer-times')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        setError('Erreur lors de la récupération des horaires de prière');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Chargement...</div>;
  }

  // Extraire les horaires de prière
  const prayerTimings = data.timings;
  const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];  // Liste des prières à afficher

  return (
    <div>
      {/* <h1>Horaires de prière pour {data.city}</h1> */}
      <h2>Date : {data.date.readable}</h2>
      <ul>
        {prayers.map(prayer => (
          <li key={prayer}>
            {prayer}: {prayerTimings[prayer]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrayerTimes;
