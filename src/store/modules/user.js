import { login, logout, getInfo, resetToken, inputData, inputData_clients, inputData_matters, inputData_tasks, inputData_billing, fetchList, fetchDash, postUpload, fetchUpload, fetchList_clients, fetchClient_individual, fetchClient_matters, fetch_matters, fetchClient_tasks, fetchUser_tasks, fetchClient_billings, fetchMatter_individual, fetchSelect, updateData, updateData_client, updateData_matter, updateData_task, updateData_billing, deleteData, deleteData_clients, deleteData_matter, deleteData_task, deleteData_billing } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { email, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ email: email, password: password }).then(response => {
                const data = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const data = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                // const { roles, name, avatar, introduction } = data

                var roles = [data.data.roles]
                var name = data.data.name
                // console.log(data.data.id)
                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }

                commit('SET_ROLES', roles)
                commit('SET_NAME', name)
                    // commit('SET_AVATAR', avatar)
                    // commit('SET_INTRODUCTION', introduction)
                resolve(roles)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // post/create data
    inputData({ state }, userInfo) {
        const { name, email, pass, roles } = userInfo
        return new Promise((resolve, reject) => {
            inputData(state.token, { name: name, email: email, password: pass, roles: roles }).then(() => {
                console.log('success')
                resolve()
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    // post/create clients data
    inputData_clients({ state }, userInfo) {
        console.log('input module')
        const { name, address, phone, county, email, town, country } = userInfo
        return new Promise((resolve, reject) => {
            inputData_clients(state.token, { name: name, address: address, phone: phone, county: county, email: email, town: town, country: country }).then(() => {
                console.log('success')
                resolve()
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },

    // post/create matter data
    inputData_matters({ state }, userInfo) {
        console.log('input module')
        const { id, case_status, ref_number, case_title, name, lawyers, hearing_date, practice_area, court, oppose, description, amount } = userInfo
        console.log(userInfo)
        return new Promise((resolve, reject) => {
            inputData_matters(state.token, { client_id: id, case_status: case_status, ref_number: ref_number, case_title: case_title, client_name: name, lawyers: lawyers, hearing_date: hearing_date, practice_area: practice_area, court: court, oppose: oppose, description: description, amount: amount }).then(() => {
                console.log('success')
                resolve()
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },

    // post/create task data
    inputData_tasks({ state }, userInfo) {
        console.log('input module')
        const { mat_id, client_name, due_date, lawyers, priority, description } = userInfo
        console.log(userInfo)
        return new Promise((resolve, reject) => {
            inputData_tasks(state.token, { mat_id: mat_id, client_name: client_name, due_date: due_date, lawyers: lawyers, priority: priority, description: description }).then(() => {
                console.log('success')
                resolve()
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },

    // post/create task data
    inputData_billing({ state }, userInfo) {
        console.log('input module')
        const { client_id, description, amount_due, amount_paid } = userInfo
        console.log(userInfo)
        return new Promise((resolve, reject) => {
            inputData_billing(state.token, { client_id: client_id, amount_due: amount_due, amount_paid: amount_paid, description: description }).then(() => {
                console.log('success')
                resolve()
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },

// ----------------------------------------------------------------------------------------
// -------------------------------UPDATE---------------------------------------------------
// ----------------------------------------------------------------------------------------

    // get/read data
    fetchList({ state }) {
        return new Promise((resolve, reject) => {
            fetchList(state.token).then(response => {
                const res = response.data
                    //console.log(res)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // fetching dashboard data
    fetchDash({ state }) {
        // const mat_id = userInfo
        // console.log(userInfo)
        return new Promise((resolve, reject) => {
            fetchDash(state.token, { user_name: state.name }).then(response => {
                const res = response.data
                console.log(res)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // fetching uploaded files
    fetchUpload({ state }, userInfo) {
        // const mat_id = userInfo
        const mat_id = userInfo
        // console.log(userInfo)
        return new Promise((resolve, reject) => {
            fetchUpload(state.token, { mat_id: mat_id }).then(response => {
                const res = response.data
                console.log(res)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // posting uploaded file
    postUpload({ state }, userInfo) {
        const { enco, mat_id, fileName } = userInfo
        // const up_id = mat_ident
        // console.log(userInfo)
        // console.log('tuko hapa'+up_id)
        console.log('tuko hapa'+userInfo)
        return new Promise((resolve, reject) => {
            postUpload(state.token, { fileUpload: enco, up_id: mat_id, fileName: fileName }).then(response => {
                const res = response.data
                // console.log(res)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get/read client data
    fetchList_clients({ state }) {
        return new Promise((resolve, reject) => {
            fetchList_clients(state.token).then(response => {
                const res = response.data
                    //console.log(res)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // fetching individual client data
    fetchClient_individual({ state }, userInfo) {
        const id = userInfo
        console.log(userInfo)
        return new Promise((resolve, reject) => {
            fetchClient_individual(state.token, { id: id }).then(response => {
                const res = response.data
                console.log(res)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // fetching individual Matter data
    fetchMatter_individual({ state }, userInfo) {
        const id = userInfo
        console.log(userInfo)
        return new Promise((resolve, reject) => {
            fetchMatter_individual(state.token, { id: id }).then(response => {
                const res = response.data
                console.log(res)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // fetching client matters
    fetchClient_matters({ state }, userInfo) {
        const client_id = userInfo
        console.log(userInfo)
        return new Promise((resolve, reject) => {
            fetchClient_matters(state.token, { client_id: client_id }).then(response => {
                const res = response.data
                console.log(res)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // fetching all client matters
    fetch_matters({ state }) {
        return new Promise((resolve, reject) => {
            fetch_matters(state.token).then(response => {
                const res = response.data
                console.log(res)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // fetching client tasks
    fetchClient_tasks({ state }, userInfo) {
        const mat_id = userInfo
        console.log(userInfo)
        return new Promise((resolve, reject) => {
            fetchClient_tasks(state.token, { mat_id: mat_id }).then(response => {
                const res = response.data
                console.log(res)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // fetching users tasks
    fetchUser_tasks({ state }) {
        // const mat_id = userInfo
        // console.log(userInfo)
        return new Promise((resolve, reject) => {
            fetchUser_tasks(state.token, { user_name: state.name }).then(response => {
                const res = response.data
                console.log(res)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // fetching client tasks
    fetchClient_billings({ state }, userInfo) {
        const client_id = userInfo
        console.log(userInfo)
        return new Promise((resolve, reject) => {
            fetchClient_billings(state.token, { client_id: client_id }).then(response => {
                const res = response.data
                console.log(res)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get/read data to be used on select menu
    fetchSelect({ state }) {
        return new Promise((resolve, reject) => {
            fetchSelect(state.token).then(response => {
                const res = response.data
                    //console.log(res)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

// ----------------------------------------------------------------------------------------
// -------------------------------UPDATE---------------------------------------------------
// ----------------------------------------------------------------------------------------

    // update data
    updateData({ state }, userInfo) {
        const { name, email, id, roles } = userInfo
        return new Promise((resolve, reject) => {
            updateData(state.token, { name: name, email: email, id: id, roles: roles }).then(() => {
                console.log('success')
                resolve()
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    // update client data
    updateData_client({ state }, userInfo) {
        const { name, address, phone, county, email, town, country, id } = userInfo
        return new Promise((resolve, reject) => {
            updateData_client(state.token, { name: name, address: address, phone: phone, county: county, email: email, town: town, country: country, id: id }).then(() => {
                console.log('success')
                resolve()
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },

    // update matter data
    updateData_matter({ state }, userInfo) {
        const { id, case_status, case_title, ref_number, client_name, lawyers, hearing_date, practice_area, court, oppose, description, amount } = userInfo
        return new Promise((resolve, reject) => {
            updateData_matter(state.token, { case_status: case_status, case_title: case_title, ref_number: ref_number, client_name: client_name, lawyers: lawyers, hearing_date: hearing_date, practice_area: practice_area, court: court, oppose: oppose, description: description, amount: amount, id: id }).then(() => {
                console.log('success')
                resolve()
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },

    // update task data
    updateData_task({ state }, userInfo) {
        const { id, mat_id, client_name, due_date, lawyers, priority, description } = userInfo
        return new Promise((resolve, reject) => {
            updateData_task(state.token, { mat_id: mat_id, client_name: client_name, due_date: due_date, lawyers: lawyers, priority: priority, description: description, id: id }).then(() => {
                console.log('success')
                resolve()
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },

    // update billing data
    updateData_billing({ state }, userInfo) {
        const { id, client_id, description, amount_due, amount_paid } = userInfo
        return new Promise((resolve, reject) => {
            updateData_billing(state.token, { client_id: client_id, amount_due: amount_due, amount_paid: amount_paid, description: description, id: id }).then(() => {
                console.log('success')
                resolve()
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },

    // delete data
    deleteData({ state }, userInfo) {
        const { id } = userInfo
        return new Promise((resolve, reject) => {
            deleteData(state.token, { id: id }).then(() => {
                console.log('success')
                resolve()
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },

    // delete data
    deleteData_clients({ state }, userInfo) {
        const { id } = userInfo
        return new Promise((resolve, reject) => {
            deleteData_clients(state.token, { id: id }).then(() => {
                console.log('success')
                resolve()
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },

    // delete member data
    deleteData_matter({ state }, userInfo) {
        const { id } = userInfo
        return new Promise((resolve, reject) => {
            deleteData_matter(state.token, { id: id }).then(() => {
                console.log('success')
                resolve()
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },

    // delete member data
    deleteData_task({ state }, userInfo) {
        const { id } = userInfo
        return new Promise((resolve, reject) => {
            deleteData_task(state.token, { id: id }).then(() => {
                console.log('success')
                resolve()
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },

    // delete member data
    deleteData_billing({ state }, userInfo) {
        const { id } = userInfo
        return new Promise((resolve, reject) => {
            deleteData_billing(state.token, { id: id }).then(() => {
                console.log('success')
                resolve()
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },

    // dynamically modify permissions
    changeRoles({ commit, dispatch }, role) {
        return new Promise(async resolve => {
            const token = role + '-token'

            commit('SET_TOKEN', token)
            setToken(token)

            const roles = await dispatch('getInfo')

            resetRouter()

            // generate accessible routes map based on roles
            const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

            // dynamically add accessible routes
            router.addRoutes(accessRoutes)

            // reset visited views and cached views
            dispatch('tagsView/delAllViews', null, { root: true })

            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
