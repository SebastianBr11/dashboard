import { ReactNode } from 'react'
import { Link, LinkProps } from 'remix'

interface LinkButtonProps extends LinkProps {
	children: ReactNode
	className?: string
}

const buttonClassNames = 'rounded py-2 px-6 dark:bg-blue-900'
const inactiveClassNames = 'border-2 dark:border-blue-800'

interface Classes {
	otherClasses?: LinkButtonProps['className']
}

const classes = ({ otherClasses }: Classes) => {
	const classNames = [buttonClassNames, otherClasses]
	return classNames.join(' ')
}

export default function LinkButton({
	children,
	className,
	...props
}: LinkButtonProps) {
	return (
		<Link className={classes({ otherClasses: className })} {...props}>
			{children}
		</Link>
	)
}
