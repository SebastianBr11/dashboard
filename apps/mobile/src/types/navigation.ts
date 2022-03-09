declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	Home: undefined
	Settings: undefined
	EntryEdit: { id: string }
}
