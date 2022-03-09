import { areEntries, Entry } from '@home-dashboard/lib'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import { FlatList, Pressable, RefreshControl, Text, View } from 'react-native'
import { useMMKVObject } from 'react-native-mmkv'
import { useEffect, useState } from 'react'
import * as WebBrowser from 'expo-web-browser'
import useIsDark from '../hooks/useIsDark'
import t from '../theme'
import { StorageEntries, StorageSettings } from '../types/storage'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../types/navigation'
import LinkButton from '../components/LinkButton'
import FloatingButton from '../components/FloatingButton'

interface HomeProps extends StackScreenProps<RootStackParamList, 'Home'> {}

export default function Home({ navigation }: HomeProps) {
	const [settings, setSettings] = useMMKVObject<StorageSettings>('settings')
	const [entries, setEntries] = useMMKVObject<StorageEntries>('entries')
	const isDark = useIsDark()
	const [refreshing, setRefreshing] = useState(false)

	if (!settings) {
		setSettings({ url: '' })
		return <AppLoading />
	}

	const onGetData = async () => {
		console.log(settings.url)
		if (!settings.url) return
		const res = await fetch(settings.url + '/api/entries')
		const { entries } = await res.json()
		if (areEntries(entries)) {
			console.log('got correct entries')
			setEntries({ entries, lastUpdated: new Date().toISOString() })
		} else {
			console.log('not', entries)
		}
	}

	const onOpenLink = async (item: Entry) => {
		try {
			await WebBrowser.openBrowserAsync(item.url)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (!entries?.lastUpdated) {
			return
		}
		const timeDifference = Date.now() - new Date(entries.lastUpdated).getTime()
		const DAY_IN_SECONDS = 24 * 60 * 60
		console.log('diff', timeDifference, entries.lastUpdated)
		if (timeDifference >= DAY_IN_SECONDS) {
			onGetData()
		}
	}, [entries])

	return (
		<View
			style={[
				t.flex1,
				isDark ? t.bgGray950 : t.bgGray200,
				t.itemsCenter,
				t.justifyCenter,
				t.pX8,
			]}
		>
			<FlatList
				style={[t.mT8, t.flex1, t.wFull]}
				data={entries?.entries}
				ItemSeparatorComponent={() => <View style={[t.h8]}></View>}
				renderItem={({ item }) => (
					<Pressable onPress={() => onOpenLink(item)}>
						<View
							style={[isDark ? t.bgGray850 : t.bgGray100, t.roundedSm, t.p8]}
						>
							<Text
								style={[
									isDark ? t.textWhite : t.textGray950,
									t.text4xl,
									t.trackingTighter,
								]}
							>
								{item.name}
							</Text>
							<Text style={[isDark ? t.textGray400 : t.textGray600, t.textSm]}>
								{item.url}
							</Text>
							<LinkButton to={{ screen: 'EntryEdit', params: { id: item.id } }}>
								Edit
							</LinkButton>
						</View>
					</Pressable>
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onGetData} />
				}
			/>
			<FloatingButton link={{ to: { screen: 'Settings' } }} position='bottom'>
				Add Entry
			</FloatingButton>
			<StatusBar style='auto' />
		</View>
	)
}
