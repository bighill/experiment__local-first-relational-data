import { useLiveQuery } from 'dexie-react-hooks'
import { v4 as uuidv4 } from 'uuid'

import { dexie, Link } from '../lib/dexie'

export const createLink = async (
  thingId: string,
  tagId: string
): Promise<Link> => {
  const link: Link = {
    id: uuidv4(),
    thingId,
    tagId,
  }
  await dexie.links.add(link)
  return link
}

export const readAllLinks = async () => {
  return await dexie.links.toArray()
}

export const liveLinks = (): Link[] => {
  const links = useLiveQuery<Link[]>(() => dexie.links.toArray())
  return links ?? []
}
