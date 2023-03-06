import {Box, Button, FormControl, Input, Text} from 'native-base';
import {auth} from '../firebase-config';
import {signOut} from 'firebase/auth';
import {Alert} from 'react-native';
const Account = ({navigation}) => {
  const signoutHandler = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert('Error', 'Error Logging Out. Please Try Again Later.');
      });
  };
  return (
    <Box
      style={{
        margin: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <FormControl isReadOnly>
        <FormControl.Label>Name</FormControl.Label>
        <Input
          variant={'underlined'}
          fontSize={16}
          value={auth.currentUser.displayName}
        />
      </FormControl>
      <FormControl isReadOnly mt={6}>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          variant={'underlined'}
          fontSize={16}
          value={auth.currentUser.email}
        />
      </FormControl>
      <Button
        style={{
          marginTop: 20,
          //   backgroundColor: 'red',
          color: 'red',
          width: '100%',
          borderColor: 'red',
        }}
        _pressed={{background: 'red'}}
        variant={'outline'}
        onPress={signoutHandler}>
        <Text
          style={{
            color: 'red',
            fontSize: 16,
          }}>
          Logout
        </Text>
      </Button>
      {/* <Button>Delete Account</Button> */}
    </Box>
  );
};
export default Account;
