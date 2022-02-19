import { Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'
import t from '../theme'
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../types/navigation'

type NavigationSettingsProps = Parameters<
	Required<StackHeaderOptions>['headerRight']
>['0']

export default function NavigationSettings({
	tintColor,
}: NavigationSettingsProps) {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>()
	return (
		<Pressable
			style={[t.pX5, t.pY4]}
			onPress={() => navigation.navigate('Settings')}
		>
			<Feather name='settings' size={24} color={tintColor} />
		</Pressable>
	)
}
