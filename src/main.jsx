import { createRoot } from 'react-dom/client'
//路由相关
import router from './router'
import { RouterProvider } from 'react-router-dom'
//状态管理相关
import store from './store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
