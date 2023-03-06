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
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import {Alert} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import assets from '../assets';
import {ScrollView} from 'react-native';
import {useEffect, useState} from 'react';
import {auth} from '../firebase-config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailRequired, setEmailRequired] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [show, setShow] = useState(false);
  const loginHandler = () => {
    setLoading(true);
    if (email === '') {
      setEmailRequired(true);
    }
    if (password === '') {
      setPasswordRequired(true);
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        navigation.replace('Home');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Error Logging In', 'Invalid Email or Password.');
      });
    setLoading(false);
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
        <AnimatedLottieView source={assets.lottieFiles.login} autoPlay loop />
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
                Welcome Back,
              </Heading>
              <Heading
                mt="1"
                _dark={{
                  color: 'warmGray.200',
                }}
                color="coolGray.600"
                fontWeight="medium"
                size="xs">
                Sign in to continue!
              </Heading>

              <VStack space={3} mt="5">
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
                  onPress={loginHandler}
                  isLoading={loading}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 'bold',
                      padding: 4,
                    }}>
                    Sign In
                  </Text>
                </Button>
                <HStack mt="6" justifyContent="center">
                  <Text
                    fontSize="sm"
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    I'm a new user.{' '}
                  </Text>
                  <Link
                    _text={{
                      color: 'indigo.500',
                      fontWeight: 'medium',
                      fontSize: 'sm',
                    }}
                    onPress={() => navigation.navigate('Signup')}>
                    Sign Up
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

export default Login;
