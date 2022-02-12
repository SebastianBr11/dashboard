import { Entries, entriesSchema, Entry, entrySchema } from './schemas'

export { Entries, Entry }

export function clsx(...classes: (false | null | undefined | string)[]) {
	return classes.filter(Boolean).join(' ')
}

export function isEntry(entry: unknown): entry is Entry {
	try {
		entrySchema.parse(entry)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export function areEntries(entries: unknown): entries is Entries {
	try {
		entriesSchema.parse(entries)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}
