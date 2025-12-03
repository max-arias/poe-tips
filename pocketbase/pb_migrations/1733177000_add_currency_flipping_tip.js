/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const tips = app.findCollectionByNameOrId("tips");
    const users = app.findCollectionByNameOrId("users");

    // 1. Find or Create Author "sirgog"
    let author;
    try {
        author = app.findFirstRecordByData("users", "username", "sirgog");
    } catch (e) {
        // Create if not exists
        author = new Record(users);
        author.set("username", "sirgog");
        author.set("email", "sirgog@example.com"); // Dummy email
        author.set("emailVisibility", true);
        author.set("verified", true);
        author.setPassword("1234567890"); // Dummy password
        app.save(author);
    }

    // 2. Create Tip
    const tip = new Record(tips);
    tip.set("title", "PoE 1 Guide to Currency Flipping (Currency Exchange Market)");
    tip.set("description", "Learn to profit from the Currency Exchange (Faustus) by mastering Arbitrage and Swing Trading while managing gold fees.");
    tip.set("content", `**Method 1: Arbitrage (The Steady Income)**
*Act as a wholesaler: buy small amounts from many players and sell in bulk to wealthy crafters.*

1.  **Select a Commodity:** Choose high-volume items like **Essences, Fossils, or Catalysts**.
    * **The "Bulk Rule":** Focus on items where wealthy players need hundreds at a time (e.g., Deafening Essences) but regular players only find one or two. Avoid low-demand items like Regal Orbs.
2.  **Identify "Blocking Orders" (The Real Price):** Do not look at the cheapest single listing. Look for the "Wall."
    * **Example:** If 5 people are selling 1 Essence for 3 Chaos, but there is a listing of **500 Essences for 4 Chaos**, the "Real Market Price" is 4 Chaos.
    * *Strategy:* If you undercut the 3 Chaos listings, you lose money. Price your items relative to the 4 Chaos wall.
3.  **Place Your Buy Order:** Place a buy order that is slightly higher than the largest "Blocking Buy Order" to ensure you get stock first.
4.  **Place Your Sell Order:** List your stock slightly cheaper than the largest "Blocking Sell Order" to ensure yours sells before the massive wall does.
5.  **Profit:** The difference between your buy and sell price is your margin.

**Method 2: Swing Trading (The Risky Bet)**
*Predict market shifts based on meta changes or streamer builds.*

1.  **Identify a Catalyst:** Watch for patch notes or popular "Build of the Week" videos (e.g., from Mathil, Zizaran, or Jungroan).
    * **Example:** If a popular streamer releases a **Lightning Arrow** guide, demand for **Hyrri's Ire** or specific **Deadeye** jewels will spike instantly.
2.  **Buy Early:** Immediately place aggressive Buy Orders for the specific crafting materials or commodities that build requires (e.g., Metallic Fossils for crafting Lightning gear).
3.  **Hold & Sell:** Wait 12-24 hours for the general player base to see the video and start rerolling, driving the price up. Liquidate your stock into the hype.

**Key Concepts for PoE 1**

* **Gold Management (Faustus Exchange Fee):**
    * In PoE 1's Exchange, every trade costs Gold.
    * **Warning:** Flipping high-value currency (like Divine Orbs) costs significantly more Gold than flipping bubblegum currency (like Chaos/Alterations). Ensure your profit margin is high enough to justify the Gold farming time required.
* **Counterparty Profiling:**
    * **Buying:** Pay in **Chaos Orbs**. Most sellers are casual players who need immediate spending money for map device mods or small upgrades.
    * **Selling:** Sell in **Divine Orbs**. Wealthy crafters prefer to pay in Divines to save time and buy in bulk.

**Additional Resources**
* **Original Article:** [Mobalytics Guide](https://mobalytics.gg/poe-2/guides/currency-flipping) (Source text for the video).
* **Beginner's Guide:** [Currency Exchange UI Guide](https://mobalytics.gg/poe-2/guides/currency-exchange) by Lolcohol.

**Video Guide:** [sirgog](https://www.youtube.com/watch?v=h9b25kPm3sQ)`);

    tip.set("tags", ["Currency", "Flipping", "Exchange", "Strategy", "Faustus"]);
    tip.set("author", author.id);
    tip.set("patch_created", "3.25"); // Settlers of Kalguur introduced Faustus
    tip.set("last_verified_patch", "3.25");
    tip.set("is_broken", false);
    tip.set("vote_count", 0);

    // Link to Settlers league if possible, but for now we leave leagues empty or fetch it
    // The previous example didn't fetch leagues in the migration, but the seed script does.
    // I'll leave leagues empty in the migration for simplicity, or try to fetch "Settlers of Kalguur".
    try {
        const league = app.findFirstRecordByData("leagues", "slug", "settlers");
        tip.set("leagues", [league.id]);
    } catch (e) { }

    app.save(tip);

}, (app) => {
    try {
        const tip = app.findFirstRecordByData("tips", "title", "PoE 1 Guide to Currency Flipping (Currency Exchange Market)");
        app.delete(tip);
    } catch (e) { }
})
