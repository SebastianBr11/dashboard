import { clsx } from '@home-dashboard/lib'
import { useLocation } from 'remix'
import Icon from '../Icons/Icon'
import NavbarLink from './NavbarLink'

export default function Navbar() {
	const { pathname } = useLocation()
	const isHome = pathname === '/'
	const isSettings = pathname === '/settings'
	return (
		<nav className='sticky bottom-0 flex overflow-hidden dark:bg-gray-800/20'>
			<NavbarLink
				className={clsx(
					isHome && 'bg-indigo-900',
					'flex items-center justify-center flex-auto rounded-t-3xl sm:hidden py-4 font-semibold sm:mt-8 dark:text-gray-400 hover:dark:text-gray-200',
				)}
				to='/'
			>
				<Icon aria-label='Home' icon='home' />
				<span className='ml-5 text-lg'>Home</span>
			</NavbarLink>
			<NavbarLink
				className={clsx(
					isSettings && 'bg-indigo-900',
					'flex items-center justify-center flex-auto rounded-t-3xl sm:hidden py-4 font-semibold sm:mt-auto dark:text-gray-400 hover:dark:text-gray-200',
				)}
				to='/settings'
			>
				<Icon aria-label='Settings' icon='settings' />
				<span className='ml-5 text-lg'>Settings</span>
			</NavbarLink>
		</nav>
	)
}
