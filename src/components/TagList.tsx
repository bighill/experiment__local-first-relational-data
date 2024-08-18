import { Tag } from '../lib/dexie'
import model from '../models/model'
import TagEdit from './TagEdit'

function TagList() {
  const tags: Tag[] = model.liveTags()

  return (
    <ul>
      {tags.map((tag) => (
        <li key={tag.id}>
          <div>{tag.title}</div>
          <div>
            {' '}
            <small>{tag.id}</small>
          </div>
          <TagEdit tag={tag} />
          {tag.things?.map((thing) => (
            <div key={thing.id} style={{ marginLeft: '1rem' }}>
              <small>... {thing.title}</small>
            </div>
          ))}
        </li>
      ))}
    </ul>
  )
}

export default TagList
