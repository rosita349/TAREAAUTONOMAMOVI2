import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import Register from '../auth/Register'; 
import login from '../auth/Login'; 
import Tareas from '../Screens/Tareas'; 
import { NavigationContainer } from '@react-navigation/native'; 
import PerfilScreen from '../Screens/PerfilScreen'; 
import { createDrawerNavigator } from '@react-navigation/drawer';  
import LeerScreen from '../Screens/LeerScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';
import EditarScreen from '../Screens/EditarScreen';

const Stack = createStackNavigator(); 
const Drawer = createDrawerNavigator();  

function MyStack(){
    return(     
        <Stack.Navigator screenOptions={{headerShown:false}}>   
           <Stack.Screen name='Welcome' component={WelcomeScreen}/>      
            <Stack.Screen name='Registro' component={Register}/>         
            <Stack.Screen name='Login' component={login}/>         
            <Stack.Screen name='MyDrawer'component={MyDrawer}
            />     
        </Stack.Navigator>      
    ) 
}  

function MyDrawer(){     
    return(       
        <Drawer.Navigator initialRouteName="Tareas" >         
            <Drawer.Screen name='Tareas' component={Tareas} />
            <Drawer.Screen name='Perfil' component={PerfilScreen}/>
            <Drawer.Screen name='Leer' component={LeerScreen}/>
             <Drawer.Screen 
                name='EditarScreen' 
                component={EditarScreen}
                options={{
                    drawerItemStyle: { display: 'none' } 
                }}
            />

        </Drawer.Navigator>     
    ) 
}     

export default function NavegadorPrincipal(){         
    return(             
        <NavigationContainer>                 
            <MyStack/>             
        </NavigationContainer>         
    )     
}