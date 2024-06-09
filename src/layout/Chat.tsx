import React, { useEffect, useState, Dispatch, SetStateAction, useReducer } from 'react';
import { io, Socket } from "socket.io-client";
import { socket_server } from '../utils/constants';
import UserList from '@/components/chat/UserList';
import Form from '@/components/chat/Form';
import Messages from '@/components/chat/Messages';

interface Sender {
    id: string;
    userName: string;
}

interface MessageState {
    message: string;
    sender: Sender;
}

const initialMsg: MessageState[] = [];

type Action =
    | { type: "Send"; payload: { message: string } }
    | { type: "Receive"; payload: { message: string; sender: Sender } };

const reducer = (state: MessageState[], action: Action): MessageState[] => {
    switch (action.type) {
        case "Send":
            return [...state, {
                message: action.payload.message, sender: {
                    id: '',
                    userName: 'you'
                }
            }];
        case "Receive":
            return [...state, { message: action.payload.message, sender: action.payload.sender }];
        default:
            return state;
    }
};

function Chat() {
    const userNameFrom = window && window.sessionStorage.getItem('userNameFrom');
    const [userIdTo, setUserIdTo] = useState<string | null>('');
    const [connected, setConnected] = useState('')
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, dispatch] = useReducer(reducer, initialMsg)

    useEffect(() => {
        const newSocket = io(socket_server, {
            auth: { usernameFrom: userNameFrom }
        });

        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log(`connected with id = ${newSocket.id}`);
        });

        newSocket.on('s2c-message', (data) => {
            console.log(data, '***d');
            dispatch({ type: 'Receive', payload: { message: data.message, sender: data.from } })
        });

        newSocket.on('receiveUserId', userIdTo => {

            setUserIdTo(userIdTo);
        })

        return () => {
            newSocket.disconnect(); // Disconnect socket on unmount
        };
    }, [userNameFrom]);

    console.log(userIdTo, '***to')

    const handleSubmitMessage = (message: string, setMessage: Dispatch<SetStateAction<string>>) => {
        if (socket) {
            socket.emit('c2s-message', {
                content: message,
                to: userIdTo,
                from: { id: socket.id, userName: userNameFrom }
            });
            dispatch({ type: 'Send', payload: { message: message } })
            setMessage('');
        }
    }

    const handleSelectUser = (userNameTo: string, setUserNameTo: Dispatch<SetStateAction<string>>) => {

        if (userNameTo && socket) {
            console.log(userNameTo, '***TO')
            setConnected(userNameTo);
            socket.emit('getUserId', userNameTo);
            setUserNameTo('');
        }
    }



    return (
        <div className='flex w-full gap-2'>

            <div className='w-1/3'>
                <h1>User Name: {userNameFrom}</h1>
                {userIdTo && <h1>Connected With: {connected}</h1>}
                <UserList handleSelectUser={handleSelectUser} />
            </div>

            <div className='w-2/3 px-2 border-l border-gray-400'>
                <Messages messages={messages} />

                <Form handleSubmitMessage={handleSubmitMessage} />


            </div>
        </div>



    )
}

export default Chat;
