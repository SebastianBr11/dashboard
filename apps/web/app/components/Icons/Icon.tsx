type IconType = 'arrow-circle-right' | 'edit' | 'home' | 'menu' | 'settings'

interface IconProps extends React.SVGProps<SVGSVGElement> {
	icon: IconType
	size?: number
}

// Make tailwind generate the following classes
// Don't know a better way for now
const _TEMPORARY = 'w-6 h-6 h-8 w-8'

export default function Icon({
	size = 6,
	className,
	icon,
	...restProps
}: IconProps) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className={`h-${size} w-${size} ${className}`}
			fill='none'
			stroke='currentColor'
			{...restProps}
		>
			<use href={`/icons/sprites.svg#${icon}`} />
		</svg>
	)
}
