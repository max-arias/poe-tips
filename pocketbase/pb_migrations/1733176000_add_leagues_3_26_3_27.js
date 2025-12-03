/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("leagues");

    const leagues = [
        {
            name: "Mercenaries of Trarthus",
            slug: "mercenaries",
            is_active: true,
            version: "3.26",
        },
        {
            name: "Keepers of the Flame",
            slug: "keepers",
            is_active: true,
            version: "3.27",
        },
    ];

    for (const l of leagues) {
        const record = new Record(collection);
        record.set("name", l.name);
        record.set("slug", l.slug);
        record.set("is_active", l.is_active);
        record.set("version", l.version);
        app.save(record);
    }
}, (app) => {
    const slugs = ["mercenaries", "keepers"];

    for (const slug of slugs) {
        try {
            const record = app.findRecordByData("leagues", "slug", slug);
            app.delete(record);
        } catch (e) {
            // ignore if not found
        }
    }
})
