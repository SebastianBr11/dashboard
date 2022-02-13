import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { RootStackParamList } from '../types/navigation'

interface SettingsProps
	extends StackScreenProps<RootStackParamList, 'Settings'> {}

export default function Settings({ navigation }: SettingsProps) {
	return (
		<View>
			<Pressable onPress={() => navigation.navigate('Home')}>
				<Text>Go back</Text>
			</Pressable>
		</View>
	)
}
