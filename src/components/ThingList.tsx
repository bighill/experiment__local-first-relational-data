import model from '../models/model'
import ThingEdit from './ThingEdit'

function ThingList() {
  const things = model.liveThings()

  return (
    <ul>
      {things.map((thing) => (
        <li key={thing.id}>
          {thing.title} <small>{thing.id}</small>
          {thing.tags?.map((tag) => (
            <div key={tag.id}>
              <small>#{tag.title}</small>
            </div>
          ))}
          <ThingEdit thing={thing} />
        </li>
      ))}
    </ul>
  )
}

export default ThingList
