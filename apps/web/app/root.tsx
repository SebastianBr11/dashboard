import {
	Links,
	LinksFunction,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
} from 'remix'
import type { MetaFunction } from 'remix'
import { ReactNode } from 'react'
import styles from './tailwind.css'
import Navbar from './components/Nav/Navbar'
import LinkButton from './components/LinkButton'

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: styles },
		{ rel: 'icon', href: '/favicon.ico' },
	]
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

export function CatchBoundary() {
	const caught = useCatch()
	return (
		<html lang='en'>
			<head>
				<title>Oh no...</title>
				<Links />
			</head>
			<body className='min-h-screen px-6 dark:bg-gray-900 dark:text-gray-200'>
				<Layout>
					<div className='flex flex-col items-center mt-32'>
						<h1 className='mb-20 text-8xl'>
							<span className='mr-4 font-bold'>{caught.status}</span>
							<span className='font-light'>{caught.statusText}</span>
						</h1>
						<LinkButton className='text-2xl font-semibold ' to='/'>
							Go Back
						</LinkButton>
					</div>
				</Layout>
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
			<main className='px-6 pt-8'>{children}</main>
		</>
	)
}
