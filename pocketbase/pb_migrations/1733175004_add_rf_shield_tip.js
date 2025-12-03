/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const tips = app.findCollectionByNameOrId("tips");
    const users = app.findCollectionByNameOrId("users");

    // 1. Find or Create Author "Barricade"
    let author;
    try {
        author = app.findFirstRecordByData("users", "username", "barricade");
    } catch (e) {
        // Create if not exists
        author = new Record(users);
        author.set("username", "barricade");
        author.set("email", "barricade@example.com"); // Dummy email
        author.set("emailVisibility", true);
        author.set("verified", true);
        author.setPassword("1234567890"); // Dummy password
        app.save(author);
    }

    // 2. Create Tip
    const tip = new Record(tips);
    tip.set("title", "How to Craft a Cost-Effective Righteous Fire Shield in PoE 3.27");
    tip.set("description", "A deterministic crafting strategy utilizing Recombinators and Beastcrafting to safely roll life and armor.");
    tip.set("content", `**Step-by-Step Guide**

1.  **Acquire the Base:** Purchase multiple Shaper-influenced Ezomite Tower Shields with at least Item Level 84 to ensure Tier 1 Fire Resistance rolls are possible.
2.  **Roll Suffixes:** Use Alteration Orbs on separate shields to isolate individual desired suffixes: Socketed Gem Reservation Efficiency (30%), Recover Life on Block (3-5%), and Tier 1 Fire Resistance.
3.  **Recombine Suffixes:** Merge the prepared shields using a Recombinator until a single Rare shield is created containing all three desired suffixes.
4.  **Lock Suffixes:** Apply the "Suffixes Cannot Be Changed" meta-modifier using a Wild Bristle Matron beast in the Menagerie to save on Divine Orb costs.
5.  **Reforge Life:** Use the Harvest station's "Reforge a Rare item with random modifiers, including a Life modifier" option to guarantee a Life prefix, repeating the locking process if the tier is too low.
6.  **Finish Prefixes:** Bench craft "Increased Chance to Block" to block the mod pool, then use an Exalted Orb to add a high Armor roll.
7.  **Finalize:** Replace the crafted block modifier with "Armor and Life," set sockets to 2 Blue and 1 Red via bench socket-juggling, and use Blessed Orbs to maximize the implicit life value.

**Video Guide:** [Barricade](https://www.youtube.com/watch?v=PGRMwCbR2iI)`);

    tip.set("tags", ["Crafting", "RF", "Shield", "3.27"]);
    tip.set("author", author.id);
    tip.set("patch_created", "3.27");
    tip.set("last_verified_patch", "3.27");
    tip.set("is_broken", false);
    tip.set("vote_count", 0);

    app.save(tip);

}, (app) => {
    // Down migration: delete the tip
    try {
        const tip = app.findFirstRecordByData("tips", "title", "How to Craft a Cost-Effective Righteous Fire Shield in PoE 3.27");
        app.delete(tip);
    } catch (e) {
        // Tip not found, nothing to do
    }
})
