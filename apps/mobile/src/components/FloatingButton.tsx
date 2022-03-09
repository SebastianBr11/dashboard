import { Link, useLinkProps } from '@react-navigation/native'
import { Pressable, Text } from 'react-native'
import useIsDark from '../hooks/useIsDark'
import t from '../theme'

type Position = 'bottom'

interface FloatingButtonProps {
	position: 'bottom'
	children?: React.ReactNode
	link?: Parameters<typeof useLinkProps>['0']
}

export default function FloatingButton({
	position,
	children,
	link,
}: FloatingButtonProps) {
	const isDark = useIsDark()

	const Wrapper = link ? Link : Pressable
	return (
		<Wrapper
			to={link?.to || { screen: 'Home' }}
			style={[
				t.absolute,
				t.mT8,
				isDark ? t.bgPrimaryDark : t.bgPrimary,
				t.roundedSm,
				t.selfStart,
				t.pY3,
				t.pX6,
				t.shadow2xl,
				getPositionStyles(position),
			]}
		>
			<Text
				style={[
					t.text2xl,
					t.textPrimaryLightest,
					t.uppercase,
					t.fontSansBold,
					t.trackingWider,
					t.z10,
				]}
			>
				{children}
			</Text>
		</Wrapper>
	)
}

const getPositionStyles = (position: Position) => {
	switch (position) {
		case 'bottom':
			return [t.bottom8, t.selfCenter]
	}
}
