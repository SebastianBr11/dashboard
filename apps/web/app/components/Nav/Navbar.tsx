import { Link } from 'remix'
import NavbarLink from './NavbarLink'

export default function Navbar() {
	return (
		<header className='px-6 dark:bg-slate-800'>
			<nav className='flex flex-wrap justify-center max-w-6xl py-4 mx-auto sm:justify-between gap-y-5'>
				<Link className='self-center text-3xl' to='/'>
					Dashboard
				</Link>
				<div className='flex gap-4'>
					<NavbarLink
						className='ml-auto text-lg font-semibold dark:text-gray-400 hover:dark:text-gray-200'
						to='/bla'
					>
						Settings
					</NavbarLink>
					<NavbarLink
						className='ml-auto text-lg font-semibold dark:text-gray-400 hover:dark:text-gray-200'
						to='/bla'
					>
						Other Stuff
					</NavbarLink>
				</div>
			</nav>
		</header>
	)
}
