import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../Config/Autentication'
import { TextInput } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('window')

export default function GuardarScreen() {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fecha, setFecha] = useState('')
  const [loading, setLoading] = useState(false)

  async function guardar() {
    // Validaciones
    if (!titulo.trim() || !descripcion.trim() || !fecha.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios')
      return
    }

    // Validar formato de fecha
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(fecha)) {
      Alert.alert('Error', 'El formato de fecha debe ser YYYY-MM-DD')
      return
    }

    setLoading(true)

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError || !userData?.user) {
        console.log('Usuario no autenticado:', userError)
        Alert.alert('Error', 'Usuario no autenticado')
        return
      }

      const userId = userData.user.id

      const { data, error } = await supabase
        .from('tareas')
        .insert([
          {
            user_id: userId,
            titulo: titulo,
            descripcion: descripcion,
            fecha: fecha,
            completada: false,
          },
        ])
        .select()

      if (error) {
        console.log('Error al guardar:', error)
        Alert.alert('Error', 'No se pudo guardar la tarea')
      } else {
        setTitulo('')
        setDescripcion('')
        setFecha('')
        console.log('Tarea guardada:', data)
        Alert.alert('Éxito', 'Tarea guardada correctamente')
      }
    } catch (error) {
      console.log('Error inesperado:', error)
      Alert.alert('Error', 'Ocurrió un error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.backgroundDecoration}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />
        <View style={styles.circle4} />
        <View style={styles.circle5} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>📝</Text>
            </View>
          </View>
          <Text style={styles.title}>Nueva Tarea</Text>
          <Text style={styles.subtitle}>Organiza tu tiempo de manera eficiente</Text>
        </View>
        
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Text style={styles.inputIconText}>📋</Text>
            </View>
            <TextInput
              placeholder="Título de la tarea"
              style={styles.input}
              value={titulo}
              onChangeText={setTitulo}
              placeholderTextColor="#a78bfa"
              editable={!loading}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Text style={styles.inputIconText}>📄</Text>
            </View>
            <TextInput
              placeholder="Descripción detallada"
              style={[styles.input, styles.textArea]}
              value={descripcion}
              onChangeText={setDescripcion}
              placeholderTextColor="#a78bfa"
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
              editable={!loading}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Text style={styles.inputIconText}>📅</Text>
            </View>
            <TextInput
              placeholder="Fecha (2024-12-25)"
              style={styles.input}
              value={fecha}
              onChangeText={setFecha}
              placeholderTextColor="#a78bfa"
              editable={!loading}
            />
          </View>
          
        
          
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={guardar}
            disabled={loading}
            activeOpacity={loading ? 1 : 0.8}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>
                {loading ? "Guardando..." : "Guardar Tarea"}
              </Text>
              <View style={styles.buttonIcon}>
                <Text style={styles.buttonIconText}>{loading ? "⏳" : "✓"}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>⚡</Text>
            </View>
            <Text style={styles.featureText}>Rápido</Text>
          </View>
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>🎯</Text>
            </View>
            <Text style={styles.featureText}>Organizado</Text>
          </View>
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>💼</Text>
            </View>
            <Text style={styles.featureText}>Productivo</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f0ff',
  },
  backgroundDecoration: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circle1: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#a855f7',
    opacity: 0.1,
    top: -60,
    right: -80,
    shadowColor: '#a855f7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  circle2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#c084fc',
    opacity: 0.08,
    bottom: -40,
    left: -50,
    shadowColor: '#c084fc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
  },
  circle3: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#d8b4fe',
    opacity: 0.06,
    top: height * 0.2,
    left: width * 0.85,
  },
  circle4: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8b5cf6',
    opacity: 0.05,
    top: height * 0.7,
    left: width * 0.1,
  },
  circle5: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#a78bfa',
    opacity: 0.04,
    bottom: height * 0.3,
    right: width * 0.2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
    zIndex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoContainer: {
    marginBottom: 15,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 24,
    color: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#7c3aed',
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: -0.5,
    textShadowColor: 'rgba(139, 92, 246, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '400',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    marginVertical: 6,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    width: '100%',
  },
  inputIcon: {
    width: 45,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    marginRight: 4,
  },
  inputIconText: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  textArea: {
    minHeight: 80,
    paddingTop: 14,
  },
  dateHelper: {
    backgroundColor: 'rgba(139, 92, 246, 0.05)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 8,
    width: '100%',
  },
  dateHelperText: {
    color: '#8b5cf6',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  buttonDisabled: {
    backgroundColor: '#d1d5db',
    shadowColor: '#d1d5db',
    borderColor: '#e5e7eb',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
    flex: 1,
    textAlign: 'center',
  },
  buttonIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonIconText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  featureIconText: {
    fontSize: 16,
  },
  featureText: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
})