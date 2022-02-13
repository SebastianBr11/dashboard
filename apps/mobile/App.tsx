import 'react-native-gesture-handler'
import {
	CardStyleInterpolators,
	createStackNavigator,
} from '@react-navigation/stack'
import Home from './src/screens/Home'
import { RootStackParamList } from './src/types/navigation'
import Settings from './src/screens/Settings'
import { NavigationContainer } from '@react-navigation/native'
import { Dimensions } from 'react-native'
import t from './src/theme'

const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					gestureEnabled: true,
					gestureResponseDistance: Dimensions.get('screen').width,
					gestureDirection: 'horizontal',
					detachPreviousScreen: false,
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
					headerStyle: [t.bgBlack],
					headerTitleStyle: [t.textGray100],
				}}
			>
				<Stack.Screen name='Home' component={Home} />
				<Stack.Screen name='Settings' component={Settings} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
