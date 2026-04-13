const BASE_URL = 'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/ka/'
//图标组件 从资源中匹配图标
const Icon = ({ type }) => {
    return (
        <img
            src={`${BASE_URL + type}.svg`}
            alt="icon"
            style={{
                width: 20,
                height: 20,
            }}
        />
    )
}

export default Icon