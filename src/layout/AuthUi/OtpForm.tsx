import React, { useEffect, useState } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/ui/ui-components/ui/input-otp'
import ButtonUi from '@/components/common/common-ui/ButtonCom';
import { TimeCount } from '@/components/common/common-ui/TimeCount';
import { SquareArrowLeft } from 'lucide-react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useTimer } from '@/Hooks/useTimer';
import { expiry_time } from '@/utils/constants';
import expireLogo from '../../assets/expired.png';
import { useSubmitOtpApiMutation } from '@/Hooks/Redux/apiSlice';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';



interface OtpFormInterface {
    setIsOtp: (value: boolean) => void;
    isOtp: boolean;
}

function OtpForm(props: OtpFormInterface) {
    const { isOtp, setIsOtp } = props;
    const [otp, setOtp] = useState('');
    const { counter, startTimer } = useTimer();
    const [handleOtpData, { isSuccess, error, isLoading }] = useSubmitOtpApiMutation();
    const navigate = useNavigate();
    const handleResetOtp = () => {
        startTimer();
    }

    const handleSubmitOtp = (otp: string) => {
        const email = sessionStorage.getItem('otp-email');
        handleOtpData({ email, otp })
    }

    useEffect(() => {
        if (isSuccess) {
            sessionStorage.removeItem('otp-email');
            sessionStorage.removeItem('otpType');
            sessionStorage.removeItem('otpStartTime');
            toast.success('OTP Verified');
            setIsOtp(false);
            navigate('/')
        }
    }, [isSuccess])

    // @ts-expect-error
    const errorMsg = error?.data?.message
    useEffect(() => {
        if (errorMsg) {
            toast.error('Invalid OTP')
        }
    }, [errorMsg])

    return (
        <div className='w-full h-[392px] p-2'>
            <div className='flex justify-start w-full'>
                <SquareArrowLeft
                    className='cursor-pointer'
                    onClick={() => {
                        setIsOtp(false);
                        sessionStorage.removeItem('otpType');
                        sessionStorage.removeItem('otpStartTime');
                        sessionStorage.removeItem('otp-email')
                    }}
                />
            </div>
            <div className='flex items-center justify-center w-full'>
                {
                    !!counter ?
                        <div className='flex flex-col justify-center items-center  h-[260px]'>
                            <div className='flex items-center justify-center'>
                                <TimeCount size={80} progress={counter} total={expiry_time} />
                            </div>

                            <div className='py-4 text-sm'>
                                <h1>OTP is sent to you Email Id.</h1>
                                <h1>Please enter the OTP and verify yourself.</h1>
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <InputOTP maxLength={5} value={otp} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onChange={(e) => { setOtp(e) }}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                    </InputOTPGroup>
                                </InputOTP>

                            </div>
                        </div>
                        :
                        <div className='flex flex-col items-center justify-center h-[260px]'>
                            <img src={expireLogo} alt='expireLogo' height={70} width={70} />
                            <p className='font-bold text-red-500'>OTP Expired</p>
                        </div>
                }

            </div>
            {
                !!counter ?

                    <div className='pt-4'>
                        <ButtonUi type='button' label='Verify'
                            disabled={otp.length !== 5}
                            onClick={() => handleSubmitOtp(otp)}
                            isLoading={isLoading}
                        />
                    </div>
                    :
                    <div>
                        <div className='pt-4'>
                            <ButtonUi type='button' label='Resend OTP' onClick={() => handleResetOtp()} />
                        </div>
                    </div>
            }


        </div>
    )
}

export default OtpForm