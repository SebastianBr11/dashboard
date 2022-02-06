import { Link } from 'remix'
import { FullEntry } from '~/types'
import ArrowCircleRight from '../Icons/ArrowCircleRight'
import Edit from '../Icons/Edit'
import LinkButton from '../LinkButton'

interface EntryListProps {
	entries: FullEntry[]
}

export default function EntryList({ entries }: EntryListProps) {
	return (
		<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
			{entries.map(entry => (
				<div
					key={entry.id}
					className='flex flex-col justify-between gap-4 px-10 py-8 rounded shadow-md shadow-indigo-500/5 dark:bg-gradient-to-t from-indigo-900/20 via-indigo-800/20 to-indigo-900/20'
				>
					<div className='flex items-center gap-4 dark:text-gray-400 '>
						<a
							className='flex text-2xl font-semibold hover:dark:text-gray-300'
							href={entry.url}
						>
							{entry.name}
						</a>
						<Link to={`/${entry.id}`}>
							<Edit className='w-full h-full hover:dark:text-gray-300' />
						</Link>
					</div>
					<LinkButton
						external
						className='flex items-center gap-2 font-semibold text-indigo-200 transition-colors border-2 w-fit border-indigo-500/50 hover:text-gray-900/80 hover:bg-indigo-500/80'
						to={entry.url}
					>
						Go to
						{!entry.extra ? (
							<>
								{' '}
								{entry.name}
								<ArrowCircleRight />
							</>
						) : (
							<img
								className='aspect-square'
								src={entry.extra.img}
								alt={entry.name}
							/>
						)}{' '}
					</LinkButton>
				</div>
			))}
		</div>
	)
}
