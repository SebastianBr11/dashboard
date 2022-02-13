import { Entry, Prisma } from '@prisma/client'
import Dialog from '@reach/dialog'
import styles from '@reach/dialog/styles.css'
import {
	ActionFunction,
	Form,
	json,
	LinksFunction,
	LoaderFunction,
	useActionData,
	useLoaderData,
	useNavigate,
	useTransition,
} from 'remix'
import { Button } from '@home-dashboard/ui'
import prisma from '~/lib/db.server'
import { getFullEntry, getSupportedEntries } from '~/lib/entries'
import { FullEntry } from '~/types'
import dialogStyles from '~/../styles/dialog.css'

export const links: LinksFunction = () => {
	return [
		{
			rel: 'stylesheet',
			href: styles,
		},
		{
			rel: 'stylesheet',
			href: dialogStyles,
		},
	]
}

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
	const navigate = useNavigate()

	console.log(entry)

	const isUpdated = transition.type === 'actionSubmission'

	const onDismiss = () => {
		navigate('/')
	}
	return (
		<Dialog
			className='grid max-w-6xl gap-5 !min-w-fit p-12 border-2 dark:border-slate-800 dark:!bg-gray-900'
			onDismiss={onDismiss}
			isOpen={true}
			aria-label='Edit Entry'
		>
			<div className='gap-4 sm:flex'>
				<h1 className='flex items-center text-4xl font-bold text-gray-300 sm:text-6xl'>
					{!isUpdated
						? entry.name
						: Object.fromEntries(transition.submission.formData).name}
					<span className='ml-2'>
						{entry.extra && (
							<img
								className='w-full h-full'
								alt={entry.name}
								src={entry.extra.img}
							/>
						)}
					</span>
				</h1>
			</div>
			<Form method='post' className='grid gap-8 sm:grid-cols-2'>
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
				<div className='flex flex-wrap gap-4'>
					<Button
						className='px-8 py-3 bg-green-900 border-2 border-green-500 rounded hover:dark:bg-green-800 w-min'
						type='submit'
					>
						Change
					</Button>
					<Button
						className='px-8 py-3 border-2 border-gray-500 rounded hover:dark:bg-gray-800 w-min'
						onClick={onDismiss}
					>
						Cancel
					</Button>
				</div>
			</Form>
		</Dialog>
	)
}
