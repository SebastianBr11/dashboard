import { Entry } from '@prisma/client'
import LinkButton from '../LinkButton'

interface EntryListProps {
	entries: Entry[]
}

export default function EntryList({ entries }: EntryListProps) {
	return (
		<div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 '>
			{entries.map(entry => (
				<a href={entry.url}>
					<div
						className='grid gap-4 p-6 rounded dark:bg-gray-800'
						key={entry.id}
					>
						<h2 className='text-2xl font-semibold dark:text-gray-400'>
							{entry.name}
						</h2>
						<LinkButton className='w-min' to={`/entries/${entry.id}`}>
							Edit
						</LinkButton>
					</div>
				</a>
			))}
		</div>
	)
}
