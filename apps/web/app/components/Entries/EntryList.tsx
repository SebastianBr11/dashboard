import { FullEntry } from '~/types'
import LinkButton from '../LinkButton'

interface EntryListProps {
	entries: FullEntry[]
}

export default function EntryList({ entries }: EntryListProps) {
	return (
		<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 '>
			{entries.map(entry => (
				<a
					key={entry.id}
					href={entry.url}
					className='flex gap-4 p-6 rounded dark:bg-gray-800'
				>
					<div className='grid gap-4'>
						<h2 className='text-2xl font-semibold dark:text-gray-400'>
							{entry.name}
						</h2>
						<LinkButton className='self-end w-min' to={`/entries/${entry.id}`}>
							Edit
						</LinkButton>
					</div>
					<div className='flex-1 max-h-24'>
						{entry.extra && (
							<img
								className='object-contain object-right w-full h-full'
								src={entry.extra.img}
								alt={entry.name}
							/>
						)}
					</div>
				</a>
			))}
		</div>
	)
}
