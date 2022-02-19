import { StackScreenProps } from '@react-navigation/stack'
import { View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useMMKVObject } from 'react-native-mmkv'
import useIsDark from '../hooks/useIsDark'
import t from '../theme'
import { RootStackParamList } from '../types/navigation'
import { StorageSettings } from '../types/storage'

interface SettingsProps
	extends StackScreenProps<RootStackParamList, 'Settings'> {}

export default function Settings({ navigation }: SettingsProps) {
	const [settings, setSettings] = useMMKVObject<StorageSettings>('settings')
	const isDark = useIsDark()

	return (
		<View style={[t.flex1, t.bgWhite, t.pX8, isDark && t.bgGray900]}>
			<TextInput
				value={settings?.url ?? ''}
				style={[
					t.p5,
					t.border,
					t.wFull,
					t.borderGray500,
					t.roundedSm,
					t.textLg,
					isDark ? t.textGray100 : t.textGray900,
				]}
				placeholder='App Url'
				placeholderTextColor={t.textGray600.color}
				onChangeText={text => setSettings({ ...settings, url: text })}
			/>
		</View>
	)
}
