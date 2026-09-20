import type { ServerFunctionClient } from 'payload'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import { importMap } from '../../importMap'
import config from '@payload-config'
import '../../styles.css'

type Args = { children: React.ReactNode }

const Layout = ({ children }: Args) =>
  RootLayout({
    config,
    importMap,
    children,
    serverFunction: handleServerFunctions as unknown as ServerFunctionClient,
  })

export default Layout
