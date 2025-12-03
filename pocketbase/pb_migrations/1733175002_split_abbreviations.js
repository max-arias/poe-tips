/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("abbreviations");

    // Find all records where the acronym contains a comma
    // Note: PocketBase JS VM might not support complex filter queries easily in findRecords, 
    // so we iterate. But for performance, we can try to filter if possible. 
    // Since we can't easily do a "contains" query for a specific character in a performant way without a full scan anyway,
    // and the dataset is small (hundreds), fetching all is fine.
    const records = app.findAllRecords("abbreviations");

    records.forEach(record => {
        const acronym = record.getString("acronym");
        if (acronym.includes(",")) {
            const parts = acronym.split(",").map(s => s.trim());
            const definition = record.getString("definition");
            const category = record.getString("category");

            // Create new records for each part
            parts.forEach(part => {
                // Check if it already exists to avoid duplicates (though our previous migration might have created them)
                try {
                    app.findFirstRecordByData("abbreviations", "acronym", part);
                } catch (e) {
                    const newRecord = new Record(collection);
                    newRecord.set("acronym", part);
                    newRecord.set("definition", definition);
                    newRecord.set("category", category);
                    app.save(newRecord);
                }
            });

            // Delete the original record
            app.delete(record);
        }
    });

}, (app) => {
    // Down migration is hard because we don't know exactly which records were split from which.
    // We could try to merge them back but it's complex and maybe unnecessary for this seed data fix.
})
