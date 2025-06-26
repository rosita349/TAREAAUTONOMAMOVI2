import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window')

export default function WelcomeScreen({ navigation }: any) {
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
              <Text style={styles.logoText}>MT</Text>
            </View>
          </View>
          <Text style={styles.title}>Bienvenido a</Text>
          <Text style={styles.appName}>Manage Tasks</Text>
          <Text style={styles.subtitle}>Organiza tu vida de manera inteligente y productiva</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
              <View style={styles.buttonIcon}>
                <Text style={styles.buttonIconText}>→</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.registerButton]}
            onPress={() => navigation.navigate('Registro')}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <Text style={[styles.buttonText, styles.registerButtonText]}>Regístrate</Text>
              <View style={styles.buttonIcon}>
                <Text style={[styles.buttonIconText, styles.registerIconText]}>+</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>✓</Text>
            </View>
            <Text style={styles.featureText}>Tareas organizadas</Text>
          </View>
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>⚡</Text>
            </View>
            <Text style={styles.featureText}>Recordatorios inteligentes</Text>
          </View>
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>📊</Text>
            </View>
            <Text style={styles.featureText}>Progreso visual</Text>
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
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#a855f7',
    opacity: 0.15,
    top: -100,
    right: -100,
    shadowColor: '#a855f7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  circle2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#c084fc',
    opacity: 0.12,
    bottom: -50,
    left: -80,
    shadowColor: '#c084fc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
  },
  circle3: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#d8b4fe',
    opacity: 0.1,
    top: height * 0.3,
    left: width * 0.75,
    shadowColor: '#d8b4fe',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  circle4: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#8b5cf6',
    opacity: 0.08,
    top: height * 0.15,
    left: width * 0.1,
  },
  circle5: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#a78bfa',
    opacity: 0.06,
    bottom: height * 0.3,
    right: width * 0.2,
  },
  circle6: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e879f9',
    opacity: 0.05,
    top: height * 0.6,
    left: width * 0.05,
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
    marginBottom: 50,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
  },
  title: {
    fontSize: 24,
    color: '#64748b',
    fontWeight: '300',
    marginBottom: 8,
    letterSpacing: 1,
  },
  appName: {
    fontSize: 42,
    fontWeight: '900',
    color: '#7c3aed',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: -1,
    textShadowColor: 'rgba(139, 92, 246, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 26,
    letterSpacing: 0.3,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 20,
    marginVertical: 10,
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
  registerButton: {
    backgroundColor: '#a855f7',
    shadowColor: '#a855f7',
    borderColor: 'rgba(168, 85, 247, 0.3)',
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
  registerButtonText: {
    color: '#ffffff',
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
  registerIconText: {
    fontSize: 18,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  featureIconText: {
    fontSize: 20,
  },
  featureText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 16,
  },
})