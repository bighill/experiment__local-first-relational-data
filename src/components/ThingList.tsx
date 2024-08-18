import model from '../models/model'
import ThingEdit from './ThingEdit'

function ThingList() {
  const things = model.liveThings()

  return (
    <ul>
      {things.map((thing) => (
        <li key={thing.id}>
          <div data-cy-label="thing-title">{thing.title}</div>
          <div>
            <small data-cy-label="thing-id">{thing.id}</small>
          </div>
          {thing.tags?.map((tag) => (
            <small
              key={tag.id}
              style={{ marginRight: '1em' }}
              data-cy-label="thing-tag"
            >
              #{tag.title}
            </small>
          ))}
          <ThingEdit thing={thing} />
        </li>
      ))}
    </ul>
  )
}

export default ThingList
