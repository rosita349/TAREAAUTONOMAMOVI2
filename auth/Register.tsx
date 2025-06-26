import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../Config/Autentication'

const { width, height } = Dimensions.get('window')

export default function RegistroScreen({ navigation }: any) {
  const [nombre, setnombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function registrar() {
    // Validaciones
    if (!nombre.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios')
      return
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      // Paso 1: Registrar usuario en auth
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

      if (error) {
        if (error.message.includes('User already registered')) {
          Alert.alert('Usuario ya registrado', 'Por favor inicia sesión.')
        } else {
          Alert.alert('Error al registrar', error.message)
        }
        console.log('Error al registrar:', error.message)
        return
      }

      console.log('Registro exitoso')

      // Paso 2: Crear perfil en la tabla
      const { data: profileData, error: profileError } = await supabase
        .from('Perfiles_recordatorios')
        .insert([
          { 
            id: data.user?.id, 
            nombre: nombre, 
            correo: email,  
            contraseña: password 
          }
        ])

      if (profileError) {
        console.log('Error al crear perfil:', profileError.message)
        Alert.alert('Error', 'No se pudo crear el perfil: ' + profileError.message)
      } else {
        console.log('Perfil creado exitosamente')
        Alert.alert(
          'Registro exitoso', 
          'Tu cuenta ha sido creada. Por favor inicia sesión.',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        )
        
        // Limpiar formulario
        setnombre('')
        setEmail('')
        setPassword('')
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
        <View style={styles.circle6} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>✚</Text>
            </View>
          </View>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Únete a Manage Tasks</Text>
        </View>
        
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Text style={styles.inputIconText}>👤</Text>
            </View>
            <TextInput
              placeholder="Nombre completo"
              style={styles.input}
              value={nombre}
              onChangeText={setnombre}
              editable={!loading}
              placeholderTextColor="#a78bfa"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Text style={styles.inputIconText}>📧</Text>
            </View>
            <TextInput
              placeholder="Correo electrónico"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
              placeholderTextColor="#a78bfa"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Text style={styles.inputIconText}>🔒</Text>
            </View>
            <TextInput
              placeholder="Contraseña (min. 6 caracteres)"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              placeholderTextColor="#a78bfa"
            />
          </View>
          
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={registrar}
            disabled={loading}
            activeOpacity={loading ? 1 : 0.8}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>
                {loading ? "Registrando..." : "Crear Cuenta"}
              </Text>
              <View style={styles.buttonIcon}>
                <Text style={styles.buttonIconText}>{loading ? "⏳" : "→"}</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <Text style={styles.loginLinkText}>
              ¿Ya tienes cuenta? <Text style={styles.loginLinkBold}>Inicia sesión</Text>
            </Text>
          </TouchableOpacity>
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
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#a855f7',
    opacity: 0.12,
    top: -80,
    right: -90,
    shadowColor: '#a855f7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
  },
  circle2: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#c084fc',
    opacity: 0.1,
    bottom: -60,
    left: -70,
    shadowColor: '#c084fc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  circle3: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#d8b4fe',
    opacity: 0.08,
    top: height * 0.25,
    left: width * 0.8,
  },
  circle4: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#8b5cf6',
    opacity: 0.06,
    top: height * 0.1,
    left: width * 0.05,
  },
  circle5: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#a78bfa',
    opacity: 0.05,
    bottom: height * 0.35,
    right: width * 0.15,
  },
  circle6: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e879f9',
    opacity: 0.04,
    top: height * 0.65,
    left: width * 0.1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    zIndex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 18,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  logoText: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#7c3aed',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
    textShadowColor: 'rgba(139, 92, 246, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '400',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginVertical: 8,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    width: '100%',
  },
  inputIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    marginRight: 4,
  },
  inputIconText: {
    fontSize: 18,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 18,
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
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
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
    flex: 1,
    textAlign: 'center',
  },
  buttonIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonIconText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 24,
    paddingVertical: 12,
  },
  loginLinkText: {
    color: '#64748b',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '400',
  },
  loginLinkBold: {
    color: '#8b5cf6',
    fontWeight: '600',
  },
})