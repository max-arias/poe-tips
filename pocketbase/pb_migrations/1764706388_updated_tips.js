/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1126246072")

  // add field
  collection.fields.addAt(11, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "editor3038863473",
    "maxSize": 0,
    "name": "content2",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "editor"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1126246072")

  // remove field
  collection.fields.removeById("editor3038863473")

  return app.save(collection)
})
