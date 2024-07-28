import { useCookies } from 'react-cookie';
import { encryptAES, decryptAES } from './Encryption';


function useCookiesFunc() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const saveCookie = (data: { key: string, value: string, isEncrypted?: boolean },) => {
        const { value, key, isEncrypted } = data;
        const finalValue = isEncrypted ? encryptAES(value) : value;
        setCookie(key, finalValue)
    }

    return { saveCookie, cookies }
}





export { useCookiesFunc }