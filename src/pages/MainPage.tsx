import { Link, Outlet } from 'react-router-dom'

import { Lists } from '@/features/list/ui/Lists.tsx'
import { HeaderMenu } from '@/features/user/ui/HeaderMenu'
import { Layout } from '@/shared/components/Layout/Layout.tsx'

export const MainPage = () => {
  return (
    <Layout>
      <Layout.Header>
        <Link to="/" className="cursor-pointer text-2xl text-white hover:text-slate-100">
          some-to-do
        </Link>
        <HeaderMenu />
      </Layout.Header>
      <Layout.Body>
        <Layout.Navbar>
          <Lists />
        </Layout.Navbar>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout.Body>
    </Layout>
  )
}
