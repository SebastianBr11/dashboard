import { Link, useLinkProps } from '@react-navigation/native'
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native'
import useIsDark from '../hooks/useIsDark'
import t from '../theme'

type LinkButtonProps = Parameters<typeof useLinkProps>['0'] & {
	children: React.ReactNode
	viewStyles?: StyleProp<ViewStyle>
	textStyles?: StyleProp<TextStyle>
}

export default function LinkButton({
	to,
	action,
	children,
	viewStyles = {},
	textStyles = {},
}: LinkButtonProps) {
	const isDark = useIsDark()

	return (
		<View
			style={[
				t.mT8,
				t.borderPrimary,
				t.roundedSm,
				t.border0_5,
				t.selfStart,
				t.pY2,
				t.pX5,
				viewStyles,
			]}
		>
			<Link
				style={[
					isDark ? t.textGray300 : t.textPrimaryDark,
					t.fontSansBold,
					t.trackingWider,
					t.uppercase,
					t.textBase,
					textStyles,
				]}
				to={to}
				action={action}
			>
				{children}
			</Link>
		</View>
	)
}
