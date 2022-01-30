import * as React from 'react'

interface ButtonProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	children?: React.ReactNode
}

export default function Button({ children, ...props }: ButtonProps) {
	return <button {...props}>{children}</button>
}
