import { Entry, Prisma } from '@prisma/client'
import {
	ActionFunction,
	Form,
	json,
	LoaderFunction,
	useActionData,
	useLoaderData,
	useTransition,
} from 'remix'
import { Button } from 'ui'
import prisma from '~/lib/db.server'
import { getFullEntry, getSupportedEntries } from '~/lib/entries'
import { FullEntry } from '~/types'

export const loader: LoaderFunction = async ({ params }) => {
	const entry = await prisma.entry.findUnique({ where: { id: params.entryId } })
	if (!entry) throw json('Not found', { status: 404 })
	return getFullEntry(entry)
}

export const action: ActionFunction = async ({ params, request }) => {
	const formData = await request.formData()
	const name = formData.get('name')
	const type = formData.get('type')

	if (!name) return json({ errors: { name: 'Name is required' } }, 400)
	if (!type) return json({ errors: { name: 'Type is required' } }, 400)

	const updatedEntry = await prisma.entry.update({
		data: { name: name.toString(), type: type.toString() },
		where: { id: params.entryId },
	})

	return json(updatedEntry, { status: 200 })
}

export default function Entry() {
	const entry = useLoaderData<FullEntry>()
	const transition = useTransition()
	console.log(entry)

	const isUpdated = transition.type === 'actionSubmission'
	return (
		<div className='grid max-w-6xl gap-5 mx-auto'>
			<div className='flex'>
				<h1 className='block text-6xl font-bold text-gray-300'>
					{!isUpdated
						? entry.name
						: Object.fromEntries(transition.submission.formData).name}
				</h1>
				{entry.extra && (
					<img
						className='object-left ml-4 max-h-16'
						alt={entry.name}
						src={entry.extra.img}
					/>
				)}
			</div>
			<Form method='post' className='grid grid-cols-2 gap-8'>
				<div className='grid gap-1'>
					<label className='text-lg' htmlFor='name'>
						Name
					</label>
					<input
						className='px-4 py-2 text-gray-900 rounded dark:text-gray-50 dark:bg-gray-800 '
						type='text'
						name='name'
						placeholder='Name'
						id='name'
						defaultValue={entry.name}
						required
					/>
				</div>
				<div className='grid gap-1'>
					<label className='text-lg ' htmlFor='type'>
						Type
					</label>
					<select
						name='type'
						className='px-4 py-2 bg-white rounded dark:bg-gray-800 '
						id='type'
						defaultValue={entry.type}
					>
						<option value='other'>Other</option>
						{getSupportedEntries().map(supported => (
							<option key={supported} value={supported}>
								{supported[0].toUpperCase() + supported.slice(1)}
							</option>
						))}
					</select>
				</div>
				<Button
					className='px-8 py-3 border-2 border-gray-500 rounded w-min'
					type='submit'
				>
					Change
				</Button>
			</Form>
		</div>
	)
}
