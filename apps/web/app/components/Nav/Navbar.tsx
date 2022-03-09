import { useState } from 'react'
import { Link } from 'remix'
import { clsx } from '@home-dashboard/lib'
import NavbarLink from './NavbarLink'
import Icon from '../Icons/Icon'

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(true)

	return (
		<header className={clsx(isOpen && 'pr-8', 'px-4 dark:bg-gray-800/20 flex')}>
			<nav className='flex flex-col max-w-6xl py-6 gap-y-5'>
				<div className='flex items-center gap-2'>
					<>
						<Icon
							aria-label='Menu'
							icon='menu'
							size={8}
							className='cursor-pointer'
							onClick={() => setIsOpen(isOpen => !isOpen)}
						/>
						{isOpen && (
							<Link className='ml-2 text-2xl' to='/'>
								Dashboard
							</Link>
						)}
					</>
				</div>
				<NavbarLink
					className='flex items-center mt-8 font-semibold h-7 dark:text-gray-400 hover:dark:text-gray-200'
					to='/'
				>
					<Icon aria-label='Home' icon='home' className='ml-1' />
					{isOpen && <span className='ml-5 text-lg'>Home</span>}
				</NavbarLink>
				<NavbarLink
					className='flex items-center mt-auto font-semibold h-7 dark:text-gray-400 hover:dark:text-gray-200'
					to='/settings'
				>
					<Icon aria-label='Settings' icon='settings' className='ml-1' />
					{isOpen && <span className='ml-5 text-lg'>Settings</span>}
				</NavbarLink>
			</nav>
		</header>
	)
}
