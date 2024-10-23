import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import useFetchQuran from '../hooks/useFetchQuran';

const QuranList = () => {
  const { surahData, loading, error } = useFetchQuran();
  const [selectedSurah, setSelectedSurah] = useState(null); // State to track which Surah is expanded
  const [verses, setVerses] = useState([]); // State to hold verses of the selected Surah

  const handleSurahPress = async (surahNumber) => {
    // Check if the selected Surah is already expanded
    if (selectedSurah === surahNumber) {
      setSelectedSurah(null); // Collapse if already expanded
      setVerses([]); // Clear verses when collapsed
      return;
    }
    
    setSelectedSurah(surahNumber); // Set selected Surah

    try {
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
      const result = await response.json();
      setVerses(result.data.ayahs); // Set verses of the selected Surah
    } catch (error) {
      console.error('Error fetching verses:', error);
    }
  };

  const renderSurah = ({ item }) => (
    <View>
      <TouchableOpacity style={styles.surahItem} onPress={() => handleSurahPress(item.number)}>
        <View style={styles.surahNumberContainer}>
          <Text style={styles.surahNumber}>{item.number}</Text>
        </View>
        <View style={styles.surahDetails}>
          <Text style={styles.surahName}>{item.englishName}</Text>
          <Text style={styles.surahInfo}>
            {item.revelationType.toUpperCase()} • {item.numberOfAyahs} VERSES
          </Text>
        </View>
        <Text style={styles.arabicName}>{item.name}</Text>
      </TouchableOpacity>

      {/* Render verses if this Surah is selected */}
      {selectedSurah === item.number && verses.map((verse, index) => (
        <View key={index} style={styles.verseContainer}>
          <Text style={styles.verseText}>{verse.text}</Text>
        </View>
      ))}
    </View>
  );

  if (loading) {
    return <View style={styles.centerContainer}>
      <Text>Loading...</Text>
    </View>;
  }

  if (error) {
    return <View style={styles.centerContainer}>
      <Text>Error fetching data</Text>
    </View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={surahData}
        renderItem={renderSurah}
        keyExtractor={(item) => item.number.toString()}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.bottomNav}>
        <View style={styles.bottomIcon} />
        <View style={[styles.bottomIcon, styles.centerIcon]} />
        <View style={styles.bottomIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surahItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  verseContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F0F8FF', // Optional: Different background for verses
  },
  verseText: {
    fontSize: 16,
    color: '#333',
  },
  selectedTabText: {
    color: '#8A2BE2',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  surahItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  surahNumberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0E6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  surahNumber: {
    color: '#8A2BE2',
    fontSize: 16,
    fontWeight: '600',
  },
  surahDetails: {
    flex: 1,
  },
  surahName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  surahInfo: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  arabicName: {
    fontSize: 20,
    color: '#8A2BE2',
    marginLeft: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  bottomIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
  },
  centerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8A2BE2',
  }
});

export default QuranList;
