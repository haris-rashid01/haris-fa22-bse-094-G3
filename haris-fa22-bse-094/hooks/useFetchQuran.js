import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetchQuran = () => {
  const [surahData, setSurahData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        const result = await response.json();
        setSurahData(result.data);
        await AsyncStorage.setItem('surahData', JSON.stringify(result.data)); // Save data
        setLoading(false);
      } catch (err) {
        // Try to fetch from AsyncStorage if there's an error
        const cachedData = await AsyncStorage.getItem('surahData');
        if (cachedData) {
          setSurahData(JSON.parse(cachedData));
        }
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { surahData, loading, error };
};

export default useFetchQuran;
