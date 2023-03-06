import {useCallback} from 'react';
import {useState} from 'react';
import {useLayoutEffect} from 'react';
import {useEffect} from 'react';
import {Bubble, GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import {auth, db} from '../firebase-config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import {useRoute} from '@react-navigation/native';

const Chat = ({navigation}) => {
  const routes = useRoute();
  const [messages, setMessages] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: routes.params.name,
      headerTitleAlign: 'center',
      headerLeft: () => {
        return (
          <MaterialIcons
            name="arrow-back-ios"
            size={25}
            style={{marginLeft: 14}}
            onPress={() => navigation.navigate('Home')}
          />
        );
      },
    });
    const q = query(
      collection(db, 'chats'),
      where('identification', 'in', [
        auth?.currentUser?.email + routes.params.email,
        routes.params.email + auth?.currentUser?.email,
      ]),

      orderBy('createdAt', 'desc'),
    );
    // console.log(q);
    const unsubscribe = onSnapshot(
      q,
      snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          })),
        ),

      //   snapshot.docs.map(doc => console.log(doc.data())),
    );
    // console.log(messages);
    return () => {
      unsubscribe();
    };
  });
  const onSend = useCallback((messages = []) => {
    const {_id, text, createdAt, user} = messages[0];

    addDoc(collection(db, 'chats'), {
      _id,
      createdAt,
      text,
      user,
      sender: auth?.currentUser?.email,
      reciever: routes.params.email,
      identification: auth?.currentUser?.email + routes.params.email,
    });
  });
  const customBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#0084FF',
          },
          left: {
            backgroundColor: '#E8E8E8',
          },
        }}
        textStyle={{
          right: {
            color: 'white',
          },
        }}
      />
    );
  };
  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: 'white',
          borderTopColor: '#E8E8E8',
          borderTopWidth: 1,
          padding: 2,
        }}
      />
    );
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      showAvatarForEveryMessage={true}
      isTyping={true}
      renderInputToolbar={props => customtInputToolbar(props)}
      renderBubble={props => customBubble(props)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
      }}
    />
  );
};

export default Chat;
