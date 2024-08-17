import {
  createThing,
  deleteThing,
  liveThings,
  updateThing,
} from './Thing.model'
import {
  createTag,
  deleteTag,
  liveTags,
  readAllTags,
  updateTag,
} from './Tag.model'
import { createLink, liveLinks, readAllLinks } from './Link.model'

const model = {
  createThing,
  createTag,
  createLink,
  readAllTags,
  readAllLinks,
  updateThing,
  updateTag,
  deleteThing,
  deleteTag,
  liveThings,
  liveTags,
  liveLinks,
}

export default model
