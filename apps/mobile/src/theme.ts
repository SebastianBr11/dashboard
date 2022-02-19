import { StyleSheet } from 'react-native'
import { createTheme } from 'react-native-whirlwind'

const t = StyleSheet.create({
	...createTheme({
		colors: {
			gray900: '#12101a',
		},
	}),
	textGray950: {
		color: '#080808',
	},
	textPrimaryLighter: {
		color: '#99a9ff',
	},
	textPrimaryLightest: {
		color: '#d2d9ff',
	},
	bgGray950: {
		backgroundColor: '#080808',
	},
	bgGray850: {
		backgroundColor: '#1a202c',
	},
})

export default t
