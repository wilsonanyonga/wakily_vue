import request from '@/utils/request'

// ----------------------------------------------------------------------------------
// -------------------------------POST---------------------------------------------
// ----------------------------------------------------------------------------------

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

export function inputData_clients(token, data) {
    return request({
        url: '/api/addClient',
        method: 'post',
        params: { token },
        data
    })
}

export function inputData_matters(token, data) {
    console.log(data)
    return request({
        url: '/api/addMatter',
        method: 'post',
        params: { token },
        data
    })
}

export function inputData_tasks(token, data) {
    console.log(data)
    return request({
        url: '/api/addTask',
        method: 'post',
        params: { token },
        data
    })
}

export function inputData_billing(token, data) {
    // console.log(data)
    return request({
        url: '/api/addBilling',
        method: 'post',
        params: { token },
        data
    })
}

// ----------------------------------------------------------------------------------
// -------------------------------GET---------------------------------------------
// ----------------------------------------------------------------------------------

export function fetchList(token) {
    return request({
        url: '/api/listAll',
        method: 'get',
        params: { token }
    })
}

// getting dashboard data
export function fetchDash(token, data) {
    // console.log(data)
    // console.log('thi is')
    return request({
        url: `/api/list_dash/${data.user_name}`,        
        method: 'get',
        params: { token }
    })
}

export function fetchList_clients(token) {
    return request({
        url: '/api/listClients',
        method: 'get',
        params: { token }
    })
}

// getting individual client data
export function fetchClient_individual(token, data) {
    // console.log(data)
    // console.log('thi is')
    return request({
        url: `/api/listClient/${data.id}`,        
        method: 'get',
        params: { token }
    })
}

// getting individual matter data
export function fetchMatter_individual(token, data) {
    // console.log(data)
    // console.log('thi is')
    return request({
        url: `/api/listMatter/${data.id}`,        
        method: 'get',
        params: { token }
    })
}

// getting individual client matters
export function fetchClient_matters(token, data) {
    // console.log(data)
    // console.log('thi is')
    return request({
        url: `/api/listMatters/${data.client_id}`,        
        method: 'get',
        params: { token }
    })
}

// getting individual client matters
export function fetch_matters(token) {
    // console.log(data)
    // console.log('thi is')
    return request({
        url: `/api/listMatters`,        
        method: 'get',
        params: { token }
    })
}

// getting individual matters tasks
export function fetchClient_tasks(token, data) {
    // console.log(data)
    // console.log('thi is')
    return request({
        url: `/api/listTasks/${data.mat_id}`,        
        method: 'get',
        params: { token }
    })
}

// getting individual users tasks
export function fetchUser_tasks(token, data) {
    // console.log(data)
    // console.log('thi is')
    return request({
        url: `/api/list_individualTasks/${data.user_name}`,        
        method: 'get',
        params: { token }
    })
}

// getting individual client billing
export function fetchClient_billings(token, data) {
    // console.log(data)
    // console.log('thi is')
    return request({
        url: `/api/listBillings/${data.client_id}`,        
        method: 'get',
        params: { token }
    })
}

// getting list of users so that they can be assigned tasks
export function fetchSelect(token) {
    return request({
        url: '/api/listAll',
        method: 'get',
        params: { token }
    })
}


// getting all uploads in the system
export function fetchUpload(token, data) {
    return request({
        url: `/api/uploads_all/${data.mat_id}`,
        method: 'get',
        params: { token }
    })
}

// posting uploads in the system
export function postUpload(token, data) {
    console.log(data)
    console.log('tuko hapa')
    return request({
        url: '/api/uploads',
        method: 'post',
        params: { token },
        data
        
    })
}

// ----------------------------------------------------------------------------------
// -------------------------------UPDATE---------------------------------------------
// ----------------------------------------------------------------------------------

export function updateData(token, data) {
    return request({
        url: `/api/list/${data.id}`,
        method: 'put',
        params: { token },
        data
    })
}

export function updateData_client(token, data) {
    return request({
        url: `/api/listClient/${data.id}`,
        method: 'put',
        params: { token },
        data
    })
}

export function updateData_matter(token, data) {
    return request({
        url: `/api/listMatter/${data.id}`,
        method: 'put',
        params: { token },
        data
    })
}

export function updateData_task(token, data) {
    return request({
        url: `/api/listTask/${data.id}`,
        method: 'put',
        params: { token },
        data
    })
}

export function updateData_billing(token, data) {
    return request({
        url: `/api/listBilling/${data.id}`,
        method: 'put',
        params: { token },
        data
    })
}

// ----------------------------------------------------------------------------------
// -------------------------------DELETE---------------------------------------------
// ----------------------------------------------------------------------------------

export function deleteData(token, data) {
    return request({
        url: `/api/list/${data.id}`,
        method: 'delete',
        params: { token },
        data
    })
}

export function deleteData_clients(token, data) {
    return request({
        url: `/api/listClient/${data.id}`,
        method: 'delete',
        params: { token },
        data
    })
}

export function deleteData_matter(token, data) {
    return request({
        url: `/api/listMatter/${data.id}`,
        method: 'delete',
        params: { token },
        data
    })
}

export function deleteData_task(token, data) {
    return request({
        url: `/api/listTask/${data.id}`,
        method: 'delete',
        params: { token },
        data
    })
}

export function deleteData_billing(token, data) {
    return request({
        url: `/api/listBilling/${data.id}`,
        method: 'delete',
        params: { token },
        data
    })
}