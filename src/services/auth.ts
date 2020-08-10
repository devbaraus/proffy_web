// import axios from 'axios'

interface Response {
    token: string
    user: {
        user_id: number
        name: string
        email: string
    }
}

export function signIn(params?: object): Promise<Response> {
    return new Promise<Response>(resolve => {
        setTimeout(() => {
            resolve({
                token: 'dagwduwagydwaud',
                user: {
                    user_id: 2,
                    name: 'Bruno de Araujo Alves',
                    email: 'devbaraus@gmail.com'
                }
            })
        }, 300)
    })
    // return axios.get('', {
    //     params
    // })
}
