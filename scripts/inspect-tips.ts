import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL || 'max@max-arias.com';
const ADMIN_PASS = process.env.POCKETBASE_ADMIN_PASSWORD || 'y3vR6yPtb4huaH';

async function main() {
    try {
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASS);

        const collection = await pb.collections.getOne('tips');
        console.log(JSON.stringify(collection, null, 2));

        // Also try to fetch records here to verify SDK works
        // Try fetching users
        try {
            const users = await pb.collection('users').getList(1, 1);
            console.log('Users fetched:', users.items.length);
        } catch (e: any) {
            console.error('Failed to fetch users:', JSON.stringify(e.response, null, 2));
        }

        // Try fetching tips minimal
        try {
            const records = await pb.collection('tips').getList(1, 10);
            console.log('Tips fetched minimal:', records.items.length);
        } catch (e: any) {
            console.error('Failed to fetch tips minimal:', JSON.stringify(e.response, null, 2));
        }

    } catch (e) {
        console.error(e);
    }
}

main();
