import Dexie, { type EntityTable } from 'dexie'

interface Thing {
  id: string
  title: string
  content: string
  tags?: Tag[]
}

interface Tag {
  id: string
  title: string
  things?: Thing[]
}

interface Link {
  id: string
  thingId: string
  tagId: string
}

const dexie = new Dexie('ThingDatabase') as Dexie & {
  things: EntityTable<Thing, 'id'> // primary key "id" (for the typings only)
  tags: EntityTable<Tag, 'id'>
  links: EntityTable<Link, 'id'>
}

// Schema declaration:
dexie.version(2).stores({
  things: '++id', // primary key "id" (for the runtime!)
  tags: '++id, title',
  links: '++id, thingId, tagId, [thingId+tagId]',
})

export type { Thing, Tag, Link }
export { dexie }
