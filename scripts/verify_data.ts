import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    try {
        const tips = await pb.collection('tips').getFullList();
        console.log(`Found ${tips.length} tips.`);

        const leagues = await pb.collection('leagues').getFullList();
        console.log(`Found ${leagues.length} leagues.`);
    } catch (e: any) {
        console.error("Verification failed:", e.message);
    }
}

main();
