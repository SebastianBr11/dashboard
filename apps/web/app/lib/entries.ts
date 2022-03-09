import { Entry } from '@prisma/client'
import { FullEntry } from '~/types'

const SUPPORTED_ENTRIES = ['pihole', 'nextcloud']

const PIHOLE_IMG = '/icons/pihole.svg#icon'
const NEXTCLOUD_IMG = '/icons/nextcloud.svg#icon'

export const getFullEntry = (entry: Entry): FullEntry => {
	switch (entry.type) {
		case 'pihole':
			return { ...entry, extra: { img: PIHOLE_IMG } }
		case 'nextcloud':
			return { ...entry, extra: { img: NEXTCLOUD_IMG } }
	}

	return entry
}

export const getSupportedEntries = () => {
	return SUPPORTED_ENTRIES
}
