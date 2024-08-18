import Card from './components/Card'
import LinkList from './components/LinkList'
import LinkNew from './components/LinkNew'
import TagList from './components/TagList'
import TagNew from './components/TagNew'
import TagTidy from './components/TagTidy'
import ThingList from './components/ThingList'
import ThingNew from './components/ThingNew'

function App() {
  return (
    <>
      <Card title="Things">
        <ThingNew />
        <ThingList />
      </Card>

      <Card title="Links">
        <LinkNew />
        <LinkList />
      </Card>

      <Card title="Tags">
        <TagTidy />
        <TagNew />
        <TagList />
      </Card>
    </>
  )
}

export default App
