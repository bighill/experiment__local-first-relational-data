import { FormEvent, useState } from 'react'
import model from '../models/model'

function LinkNew() {
  const [thingId, setThingId] = useState('')
  const [tagId, setTagId] = useState('')

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    model.createLink(thingId, tagId)
    setThingId('')
    setTagId('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="thingId"
          value={thingId}
          onChange={(ev) => setThingId(ev.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="tagId"
          value={tagId}
          onChange={(ev) => setTagId(ev.target.value)}
        />
      </div>
      <input type="submit" value="Add" />
    </form>
  )
}

export default LinkNew
