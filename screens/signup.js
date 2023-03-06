import AnimatedLottieView from 'lottie-react-native';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  Link,
  Pressable,
  Text,
  useToast,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth, db} from '../firebase-config';
import {useState} from 'react';
import {Alert, ScrollView} from 'react-native';
import assets from '../assets';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {addDoc, collection} from 'firebase/firestore';

const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailRequired, setEmailRequired] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [nameRequired, setNameRequired] = useState(false);
  const [show, setShow] = useState(false);

  const signupHandler = () => {
    if (email === '') {
      setEmailRequired(true);
      return;
    }
    if (password === '') {
      setPasswordRequired(true);
      return;
    }
    if (name === '') {
      setNameRequired(true);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        navigation.replace('Home');
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {})
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
        addDoc(collection(db, 'users'), {
          name: name,
          email: email,
          uid: user.uid,
        })
          .then(() => {})
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        Alert.alert('Error Signing Up', errorMessage);
        // setEmail('');
      });
  };
  return (
    <>
      <Box
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          height: '50%',
        }}>
        <AnimatedLottieView source={assets.lottieFiles.signup} autoPlay loop />
      </Box>
      <ScrollView>
        <Box>
          <Center w="100%">
            <Box safeArea p="2" py="8" w="90%">
              <Heading
                size="lg"
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                  color: 'warmGray.50',
                }}>
                Welcome to{' '}
                <Text
                  style={{
                    color: 'blue',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                  }}>
                  Baat Cheet
                </Text>
                ,
              </Heading>
              <Heading
                mt="1"
                _dark={{
                  color: 'warmGray.200',
                }}
                color="coolGray.600"
                fontWeight="medium"
                size="xs">
                Sign up to continue!
              </Heading>

              <VStack space={3} mt="5">
                <FormControl isRequired isInvalid={nameRequired && name == ''}>
                  <FormControl.Label>Name</FormControl.Label>
                  <Input
                    fontSize={16}
                    type="text"
                    variant="underlined"
                    value={name}
                    onChangeText={val => {
                      setName(val);
                    }}
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    Name is required
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={emailRequired && email == ''}>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    fontSize={16}
                    type="email"
                    variant="underlined"
                    value={email}
                    onChangeText={val => {
                      setEmail(val);
                    }}
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    Email is required
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={passwordRequired && password == ''}>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    value={password}
                    onChangeText={val => {
                      setPassword(val);
                    }}
                    fontSize={16}
                    variant={'underlined'}
                    type={show ? 'text' : 'password'}
                    InputRightElement={
                      <Pressable onPress={() => setShow(!show)}>
                        <Icon
                          as={
                            <MaterialIcons
                              name={show ? 'visibility' : 'visibility-off'}
                            />
                          }
                          size={5}
                          mr="2"
                          color="muted.400"
                        />
                      </Pressable>
                    }
                    // placeholder="Password"
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    Password is required
                  </FormControl.ErrorMessage>
                </FormControl>
                <Button
                  mt="2"
                  colorScheme="blue"
                  variant={'solid'}
                  isLoading={loading}
                  onPress={signupHandler}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 'bold',
                      padding: 4,
                    }}>
                    Sign Up
                  </Text>
                </Button>
                <HStack mt="6" justifyContent="center">
                  <Text
                    fontSize="sm"
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    I already have an account.{' '}
                  </Text>
                  <Link
                    _text={{
                      color: 'indigo.500',
                      fontWeight: 'medium',
                      fontSize: 'sm',
                    }}
                    onPress={() => navigation.navigate('Login')}>
                    Sign In
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </Box>
      </ScrollView>
    </>
  );
};

export default Signup;
