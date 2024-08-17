import { FormEvent, useState } from 'react'
import model from '../models/model'

function TagNew() {
  const [title, setTitle] = useState('')

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    model.createTag(title)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Tag"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input type="submit" value="Add" />
    </form>
  )
}

export default TagNew
