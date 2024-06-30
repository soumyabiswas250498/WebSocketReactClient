import React, { useState, useMemo, useEffect } from 'react';
import { useFormik } from "formik";
import InputField from '@/components/common/common-ui/InputField';
import { useNavigate } from 'react-router-dom';
import ButtonUi from '@/components/common/common-ui/ButtonCom';
import { loginSchema } from '@/utils/schemas/authSchema';
import { useLoginApiMutation } from '@/Hooks/Redux/apiSlice';
import { toast } from 'sonner';



function Login() {
    const navigate = useNavigate();
    const [handleLoginApi, { isLoading, isSuccess, error }] = useLoginApiMutation();





    const initialValues = {
        email: "",
        password: ""
    }
    const { values, errors, touched, handleBlur, handleChange, resetForm, handleSubmit } = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            handleLoginApi(values);
        }
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success('Logged in successfully');
        }
    }, [isSuccess])

    // @ts-expect-error
    const errorMsg = error?.data?.message
    useEffect(() => {
        if (errorMsg) {
            toast.error("Invalid Credentials");
        }
    }, [errorMsg])

    useEffect(() => {
        if (isSuccess) {
            resetForm()
        }
    }, [isSuccess])


    return (
        <div className='w-full h-[392px] p-2 flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='w-full'>
                <InputField name='email' type='email' label1='Email ID' value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder={'abc@gmail.com'} error1={touched.email && errors.email ? errors.email : ''} />
                <InputField name='password' type='password' label1='Password' value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder={'****'} error1={touched.password && errors.password ? errors.password : ''} />
                <div className='pt-2'>
                    <ButtonUi type='submit' label='Login' isLoading={isLoading} onClick={() => handleSubmit} />
                </div>
            </form>
        </div>
    )
}

export default Login