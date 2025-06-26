import React, { useState, useEffect } from 'react'
import { View, TextInput, Button, Alert, StyleSheet, Switch, Text } from 'react-native'
import { supabase } from '../Config/Autentication'

export default function EditarScreen({ route, navigation }: any) {
  const { tarea } = route.params

  const [titulo, setTitulo] = useState(tarea?.titulo || '')
  const [descripcion, setDescripcion] = useState(tarea?.descripcion || '')
  const [fecha, setFecha] = useState(tarea?.fecha || '')
  const [completada, setCompletada] = useState(tarea?.completada || false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('Tarea recibida en EditarScreen:', tarea)
  }, [tarea])

  const guardarCambios = async () => {
    if (!tarea?.id) {
      Alert.alert('Error', 'La tarea no tiene un ID válido para actualizar')
      console.log('Tarea inválida:', tarea)
      return
    }

    setLoading(true)
    try {
      console.log('Actualizando tarea con id:', tarea.id)
      const { error } = await supabase
        .from('tareas')
        .update({ titulo, descripcion, fecha, completada })
        .eq('id', tarea.id)

      if (error) {
        Alert.alert('Error', `No se pudo actualizar la tarea: ${error.message}`)
      } else {
        Alert.alert('Éxito', 'Tarea actualizada correctamente')
        navigation.goBack()
      }
    } catch (error: any) {
      Alert.alert('Error', `Error inesperado: ${error.message || error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />
      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        style={styles.input}
      />
      <TextInput
        placeholder="Fecha (YYYY-MM-DD)"
        value={fecha}
        onChangeText={setFecha}
        style={styles.input}
      />
      <View style={styles.switchContainer}>
        <Text>Completada:</Text>
        <Switch value={completada} onValueChange={setCompletada} />
      </View>
      <Button
        title={loading ? 'Guardando...' : 'Guardar Cambios'}
        onPress={guardarCambios}
        disabled={loading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
})
