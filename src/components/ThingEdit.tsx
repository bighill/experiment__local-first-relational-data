import { useState } from 'react'

import { Thing } from '../lib/dexie'
import model from '../models/model'

interface Props {
  thing: Thing
}

function ThingEdit({ thing }: Props) {
  const [title, setTitle] = useState<string>(thing.title)
  const [content, setContent] = useState<string>(thing.content)

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    model.updateThing(thing.id, title, content)
  }

  const handleDelete = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault()
    model.deleteThing(thing.id)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          data-cy-input="update-thing-title"
        />
        <input type="submit" value="Update" data-cy-btn="update-thing" />
        <button onClick={handleDelete} data-cy-btn="delete-thing">
          Delete
        </button>
      </form>
      <textarea
        value={content}
        placeholder='Add any content to this textarea. Hashtags in the content will be assigned as a tag for this "thing".'
        onChange={(ev) => setContent(ev.target.value)}
        data-cy-input="update-thing-content"
      ></textarea>
    </>
  )
}

export default ThingEdit
