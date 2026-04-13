//编写路由配置
import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/page/Layout'
import New from '@/page/new'
import Month from '@/page/month'
import Year from '@/page/year'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/month',
                element: <Month />
            },
            {
                path: '/year',
                element: <Year />
            }
        ]
    },
    {
        path: '/new',
        element: <New />
    }
])
export default router
