import React, { useState, useMemo } from 'react';
import { Input } from '@/ui/ui-components/ui/input';
import { Button } from '@/ui/ui-components/ui/button';
import { useNavigate } from 'react-router-dom';



function Login() {
    const [userNameFrom, setUserNameFrom] = useState('');

    // const socket = useMemo(() => io(socket_server), []);
    const navigate = useNavigate();
    const handleStartChat = () => {
        sessionStorage.setItem("userNameFrom", userNameFrom);
        navigate('/chat')
    }
    return (
        <div className='flex flex-col gap-2'>
            <Input type="text" placeholder="Your User Name" onChange={(e) => { setUserNameFrom(e.target.value) }} />

            <div className='flex justify-end '>
                <Button className='w-24' onClick={() => { handleStartChat() }} >
                    Start
                </Button>
            </div>

        </div>
    )
}

export default Login