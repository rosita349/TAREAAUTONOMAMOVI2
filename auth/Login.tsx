import { Alert, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { supabase } from '../Config/Autentication'

const { width, height } = Dimensions.get('window')

export default function LoginScreen({ navigation }: any) {

  const [correo, setcorreo] = useState("")
  const [contrasenia, setcontrasenia] = useState("")
  const [loading, setLoading] = useState(false)

  async function login() {
    if (!correo.trim() || !contrasenia.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: correo,
        password: contrasenia,
      })

      console.log(data)
      
      if (data.user == null) {
        Alert.alert("Error", "Credenciales incorrectas")
      } else {
        navigation.replace("MyDrawer")
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un problema al iniciar sesión")
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
              <Text style={styles.logoText}>🔐</Text>
            </View>
          </View>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>Accede a tu cuenta</Text>
        </View>
        
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Text style={styles.inputIconText}>📧</Text>
            </View>
            <TextInput
              placeholder="Correo electrónico"
              style={styles.input}
              onChangeText={(texto) => setcorreo(texto)}
              value={correo}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#a78bfa"
              editable={!loading}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Text style={styles.inputIconText}>🔒</Text>
            </View>
            <TextInput
              placeholder="Contraseña"
              style={styles.input}
              onChangeText={(texto) => setcontrasenia(texto)}
              value={contrasenia}
              secureTextEntry
              placeholderTextColor="#a78bfa"
              editable={!loading}
            />
          </View>
          
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={login}
            disabled={loading}
            activeOpacity={loading ? 1 : 0.8}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>
                {loading ? "Iniciando..." : "Iniciar Sesión"}
              </Text>
              <View style={styles.buttonIcon}>
                <Text style={styles.buttonIconText}>{loading ? "⏳" : "→"}</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.registerLink}
            onPress={() => navigation.navigate('Registro')}
            activeOpacity={0.7}
          >
            <Text style={styles.registerLinkText}>
              ¿No tienes cuenta? <Text style={styles.registerLinkBold}>Regístrate aquí</Text>
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.forgotPassword}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
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
  registerLink: {
    marginTop: 24,
    paddingVertical: 12,
  },
  registerLinkText: {
    color: '#64748b',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '400',
  },
  registerLinkBold: {
    color: '#8b5cf6',
    fontWeight: '600',
  },
  forgotPassword: {
    marginTop: 12,
    paddingVertical: 8,
  },
  forgotPasswordText: {
    color: '#8b5cf6',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
})