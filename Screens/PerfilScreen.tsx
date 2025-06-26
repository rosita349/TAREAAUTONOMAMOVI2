import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { supabase } from '../Config/Autentication'

export default function PerfilScreen() {
  const [profile, setProfile] = useState<{nombre: string, correo: string} | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser()

        if (userError || !userData?.user) {
          console.log('Usuario no autenticado:', userError)
          Alert.alert('Error', 'No se pudo obtener la información del usuario')
          setLoading(false)
          return
        }

        const user = userData.user

        const { data, error } = await supabase
          .from('Perfiles_recordatorios') 
          .select('nombre, correo') 
          .eq('id', user.id)
          .single()

        if (error) {
          console.log('Error fetching profile:', error.message)
          Alert.alert('Error', 'No se pudo cargar el perfil')
        } else {
          setProfile(data)
        }
      } catch (error) {
        console.log('Error inesperado:', error)
        Alert.alert('Error', 'Ocurrió un error inesperado')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8b5cf6" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    )
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se pudo cargar el perfil</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Mi Perfil</Text>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>👤</Text>
        </View>
      </View>
             
      <View style={styles.profileCard}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{profile.nombre}</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.value}>{profile.correo}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f3f0ff'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f0ff'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#8b5cf6',
    fontWeight: '600'
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 16,
    color: '#7c3aed',
    textAlign: 'center',
    letterSpacing: -0.5,
    textShadowColor: 'rgba(139, 92, 246, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#ec4899',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ec4899',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    fontSize: 24,
    color: '#ffffff',
  },
  profileCard: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 20,
    width: '100%',
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)',
  },
  fieldContainer: {
    marginBottom: 25,
    backgroundColor: 'rgba(139, 92, 246, 0.03)',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
  },
  label: {
    fontWeight: '700',
    fontSize: 14,
    color: '#8b5cf6',
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: 'uppercase'
  },
  value: {
    fontSize: 20,
    color: '#1f2937',
    fontWeight: '600',
    paddingLeft: 8
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
    fontWeight: '600'
  }
})