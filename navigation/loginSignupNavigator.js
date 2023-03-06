import {createStackNavigator} from '@react-navigation/stack';
import {auth} from '../firebase-config';
import Chat from '../screens/Chat';

const Stack = createStackNavigator();
import Login from '../screens/login';
import Signup from '../screens/signup';
import BottomNavigator from './bottomNavigator';

const LoginSignupNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={BottomNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        // options={{
        //   headerShown: true,
        //   title: auth?.currentUser?.displayName,
        //   headerTitleAlign: 'center',
        //   headerLeft: () => {
        //     return (
        //       <MaterialIcons
        //         name="arrow-back-ios"
        //         size={25}
        //         style={{marginLeft: 10}}
        //         onPress={() => navigation.navigate('Home')}
        //       />
        //     );
        //   },
        // }}
      />
    </Stack.Navigator>
  );
};

export default LoginSignupNavigator;
