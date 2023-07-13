import {io} from 'socket.io-client';
import {socketapiurl} from '.';
// const socket = io('ws://http://192.168.0.103:2004', {
const socket = io(socketapiurl, {
  transports: ['websocket'],
});
export default socket;
