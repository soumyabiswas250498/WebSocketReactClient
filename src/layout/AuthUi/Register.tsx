import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import OtpForm from './OtpForm';

function Register() {
    const [isOtp, setIsOtp] = useState(false);
    return <div>
        {
            isOtp ? <OtpForm isOtp={isOtp} setIsOtp={setIsOtp} /> : <RegisterForm setIsOtp={setIsOtp} />
        }
    </div>

}

export default Register