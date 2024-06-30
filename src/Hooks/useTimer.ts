import React, { useEffect, useState } from 'react';
import { expiry_time } from './../utils/constants';
import { currentTime } from '@/utils/commonFunctions';


export const useTimer = () => {

    const [counter, setCounter] = useState<number>(expiry_time);

    useEffect(() => {
        const otpType = sessionStorage.getItem('otpType');
        if (otpType === 'emailVerify') {
            const startTimeTXT = sessionStorage.getItem('otpStartTime');
            if (startTimeTXT) {
                const startTime = parseInt(startTimeTXT)
                const now = currentTime();
                const timeLeft = expiry_time - (now - startTime)
                if (timeLeft >= 0) {
                    setCounter(timeLeft);
                } else {
                    setCounter(0)
                }
            }
        }
    }, [])

    useEffect(() => {
        const id = setTimeout(() => {
            setCounter((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => {
            clearTimeout(id);
        };
    }, [counter]);

    const startTimer = () => {
        const now = currentTime();
        setCounter(expiry_time);
        sessionStorage.setItem('otpType', 'emailVerify');
        sessionStorage.setItem('otpStartTime', JSON.stringify(now))
    }



    return { setCounter, counter, startTimer }

}
