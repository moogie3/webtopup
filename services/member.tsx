import callAPI from '@/config/api';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function getMemberOverview() {
    const url = `${ROOT_API}/${API_VERSION}/players/dashboard`;

    return await callAPI({
        url,
        method: 'GET',
        token: true
    });
}

export async function getMemberTransactions(valueParams: string) {
    let params = '';
    if (valueParams === 'all') {
        params = '';
    } else {
        params = `?status=${valueParams}`
    }
    const url = `${ROOT_API}/${API_VERSION}/players/history${params}`;

    return await callAPI({
        url,
        method: 'GET',
        token: true
    });
}


export async function getTransactionDetail(id: string, token: string) {
    const url = `${ROOT_API}/${API_VERSION}/players/history/${id}/detail`;

    return await callAPI({
        url,
        method: 'GET',
        serverToken: token,
    });
}

export async function updateProfile(data: FormData, id: string) {
    const url = `${ROOT_API}/${API_VERSION}/players/profile/${id}`;

    return await callAPI({
        url,
        method: 'PUT',
        data,
        token: true
    });
}
