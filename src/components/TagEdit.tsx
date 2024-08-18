import { useState } from 'react'

import { Tag } from '../lib/dexie'
import model from '../models/model'

interface Props {
  tag: Tag
}

function TagEdit({ tag }: Props) {
  const [title, setTitle] = useState<string>(tag.title)

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    model.updateTag(tag.id, title)
  }

  const handleDelete = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault()
    model.deleteTag(tag.id)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input type="submit" value="Update" />
      <button onClick={handleDelete} data-cy-btn="delete-tag">
        Delete
      </button>
    </form>
  )
}

export default TagEdit
