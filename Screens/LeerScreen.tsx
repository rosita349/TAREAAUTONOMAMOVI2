import {FlatList,StyleSheet,Text,View,RefreshControl,TouchableOpacity,Alert,ActivityIndicator,Dimensions,} from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../Config/Autentication'
import { useFocusEffect } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

export default function LeerScreen({ navigation, route }: any) {
  const [tareas, setTareas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchTareas = async () => {
    try {
      setLoading(true)

      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError || !userData?.user) {
        console.error('Error de autenticación:', userError)
        Alert.alert('Error', 'Debes iniciar sesión para ver tus tareas')
        return
      }

      const userId = userData.user.id
      console.log('Obteniendo tareas para el usuario:', userId)

      const { data, error } = await supabase
        .from('tareas')
        .select('*')
        .eq('user_id', userId)
        .order('fecha', { ascending: false })

      if (error) {
        console.error('Error al consultar tareas:', error)
        Alert.alert('Error', `No se pudieron cargar las tareas: ${error.message}`)
        return
      }

      console.log('Datos recibidos de Supabase:', data)
      setTareas(data || [])
    } catch (error: any) {
      console.error('Error al cargar tareas:', error)
      Alert.alert('Error', `No se pudieron cargar las tareas: ${error.message || error}`)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    fetchTareas()
  }

  // Función para eliminar tarea con confirmación
  const handleEliminar = (id: string) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que quieres eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase.from('tareas').delete().eq('id', id)
              if (error) {
                Alert.alert('Error', 'No se pudo eliminar la tarea: ' + error.message)
                return
              }
              Alert.alert('Éxito', 'Tarea eliminada')
              fetchTareas() // refrescar lista
            } catch {
              Alert.alert('Error', 'Error inesperado al eliminar la tarea')
            }
          },
        },
      ],
    )
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchTareas()
    }, [])
  )

  useEffect(() => {
    fetchTareas()
  }, [])

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <View style={styles.loadingIcon}>
            <ActivityIndicator size="large" color="#8b5cf6" />
          </View>
          <Text style={styles.loadingText}>Cargando tareas...</Text>
          <Text style={styles.loadingSubtext}>Un momento por favor</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.backgroundDecoration}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />
        <View style={styles.circle4} />
      </View>

      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Text style={styles.headerIconText}>📋</Text>
        </View>
        <Text style={styles.titulo}>Mis Tareas</Text>
        <Text style={styles.subtitle}>
          {tareas.length} {tareas.length === 1 ? 'tarea' : 'tareas'} registradas
        </Text>
      </View>

      <FlatList
        data={tareas}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {item.completada ? '✅' : '⏳'}
                </Text>
              </View>
              <Text style={styles.tituloTarea}>{item.titulo}</Text>
            </View>
            
            <Text style={styles.descripcion}>{item.descripcion}</Text>
            
            <View style={styles.cardFooter}>
              <View style={styles.dateContainer}>
                <Text style={styles.dateIcon}>📅</Text>
                <Text style={styles.fecha}>{item.fecha}</Text>
              </View>
              
              <Text style={[styles.estado, item.completada ? styles.estadoCompleto : styles.estadoPendiente]}>
                {item.completada ? 'Completada' : 'Pendiente'}
              </Text>
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => navigation.navigate('EditarScreen', { tarea: item })}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonIcon}>✏️</Text>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleEliminar(item.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonIcon}>🗑️</Text>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>📝</Text>
            </View>
            <Text style={styles.emptyTitle}>No hay tareas</Text>
            <Text style={styles.emptyText}>Comienza creando tu primera tarea</Text>
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={fetchTareas}
              activeOpacity={0.8}
            >
              <Text style={styles.refreshIcon}>🔄</Text>
              <Text style={styles.refreshButtonText}>Recargar</Text>
            </TouchableOpacity>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#8b5cf6']}
            tintColor="#8b5cf6"
          />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#a855f7',
    opacity: 0.08,
    top: -60,
    right: -70,
  },
  circle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#c084fc',
    opacity: 0.06,
    bottom: -40,
    left: -50,
  },
  circle3: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#d8b4fe',
    opacity: 0.05,
    top: height * 0.3,
    left: width * 0.9,
  },
  circle4: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8b5cf6',
    opacity: 0.04,
    bottom: height * 0.4,
    right: width * 0.1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f3f0ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 40,
    borderRadius: 20,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  loadingIcon: {
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7c3aed',
    marginBottom: 4,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#64748b',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 32,
    zIndex: 1,
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerIconText: {
    fontSize: 24,
    color: '#ffffff',
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#7c3aed',
    marginBottom: 4,
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
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statusText: {
    fontSize: 16,
  },
  tituloTarea: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    flex: 1,
    letterSpacing: -0.2,
  },
  descripcion: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 22,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  fecha: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  estado: {
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  estadoCompleto: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    color: '#059669',
  },
  estadoPendiente: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    color: '#d97706',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editButton: {
    backgroundColor: '#8b5cf6',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
  buttonIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyIconText: {
    fontSize: 36,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7c3aed',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8b5cf6',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  refreshIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  refreshButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
})