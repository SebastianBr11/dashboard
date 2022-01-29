import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from 'remix'
import type { MetaFunction } from 'remix'
import styles from './tailwind.css'
import Navbar from './components/Nav/Navbar'
import { ReactNode } from 'react'

export function links() {
	return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => {
	return { title: 'Dashboard' }
}

export default function App() {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width,initial-scale=1' />
				<Meta />
				<Links />
			</head>
			<body className='min-h-screen dark:bg-gray-900 dark:text-gray-200'>
				<Layout>
					<Outlet />
				</Layout>
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === 'development' && <LiveReload />}
			</body>
		</html>
	)
}

interface LayoutProps {
	children: ReactNode
}

function Layout({ children }: LayoutProps) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
		</>
	)
}
