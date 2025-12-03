/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("abbreviations");

    const data = [
        // General / Chat
        { "acronym": "A1", "definition": "Act 1. Often refers to the town Lioneye's Watch.", "category": "General" },
        { "acronym": "A2", "definition": "Act 2. Often refers to the town The Forest Encampment.", "category": "General" },
        { "acronym": "A3", "definition": "Act 3. Often refers to the town The Sarn Encampment.", "category": "General" },
        { "acronym": "A4", "definition": "Act 4. Often refers to the town Highgate.", "category": "General" },
        { "acronym": "A5", "definition": "Act 5. Often refers to the town Overseer's Tower.", "category": "General" },
        { "acronym": "A6", "definition": "Act 6. Often refers to the town Lioneye's Watch (Part 2).", "category": "General" },
        { "acronym": "A7", "definition": "Act 7. Often refers to the town The Bridge Encampment.", "category": "General" },
        { "acronym": "A8", "definition": "Act 8. Often refers to the town The Sarn Encampment (Part 2).", "category": "General" },
        { "acronym": "A9", "definition": "Act 9. Often refers to the town Highgate (Part 2).", "category": "General" },
        { "acronym": "A10", "definition": "Act 10. Often refers to the town Oriath Docks.", "category": "General" },
        { "acronym": "AFK", "definition": "Away From Keyboard. The player is not currently active.", "category": "General" },
        { "acronym": "BiS", "definition": "Best in Slot. The absolute best item possible for a specific gear slot in a build.", "category": "General" },
        { "acronym": "GG", "definition": "Good Game or Godly Gear. Used to describe very powerful items.", "category": "General" },
        { "acronym": "IGN", "definition": "In-Game Name. The name of the character someone is currently playing.", "category": "General" },
        { "acronym": "LFG", "definition": "Looking For Group. A player seeking a party.", "category": "General" },
        { "acronym": "LFM", "definition": "Looking For More/Members. A party seeking more players.", "category": "General" },
        { "acronym": "MTX", "definition": "Microtransactions. Cosmetic items purchased from the store.", "category": "General" },
        { "acronym": "PC", "definition": "Price Check. Asking the community to estimate the value of an item.", "category": "General" },
        { "acronym": "PK", "definition": "Player Kill. Killing another player (usually in Cutthroat events or via Hall of Grandmasters).", "category": "General" },
        { "acronym": "PM", "definition": "Private Message. Whispering a player directly.", "category": "General" },
        { "acronym": "RIP", "definition": "Rest In Peace. Used when a character dies, especially in Hardcore.", "category": "General" },
        { "acronym": "RMT", "definition": "Real Money Trading. Buying in-game items with real money (bannable offense).", "category": "General" },
        { "acronym": "WTS", "definition": "Want To Sell. Looking to sell an item.", "category": "General" },
        { "acronym": "WTB", "definition": "Want To Buy. Looking to purchase an item.", "category": "General" },
        { "acronym": "WTT", "definition": "Want To Trade. Looking to trade one item for another.", "category": "General" },

        // Currency
        { "acronym": "alt", "definition": "Orb of Alteration.", "category": "Currency" },
        { "acronym": "aug", "definition": "Orb of Augmentation.", "category": "Currency" },
        { "acronym": "alch", "definition": "Orb of Alchemy.", "category": "Currency" },
        { "acronym": "bauble", "definition": "Glassblower's Bauble.", "category": "Currency" },
        { "acronym": "bless", "definition": "Blessed Orb.", "category": "Currency" },
        { "acronym": "c", "definition": "Chaos Orb. The standard currency for small to medium trades.", "category": "Currency" },
        { "acronym": "chaos", "definition": "Chaos Orb.", "category": "Currency" },
        { "acronym": "chrom", "definition": "Chromatic Orb.", "category": "Currency" },
        { "acronym": "chance", "definition": "Orb of Chance.", "category": "Currency" },
        { "acronym": "div", "definition": "Divine Orb. The standard currency for high-value trades.", "category": "Currency" },
        { "acronym": "d", "definition": "Divine Orb.", "category": "Currency" },
        { "acronym": "ex", "definition": "Exalted Orb. Formerly the high-value standard, now used for crafting.", "category": "Currency" },
        { "acronym": "fuse", "definition": "Orb of Fusing.", "category": "Currency" },
        { "acronym": "gcp", "definition": "Gemcutter's Prism.", "category": "Currency" },
        { "acronym": "jew", "definition": "Jeweller's Orb.", "category": "Currency" },
        { "acronym": "mirr", "definition": "Mirror of Kalandra. The most valuable currency item.", "category": "Currency" },
        { "acronym": "regal", "definition": "Regal Orb.", "category": "Currency" },
        { "acronym": "regret", "definition": "Orb of Regret.", "category": "Currency" },
        { "acronym": "scour", "definition": "Orb of Scouring.", "category": "Currency" },
        { "acronym": "trans", "definition": "Orb of Transmutation.", "category": "Currency" },
        { "acronym": "vaal", "definition": "Vaal Orb.", "category": "Currency" },
        { "acronym": "whet", "definition": "Blacksmith's Whetstone.", "category": "Currency" },

        // Skills & Gems
        { "acronym": "AA", "definition": "Arctic Armour.", "category": "Skills" },
        { "acronym": "AL", "definition": "Arcane Link (or Awakener Level in Atlas context).", "category": "Skills" },
        { "acronym": "AW", "definition": "Ancestral Warchief OR Animate Weapon, depending on context.", "category": "Skills" },
        { "acronym": "BB", "definition": "Blade Blast.", "category": "Skills" },
        { "acronym": "BF", "definition": "Blade Flurry or Bladefall.", "category": "Skills" },
        { "acronym": "BL", "definition": "Ball Lightning.", "category": "Skills" },
        { "acronym": "BLoS", "definition": "Ball Lightning of Static (Transfigured Gem).", "category": "Skills" },
        { "acronym": "BV", "definition": "Blade Vortex.", "category": "Skills" },
        { "acronym": "CA", "definition": "Caustic Arrow.", "category": "Skills" },
        { "acronym": "CoC", "definition": "Cast On Critical Strike Support.", "category": "Skills" },
        { "acronym": "CoH", "definition": "Curse On Hit (now usually Hextouch Support).", "category": "Skills" },
        { "acronym": "CwC", "definition": "Cast While Channeling Support.", "category": "Skills" },
        { "acronym": "CwDT", "definition": "Cast When Damage Taken Support.", "category": "Skills" },
        { "acronym": "DD", "definition": "Detonate Dead.", "category": "Skills" },
        { "acronym": "EA", "definition": "Explosive Arrow.", "category": "Skills" },
        { "acronym": "EC", "definition": "Enduring Cry.", "category": "Skills" },
        { "acronym": "ED", "definition": "Essence Drain.", "category": "Skills" },
        { "acronym": "EK", "definition": "Ethereal Knives.", "category": "Skills" },
        { "acronym": "FA", "definition": "Faster Attacks Support.", "category": "Skills" },
        { "acronym": "FB", "definition": "Frost Blades, Fireball, or Flameblast.", "category": "Skills" },
        { "acronym": "FP", "definition": "Freezing Pulse.", "category": "Skills" },
        { "acronym": "FS", "definition": "Flicker Strike.", "category": "Skills" },
        { "acronym": "GC", "definition": "Glacial Cascade.", "category": "Skills" },
        { "acronym": "GMP", "definition": "Greater Multiple Projectiles Support.", "category": "Skills" },
        { "acronym": "HoA", "definition": "Herald of Ash or Herald of Agony.", "category": "Skills" },
        { "acronym": "HoAg", "definition": "Herald of Agony.", "category": "Skills" },
        { "acronym": "HoI", "definition": "Herald of Ice.", "category": "Skills" },
        { "acronym": "HoP", "definition": "Herald of Purity.", "category": "Skills" },
        { "acronym": "HoT", "definition": "Herald of Thunder.", "category": "Skills" },
        { "acronym": "IC", "definition": "Immortal Call.", "category": "Skills" },
        { "acronym": "KB", "definition": "Kinetic Blast.", "category": "Skills" },
        { "acronym": "KBC", "definition": "Kinetic Blast of Clustering (Transfigured Gem).", "category": "Skills" },
        { "acronym": "KBoC", "definition": "Kinetic Blast of Clustering (Transfigured Gem).", "category": "Skills" },
        { "acronym": "LA", "definition": "Lightning Arrow.", "category": "Skills" },
        { "acronym": "LMP", "definition": "Lesser Multiple Projectiles Support.", "category": "Skills" },
        { "acronym": "LS", "definition": "Lightning Strike.", "category": "Skills" },
        { "acronym": "MS", "definition": "Molten Strike or Movement Speed (context dependent).", "category": "Skills" },
        { "acronym": "PBoD", "definition": "Penance Brand of Dissipation (Transfigured Gem).", "category": "Skills" },
        { "acronym": "PC", "definition": "Poisonous Concoction (or Price Check, context dependent).", "category": "Skills" },
        { "acronym": "PCoC", "definition": "Power Charge On Critical Support.", "category": "Skills" },
        { "acronym": "RF", "definition": "Righteous Fire.", "category": "Skills" },
        { "acronym": "RoA", "definition": "Rain of Arrows.", "category": "Skills" },
        { "acronym": "SA", "definition": "Scourge Arrow.", "category": "Skills" },
        { "acronym": "SR", "definition": "Scorching Ray.", "category": "Skills" },
        { "acronym": "SRS", "definition": "Summon Raging Spirits.", "category": "Skills" },
        { "acronym": "ST", "definition": "Spectral Throw.", "category": "Skills" },
        { "acronym": "TR", "definition": "Toxic Rain.", "category": "Skills" },
        { "acronym": "TS", "definition": "Tornado Shot.", "category": "Skills" },
        { "acronym": "VD", "definition": "Volatile Dead.", "category": "Skills" },
        { "acronym": "VP", "definition": "Vaal Pact (Keystone) or Void Pocket (rare).", "category": "Skills" },
        { "acronym": "VMS", "definition": "Vaal Molten Shell.", "category": "Skills" },
        { "acronym": "WED", "definition": "Weapon Elemental Damage (now Elemental Damage with Attacks Support).", "category": "Skills" },

        // Unique Items
        { "acronym": "BoR", "definition": "Bringer of Rain (Unique Helmet).", "category": "Items" },
        { "acronym": "CJ", "definition": "Cospri's Jewelled Foil (Cospri's Malice).", "category": "Items" },
        { "acronym": "HH", "definition": "Headhunter (Unique Belt).", "category": "Items" },
        { "acronym": "MB", "definition": "Mageblood (Unique Belt).", "category": "Items" },
        { "acronym": "Kaom's", "definition": "Kaom's Heart (Unique Body Armour).", "category": "Items" },
        { "acronym": "QotF", "definition": "Queen of the Forest (Unique Body Armour).", "category": "Items" },
        { "acronym": "Shavs", "definition": "Shavronne's Wrappings (Unique Body Armour).", "category": "Items" },
        { "acronym": "ToH", "definition": "Taste of Hate (Unique Flask).", "category": "Items" },
        { "acronym": "RoA", "definition": "Rise of the Phoenix (Unique Shield) - rare, usually refers to skill Rain of Arrows.", "category": "Items" },
        { "acronym": "FF", "definition": "Forbidden Flesh / Forbidden Flame (Unique Jewels).", "category": "Items" },
        { "acronym": "IE", "definition": "Impossible Escape (Unique Jewel).", "category": "Items" },
        { "acronym": "IL", "definition": "Inspired Learning (Unique Jewel).", "category": "Items" },
        { "acronym": "Squire", "definition": "The Squire (Unique Shield).", "category": "Items" },

        // Passive Tree / Keystones / Stats
        { "acronym": "CI", "definition": "Chaos Inoculation (Keystone). Maximum Life becomes 1, Immune to Chaos Damage.", "category": "Passives" },
        { "acronym": "BM", "definition": "Blood Magic (Keystone). Skills spend Life instead of Mana.", "category": "Passives" },
        { "acronym": "EB", "definition": "Eldritch Battery (Keystone). Energy Shield protects Mana instead of Life.", "category": "Passives" },
        { "acronym": "EE", "definition": "Elemental Equilibrium (Keystone).", "category": "Passives" },
        { "acronym": "EO", "definition": "Elemental Overload (Keystone).", "category": "Passives" },
        { "acronym": "GR", "definition": "Ghost Reaver (Keystone). Life Leech is applied to Energy Shield.", "category": "Passives" },
        { "acronym": "IR", "definition": "Iron Reflexes (Keystone). Converts Evasion to Armour.", "category": "Passives" },
        { "acronym": "MoM", "definition": "Mind Over Matter (Keystone). Damage is taken from Mana before Life.", "category": "Passives" },
        { "acronym": "RT", "definition": "Resolute Technique (Keystone). Hits cannot be evaded, but never deal Critical Strikes.", "category": "Passives" },
        { "acronym": "US", "definition": "Unwavering Stance (Keystone). Cannot be Stunned, Cannot Evade.", "category": "Passives" },
        { "acronym": "VP", "definition": "Vaal Pact (Keystone). Life Leech is instant/doubled but no Life Regeneration.", "category": "Passives" },
        { "acronym": "ZO", "definition": "Zealot's Oath (Keystone). Life Regeneration applies to Energy Shield.", "category": "Passives" },
        { "acronym": "AoE", "definition": "Area of Effect.", "category": "Stats" },
        { "acronym": "APS", "definition": "Attacks Per Second.", "category": "Stats" },
        { "acronym": "Crit", "definition": "Critical Strike Chance / Multiplier.", "category": "Stats" },
        { "acronym": "DoT", "definition": "Damage over Time.", "category": "Stats" },
        { "acronym": "DPS", "definition": "Damage Per Second.", "category": "Stats" },
        { "acronym": "eDPS", "definition": "Elemental Damage Per Second (usually on weapons).", "category": "Stats" },
        { "acronym": "pDPS", "definition": "Physical Damage Per Second (usually on weapons).", "category": "Stats" },
        { "acronym": "EHP", "definition": "Effective Hit Points. A measure of how much raw damage a character can take.", "category": "Stats" },
        { "acronym": "ES", "definition": "Energy Shield.", "category": "Stats" },
        { "acronym": "EV", "definition": "Evasion Rating.", "category": "Stats" },
        { "acronym": "HP", "definition": "Hit Points (Life).", "category": "Stats" },
        { "acronym": "IIQ", "definition": "Increased Item Quantity (often called Quant).", "category": "Stats" },
        { "acronym": "IIR", "definition": "Increased Item Rarity (often called Rarity).", "category": "Stats" },
        { "acronym": "MF", "definition": "Magic Find. Building a character to maximize IIQ and IIR.", "category": "Stats" },
        { "acronym": "MS", "definition": "Movement Speed.", "category": "Stats" },
        { "acronym": "Res", "definition": "Resistance (Fire, Cold, Lightning, Chaos).", "category": "Stats" },
        { "acronym": "zHP", "definition": "Zero HP. A build with almost no defensive investment, usually for deep Delve.", "category": "Stats" },
        { "acronym": "zdps", "definition": "Zero DPS. A support build that deals no damage but buffs allies, or a meme insult for a weak build.", "category": "Stats" },

        // Game Mechanics / Content
        { "acronym": "5-way", "definition": "Domain of Timeless Conflict with 5 emblems. A method for gaining XP quickly.", "category": "Content" },
        { "acronym": "HC", "definition": "Hardcore League. Permadeath mode.", "category": "Content" },
        { "acronym": "SC", "definition": "Softcore League. Standard mode where you respawn upon death.", "category": "Content" },
        { "acronym": "SSF", "definition": "Solo Self-Found. A league mode with no trading or partying.", "category": "Content" },
        { "acronym": "Ruthless", "definition": "A game mode with extreme item scarcity.", "category": "Content" },
        { "acronym": "Lab", "definition": "The Lord's Labyrinth. Run to ascend your character.", "category": "Content" },
        { "acronym": "Uber Lab", "definition": "The Eternal Labyrinth (Tier 4).", "category": "Content" },
        { "acronym": "Simu", "definition": "Simulacrum. An endgame wave-based encounter from Delirium.", "category": "Content" },
        { "acronym": "T16", "definition": "Tier 16 Map. The highest tier of standard maps on the Atlas.", "category": "Content" },
        { "acronym": "T17", "definition": "Tier 17 Map. Extremely difficult endgame maps bridging the gap to Uber Bosses.", "category": "Content" },
        { "acronym": "8-mod", "definition": "A corrupted map with 8 modifiers, offering high quantity and pack size.", "category": "Content" },
        { "acronym": "PoB", "definition": "Path of Building. Third-party software used to plan and calculate build stats.", "category": "Tools" }
    ];

    // 1. Upsert Data
    data.forEach(item => {
        try {
            const record = app.findFirstRecordByData("abbreviations", "acronym", item.acronym);
            // Found, update it
            record.set("definition", item.definition);
            record.set("category", item.category);
            app.save(record);
        } catch (e) {
            // Not found, create it
            const record = new Record(collection);
            record.set("acronym", item.acronym);
            record.set("definition", item.definition);
            record.set("category", item.category);
            app.save(record);
        }
    });

    // 2. Remove Duplicates
    // We fetch all records and keep track of seen acronyms.
    // Since we just upserted, the "latest" version is already in the DB.
    // If there were duplicates *before* this migration that weren't caught by findFirstRecordByData (unlikely if we only use that),
    // or if we want to be super safe.
    // Note: findFirstRecordByData returns the *first* match. If there are multiple, the others are ignored by the upsert above.
    // So we need to explicitly find and delete them.

    const allRecords = app.findAllRecords("abbreviations");
    const seenAcronyms = new Set();

    allRecords.forEach(record => {
        const acronym = record.getString("acronym");
        if (seenAcronyms.has(acronym)) {
            // Duplicate found, delete it
            app.delete(record);
        } else {
            seenAcronyms.add(acronym);
        }
    });

    // 3. Enforce Uniqueness
    // Now that duplicates are gone, we can safely add the unique constraint.
    // Note: In some PocketBase JS VM versions, collection.schema might be undefined or accessed differently.
    // We try to access fields directly if schema is not available.
    const field = collection.fields.find(f => f.name === "acronym");
    if (field) {
        field.unique = true;
        app.save(collection);
    }

}, (app) => {
    // Down migration
    const collection = app.findCollectionByNameOrId("abbreviations");
    const field = collection.fields.find(f => f.name === "acronym");
    if (field) {
        field.unique = false;
        app.save(collection);
    }
})
