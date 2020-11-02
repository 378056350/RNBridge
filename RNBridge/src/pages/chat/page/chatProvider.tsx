import React from 'react';
import {AppRegistry} from 'react-native';
import Chat from '~pages/chat/page/chat';

const ChatProvider = () => {
  return <Chat />;
};

AppRegistry.registerComponent('chat', () => ChatProvider);

export default ChatProvider;
