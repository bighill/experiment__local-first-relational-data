import { useLiveQuery } from 'dexie-react-hooks'
import { v4 as uuidv4 } from 'uuid'

import { dexie, Tag, Thing } from '../lib/dexie'

export const createTag = async (title: string): Promise<Tag> => {
  const tag: Tag = {
    id: uuidv4(),
    title: title.trim().replace(/\s+/g, '_'),
  }
  await dexie.tags.add(tag)
  return tag
}

export const readAllTags = async () => {
  return await dexie.tags.toArray()
}

export const updateTag = async (id: string, title: string): Promise<void> => {
  await dexie.tags.update(id, {
    title: title.trim().replace(/\s+/g, '_'),
  })
}

export const deleteTag = async (id: string): Promise<void> => {
  await dexie.tags.delete(id)
  await dexie.links.where('tagId').equals(id).delete()
}

const _getThingsByTagId = async (tagId: string): Promise<Thing[]> => {
  const links = await dexie.links.where('tagId').equals(tagId).toArray()
  const thingIds = links.map((link) => link.thingId)
  return await dexie.things.where('id').anyOf(thingIds).toArray()
}

export const liveTags = (): Tag[] => {
  const tags = useLiveQuery<Tag[]>(async () => {
    const tagArr = await dexie.tags.toArray()

    const tagsWithThings = await Promise.all(
      tagArr.map(async (tag) => ({
        ...tag,
        things: await _getThingsByTagId(tag.id),
      }))
    )

    return tagsWithThings
  })
  return tags ?? []
}
