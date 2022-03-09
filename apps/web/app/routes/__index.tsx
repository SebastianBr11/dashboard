import { LinksFunction, Outlet, useLoaderData } from 'remix'
import EntryList from '~/components/Entries/EntryList'
import { LoaderData } from './api/entries'
export { loader } from './api/entries'

export const links: LinksFunction = () => {
	return [{ rel: 'preload', href: '/icons/sprites.svg', as: 'image' }]
}

export default function Index() {
	const { entries } = useLoaderData<LoaderData>()
	return (
		<div className='max-w-6xl'>
			<Outlet />
			<h1 className='mb-6 text-4xl font-bold tracking-wide dark:text-gray-300'>
				Entries
			</h1>
			<EntryList entries={entries} />
		</div>
	)
}
