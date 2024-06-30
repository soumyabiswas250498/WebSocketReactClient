import React from 'react'
import { Loader2 } from "lucide-react"
import { Button } from '@/ui/ui-components/ui/button';


interface ButtonUiProps {
    disabled?: boolean;
    isLoading?: boolean;
    label: string;
    type: "button" | "submit" | "reset"; // HTML button types
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function ButtonUi(props: ButtonUiProps) {
    const { disabled, isLoading, label, type, onClick } = props;
    return (
        <Button type={type} disabled={isLoading || disabled} onClick={onClick} className='min-w-24' >
            {
                isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            }
            {label}
        </Button>
    )
}

export default ButtonUi