import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "@/utils/constants";

export const api = createApi({

    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        LoginApi: builder.mutation({
            query: (loginData) => ({
                url: "/users/login",
                method: 'POST',
                body: loginData,
                credentials: 'include'
            }),
        }),

        RegisterApi: builder.mutation({
            query: (regData) => ({
                url: "/users/register",
                method: 'POST',
                body: regData,
                credentials: 'include'
            })
        }),

        SubmitOtpApi: builder.mutation({
            query: (otpData) => ({
                url: '/users/otp-verify',
                method: "POST",
                body: otpData,
            })
        })
    })
})

export const { useLoginApiMutation, useRegisterApiMutation, useSubmitOtpApiMutation } = api;