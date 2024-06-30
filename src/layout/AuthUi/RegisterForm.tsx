import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { registrationSchema } from '@/utils/schemas/authSchema';
import ButtonUi from '@/components/common/common-ui/ButtonCom';
import InputField from '@/components/common/common-ui/InputField';
import { useRegisterApiMutation } from '@/Hooks/Redux/apiSlice';
import { toast } from 'sonner';
import { useTimer } from '@/Hooks/useTimer';

interface RegisterFormProps {
    setIsOtp: (value: boolean) => void;
}


function RegisterForm(props: RegisterFormProps) {
    const { setIsOtp } = props;
    const [handleRegisterApi, { isLoading, isSuccess, error }] = useRegisterApiMutation();
    const { startTimer } = useTimer();

    const initialValues = {
        userName: "",
        email: "",
        password: "",
        conf_password: "",
    }
    const { values, errors, touched, handleBlur, handleChange, resetForm, handleSubmit } = useFormik({
        initialValues,
        validationSchema: registrationSchema,
        onSubmit: (values) => {
            handleRegisterApi({ userName: values.userName, email: values.email, password: values.password })
        }
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success('Registration successful.')
            sessionStorage.setItem('otp-email', values.email)
            setIsOtp(true);
            resetForm();
            startTimer();
        }
    }, [isSuccess])

    useEffect(() => {
        const otpType = sessionStorage.getItem('otpType');
        if (otpType === 'emailVerify') {
            setIsOtp(true)
        }
    }, [])

    return (
        <div className='w-full p-2'>
            <form onSubmit={handleSubmit}>
                <InputField name='userName' type='text' label1='User Name' value={values.userName} onChange={handleChange} onBlur={handleBlur} placeholder={'XyzUser'} error1={touched.userName && errors.userName ? errors.userName : ''} />
                <InputField name='email' type='email' label1='Email ID' value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder={'abc@gmail.com'} error1={touched.email && errors.email ? errors.email : ''} />
                <InputField name='password' type='password' label1='Password' value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder={'********'} error1={touched.password && errors.password ? errors.password : ''} />
                <InputField name='conf_password' type='password' label1='Confirm Password' value={values.conf_password} onChange={handleChange} onBlur={handleBlur} placeholder={'********'} error1={touched.conf_password && errors.conf_password ? errors.conf_password : ''} />

                <div className='pt-2'>
                    <ButtonUi type='submit' label='Register' isLoading={isLoading} onClick={() => handleSubmit} />
                </div>
            </form>
        </div>
    )
}

export default RegisterForm