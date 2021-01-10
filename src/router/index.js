import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path*',
            component: () =>
                import ('@/views/redirect/index')
        }]
    },
    {
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () =>
            import ('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () =>
            import ('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            name: 'Dashboard',
            meta: { title: 'dashboard', icon: 'dashboard', affix: true }
        }]
    },



    

    // {
    //     path: '/documentation',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/documentation/index'),
    //         name: 'Documentation',
    //         meta: { title: 'documentation', icon: 'documentation', affix: false }
    //     }]
    // },
    // {
    //     path: '/guide',
    //     component: Layout,
    //     redirect: '/guide/index',
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/guide/index'),
    //         name: 'Guide',
    //         meta: { title: 'guide', icon: 'guide', noCache: true }
    //     }]
    // },
    {
        path: '/profile',
        component: Layout,
        redirect: '/profile/index',
        hidden: true,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/profile/index'),
            name: 'Profile',
            meta: { title: 'profile', icon: 'user', noCache: true }
        }]
    }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    {
        path: '/permission',
        component: Layout,
        redirect: '/permission/page',
        alwaysShow: true, // will always show the root menu
        name: 'Permission',
        meta: {
            title: 'permission',
            icon: 'lock',
            roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [{
                path: 'page',
                component: () =>
                    import ('@/views/permission/page'),
                name: 'PagePermission',
                meta: {
                    title: 'pagePermission',
                    roles: ['admin'] // or you can only set roles in sub nav
                }
            },
            {
                path: 'directive',
                component: () =>
                    import ('@/views/permission/directive'),
                name: 'DirectivePermission',
                meta: {
                    title: 'directivePermission'
                        // if do not set roles, means: this page does not require permission
                }
            },
            {
                path: 'role',
                component: () =>
                    import ('@/views/permission/role'),
                name: 'RolePermission',
                meta: {
                    title: 'rolePermission',
                    roles: ['admin']
                }
            }
        ]
    },

    {
        path: '/clients',
        component: Layout,
        redirect: '/clients/clients',
        children: [{
                path: 'clients',
                component: () =>
                    import ('@/views/clients/index'),
                name: 'Clients',
                meta: { 
                    title: 'Clients', 
                    icon: 'edit', 
                    affix: false,
                    roles: ['sadmin', 'editor'] // you can set roles in root nav
                }
            },
            {
                path: 'details/:id(\\d+)',
                component: () =>
                    import ('@/views/clients/details'),
                name: 'EditArticle',
                meta: { 
                    title: 'Client Details', 
                    noCache: true, 
                    activeMenu: '/clients/clients',
                    roles: ['sadmin', 'editor']
                },
                hidden: true
            },
            {
                path: 'tasks/:id(\\d+)',
                component: () =>
                    import ('@/views/clients/tasks'),
                name: 'EditArticle',
                meta: { 
                    title: 'Matter Details', 
                    noCache: true, 
                    activeMenu: '/clients/clients',
                    roles: ['sadmin', 'editor']
                },
                hidden: true
            }
        ]
    },

    {
        path: 'http://localhost:5000/api/download/:file_name(\\d+)',
        component: Layout,
        redirect: 'crud',
        
        hidden: true
    },

    {
        path: '/matt',
        component: Layout,
        redirect: 'crud',
        children: [{
            path: 'crud',
            component: () =>
                import ('@/views/mat/matter'),
            name: 'Crud',
            meta: { title: 'Matters', icon: 'edit', affix: false, roles: ['sadmin', 'editor'] }
        }]
    },

    {
        path: '/my_tasks',
        component: Layout,
        redirect: 'my_tasks',
        children: [{
            path: 'my_tasks',
            component: () =>
                import ('@/views/my_tasks/index'),
            name: 'My Tasks',
            meta: { title: 'My Tasks', icon: 'edit', affix: false, roles: ['sadmin', 'editor'] }
        }]
    },

    {
        path: '/create',
        component: Layout,
        redirect: '/create/page1',
        name: 'Permission',
        meta: {
            title: 'Settings',
            icon: 'bug',
            roles: ['sadmin', 'editor'] // you can set roles in root nav
        },
        children: [{
                path: 'page1',
                component: () =>
                    import ('@/views/create/index'),
                name: 'Create',
                meta: {
                    title: 'Add User',
                    icon: 'edit',
                    affix: false,
                    roles: ['sadmin', 'editor']
                }
            },
            {
                path: 'role',
                component: () =>
                    import ('@/views/permission/role'),
                name: 'RolePermission',
                meta: {
                    title: 'rolePermission',
                    roles: ['admin']
                }
            },
            {
                path: 'crud',
                component: () =>
                    import ('@/views/crud/index'),
                name: 'Crud',
                meta: { 
                    title: 'Edit Users', 
                    icon: 'edit', 
                    affix: false, 
                    roles: ['sadmin', 'editor'] 
                }
            }
        ]
    },

    // {
    //     path: '/crud',
    //     component: Layout,
    //     redirect: 'crud',
    //     children: [{
    //         path: 'crud',
    //         component: () =>
    //             import ('@/views/crud/index'),
    //         name: 'Crud',
    //         meta: { title: 'crud', icon: 'edit', affix: false, roles: ['sadmin', 'editor'] }
    //     }]
    // },
    // {
    //     path: '',
    //     component: Layout,
    //     redirect: 'dashboard',
    //     meta: {
    //         title: 'Dashboard',
    //         icon: 'dashboard'
    //     },
    //     children: [{
    //             path: 'dashboard',
    //             component: () =>
    //                 import ('@/views/dashboard/index'),
    //             name: 'Overview',
    //             meta: { title: 'Overview', icon: 'dashboard', affix: true }
    //         },
    //         {
    //             path: 'form_4',
    //             component: () =>
    //                 import ('@/views/school_dashboard/form_4'),
    //             name: 'Form 4',
    //             meta: {
    //                 title: 'Form 4',
    //                 icon: 'education',
    //                 roles: ['sadmin', 'editor'] // you can set roles in root nav
    //             },

    //         },
    //         {
    //             path: 'form_3',
    //             component: () =>
    //                 import ('@/views/school_dashboard/form_3'),
    //             name: 'Form 3',
    //             meta: {
    //                 title: 'Form 3',
    //                 icon: 'education',
    //                 roles: ['sadmin', 'normalUser'] // you can set roles in root nav
    //             },

    //         },
    //         {
    //             path: 'form_2',
    //             component: () =>
    //                 import ('@/views/school_dashboard/form_2'),
    //             name: 'Form 2',
    //             meta: {
    //                 title: 'Form 2',
    //                 icon: 'education',
    //                 roles: ['sadmin', 'editor'] // you can set roles in root nav
    //             },

    //         },
    //         {
    //             path: 'form_1',
    //             component: () =>
    //                 import ('@/views/school_dashboard/form_1'),
    //             name: 'Form 1',
    //             meta: {
    //                 title: 'Form 1',
    //                 icon: 'education',
    //                 roles: ['sadmin', 'editor'] // you can set roles in root nav
    //             },

    //         }
    //     ]
    // },

    // {
    //     path: '/examResults',
    //     component: Layout,
    //     // redirect: '/school_dashboard/form_4',
    //     meta: {
    //         title: 'Exam Results',
    //         icon: 'edit',
    //         roles: ['sadmin', 'editor'] // you can set roles in root nav
    //     },
    //     children: [{
    //             path: 'editResults',
    //             component: () =>
    //                 import ('@/views/results/editResults'),
    //             name: 'editResults',
    //             meta: {
    //                 title: 'Edit Results',
    //                 icon: 'form',
    //                 roles: ['sadmin', 'editor'] // you can set roles in root nav
    //             },

    //         },
    //         {
    //             path: 'uploadResults',
    //             component: () =>
    //                 import ('@/views/results/uploadResults'),
    //             name: 'uploadResults',
    //             meta: {
    //                 title: 'Upload Results',
    //                 icon: 'excel',
    //                 roles: ['sadmin', 'editor'] // you can set roles in root nav
    //             },

    //         }
    //     ]
    // },

    // {
    //     path: '/classList',
    //     component: Layout,
    //     // redirect: '/school_dashboard/form_4',
    //     meta: {
    //         title: 'Class List',
    //         icon: 'edit',
    //         roles: ['sadmin', 'editor'] // you can set roles in root nav
    //     },
    //     children: [{
    //             path: 'editList',
    //             component: () =>
    //                 import ('@/views/classList/editList'),
    //             name: 'editList',
    //             meta: {
    //                 title: 'Edit Student Details',
    //                 icon: 'form',
    //                 roles: ['sadmin', 'editor'] // you can set roles in root nav
    //             },

    //         },
    //         {
    //             path: 'uploadlist',
    //             component: () =>
    //                 import ('@/views/classList/uploadList'),
    //             name: 'uploadList',
    //             meta: {
    //                 title: 'Upload Class List',
    //                 icon: 'excel',
    //                 roles: ['sadmin', 'editor'] // you can set roles in root nav
    //             },

    //         }
    //     ]
    // },

    // {
    //     path: '/textMessage',
    //     component: Layout,
    //     // redirect: '/school_dashboard/form_4',
    //     meta: {
    //         title: 'Send Messages',
    //         icon: 'guide',
    //         roles: ['sadmin', 'editor'] // you can set roles in root nav
    //     },
    //     children: [{
    //             path: 'generalMessage',
    //             component: () =>
    //                 import ('@/views/messages/generalMessage'),
    //             name: 'generalMessage',
    //             meta: {
    //                 title: 'Send Message',
    //                 icon: 'guide',
    //                 roles: ['sadmin', 'editor'] // you can set roles in root nav
    //             },

    //         },
    //         {
    //             path: 'resultsMessage',
    //             component: () =>
    //                 import ('@/views/messages/resultsMessage'),
    //             name: 'resultsMessage',
    //             meta: {
    //                 title: 'Send Resuts',
    //                 icon: 'guide',
    //                 roles: ['sadmin', 'editor'] // you can set roles in root nav
    //             },

    //         }
    //     ]
    // },

    // {
    //     path: '/printReport',
    //     component: Layout,
    //     // redirect: '/school_dashboard/form_4',
    //     meta: {
    //         title: 'Print Report Cards',
    //         icon: 'clipboard',
    //         roles: ['sadmin', 'editor'] // you can set roles in root nav
    //     },
    //     children: [{
    //             path: 'multipleReport',
    //             component: () =>
    //                 import ('@/views/reportCard/multipleReport'),
    //             name: 'multipleReport',
    //             meta: {
    //                 title: 'Class Report Cards',
    //                 icon: 'clipboard',
    //                 roles: ['sadmin', 'editor'] // you can set roles in root nav
    //             },

    //         },
    //         {
    //             path: 'singleReport',
    //             component: () =>
    //                 import ('@/views/reportCard/singleReport'),
    //             name: 'singleReport',
    //             meta: {
    //                 title: 'Individual Report Card',
    //                 icon: 'clipboard',
    //                 roles: ['sadmin', 'editor'] // you can set roles in root nav
    //             },

    //         }
    //     ]
    // },

    // {
    //     path: '/mpesa',
    //     component: Layout,
    //     redirect: 'mpesa',
    //     children: [{
    //         path: 'mpesa',
    //         component: () =>
    //             import ('@/views/payments/mpesa'),
    //         name: 'mpesa',
    //         meta: {
    //             title: 'Pay For Text',
    //             icon: 'money',
    //             roles: ['sadmin', 'editor']
    //         }
    //     }]
    // },

    // {
    //     path: '/passwordReset',
    //     component: Layout,
    //     redirect: 'passwordReset',
    //     children: [{
    //         path: 'passwordReset',
    //         component: () =>
    //             import ('@/views/pass/passwordReset'),
    //         name: 'passwordReset',
    //         meta: {
    //             title: 'Change Password',
    //             icon: 'password',
    //             affix: false
    //         }
    //     }]
    // },


    // {
    //     path: '/icon',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/icons/index'),
    //         name: 'Icons',
    //         meta: { title: 'icons', icon: 'icon', noCache: true }
    //     }]
    // },

    // /** when your routing map is too long, you can split it into small modules **/
    // componentsRouter,
    // chartsRouter,
    // nestedRouter,
    // tableRouter,

    // {
    //     path: '/example',
    //     component: Layout,
    //     redirect: '/example/list',
    //     name: 'Example',
    //     meta: {
    //         title: 'example',
    //         icon: 'example'
    //     },
    //     children: [{
    //             path: 'create',
    //             component: () =>
    //                 import ('@/views/example/create'),
    //             name: 'CreateArticle',
    //             meta: { title: 'createArticle', icon: 'edit' }
    //         },
    //         {
    //             path: 'edit/:id(\\d+)',
    //             component: () =>
    //                 import ('@/views/example/edit'),
    //             name: 'EditArticle',
    //             meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
    //             hidden: true
    //         },
    //         {
    //             path: 'list',
    //             component: () =>
    //                 import ('@/views/example/list'),
    //             name: 'ArticleList',
    //             meta: { title: 'articleList', icon: 'list' }
    //         }
    //     ]
    // },

    // {
    //     path: '/tab',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/tab/index'),
    //         name: 'Tab',
    //         meta: { title: 'tab', icon: 'tab' }
    //     }]
    // },

    // {
    //     path: '/error',
    //     component: Layout,
    //     redirect: 'noRedirect',
    //     name: 'ErrorPages',
    //     meta: {
    //         title: 'errorPages',
    //         icon: '404'
    //     },
    //     children: [{
    //             path: '401',
    //             component: () =>
    //                 import ('@/views/error-page/401'),
    //             name: 'Page401',
    //             meta: { title: 'page401', noCache: true }
    //         },
    //         {
    //             path: '404',
    //             component: () =>
    //                 import ('@/views/error-page/404'),
    //             name: 'Page404',
    //             meta: { title: 'page404', noCache: true }
    //         }
    //     ]
    // },

    // {
    //     path: '/error-log',
    //     component: Layout,
    //     children: [{
    //         path: 'log',
    //         component: () =>
    //             import ('@/views/error-log/index'),
    //         name: 'ErrorLog',
    //         meta: { title: 'errorLog', icon: 'bug' }
    //     }]
    // },

    // {
    //     path: '/excel',
    //     component: Layout,
    //     redirect: '/excel/export-excel',
    //     name: 'Excel',
    //     meta: {
    //         title: 'excel',
    //         icon: 'excel'
    //     },
    //     children: [{
    //             path: 'export-excel',
    //             component: () =>
    //                 import ('@/views/excel/export-excel'),
    //             name: 'ExportExcel',
    //             meta: { title: 'exportExcel' }
    //         },
    //         {
    //             path: 'export-selected-excel',
    //             component: () =>
    //                 import ('@/views/excel/select-excel'),
    //             name: 'SelectExcel',
    //             meta: { title: 'selectExcel' }
    //         },
    //         {
    //             path: 'export-merge-header',
    //             component: () =>
    //                 import ('@/views/excel/merge-header'),
    //             name: 'MergeHeader',
    //             meta: { title: 'mergeHeader' }
    //         },
    //         {
    //             path: 'upload-excel',
    //             component: () =>
    //                 import ('@/views/excel/upload-excel'),
    //             name: 'UploadExcel',
    //             meta: { title: 'uploadExcel' }
    //         }
    //     ]
    // },

    // {
    //     path: '/zip',
    //     component: Layout,
    //     redirect: '/zip/download',
    //     alwaysShow: true,
    //     name: 'Zip',
    //     meta: { title: 'zip', icon: 'zip' },
    //     children: [{
    //         path: 'download',
    //         component: () =>
    //             import ('@/views/zip/index'),
    //         name: 'ExportZip',
    //         meta: { title: 'exportZip' }
    //     }]
    // },

    // {
    //     path: '/pdf',
    //     component: Layout,
    //     redirect: '/pdf/index',
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/pdf/index'),
    //         name: 'PDF',
    //         meta: { title: 'pdf', icon: 'pdf' }
    //     }]
    // },
    // {
    //     path: '/pdf/download',
    //     component: () =>
    //         import ('@/views/pdf/download'),
    //     hidden: true
    // },

    // {
    //     path: '/theme',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/theme/index'),
    //         name: 'Theme',
    //         meta: { title: 'theme', icon: 'theme' }
    //     }]
    // },

    // {
    //     path: '/clipboard',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/clipboard/index'),
    //         name: 'ClipboardDemo',
    //         meta: { title: 'clipboardDemo', icon: 'clipboard' }
    //     }]
    // },

    // {
    //     path: '/i18n',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/i18n-demo/index'),
    //         name: 'I18n',
    //         meta: { title: 'i18n', icon: 'international' }
    //     }]
    // },

    // {
    //     path: 'external-link',
    //     component: Layout,
    //     children: [{
    //         path: 'https://github.com/PanJiaChen/vue-element-admin',
    //         meta: { title: 'externalLink', icon: 'link' }
    //     }]
    // },

    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
