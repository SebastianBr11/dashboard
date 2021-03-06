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
import tailwind from './tailwind.css'
import Sidebar from './components/Nav/Sidebar'
import LinkButton from './components/LinkButton'
import Navbar from './components/Nav/Navbar'

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: tailwind },
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
			<body className='flex flex-col min-h-screen sm:flex-row dark:bg-gray-900 dark:text-gray-200'>
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
			<body className='flex flex-col min-h-screen sm:flex-row dark:bg-gray-900 dark:text-gray-200'>
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
			<Sidebar />
			<main className='flex-1 max-w-6xl px-16 mx-auto pt-28 min-w-fit'>
				{children}
			</main>
			<Navbar />
		</>
	)
}
