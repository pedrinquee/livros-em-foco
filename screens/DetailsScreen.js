import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Linking, TouchableOpacity, Platform, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function DetailsScreen({ route }) {
  const { book } = route.params;

  const openLink = () => {
    if (book.infoLink) {
      Linking.openURL(book.infoLink);
    }
  };

  return (
    <LinearGradient colors={['#4B0082', '#2575fc']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image
          source={{
            uri:
              book.imageLinks?.thumbnail?.replace('http:', 'https:') ||
              'https://via.placeholder.com/160x240.png?text=Sem+Capa',
          }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.authors}>
          {book.authors ? book.authors.join(', ') : 'Autor desconhecido'}
        </Text>

        {book.publisher && (
          <Text style={styles.publisher}>
            <Text style={styles.label}>Editora: </Text>
            {book.publisher}
          </Text>
        )}

        {book.publishedDate && (
          <Text style={styles.publishedDate}>
            <Text style={styles.label}>Publicado em: </Text>
            {book.publishedDate}
          </Text>
        )}

        {book.description ? (
          <Text style={styles.description}>{book.description.replace(/<[^>]+>/g, '')}</Text>
        ) : (
          <Text style={styles.description}>Descrição não disponível.</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={openLink}
          disabled={!book.infoLink}
        >
          <Ionicons name="book-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Mais informações</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 48 : 60,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  cover: {
    width: 160,
    height: 240,
    borderRadius: 20,
    marginBottom: 24,
    backgroundColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  authors: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ddd',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  publisher: {
    fontSize: 16,
    color: '#eee',
    marginBottom: 6,
  },
  publishedDate: {
    fontSize: 16,
    color: '#eee',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
  description: {
    fontSize: 16,
    color: '#f0f0f0',
    lineHeight: 26,
    textAlign: 'justify',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FFD700',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#4B0082',
    fontWeight: 'bold',
    fontSize: 18,
  },
});