migrate((app) => {
    const collection = app.findCollectionByNameOrId("leagues");

    // We can use importCollections to update the schema
    // We need to reconstruct the collection JSON or at least the fields
    // But since we don't have the full JSON here easily without hardcoding, 
    // let's try to find the collection and update it via DAO if possible, 
    // or just use importCollections with the minimal needed to merge? 
    // importCollections usually expects full definition.

    // Let's try the snapshot approach: define the collection fully with the new field.
    // We copy the previous definition and add the field.

    const leagues = {
        "name": "leagues",
        "type": "base",
        "system": false,
        "schema": [
            {
                "name": "name",
                "type": "text",
                "required": true,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": 0,
                    "max": 0,
                    "pattern": ""
                }
            },
            {
                "name": "slug",
                "type": "text",
                "required": true,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": 0,
                    "max": 0,
                    "pattern": ""
                }
            },
            {
                "name": "version",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": 0,
                    "max": 0,
                    "pattern": ""
                }
            },
            {
                "name": "is_active",
                "type": "bool",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {}
            },
            {
                "name": "start_date",
                "type": "date",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": "",
                    "max": ""
                }
            },
            {
                "name": "end_date",
                "type": "date",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": "",
                    "max": ""
                }
            }
        ],
        "indexes": [],
        "listRule": "",
        "viewRule": "",
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    };

    // Note: The structure above is for the old 'schema' format. 
    // New PocketBase versions use 'fields'. 
    // Let's use the 'fields' format as seen in the snapshot.

    const leaguesV2 = {
        "name": "leagues",
        "type": "base",
        "system": false,
        "fields": [
            {
                "autogeneratePattern": "[a-z0-9]{15}",
                "hidden": false,
                "id": "text3208210256",
                "max": 15,
                "min": 15,
                "name": "id",
                "pattern": "^[a-z0-9]+$",
                "presentable": false,
                "primaryKey": true,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text232426666",
                "max": 0,
                "min": 0,
                "name": "name",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": true,
                "system": false,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text289388888",
                "max": 0,
                "min": 0,
                "name": "slug",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": true,
                "system": false,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text389388888",
                "max": 0,
                "min": 0,
                "name": "version",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "text"
            },
            {
                "hidden": false,
                "id": "bool123456789",
                "name": "is_active",
                "presentable": false,
                "required": false,
                "system": false,
                "type": "bool"
            },
            {
                "hidden": false,
                "id": "date123456789",
                "max": "",
                "min": "",
                "name": "start_date",
                "presentable": false,
                "required": false,
                "system": false,
                "type": "date"
            },
            {
                "hidden": false,
                "id": "date987654321",
                "max": "",
                "min": "",
                "name": "end_date",
                "presentable": false,
                "required": false,
                "system": false,
                "type": "date"
            },
            {
                "hidden": false,
                "id": "autodate2990389176",
                "name": "created",
                "onCreate": true,
                "onUpdate": false,
                "presentable": false,
                "system": true,
                "type": "autodate"
            },
            {
                "hidden": false,
                "id": "autodate3332085495",
                "name": "updated",
                "onCreate": true,
                "onUpdate": true,
                "presentable": false,
                "system": true,
                "type": "autodate"
            }
        ],
        "indexes": [],
        "listRule": "",
        "viewRule": "",
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    };

    return app.importCollections([leaguesV2], false);
}, (app) => {
    // Revert
    // We would need to define the previous schema to revert
    return null;
})
