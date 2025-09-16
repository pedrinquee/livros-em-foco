import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Keyboard, Platform, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes?q=';

export default function HomeScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('react native');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`${GOOGLE_BOOKS_API}${encodeURIComponent(query)}`);
      const json = await response.json();
      setBooks(json.items || []);
    } catch (error) {
      console.error(error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(searchTerm);
  }, []);

  const onSearch = () => {
    Keyboard.dismiss();
    fetchBooks(searchTerm);
  };

  const renderItem = ({ item }) => {
    const volumeInfo = item.volumeInfo;
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Details', { book: volumeInfo })}
      >
        <Image
          source={{
            uri:
              volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') ||
              'https://via.placeholder.com/128x192.png?text=Sem+Capa',
          }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {volumeInfo.title}
          </Text>
          <Text style={styles.authors} numberOfLines={1}>
            {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Autor desconhecido'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#999" />
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={{ marginLeft: 12 }} />
        <TextInput
          placeholder="Buscar livros, autores ou assuntos"
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={onSearch}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity onPress={() => setSearchTerm('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum livro encontrado para "{searchTerm}"</Text>
          }
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 24 : 36, 
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
    height: 48,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    maxWidth: 600, 
    alignSelf: 'center', 
    width: '100%', 
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 12,
    fontWeight: '600',
  },
  clearButton: {
    paddingHorizontal: 8,
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 14,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  thumbnail: {
    width: 70,
    height: 105,
    borderRadius: 12,
    backgroundColor: '#ddd',
  },
  info: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  authors: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
    fontWeight: '500',
  },
  emptyText: {
    color: '#eee',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 60,
    fontWeight: '600',
  },
});
