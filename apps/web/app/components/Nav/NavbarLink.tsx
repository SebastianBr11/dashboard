import { ReactNode } from 'react'
import { NavLink, NavLinkProps } from 'remix'

interface NavbarLinkProps extends NavLinkProps {
	children: ReactNode
	className?: string
	asButton?: boolean
}

const buttonClassNames = 'rounded py-2 px-6'
const activeClassNames = 'dark:bg-blue-800'
const inactiveClassNames = 'border-2 dark:border-blue-800'

interface Classes {
	isActive: boolean
	asButton?: NavbarLinkProps['asButton']
	otherClasses?: NavbarLinkProps['className']
}

const classes = ({ isActive, asButton, otherClasses }: Classes) => {
	if (!asButton) return otherClasses || ''
	const classNames = [
		buttonClassNames,
		isActive ? activeClassNames : inactiveClassNames,
		otherClasses,
	]
	return classNames.join(' ')
}

export default function NavbarLink({
	children,
	className,
	asButton,
	...props
}: NavbarLinkProps) {
	return (
		<NavLink
			className={({ isActive }) =>
				classes({ asButton, isActive, otherClasses: className })
			}
			{...props}
		>
			{children}
		</NavLink>
	)
}
