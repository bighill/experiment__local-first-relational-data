import model from '../models/model'

function TagTidy() {
  const handleClick = () => {
    deleteTags()
  }

  const deleteTags = async () => {
    const links = await model.readAllLinks()
    const tags = await model.readAllTags()
    const tagIdsWithLink = new Set(links.map((link) => link.tagId))
    const tagsToDelete = tags.filter((tag) => !tagIdsWithLink.has(tag.id))
    for (const tag of tagsToDelete) {
      await model.deleteTag(tag.id)
    }
  }

  return (
    <button style={{ marginBottom: '1rem' }} onClick={handleClick}>
      Tidy
    </button>
  )
}

export default TagTidy
