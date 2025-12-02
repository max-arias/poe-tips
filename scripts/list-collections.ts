import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');
const ADMIN_EMAIL = 'max@max-arias.com';
const ADMIN_PASS = 'y3vR6yPtb4huaH';

async function main() {
    try {
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASS);
        const collections = await pb.collections.getFullList();
        console.log('Collections:', collections.map(c => c.name));
    } catch (e) {
        console.error(e);
    }
}

main();
