//一级路由
import { Link, Outlet } from 'react-router-dom';
const Layout = () => {
    return (
        <div>
            {/* 配置二级路由的出口 */}
            <Outlet />
        </div>
    )
}
export default Layout

