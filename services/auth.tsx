import { LoginTypes } from './data-types';
import callAPI from '@/config/api';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function setSignUp(data: FormData) {
    const url = `${ROOT_API}/${API_VERSION}/auth/singup`;

    return callAPI({
        url,
        method: 'POST',
        data,
    })
}

export async function setLogin(data: LoginTypes) {
    const url = `${ROOT_API}/${API_VERSION}/auth/singin`;

    return callAPI({
        url,
        method: 'POST',
        data,
    })
}


