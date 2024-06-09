import React, { useState } from 'react';
import { Input } from '@/ui/ui-components/ui/input';
import { Button } from '@/ui/ui-components/ui/button';


interface UserListInterface {
    handleSelectUser: (userNameTo: string, setUserNameTo: React.Dispatch<React.SetStateAction<string>>) => void
}

function UserList(props: UserListInterface) {
    const { handleSelectUser } = props;
    const [userNameTo, setUserNameTo] = useState('');
    return (
        <div className='flex flex-col gap-2 py-2' >
            <Input type="text" placeholder="Receiver's User Name" value={userNameTo}
                onChange={(e) => { setUserNameTo(e.target.value) }} />
            <div className='flex justify-end'>
                <Button className='w-24' onClick={(e) => {
                    e.preventDefault(); handleSelectUser(userNameTo, setUserNameTo)
                }}>
                    Submit
                </Button>
            </div>

        </div >
    )
}

export default UserList