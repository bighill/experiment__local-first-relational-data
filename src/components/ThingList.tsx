import model from '../models/model'
import ThingEdit from './ThingEdit'

function ThingList() {
  const things = model.liveThings()

  return (
    <ul>
      {things.map((thing) => (
        <li key={thing.id}>
          <span data-cy-label="thing-title">{thing.title}</span>
          &nbsp;
          <small data-cy-label="thing-id">{thing.id}</small>
          {thing.tags?.map((tag) => (
            <div key={tag.id}>
              <small data-cy-label="thing-tag">#{tag.title}</small>
            </div>
          ))}
          <ThingEdit thing={thing} />
        </li>
      ))}
    </ul>
  )
}

export default ThingList
