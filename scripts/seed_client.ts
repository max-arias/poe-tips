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
            { name: "Settlers of Kalguur", slug: "settlers", is_active: true, version: "3.25" },
            { name: "Mercenaries of Trarthus", slug: "mercenaries", is_active: true, version: "3.26" },
            { name: "Keepers of the Flame", slug: "keepers", is_active: true, version: "3.27" }
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
            },
            {
                title: "PoE 1 Guide to Currency Flipping (Currency Exchange Market)",
                description: "Learn to profit from the Currency Exchange (Faustus) by mastering Arbitrage and Swing Trading while managing gold fees.",
                content: "**Method 1: Arbitrage (The Steady Income)**\n*Act as a wholesaler: buy small amounts from many players and sell in bulk to wealthy crafters.*\n\n1.  **Select a Commodity:** Choose high-volume items like **Essences, Fossils, or Catalysts**.\n    * **The \"Bulk Rule\":** Focus on items where wealthy players need hundreds at a time (e.g., Deafening Essences) but regular players only find one or two. Avoid low-demand items like Regal Orbs.\n2.  **Identify \"Blocking Orders\" (The Real Price):** Do not look at the cheapest single listing. Look for the \"Wall.\"\n    * **Example:** If 5 people are selling 1 Essence for 3 Chaos, but there is a listing of **500 Essences for 4 Chaos**, the \"Real Market Price\" is 4 Chaos.\n    * *Strategy:* If you undercut the 3 Chaos listings, you lose money. Price your items relative to the 4 Chaos wall.\n3.  **Place Your Buy Order:** Place a buy order that is slightly higher than the largest \"Blocking Buy Order\" to ensure you get stock first.\n4.  **Place Your Sell Order:** List your stock slightly cheaper than the largest \"Blocking Sell Order\" to ensure yours sells before the massive wall does.\n5.  **Profit:** The difference between your buy and sell price is your margin.\n\n**Method 2: Swing Trading (The Risky Bet)**\n*Predict market shifts based on meta changes or streamer builds.*\n\n1.  **Identify a Catalyst:** Watch for patch notes or popular \"Build of the Week\" videos (e.g., from Mathil, Zizaran, or Jungroan).\n    * **Example:** If a popular streamer releases a **Lightning Arrow** guide, demand for **Hyrri's Ire** or specific **Deadeye** jewels will spike instantly.\n2.  **Buy Early:** Immediately place aggressive Buy Orders for the specific crafting materials or commodities that build requires (e.g., Metallic Fossils for crafting Lightning gear).\n3.  **Hold & Sell:** Wait 12-24 hours for the general player base to see the video and start rerolling, driving the price up. Liquidate your stock into the hype.\n\n**Key Concepts for PoE 1**\n\n* **Gold Management (Faustus Exchange Fee):**\n    * In PoE 1's Exchange, every trade costs Gold.\n    * **Warning:** Flipping high-value currency (like Divine Orbs) costs significantly more Gold than flipping bubblegum currency (like Chaos/Alterations). Ensure your profit margin is high enough to justify the Gold farming time required.\n* **Counterparty Profiling:**\n    * **Buying:** Pay in **Chaos Orbs**. Most sellers are casual players who need immediate spending money for map device mods or small upgrades.\n    * **Selling:** Sell in **Divine Orbs**. Wealthy crafters prefer to pay in Divines to save time and buy in bulk.\n\n**Additional Resources**\n* **Original Article:** [Mobalytics Guide](https://mobalytics.gg/poe-2/guides/currency-flipping) (Source text for the video).\n* **Beginner's Guide:** [Currency Exchange UI Guide](https://mobalytics.gg/poe-2/guides/currency-exchange) by Lolcohol.\n\n**Video Guide:** [sirgog](https://www.youtube.com/watch?v=h9b25kPm3sQ)",
                tags: ["Currency", "Flipping", "Exchange", "Strategy", "Faustus"],
                leagues: ["Settlers of Kalguur"],
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
