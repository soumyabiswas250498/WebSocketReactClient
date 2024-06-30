import React, { useState } from 'react'
import { Input } from '@/ui/ui-components/ui/input';
import { Label } from '@/ui/ui-components/ui/label';
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';

interface InputFieldProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    value: string;
    name: string;
    label1: string;
    error1: string;
    placeholder: string;
    type: "text" | "password" | "email" | "number";
}


function InputField(props: InputFieldProps) {
    const { onChange, onBlur, value, name, type, label1, error1, placeholder } = props;
    const [inputType, setInputType] = useState(type)
    return (
        <div className={`${type === 'password' && 'relative'} flex flex-col w-full max-w-sm gap-1.5`}>
            <div className='flex justify-between w-full px-1'>
                <Label htmlFor="email" className=''>{label1}</Label>
                <Label htmlFor="email" className=''></Label>
            </div>

            <Input type={inputType} placeholder={placeholder} id={name} name={name} onChange={onChange} onBlur={onBlur} value={value} className='focus-visible:border-blue-400 focus-visible:ring-1 focus-visible:ring-blue-500' autoComplete='on' />
            {
                type === 'password' && <div className='absolute right-2 top-[34%] w-fit h-fit cursor-pointer'>
                    {inputType === 'password' ? <Eye onClick={() => setInputType('text')} /> : <EyeOff onClick={() => setInputType('password')} />}
                </div>
            }

            <div className='flex justify-between w-full px-1'>
                <Label htmlFor="email" className='text-xs text-red-500'>{error1}</Label>
                <Label htmlFor="email" className='text-xs text-red-500'>&nbsp;</Label>
            </div>
        </div>
    )
}

export default InputField