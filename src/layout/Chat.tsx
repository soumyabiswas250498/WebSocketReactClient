// src/Chat.tsx
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
    id: string;
    text: string;
}

// const socket: Socket = io('http://localhost:8000/socket/'); // Adjust the URL if needed



const socket = io("http://localhost:8000/chat", {
    withCredentials: true,
});


socket.on('connect_error', (err) => {
    console.error('Connection error:', err);
});

socket.on('connect', () => {
    console.log('Successfully connected to the server');

    // Send a test message
    socket.emit('message', { text: 'Hello, server!' });
});



const Chat: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socket.on('message', (data: Message) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() !== '') {
            const newMessage: Message = { id: new Date().toISOString(), text: message };
            socket.emit('message', newMessage);
            setMessage('');
        }
    };

    return (
        <div>
            <div style={{ maxHeight: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {messages.map((msg) => (
                    <div key={msg.id}>{msg.text}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                style={{ width: '80%' }}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
