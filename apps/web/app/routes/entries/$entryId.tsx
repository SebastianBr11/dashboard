import { Entry } from '@prisma/client'
import { json, LoaderFunction, useLoaderData } from 'remix'
import prisma from '~/lib/db.server'
import { getFullEntry } from '~/lib/entries'
import { FullEntry } from '~/types'

export const loader: LoaderFunction = async ({ params }) => {
	const entry = await prisma.entry.findUnique({ where: { id: params.entryId } })
	if (!entry) throw json('Not found', { status: 404 })
	return getFullEntry(entry)
}

export default function Entry() {
	const entry = useLoaderData<FullEntry>()
	const isSupported = !!entry.extra
	return (
		<div>
			<p>
				{entry.name} {entry.type}
			</p>
			<div className='max-w-[5rem]'>
				{isSupported && <img alt={entry.name} src={entry.extra.img} />}
			</div>
		</div>
	)
}
