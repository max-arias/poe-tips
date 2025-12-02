import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    console.log("Starting seed script...");
    try {
        const email = process.env.POCKETBASE_ADMIN_EMAIL;
        const password = process.env.POCKETBASE_ADMIN_PASSWORD;

        if (!email || !password) {
            throw new Error("POCKETBASE_ADMIN_EMAIL or POCKETBASE_ADMIN_PASSWORD not set in .env");
        }

        await pb.admins.authWithPassword(email, password);
        console.log("Authenticated as admin.");

        // 1. Create Users
        let author;
        try {
            author = await pb.collection('users').getFirstListItem('email="pohx@example.com"');
            console.log("Author already exists.");
        } catch (e) {
            author = await pb.collection('users').create({
                username: "PohxKappa",
                email: "pohx@example.com",
                password: "1234567890",
                passwordConfirm: "1234567890",
                reputation: 100,
                badges: ["Verified Crafter"]
            });
            console.log("Created author.");
        }

        // 2. Create Leagues
        const leaguesData = [
            { name: "Standard", slug: "standard", is_active: true, version: "Core" },
            { name: "Settlers of Kalguur", slug: "settlers", is_active: true, version: "3.25" }
        ];

        const leagueMap: Record<string, string> = {};

        for (const l of leaguesData) {
            try {
                const record = await pb.collection('leagues').create(l);
                leagueMap[l.name] = record.id;
                console.log(`Created league: ${l.name}`);
            } catch (e: any) {
                console.log(`League ${l.name} creation failed (maybe exists):`, e.message);
                // Try to find it
                try {
                    const record = await pb.collection('leagues').getFirstListItem(`slug="${l.slug}"`);
                    leagueMap[l.name] = record.id;
                } catch (e2) { }
            }
        }

        // 3. Create Tips
        const tipsData = [
            {
                title: "Vendor Search Regex for RF",
                description: "Quick regex to find 3-links and movement speed boots at vendors.",
                content: "Paste this into vendors to instantly highlight links (R-R-G, G-G-R) and movement speed boots: `-\\w-.-|b-b-b|g-g-r|g-r-g|r-g-g|nne|rint|ms`. \n\n**Usage:**\n1. Copy text.\n2. Open Vendor window.\n3. Paste in search bar.",
                tags: ["leveling", "regex", "vendor", "rf"],
                leagues: [],
                author: author.id
            },
            {
                title: "Recombinator Physical Axes",
                description: "How to combine Flaring and Merciless mods on axes using Recombinators.",
                content: "To craft a high pDPS axe:\n1. Alt-spam one axe for T1 'Flaring'.\n2. Alt-spam another for T1 'Merciless'.\n3. **Recombine** them.\n4. If you hit both prefixes, lock prefixes and Veiled Orb to finish.",
                tags: ["crafting", "high budget", "recombinator"],
                leagues: ["Settlers of Kalguur"],
                author: author.id
            },
            {
                title: "Elderslayer Map Rotation",
                description: "A consistent, low-investment strategy for farming Conqueror maps.",
                content: "## The Strategy\n1. Buy 'Elderslayer' maps in bulk.\n2. Run rapidly for Conqueror fragments.\n3. Sell sets.\n\n**Note:** Don't roll maps, just alch and go to save time.",
                tags: ["economy", "farming", "low effort"],
                leagues: [],
                author: author.id
            }
        ];

        for (const t of tipsData) {
            const leagueIds = t.leagues.map(name => leagueMap[name]).filter(id => id);
            const { leagues, ...data } = t;

            try {
                const record = await pb.collection('tips').create({
                    ...data,
                    leagues: leagueIds
                });
                console.log(`Created tip: ${t.title}`);
            } catch (e: any) {
                console.log(`Tip ${t.title} creation failed:`, e.message);
            }
        }

    } catch (e: any) {
        console.error("Seeding failed:", e);
    }
}

main();
