import 'react-native-gesture-handler'
import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack'
import Home from './src/screens/Home'
import { RootStackParamList } from './src/types/navigation'
import Settings from './src/screens/Settings'
import { NavigationContainer } from '@react-navigation/native'
import { Dimensions } from 'react-native'
import t from './src/theme'
import NavigationSettings from './src/components/NavigationSettings'
import EntryEdit from './src/screens/EntryEdit'
import useIsDark from './src/hooks/useIsDark'

const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
	const isDark = useIsDark()
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					gestureEnabled: true,
					gestureResponseDistance: Dimensions.get('screen').height,
					detachPreviousScreen: false,
					headerStyle: [isDark ? t.bgGray950 : t.bgGray200],
					headerTintColor: isDark ? t.textGray400.color : t.textGray900.color,
					headerShadowVisible: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen
					options={{
						headerRight: NavigationSettings,
					}}
					name='Home'
					component={Home}
				/>
				<Stack.Screen name='Settings' component={Settings} />
				<Stack.Screen name='EntryEdit' component={EntryEdit} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
