import React, { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";
import { socket_server } from '../utils/constants';
import { Textarea } from '@/ui/ui-components/ui/textarea';
import { Button } from '@/ui/ui-components/ui/button';
import { Input } from "@/ui/ui-components/ui/input"

function Chat() {
    const userNameFrom = window && window.sessionStorage.getItem('userNameFrom');
    const [userNameTo, setUserNameTo] = useState('');
    const [userIdTo, setUserIdTo] = useState<string | null>('');

    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(socket_server, {
            auth: { usernameFrom: userNameFrom, userNameTo: userNameTo }
        });

        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log(`connected with id = ${newSocket.id}`);
        });


        newSocket.on('s2c-message', (data) => {
            console.log(data);
        });
        newSocket.on('receiveUserId', userIdTo => {

            setUserIdTo(userIdTo);
        })

        return () => {
            newSocket.disconnect(); // Disconnect socket on unmount
        };
    }, [userNameFrom]);

    console.log(userIdTo, '***to')

    const handleSubmitMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (socket) {
            socket.emit('c2s-message', {
                content: message,
                to: userIdTo,
            });
            setMessage('');
        }
    }

    const handleSelectUser = () => {

        if (userNameTo && socket) {
            socket.emit('getUserId', userNameTo);
            setUserNameTo('');
        }
    }

    return (
        <div className='w-2/3'>
            <div className='flex flex-col gap-2 py-2'>
                <Input type="text" placeholder="Receiver's User Name" value={userNameTo} onChange={(e) => { setUserNameTo(e.target.value) }} />
                <div className='flex justify-end'>
                    <Button className='w-24' onClick={(e) => {
                        e.preventDefault(); handleSelectUser()
                    }}>
                        Submit
                    </Button>
                </div>

            </div>

            <form onSubmit={handleSubmitMessage} className='flex flex-col gap-2'>
                <Textarea
                    placeholder="Type your message here."
                    id='textArea'
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <div className='flex justify-end'>
                    <Button className='w-24'>
                        Send
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Chat;
