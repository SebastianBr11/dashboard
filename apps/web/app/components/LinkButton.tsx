import { ReactNode } from 'react'
import { Link, LinkProps } from 'remix'

interface LinkButtonProps extends LinkProps {
	children: ReactNode
	className?: string
	external?: boolean
}

const buttonClassNames = 'rounded py-2 px-6'
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
	external,
	...props
}: LinkButtonProps) {
	if (external) {
		return (
			<a
				className={classes({ otherClasses: className })}
				href={props.to + ''}
				{...props}
			>
				{children}
			</a>
		)
	}
	return (
		<Link className={classes({ otherClasses: className })} {...props}>
			{children}
		</Link>
	)
}
