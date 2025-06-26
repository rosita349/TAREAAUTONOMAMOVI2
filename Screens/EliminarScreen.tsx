import { Button, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { supabase } from '../Config/Autentication'

export default function EliminarScreen() {
  // estado
  const [titulo, setTitulo] = useState("Estudiar React Native")

  async function eliminar() {
    if (!titulo.trim()) {
      Alert.alert('Error', 'Debes ingresar un título')
      return
    }

    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de eliminar la tarea "${titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const { data: userData, error: userError } = await supabase.auth.getUser()

              if (userError || !userData?.user) {
                Alert.alert('Error', 'Usuario no autenticado')
                return
              }

              const userId = userData.user.id

              const { error } = await supabase
                .from('tareas')
                .delete()
                .eq('id', userId)
                .eq('titulo', titulo.trim())

              if (error) {
                console.log('Error al eliminar:', error)
                Alert.alert('Error', 'No se pudo eliminar la tarea')
              } else {
                Alert.alert('Éxito', 'Tarea eliminada correctamente')
                setTitulo('') // Limpiar campo
              }
            } catch (error) {
              console.log('Error inesperado:', error)
              Alert.alert('Error', 'Ocurrió un error inesperado')
            }
          }
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eliminar Tarea</Text>
      
      <TextInput
        placeholder='Título de la tarea'
        style={styles.input}
        onChangeText={setTitulo}
        value={titulo}
      />
      
      <Button
        title='Eliminar Tarea'
        onPress={eliminar}
        color='#dc3545'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    width: '80%',
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
  },
})