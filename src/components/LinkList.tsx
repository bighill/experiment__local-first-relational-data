import { Link } from '../lib/dexie'
import model from '../models/model'

function LinkList() {
  const links: Link[] = model.liveLinks()

  return (
    <ul>
      {links.map((link) => (
        <li key={link.id}>
          <small>{link.thingId}</small>
          <br />
          <small style={{ marginLeft: '1rem' }}>{link.tagId} </small>
        </li>
      ))}
    </ul>
  )
}

export default LinkList
