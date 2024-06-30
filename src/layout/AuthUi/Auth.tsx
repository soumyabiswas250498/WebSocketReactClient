import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/ui-components/ui/tabs";
import Login from './Login';
import Register from './Register';



function AuthUi() {


    const navigate = useNavigate();
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const auth = queryParams.get('auth');
    const handleRouter = (value: string) => {
        if (value === 'login') {
            navigate('/?auth=login');
        }
        if (value === 'register') {
            navigate('/?auth=register');
        }
    }

    return (
        <div className='flex items-center justify-center w-full lg:h-[90vh]'>
            <Tabs defaultValue={auth || "login"} className="w-[400px] border rounded p-2" onValueChange={(value) => { handleRouter(value) }}>
                <TabsList className='w-full' >
                    <TabsTrigger value="login" className='w-1/3'>Login</TabsTrigger>
                    <TabsTrigger value="register" className='w-1/3'>Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Login />
                </TabsContent>
                <TabsContent value="register">
                    <Register />
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default AuthUi