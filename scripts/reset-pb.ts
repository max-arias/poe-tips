import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL || 'max@max-arias.com';
const ADMIN_PASS = process.env.POCKETBASE_ADMIN_PASSWORD || 'y3vR6yPtb4huaH';

async function main() {
    try {
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASS);

        // Delete collections
        const collections = ['requests', 'suggested_edits', 'tip_votes', 'tips'];
        for (const name of collections) {
            try {
                await pb.collections.delete(name);
                console.log(`Deleted collection: ${name}`);
            } catch (e) {
                // Ignore if not found
            }
        }

        // Revert users schema (remove reputation and badges)
        try {
            const users = await pb.collections.getOne('users');
            // We can't easily remove fields via JS SDK without sending the full schema.
            // But we can filter them out.
            // In PB v0.25+, we send "fields" array.
            const newFields = users.fields.filter((f: any) => f.name !== 'reputation' && f.name !== 'badges');
            if (newFields.length !== users.fields.length) {
                await pb.collections.update('users', { fields: newFields });
                console.log('Reverted users schema');
            }
        } catch (e) {
            console.error('Failed to revert users schema:', e);
        }

    } catch (e) {
        console.error(e);
    }
}

main();
