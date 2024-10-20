import { Link, Outlet } from 'react-router-dom'

import { Lists } from '@/features/list/ui/Lists.tsx'
import { Layout } from '@/shared/components/Layout/Layout.tsx'
import { HeaderMenu } from '@/widgets/user/ui/HeaderMenu'

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
          <Lists />
          <Lists />
          <Lists />
          <Lists />
        </Layout.Navbar>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout.Body>
    </Layout>
  )
}
