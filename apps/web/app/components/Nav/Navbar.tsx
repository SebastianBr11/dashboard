import NavbarLink from './NavbarLink'

export default function Navbar() {
	return (
		<header className='px-6  dark:bg-slate-800'>
			<nav className='flex max-w-6xl py-4 mx-auto'>
				<NavbarLink className='self-center text-2xl' to='/'>
					Dashboard
				</NavbarLink>
				<div className='flex gap-4 ml-auto'>
					<NavbarLink asButton className='ml-auto' to='/bla'>
						bla
					</NavbarLink>
					<NavbarLink asButton className='ml-auto' to='/bla'>
						bla
					</NavbarLink>
				</div>
			</nav>
		</header>
	)
}
