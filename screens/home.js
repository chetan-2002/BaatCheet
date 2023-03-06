import {
  Avatar,
  Box,
  FlatList,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  Pressable,
  Spacer,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {auth, db} from '../firebase-config';
import {collection, getDocs, query, where} from 'firebase/firestore';
const Home = ({navigation}) => {
  const [enteredName, setEnteredName] = useState('');
  const [chats, setChats] = useState([]);

  const submitHandler = () => {
    if (enteredName === '') {
      return;
    }
    const q = query(
      collection(db, 'users'),
      where('name', '==', enteredName),
      where('name', '!=', auth?.currentUser?.displayName),
    );
    const querySnapshot = getDocs(q)
      .then(querySnapshot => {
        const chats = [];
        querySnapshot.forEach(doc => {
          chats.push(doc.data());
        });
        setChats(chats);
        // console.log(chats);
      })
      .catch();
  };
  return (
    <>
      <FormControl
        style={{
          padding: 10,
        }}>
        <Input
          backgroundColor={'#fff'}
          borderRadiusColor={'#fff'}
          placeholder="Start a new chat"
          fontSize={16}
          variant="rounded"
          paddingLeft={4}
          value={enteredName}
          onChangeText={val => {
            setEnteredName(val);
            submitHandler();
          }}
          InputRightElement={
            <Pressable onPress={submitHandler} _pressed={{}}>
              <Icon
                as={<AntDesign name="search1" />}
                size="sm"
                style={{
                  marginRight: 12,
                }}
              />
            </Pressable>
          }
        />
      </FormControl>
      {chats.length == 0 && enteredName.length > 0 ? (
        <Spinner />
      ) : (
        <Box
          style={{
            paddingTop: 4,
            paddingLeft: 12,
            paddingRight: 12,
          }}>
          <FlatList
            data={chats}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  navigation.navigate('Chat', {
                    name: item.name,
                    email: item.email,
                  });
                }}
                borderBottomWidth="0.5"
                _dark={{
                  borderColor: 'muted.50',
                }}
                borderColor="muted.800"
                pl={['0', '4']}
                pr={['0', '5']}
                py="2">
                <HStack space={[2, 3]} justifyContent="space-between">
                  <VStack>
                    <Text
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color="coolGray.800"
                      bold>
                      {item.name}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.email}
                    </Text>
                  </VStack>
                </HStack>
              </Pressable>
              // <Text>{item.name}</Text>
            )}
            keyExtractor={item => item.uid}
          />
        </Box>
      )}
    </>
  );
};

export default Home;
