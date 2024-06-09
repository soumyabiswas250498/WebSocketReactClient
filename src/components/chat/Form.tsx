import React, { useState } from 'react'
import { Textarea } from '@/ui/ui-components/ui/textarea';
import { Button } from '@/ui/ui-components/ui/button';


interface FormInterface {
    handleSubmitMessage: (message: string, setMessage: React.Dispatch<React.SetStateAction<string>>) => void
}

function Form(props: FormInterface) {
    const { handleSubmitMessage } = props;
    const [message, setMessage] = useState('');
    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmitMessage(message, setMessage) }} className='flex flex-col gap-2'>
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
    )
}

export default Form