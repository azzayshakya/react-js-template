import AdminHeaderComponent from '@devStack/components/sidebar/components/AdminHeaderComponent'
import { USER_ROLES } from '@devStack/components/sidebar/constants/Permission'
import MENU_CONFIG from '@devStack/components/sidebar/control/MenuConfig'
import useMenu from '@devStack/components/sidebar/hooks/UseMenu'
import { buildBreadcrumbs } from '@devStack/components/sidebar/utilities/breadCrumbBuilder'
import { buildMenuItems } from '@devStack/components/sidebar/utilities/MenuBuilder'
import { App_Name } from '@devStack/constants'
import useThemeStore from '@devStack/store/useThemeStore'
import { Layout, Menu, theme, Typography } from 'antd'
import { useState, useMemo } from 'react'
import { Outlet } from 'react-router-dom'

const { Sider } = Layout
const { Text } = Typography

const MainLayout = ({ userRole = USER_ROLES.ADMIN, userData = null }) => {
  const [collapsed, setCollapsed] = useState(false)
  const scheme = useThemeStore((s) => s.scheme)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const { selectedKeys, openKeys, handleMenuClick, handleOpenChange } = useMenu({
    defaultSelectedKey: 'dashboard',
    persistState: true,
  })

  const menuItems = useMemo(() => {
    return buildMenuItems(MENU_CONFIG, userRole)
  }, [userRole])

  const breadcrumbItems = useMemo(() => {
    return buildBreadcrumbs(selectedKeys[0])
  }, [selectedKeys])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={250}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            margin: '16px',
            borderRadius: '8px',
          }}
        >
          <Text
            strong
            style={{
              color: 'white',
              fontSize: collapsed ? '16px' : '20px',
              transition: 'font-size 0.3s',
            }}
          >
            {collapsed ? `${App_Name}` : `${App_Name}`}
          </Text>
        </div>

        <Menu
          theme={scheme === 'dark' ? 'dark' : 'light'}
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          items={menuItems}
          onClick={handleMenuClick}
          onOpenChange={handleOpenChange}
        />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: 'margin-left 0.2s',
        }}
      >
        <AdminHeaderComponent
          colorBgContainer={colorBgContainer}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
          userData={userData}
          breadcrumbItems={breadcrumbItems}
        />

        <div
          style={{
            // minHeight: "calc(100vh - 64px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            flex: 1,
          }}
        >
          <Outlet />
        </div>

        {/* <AdminFooterComponentx color={colorBgContainer} /> */}
      </Layout>
    </Layout>
  )
}

export default MainLayout
