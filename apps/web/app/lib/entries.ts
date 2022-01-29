import { Entry } from '@prisma/client'
import { FullEntry } from '~/types'

const PIHOLE_IMG = '/icons/pihole.svg'
const NEXTCLOUD_IMG = '/icons/nextcloud.svg'

export const getFullEntry = (entry: Entry): FullEntry => {
	switch (entry.type) {
		case 'pihole':
			return { ...entry, extra: { img: PIHOLE_IMG } }
		case 'nextcloud':
			return { ...entry, extra: { img: NEXTCLOUD_IMG } }
	}

	return entry
}
