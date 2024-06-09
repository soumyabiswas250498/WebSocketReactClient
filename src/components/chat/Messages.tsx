import React from 'react'


interface Sender {
    id: string;
    userName: string;
}

interface MessageState {
    message: string;
    sender: Sender;
}

interface MessagesInterface {
    messages: MessageState[]
}

function Messages(props: MessagesInterface) {
    const { messages } = props;
    console.log(messages, '***m')
    return (
        <div className='h-[calc(100vh-195px)] p-4 flex flex-col justify-end' >
            {messages.map((item, index) => <div key={index} className={`w-full flex ${item.sender.userName === 'you' ? 'justify-end' : 'justify-start'}`}><p>{item.message}</p></div>)}

        </div>
    )
}

export default Messages