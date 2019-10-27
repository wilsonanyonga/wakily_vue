import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/api/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/api/list',
        method: 'get',
        params: { token }
    })
}

export function logout(token) {
    return request({
        url: '/api/logout',
        method: 'post',
        params: { token }
    })
}

// export function resetToken(token) {
//     return request({
//         url: '/api/refreshToken',
//         method: 'post',
//         params: { token }
//     })
// }

export function inputData(token, data) {
    return request({
        url: '/api/addUser',
        method: 'post',
        params: { token },
        data
    })
}

export function fetchList(token) {
    return request({
        url: '/api/listAll',
        method: 'get',
        params: { token }
    })
}

export function updateData(token, data) {
    return request({
        url: `/api/list/${data.id}`,
        method: 'put',
        params: { token },
        data
    })
}

export function deleteData(token, data) {
    return request({
        url: `/api/list/${data.id}`,
        method: 'delete',
        params: { token },
        data
    })
}
