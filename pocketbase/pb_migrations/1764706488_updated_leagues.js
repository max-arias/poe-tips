/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_37895261")

  // remove field
  collection.fields.removeById("date987654321")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "date2220669758",
    "max": "",
    "min": "",
    "name": "end_date",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_37895261")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "date987654321",
    "max": "",
    "min": "",
    "name": "end_date",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // remove field
  collection.fields.removeById("date2220669758")

  return app.save(collection)
})
