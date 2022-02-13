import { areEntries } from '@home-dashboard/lib'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import { FlatList, Text, TextInput, View } from 'react-native'
import { useMMKVObject } from 'react-native-mmkv'
import { Feather } from '@expo/vector-icons'
import useIsDark from '../hooks/useIsDark'
import t from '../theme'
import { StorageEntries, StorageSettings } from '../types/storage'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../types/navigation'

interface HomeProps extends StackScreenProps<RootStackParamList, 'Home'> {}

export default function Home({ navigation }: HomeProps) {
	const [settings, setSettings] = useMMKVObject<StorageSettings>('settings')
	const [entries, setEntries] = useMMKVObject<StorageEntries>('entries')
	const isDark = useIsDark()

	if (!settings) {
		setSettings({ url: '' })
		return <AppLoading />
	}

	const onGetData = async () => {
		if (!settings.url) return
		const res = await fetch(settings.url + '/api/entries')
		const { entries } = await res.json()
		if (areEntries(entries)) {
			console.log(entries[0].id)
			setEntries({ entries })
		} else {
			console.log('not', entries)
		}
	}

	return (
		<View
			style={[
				t.flex1,
				t.bgWhite,
				t.itemsCenter,
				t.justifyCenter,
				t.pX8,
				isDark && t.bgGray900,
			]}
		>
			<Text
				style={[
					t.text2xl,
					t.textCenter,
					t.bgPrimaryDark,
					isDark && t.bgPrimaryLight,
					t.textWhite,
					t.p8,
					t.rounded,
					isDark && t.textGray900,
				]}
			>
				Open up App.tsx to start working on your app!
			</Text>
			<TextInput
				value={settings.url}
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
			<Feather.Button
				name='settings'
				size={20}
				color={isDark ? t.textGray900.color : t.textPrimaryLight.color}
				style={{
					...t.bgPrimaryLight,
					...t.pX4,
					...t.pY3,
				}}
				onPress={() => navigation.navigate('Settings')}
			>
				Settings
			</Feather.Button>
			<Feather.Button
				name='download'
				size={20}
				color={isDark ? t.textGray900.color : t.textPrimaryLight.color}
				style={{
					...t.bgPrimaryLight,
					...t.pX4,
					...t.pY3,
				}}
				onPress={onGetData}
			>
				<Text style={[t.textLg, isDark ? t.textGray900 : t.textPrimaryLight]}>
					Get Data
				</Text>
			</Feather.Button>

			<FlatList
				style={[t.bgError, t.flexGrow0]}
				data={entries?.entries}
				renderItem={({ item }) => (
					<View key={item.id}>
						<Text>{item.name}</Text>
					</View>
				)}
			/>
			<StatusBar style='auto' />
		</View>
	)
}
