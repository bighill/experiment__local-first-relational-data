# Local-first relational data

This experiment has the narrow focus of handling many-to-many relationships using IndexedDB.

- A `Thing` is an object with a title and content
- A `Tag` is an object with a title
- A `Link` is an object that connects those two in a many-to-many relationship

Use Dexie to manage CRUD in IndexedDB.

Each CRUD operation needs to handle the many-to-many relationship.

## UI

Simple CRUD UI to confirm the idea works as expected.

Add/remove tag associations based on data content.

> I.e. add the tag `#Todo` to a `Thing` if the string `#Todo` exists in the things content.

## Omit

- No authentication
- No user management
- No sync or communication outside of the browser

## Todo

TODO run cypress tests in Github Actions

TODO display test results in readme

TODO remove the need for "Tidy" by auto cleaning up unused tags

TODO tag should not be editable outside of the thing's content

TODO improve clarity in UI
