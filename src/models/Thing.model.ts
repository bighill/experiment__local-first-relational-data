import { useLiveQuery } from 'dexie-react-hooks'
import { v4 as uuidv4 } from 'uuid'

import { dexie, Tag, Thing } from '../lib/dexie'

/**
 * Create thing
 */
export const createThing = async (title: string): Promise<Thing> => {
  const thing: Thing = {
    id: uuidv4(),
    title: title.trim(),
    content: '',
  }
  await dexie.things.add(thing)
  return thing
}

/**
 * Determine if string is tag
 * ...helper
 */
const _isTag = (token: string) =>
  token.startsWith('#') && !token.startsWith('# ') && !token.startsWith('##')

/**
 * Process tags based on new title/content
 * ...helper
 */
const _processTagsForThing = async (
  id: string,
  title: string,
  content: string
) => {
  // Find tags in title, content
  const tokens = [...title.split(/[ \r\n]+/), ...content.split(/[ \r\n]+/)]
  const foundTags = tokens.filter((token) => _isTag(token))
  const newTagTitlesForThing = foundTags.map((t) =>
    t.replace(/[^a-zA-Z0-9]/g, '')
  )

  // Existing tags
  const existingTagsForThing = await _getTagsByThingId(id)
  const existingTagTitlesForThing = existingTagsForThing.map((tag) => tag.title)
  const allTags = await dexie.tags.toArray()
  const allTagTitles = allTags.map((tag) => tag.title)

  // Add tags and/or links
  for (const newTagTitleForThing of newTagTitlesForThing) {
    const shouldCreateTag = !allTagTitles.includes(newTagTitleForThing)
    const shouldCreateLink =
      !existingTagTitlesForThing.includes(newTagTitleForThing)

    if (shouldCreateTag) {
      const newTagId = uuidv4()
      await dexie.tags.add({ id: newTagId, title: newTagTitleForThing })

      if (shouldCreateLink) {
        await dexie.links.add({ id: uuidv4(), thingId: id, tagId: newTagId })
      }
    } else {
      if (shouldCreateLink) {
        const tag = await dexie.tags
          .where('title')
          .equals(newTagTitleForThing)
          .first()
        if (tag) {
          await dexie.links.add({ id: uuidv4(), thingId: id, tagId: tag.id })
        } else {
          console.error('tag not found. this should never happen.')
        }
      }
    }
  }

  // Remove links for tags that are no longer present
  for (const existingTag of existingTagsForThing) {
    if (!newTagTitlesForThing.includes(existingTag.title)) {
      await dexie.links.where({ thingId: id, tagId: existingTag.id }).delete()
    }
  }
}

/**
 * Update thing
 */
export const updateThing = async (
  id: string,
  title: string,
  content: string
): Promise<void> => {
  await dexie.things.update(id, {
    title: title.trim(),
    content: content.trim(),
  })

  _processTagsForThing(id, title, content)
}

/**
 * Delete thing
 */
export const deleteThing = async (id: string): Promise<void> => {
  await dexie.things.delete(id)
  await dexie.links.where('thingId').equals(id).delete()
}

/**
 * Get tags by thing ID
 * ...helper
 */
const _getTagsByThingId = async (thingId: string): Promise<Tag[]> => {
  const links = await dexie.links.where('thingId').equals(thingId).toArray()
  const tagIds = links.map((link) => link.tagId)
  return await dexie.tags.where('id').anyOf(tagIds).toArray()
}

/**
 * Live listener for things
 */
export const liveThings = (): Thing[] => {
  const things = useLiveQuery<Thing[]>(async () => {
    const thingArr = await dexie.things.toArray()

    const thingsWithTags = await Promise.all(
      thingArr.map(async (thing) => ({
        ...thing,
        tags: await _getTagsByThingId(thing.id),
      }))
    )

    return thingsWithTags
  })
  return things ?? []
}
