import { Entry } from '@prisma/client'
import { LoaderFunction, useLoaderData } from 'remix'
import EntryList from '~/components/Entries/EntryList'
import prisma from '~/lib/db.server'

type LoaderData = Entry[]

export const loader: LoaderFunction = async () => {
	const entries = await prisma.entry.findMany()
	return entries
}

export default function Index() {
	const entries = useLoaderData<LoaderData>()
	return (
		<div className=''>
			<h1 className='mb-6 text-4xl font-bold tracking-wide dark:text-gray-300'>
				Entries
			</h1>
			<EntryList entries={entries} />
		</div>
	)
}
