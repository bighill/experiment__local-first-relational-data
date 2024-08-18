import { FormEvent, useState } from 'react'
import model from '../models/model'

function ThingNew() {
  const [title, setTitle] = useState('')

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    model.createThing(title)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Thing"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        data-cy-input="new-thing"
      />
      <input type="submit" value="Add" />
    </form>
  )
}

export default ThingNew
