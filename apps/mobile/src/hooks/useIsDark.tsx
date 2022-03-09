import { useColorScheme } from 'react-native'

export default () => {
	const colorScheme = useColorScheme()

	return colorScheme === 'dark'
}
