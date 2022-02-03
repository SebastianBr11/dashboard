import { LoaderFunction, Outlet, useLoaderData } from 'remix'
import EntryList from '~/components/Entries/EntryList'
import prisma from '~/lib/db.server'
import { getFullEntry } from '~/lib/entries'
import { FullEntry } from '~/types'

type LoaderData = FullEntry[]

export const loader: LoaderFunction = async () => {
	const entries = await prisma.entry.findMany()
	return entries.map(getFullEntry)
}
export default function index() {
	const entries = useLoaderData<LoaderData>()

	return (
		<div className='max-w-6xl mx-auto'>
			<Outlet />
			<h1 className='mb-6 text-4xl font-bold tracking-wide dark:text-gray-300'>
				Entries
			</h1>
			<EntryList entries={entries} />
		</div>
	)
}
