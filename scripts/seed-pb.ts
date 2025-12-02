import PocketBase from 'pocketbase';
import tipsData from '../src/data/tips.json';

const pb = new PocketBase('http://127.0.0.1:8090');
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL || 'max@max-arias.com';
const ADMIN_PASS = process.env.POCKETBASE_ADMIN_PASSWORD || 'y3vR6yPtb4huaH';

async function main() {
    try {
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASS);
        console.log('Authenticated as admin.');

        // 1. Create a dummy author user if not exists
        let authorId;
        try {
            const users = await pb.collection('users').getList(1, 1, { filter: 'email="community@poetips.com"' });
            if (users.items.length > 0) {
                authorId = users.items[0].id;
                console.log('Found existing author user.');
            } else {
                const user = await pb.collection('users').create({
                    username: 'community_bot',
                    email: 'community@poetips.com',
                    password: 'password123',
                    passwordConfirm: 'password123',
                    name: 'Community Bot'
                });
                authorId = user.id;
                console.log('Created author user.');
            }
        } catch (e) {
            console.error('Failed to manage user:', e);
            return;
        }

        // 2. Seed tips
        for (const tip of tipsData) {
            try {
                // Check if tip exists by title to avoid duplicates
                const existing = await pb.collection('tips').getList(1, 1, { filter: `title="${tip.title}"` });
                if (existing.items.length === 0) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { id, author, ...tipData } = tip;
                    await pb.collection('tips').create({
                        ...tipData,
                        author: authorId,
                        vote_count: tip.vote_count || 0,
                        is_broken: tip.is_broken || false
                    });
                    console.log(`Created tip: ${tip.title}`);
                } else {
                    console.log(`Tip already exists: ${tip.title}`);
                }
            } catch (e: any) {
                console.error(`Failed to create tip ${tip.title}:`, JSON.stringify(e.response, null, 2));
            }
        }

    } catch (e) {
        console.error('Seeding failed:', e);
    }
}

main();
