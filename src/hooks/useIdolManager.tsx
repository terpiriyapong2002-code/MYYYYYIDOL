// @ts-nocheck
import { useState, useEffect, useCallback } from 'react';


// PASTE THIS ENTIRE BLOCK BEFORE loadGame
export const getFormattedDateForWeek = (weekNumber) => {
    if (!weekNumber) return '';
    const startDate = new Date('2025-01-01');
    const currentDate = new Date(startDate.getTime());
    currentDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);

    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString('default', { month: 'long' });

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const dayOfWeek = firstDayOfMonth.getDay();

    const weekOfMonth = Math.ceil((currentDate.getDate() + dayOfWeek) / 7);

    return `Week ${weekOfMonth}, ${month}, ${year}`;
};



export const getTheaterCapacity = (level) => {
    if (level === 1) return 100;
    if (level === 2) return 250;
    if (level === 3) return 500;
    return 0;
};

export const getTicketPrice = (level) => {
    if (level === 1) return 1000;
    if (level === 2) return 1500;
    if (level === 3) return 2000;
    return 0;
};

export const warehouseTiers = {
    1: { capacity: 5000, cost: 0 },
    2: { capacity: 15000, cost: 150000 },
    3: { capacity: 50000, cost: 500000 },
    4: { capacity: 100000, cost: 1200000 },
    5: { capacity: 250000, cost: 3000000 },
};


export const staffTiers = {
    merchManager: {
        1: { name: 'Rookie Manager', cost: 250000, effect: '-5% Production Cost, +5% Sales Revenue' },
        2: { name: 'Pro Manager', cost: 750000, effect: '-10% Production Cost, +10% Sales Revenue' },
        3: { name: 'Veteran Manager', cost: 2000000, effect: '-15% Production Cost, +15% Sales Revenue' }
    }
};


export const productionTiers = {
    training: { standard: { name: 'Standard Practice', cost: 0, effect: 'Base skill gain from facilities.' }, workshop: { name: 'Specialized Workshop', cost: 50000, effect: '+5 Sing/Dance for Senbatsu.' }, overseas: { name: 'Intensive Camp', cost: 250000, effect: '+15 Sing/Dance for Senbatsu.' }, bootcamp: { name: 'Idol Bootcamp', cost: 400000, effect: '+20 Sing/Dance for Senbatsu, slight morale strain.' }, elite: { name: 'Elite Trainer Program', cost: 650000, effect: '+25 Sing/Dance & improved consistency.' }, oneOnOne: { name: '1-on-1 Master Coaching', cost: 900000, effect: '+30 Sing/Dance for selected members, very high efficiency.' } },
    song: { inHouse: { name: 'In-house Team', cost: 0, effect: 'Standard song quality.' }, rookie: { name: 'Rookie Producer', cost: 50000, effect: '+5% Sales Potential.' }, external: { name: 'External Songwriter', cost: 100000, effect: '+10% Sales Potential.' }, trend: { name: 'Trend-focused Producer', cost: 180000, effect: '+15% Sales Potential, short-term hype boost.' }, famous: { name: 'Famous Producer', cost: 400000, effect: '+25% Sales & +10% Hype.' }, hitmaker: { name: 'Top-tier Hitmaker', cost: 750000, effect: '+40% Sales, strong chart performance.' } },
    mv: { none: { name: 'No Music Video', cost: 0, effect: 'Minimal promotion.' }, practice: { name: 'Practice Room MV', cost: 20000, effect: '+5% Fan Gain.' }, performance: { name: 'Performance MV', cost: 60000, effect: '+8% Fan Gain & Performance Appeal.' }, location: { name: 'On-Location MV', cost: 150000, effect: '+15% Fan Gain & Hype.' }, storyline: { name: 'Storyline MV', cost: 300000, effect: '+20% Fan Gain, Emotional Impact.' }, cinematic: { name: 'Cinematic MV', cost: 600000, effect: '+30% Fan Gain, High Hype, Viral Chance.' }, blockbuster: { name: 'Blockbuster MV', cost: 1000000, effect: '+45% Fan Gain, Massive Hype, Guaranteed Media Buzz.' } },
    outfits: { existing: { name: 'Use Existing Outfits', cost: 0, effect: 'No visual bonus.' }, recolor: { name: 'Reworked Outfits', cost: 40000, effect: 'Minor visual refresh.' }, custom: { name: 'New Custom Outfits', cost: 120000, effect: 'Boosts Morale & Visuals.' }, concept: { name: 'Concept-Specific Styling', cost: 200000, effect: '+10% Concept Immersion & Hype.' }, luxury: { name: 'Luxury Designer Outfits', cost: 450000, effect: 'Major visual boost, attracts brand deals.' } },
    promo: { none: { name: 'Word of Mouth', cost: 0, effect: 'Base pre-release buzz.' }, social: { name: 'Social Media Ads', cost: 30000, effect: '+10% Pre-release Fans.' }, teaser: { name: 'Teaser Rollout', cost: 60000, effect: '+15% Pre-release Fans & Hype.' }, variety: { name: 'Variety Show Appearances', cost: 120000, effect: '+20% General Public Awareness.' }, blitz: { name: 'Full Media Blitz', cost: 200000, effect: '+25% Pre-release Fans & Chart Rank.' }, global: { name: 'Global Promotion Campaign', cost: 400000, effect: '+35% Pre-release Fans, Strong Overseas Charts.' } }
  };

    // Performance Types Data
    export const performanceTypes = [
        // ===== Official =====
        { label: "Debut Stage", category: "Official", cost: 10000, fanImpact: 0.1, skillImpact: 0.1, staminaDrain: 20, stressGain: 25, desc: "The official first performance to introduce the group." },
        { label: "Comeback Stage", category: "Official", cost: 20000, fanImpact: 0.2, skillImpact: 0.15, staminaDrain: 30, stressGain: 20, desc: "Performance for new album/single promotions." },
        { label: "First Performance Stage", category: "Official", cost: 20000, fanImpact: 0.6, skillImpact: 0.15, staminaDrain: 30, stressGain: 20, desc: "Performance for new album/single promotions." },
        { label: "Music Show Performance", category: "Official", cost: 15000, fanImpact: 0.15, skillImpact: 0.1, staminaDrain: 25, stressGain: 15, desc: "Weekly appearance on a major music program." },
        { label: "Award Show Stage", category: "Official", cost: 50000, fanImpact: 0.3, skillImpact: 0.2, staminaDrain: 40, stressGain: 30, desc: "A high-profile stage at a year-end award show." },
        { label: "Special Stage", category: "Official", cost: 30000, fanImpact: 0.25, skillImpact: 0.15, staminaDrain: 35, stressGain: 20, desc: "One-off collaborative or unique concept stage." },
        { label: "Anniversary Stage", category: "Official", cost: 40000, fanImpact: 0.25, skillImpact: 0.1, staminaDrain: 30, stressGain: 10, desc: "A celebratory performance marking an anniversary." },
        { label: "Graduation Concert", category: "Official", cost: 150000, fanImpact: 0.5, skillImpact: 0.2, staminaDrain: 50, stressGain: 5, desc: "A grand, final concert for a graduating member." },
        // Added Official
        { label: "Collaboration Stage", category: "Official", cost: 35000, fanImpact: 0.3, skillImpact: 0.2, staminaDrain: 35, stressGain: 25, desc: "Joint stage with another artist. Strong crossover potential." },
        { label: "Opening Act Stage", category: "Official", cost: 20000, fanImpact: 0.18, skillImpact: 0.15, staminaDrain: 30, stressGain: 15, desc: "Opening performance for a senior artist or big show." },
        { label: "Encore Stage", category: "Official", cost: 12000, fanImpact: 0.12, skillImpact: 0.05, staminaDrain: 12, stressGain: 5, desc: "Extra stage after strong demand or a win." },
        { label: "Remix/Version Stage", category: "Official", cost: 18000, fanImpact: 0.14, skillImpact: 0.12, staminaDrain: 25, stressGain: 10, desc: "Special remix arrangement to refresh promotions." },
        { label: "OST Live Stage", category: "Official", cost: 22000, fanImpact: 0.2, skillImpact: 0.1, staminaDrain: 25, stressGain: 15, desc: "Live stage for a drama/film OST; boosts general public reach." },
        { label: "Radio Live Session", category: "Official", cost: 8000, fanImpact: 0.08, skillImpact: 0.12, staminaDrain: 12, stressGain: 10, desc: "Live vocal-focused session on radio or studio broadcast." },
      
        // ===== Promotional =====
        { label: "Road Show", category: "Promotional", cost: 5000, fanImpact: 0.05, skillImpact: 0.05, staminaDrain: 15, stressGain: 10, desc: "Outdoor public performance to attract local fans." },
        { label: "Busking", category: "Promotional", cost: 2000, fanImpact: 0.02, skillImpact: 0.05, staminaDrain: 10, stressGain: 5, desc: "Street performance, low cost, small local gains." },
        { label: "Fanmeeting Stage", category: "Promotional", cost: 15000, fanImpact: 0.1, skillImpact: 0.05, staminaDrain: 20, stressGain: -5, desc: "Performance for official fan club members." },
        { label: "Campus Festival", category: "Promotional", cost: 8000, fanImpact: 0.1, skillImpact: 0.05, staminaDrain: 20, stressGain: 10, desc: "Performing at a university event, popular with youth." },
        { label: "Corporate Event", category: "Promotional", cost: 25000, fanImpact: 0.05, skillImpact: 0.1, staminaDrain: 25, stressGain: 15, desc: "Paid performance for a private business event. High revenue, low fans." },
        { label: "TV Appearance", category: "Promotional", cost: 12000, fanImpact: 0.15, skillImpact: 0.1, staminaDrain: 20, stressGain: 15, desc: "Non-music TV guest slot with a short performance segment." },
      
        // Added Promotional
        { label: "Rookie Showcase", category: "Promotional", cost: 7000, fanImpact: 0.1, skillImpact: 0.1, staminaDrain: 20, stressGain: 15, desc: "Small-scale stage to build early supporters and press." },
        { label: "Local TV Stage", category: "Promotional", cost: 6000, fanImpact: 0.08, skillImpact: 0.05, staminaDrain: 15, stressGain: 10, desc: "Regional broadcast performance; steady local growth." },
        { label: "Radio Showcase Stage", category: "Promotional", cost: 5000, fanImpact: 0.06, skillImpact: 0.08, staminaDrain: 12, stressGain: 10, desc: "Short performance + talk segment; boosts recognition." },
        { label: "Brand Pop-Up Stage", category: "Promotional", cost: 18000, fanImpact: 0.12, skillImpact: 0.06, staminaDrain: 20, stressGain: 15, desc: "Brand event pop-up stage; good buzz, moderate fan gain." },
        { label: "Mall Event Stage", category: "Promotional", cost: 4000, fanImpact: 0.05, skillImpact: 0.04, staminaDrain: 12, stressGain: 5, desc: "Mini-stage in a public venue; quick exposure." },
        { label: "Press/Media Showcase", category: "Promotional", cost: 10000, fanImpact: 0.1, skillImpact: 0.05, staminaDrain: 15, stressGain: 20, desc: "Media-facing performance for articles/clips and interviews." },
      
        // ===== Touring =====
        { label: "Concert Tour", category: "Touring", cost: 100000, fanImpact: 0.4, skillImpact: 0.3, staminaDrain: 50, stressGain: 35, desc: "A series of major performances across cities. High investment/high reward." },
        { label: "Showcase", category: "Touring", cost: 30000, fanImpact: 0.2, skillImpact: 0.15, staminaDrain: 30, stressGain: 20, desc: "Short series of performances focusing on album track B-sides." },
        { label: "Music Festival", category: "Touring", cost: 35000, fanImpact: 0.3, skillImpact: 0.2, staminaDrain: 45, stressGain: 30, desc: "Performing alongside other major artists at a festival." },
        { label: "Overseas Promotion Stage", category: "Touring", cost: 60000, fanImpact: 0.35, skillImpact: 0.2, staminaDrain: 40, stressGain: 40, desc: "Targeting international markets." },
      
        // Added Touring
        { label: "Arena Concert", category: "Touring", cost: 160000, fanImpact: 0.5, skillImpact: 0.25, staminaDrain: 60, stressGain: 40, desc: "Large-scale headline concert; massive attention, huge stamina drain." },
        { label: "Global Livestream Concert", category: "Touring", cost: 40000, fanImpact: 0.35, skillImpact: 0.15, staminaDrain: 30, stressGain: 10, desc: "Online concert targeting international fans." },
        { label: "Overseas Fanmeeting", category: "Touring", cost: 50000, fanImpact: 0.3, skillImpact: 0.1, staminaDrain: 35, stressGain: -10, desc: "Fan interaction event abroad; great loyalty boost." },
        { label: "Convention Stage", category: "Touring", cost: 45000, fanImpact: 0.28, skillImpact: 0.12, staminaDrain: 35, stressGain: 25, desc: "Large pop-culture convention appearance; strong new audience exposure." },
        { label: "Theater Tour", category: "Touring", cost: 75000, fanImpact: 0.32, skillImpact: 0.25, staminaDrain: 45, stressGain: 30, desc: "Smaller venues across cities; great for live skill growth." },
      
        // ===== Internal =====
        { label: "Practice Room Performance", category: "Internal", cost: 500, fanImpact: 0.01, skillImpact: 0.05, staminaDrain: 5, stressGain: 2, desc: "Casual practice/upload for minor buzz." },
        { label: "Company Evaluation Stage", category: "Internal", cost: 1000, fanImpact: 0, skillImpact: 0.15, staminaDrain: 10, stressGain: 20, desc: "Internal stage for skill feedback. No fan change, high skill gain." },
        { label: "V-Live/YouTube Stage", category: "Internal", cost: 1500, fanImpact: 0.05, skillImpact: 0.05, staminaDrain: 10, stressGain: 0, desc: "Streaming performance online for immediate fan engagement." },
        { label: "Charity Stage", category: "Internal", cost: 5000, fanImpact: 0.1, skillImpact: 0.05, staminaDrain: 15, stressGain: -15, desc: "Goodwill event. Boosts group morale slightly." },
        { label: "Surprise Performance", category: "Internal", cost: 10000, fanImpact: 0.15, skillImpact: 0.1, staminaDrain: 20, stressGain: 10, desc: "Unexpected pop-up event for maximum hype." },
      
        // Added Internal
        { label: "One-Take Performance Video", category: "Internal", cost: 3000, fanImpact: 0.1, skillImpact: 0.1, staminaDrain: 15, stressGain: 15, desc: "Single-shot performance emphasizing professionalism." },
        { label: "Relay Dance Stage", category: "Internal", cost: 1000, fanImpact: 0.07, skillImpact: 0.03, staminaDrain: 5, stressGain: 2, desc: "Short-form relay content with viral potential." },
        { label: "Dance Practice (Choreo Focus)", category: "Internal", cost: 800, fanImpact: 0.03, skillImpact: 0.08, staminaDrain: 10, stressGain: 5, desc: "Choreo-focused content; steady skill gain." },
        { label: "Live Band Session", category: "Internal", cost: 12000, fanImpact: 0.12, skillImpact: 0.12, staminaDrain: 25, stressGain: 20, desc: "Band arrangement stage; boosts musical credibility." },
        { label: "Acoustic Stage", category: "Internal", cost: 6000, fanImpact: 0.08, skillImpact: 0.1, staminaDrain: 15, stressGain: 5, desc: "Stripped-down vocals; improves stability and tone." },
        { label: "Behind-the-Scenes Mini Stage", category: "Internal", cost: 2000, fanImpact: 0.06, skillImpact: 0.03, staminaDrain: 8, stressGain: 2, desc: "BTS content with a short performance; good engagement." },
      ];
  

  export const songTitles = {
    Graduation: [
        "10:00 PM Graduation", "Cherry Blossom Graduation", "Sayonara Yesterday", "Station Platform Goodbye", 
        "The Last Bus Home", "Sayonara no Imi", "Saigo no Seifuku", "Dreamy-Bye-Bye", "Owari", "Second Button",
        "Namida no Ato", "Last Stage", "Graduation Blue", "Sakura Michi", "Tōku e", "Starting Over",
        "Memory Notebook", "Yume no Owari", "Haru no Kaze", "Last Handshake", "Blue Uniform", "Sotsugyo March",
        "Stage Light", "Arigato Love", "Mirai Map", "Kousha no Kage", "Next Chapter", "Sayonara Bell",
        "Final Curtain", "Tokubetsu na Hi", "Tabidachi no Uta", "Classroom Ghost", "Kyōshitsu No Kaori", "Seishun Archive",
        "Diploma Heart", "Namida Station", "Last Chime", "Sakura Namiki", "Yesterday Once More", "Omoide No",
        "Tegami No Naka", "Graduation Smile", "Saigo No Mic", "Stage No Kioku", "Harukaze No Ato", "Ano Hi No Yume",
        "Sakamichi No Saki", "Blue Spring End", "Final Solo", "Dress Graduation", "Kiseki No Route", "Sayonara No Sora",
        "Gasshō No Uta", "Pocket No Button", "Mirai E No Door", "Last Dance Again", "Eien No Sotsugyo", "Sakura No Hanabira",
        "Haru No Tabidachi", "Kizuna No Imi", "Saigo No Kisu", "Morning Train Home", "Sotsugyo No Aki", "Graduation Night",
        "Namida No Rainbow", "Owari No Hajimari", "Memories Of Stage", "Stage No Akari", "Last Concert Blue", "Arigato No Kotoba",
        "Shiroi Sotsugyoshō", "Yozora Graduation", "Hana No Namida", "Gakkō Sayonara", "Sotsugyo No Hi", "Last Train Blue",
        "Haru No Milestone", "Kimi E No Yell", "Sotsugyosei", "Final Greeting", "Dress Code Blue", "Stage Exit",
        "Yume No Tsubasa", "Kaze No Graduation", "Saigo No Smile", "Arigato My Fans", "Sakura Drop", "Haru No Canvas",
        "Sotsugyo No Kaze", "Memory Mirror", "Diploma Dream", "Classroom Blue", "Last Summer Day", "Stage No Shizuku",
        "Yume No Departure", "Sayonara No Kado", "Final Lesson", "Sakura No Yakusoku", "Sotsugyo No Melody", "The Last Mic"
    ],        
    Kawaii: [
        "Ame-chan Panic", "Doki-Doki Hakken", "Marshmallow Tsuki", "Ichigo Sky", 
        "Melon Soda", "Kira-Kira Step", "Sparkle Hime", "Wata-ame Count", 
        "Magical Ribbon", "Pastel Parade", "Satō Secret", "Wink Wonderland", 
        "Sakura Chime", "Bubblegum Bestie", "Neon Heart", "Fuwa-Fuwa Cloud", 
        "Jellybean Jubilee", "Star-Dust Nichiyo", "Zutto", "Motto",
        "Niji Rollercoaster", "Sweetie Signal", "Love-Letter Meiro", "Twinkle Tango", 
        "Macaron Melody", "Usagi Hop", "Kira", "Pika",
        "Cupid Kiss", "Zutto Motto", "Mirai Flavor", "Doki", 
        "Fuwa", "Gimme Gummies", "Dengeki Echo", "Momo Tea", 
        "Kira-Kira Oukoku", "Vanilla Voyage", "Dizzy Disco", "Mochi-Mochi Asa", 
        "Hyper Holiday", "Pocket Rakuen", "Mochi", "Ribbon Koukai", 
        "Pop-Rock Lolly", "Hoshi Station", "Diamond Dust", "Puppy Love", 
        "Milky Way", "Giddy Galaxy", "Fizzy Feeling", "Choco Celebration", 
        "Hakka Message", "Sunny Soul", "Panda Party", "Idol Glow",
        "Gohan Motto", "Peko-Peko Heart", "Oyasumi Kiss", "Ohayou Sunshine",
        "Gyu-tto Shite", "Meringue Dream", "Kurukuru Dance", "Nya-nya Night",
        "Popcorn Jump", "Soda-iro Sky", "Kuma-san Hug", "Shortcake Love",
        "Suika Summer", "Pudding Shake", "Parfait Memory", "Chu-Chu Love"
    ],        
    Innocent: [
        "Hatsukoi Breeze", "Shiroi Shirt", "Komorebi Step", "Pure Note", "Asa no Hikari",
        "First Sketch", "Soda Sui", "Bokura no", "Yume no Tubasa", "Kaze no Oto",
        "Seishun Diary", "Kimi no Scent", "Mabushii Asa", "Aruku Michi", "Hana Kotoba",
        "Blue Seed", "Komorebi Lane", "Clear Sky", "Futari no", "Shiroi Kumo",
        "Mirai Palette", "Haru no Melody", "Fresh Start", "Kizuna Note", "Suihei-sen",
        "Yasashii Ame", "Little Star", "Kimi ni Todo-ke", "Hajimari no", "Canvas Love",
        "Hoshizora no", "Orange Sunset", "Soft Wind", "Meguriai", "Tegami no",
        "Purest Wish", "Shiroi Yakusoku", "Sora no Iro", "Natsuzora", "Kimi no Smile",
        "Aozora Note", "First Dream", "Kaze no Yell", "Motto Shiritai", "Pocket no Yume",
        "Hajimete no Michi", "Sunny Memory", "Ano Hi no", "Arigato no Hana", "Innocent Days"
    ],
    Heartbreak: [
        "Sayonara no Rain", "Cold Bench", "Delete Memory", "Blue Friday", "Namida no Reason",
        "Missing Piece", "Last Message", "Glass Heart", "Ame no Stop", "Hitori no Yoru",
        "Broken Rhythm", "Kimi no Inai", "Suna no Shiro", "Silent Tears", "Winter Trace",
        "Wasurerannai", "Bitter Sweet", "Empty Room", "Namida Station", "Koukai no",
        "Ghost Melody", "Ato-sukoshi", "Distance Love", "Maboroshi no", "Blue Rain",
        "Setsunai Kiss", "Owari no Hi", "Kizutsuite", "Frozen Time", "Fake Smile",
        "Lost Season", "Yume no Ato", "Sayonara Bell", "Kimi no Kage", "Ame no Bus-stop",
        "Hakanai Yoru", "Namida iro", "Memory Box", "Last Contact", "Slow Motion",
        "Sayonara Yesterday", "Kimi e no", "Lonely Night", "Tears Echo", "Shadow of Love",
        "Hitori-kiri", "Sora no Namida", "Broken Wing", "Ame no Asphalt", "First Goodbye"
    ],
    Tropical: [
        "Aloha Summer", "Coconut Shore", "Vitamin Splash", "Blue Lagoon", "Pineapple Heart",
        "Sunlight Party", "Hibiscus Love", "Salty Breeze", "Mango Shake", "Emerald Sea",
        "Marinelight", "Paradise Jump", "Coral Reef", "Summer Goddess", "Shining Beach",
        "Soda Wave", "Crescent Island", "Tropical Night", "Palmtree Swing", "Sunscreen Kiss",
        "Citrus High", "Sunset BBQ", "Surfin' Star", "Golden Sand", "Aqua Blue",
        "Melon Splash", "Rainbow Fin", "Deep Dive", "Bikini Lane", "Summer Carnival",
        "Island Hop", "Papaya Dance", "Ocean Drive", "Sunkissed", "Water Slider",
        "Guava Juice", "Shell Memory", "Summer Dreamer", "Poolside Love", "Sparkling Wave",
        "Seaside Grill", "Passion Fruit", "Blue Hawaii", "Summer Shout", "Cooling Down",
        "Floatie Race", "Mermaid Step", "Surfboard Love", "Horizon Blue", "Natsu-matsuri"
    ],
    Cool46: [
        "Black Sheep Pride", "Glass Sky Barrier", "Silent Resistance", "Broken Logic", "Paradox City",
        "Iron Curtain Love", "Ecliptic Shadow", "No War Heart", "Concrete Jungle", "Ambivalent Night",
        "Monochrome Sekai", "Rebel Silhouette", "Zero Distance", "Garasu no Heart", "Underground Road",
        "Borderline Blue", "System Error", "Anti-Heroine", "Dead End Street", "Kuroi Hitsuji",
        "Philosophy of", "Silent Majority", "Kado o Magaru", "Futari no Season", "Eccentric Mind",
        "Tokyo Tower Maze", "Double Standard", "Signal Red", "Outsider Voice", "Kago no Naka",
        "Reason to Live", "Mirror Reflection", "Darkness Bright", "Unfinished Wall", "Voice of Soul",
        "Shadow Dance", "Gray Scale", "Limitless Sky", "Protocol of", "Deep Monochrome",
        "Hiteiteki No", "Structure Love", "Mienai Teikou", "Shinjitsu no", "Kizu-darake",
        "Rational Gate", "Alternative Way", "Kuroi Yozora", "Under Dog", "Last Rebellion"
    ],
    CityPop: [
            "Shinya Driver", "Plastic Machi", "Neon Shumatsu", "Denwa Love", "Yuhi Terrace",
            "Cassette Tape", "Ame Driving", "Midnight Blue", "Mayonaka Stay", "City Light",
            "Kosoku Mirage", "Crystal Night", "Pacific Breeze", "Luxury Liner", "Urban Kage",
            "Heart Aerobic", "Starlight Resort", "Tokyo Glow", "Retro Romance", "Digital Dance",
            "Palm Avenue", "Doyobi Fever", "Cocktail Hour", "Metallic Tsuki", "Velvet Michi",
            "After Hours", "Kirakira Sea", "Natsu Illusion", "Machi Waltz", "Saishū Ressha",
        ],        
        AnimeRock: [
            "Tamashii Ignite", "Akai Chihei", "Brave Shinka", "Resonance Phase", "Sora e",
            "Kodō Bakuretsu", "Genkai Toppa", "Zettai Reido", "Genesis Strike", "Tetsu no",
            "Overdrive Oukoku", "Eien Kyokuchi", "Silent Shizuku", "Ryuu no", "Hikari Speed",
            "Saigo Flash", "Shinjitsu Ken", "Justice Sanka", "Hangyaku Unmei", "Asahi Rising",
            "Tenku Senso", "Spirit Kizuna", "Cyber Dream", "Gravity Break", "Kaminari Clap",
            "Owari naki", "Vanguard Force", "Kyojin Roar", "Maboroshi Edge", "Omega Riron",
        ],        
        Theater: [
            "Seifuku Resistance", "Riverbank Rendezvous", "Bicycle Bell Blues", 
            "Summer Salt Memory", "Theater Light Tears", "Heavy Rotation Heart", 
            "School Bag Secret", "Chalkboard Confession", "First Row Feelings", 
            "Sunlight Through Leaves", "Ponytail Protocol", "Melody of the Ferris Wheel", 
            "Ticket to Tomorrow", "Golden Hour Stage", "Locker Room Love Letter", 
            "After-School Anthem", "Center Position Dream", "Handshake Harmony", 
            "Intermission Kiss", "Sunday's Setlist", "Avenue of Idols", "Cinderella in Sneakers", 
            "Blue Sky Canvas", "Curtain Call Courage", "Train Window Reflection", 
            "Starlight Senbatsu", "Infinite Encore", "Idol", "Story", "Stage", "Theater", "Spotlight", "Encore", "Senbatsu", "Center",
        ],
        Heisei: [
            "Automatic Love", "First Kiss", "Midnight Distance", "Flavor of", "Automatic Blue",
            "Groovy Night", "Flavor Groove", "Saigo no", "Sweet Escape", "Distant Echo",
            "Private Beach", "Urban Soul", "Kimi no", "Rhythm Emotion", "Body Feels",
            "Can You", "Don’t Stop", "Kiseki no", "Summer Groove", "Crystal Snow",
            "Innocent World", "Candy Girl", "Motion Blue", "Destiny Road", "Sweet Soul",
            "Feel the", "Keep Tryin'", "Hitori no", "Winter Ballad", "Soul Drive",
            "Automatic Rain", "Ame no", "Moonlight Groove", "Be Together", "Ever After",
            "Love Story", "Koi no", "Secret Place", "Step into", "Brand New",
            "One More", "Time After", "Heart Station", "Hajimete no", "Sweet Darling",
            "Honey Honey", "Dreamin' Girl", "Pocket no", "Shining Ray", "Future World",
            "Automatic Heart", "Deep River", "Aozora no", "Melody Line", "Urban Dream",
            "Night Flight", "Sunset Glow", "Moshi mo", "Stay with", "Everlasting",
            "Pure Soul", "I’m Proud", "Steady Love", "Face the", "Garasu no",
            "Rainbow Drive", "Sky High", "Taiyou no", "Windy Summer", "Natural High",
            "Automatic Girl", "Kizuite", "Open Your", "Magic Time", "Sweetest Love",
            "Perfect Crime", "Fragile Heart", "Zutto Mae", "Missing You", "Love Again",
            "Moon & Sunrise", "Shiny Day", "Umi no", "First Impression", "True Blue",
            "Aishiteru", "Never End", "Heart of", "Kimi ni", "Last Message",
            "White Love", "Winter Song", "Ano Koro", "Dreamer’s High", "Soul Sister",
            "Automatic Dream", "Final Distance", "Wait & See", "First Step", "Heisei Love"
        ],

        Cinematic: [
            "Aozora Saka", "Garasu no", "Kaze no", 
            "Ame Monologue", "Kodoku Sync", "Ai-iro Seifuku", 
            "Mienai Barricade", "Hikari Kussetsu", "Shizuka Rebellion", 
            "Sekai-sen", "Tokeidai Echo", "Kanransha Kioku", 
            "Shiroi Hana", "Enrai Distant", "46-ban Yakusoku", "Magokoro Route", 
            "Mikan Map", "Tosho Labyrinth", "Izumi Namida", "Tokei Seishun", 
            "Tsubasa Kage", "Azure Suihei", "Velvet Yozora", "Majority Heart", 
            "Koukai Prism", "Umibe Tetsugaku", "Kagami Genjitsu", "Hakanai Yuki",
        ],    
    };

    export const generateSongTitle = (theme) => {
        if (theme && songTitles[theme]) {
            // If a specific theme is requested (like "Graduation"), pick from that list.
            const themeSongs = songTitles[theme];
            return themeSongs[Math.floor(Math.random() * themeSongs.length)];
        } else {
            // Pick a random theme from all themes EXCEPT "Graduation".
            const availableThemes = Object.keys(songTitles).filter(t => t !== 'Graduation');
            const randomTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)];
            const themeSongs = songTitles[randomTheme];
            return themeSongs[Math.floor(Math.random() * themeSongs.length)];
        }
    };

export const hometowns = [
    'Hokkaido', 'Aomori', 'Iwate', 'Miyagi', 'Akita', 'Yamagata', 'Fukushima',
    'Ibaraki', 'Tochigi', 'Gunma', 'Saitama', 'Chiba', 'Tokyo', 'Kanagawa',
    'Niigata', 'Toyama', 'Ishikawa', 'Fukui', 'Yamanashi', 'Nagano', 'Gifu',
    'Shizuoka', 'Aichi', 'Mie', 'Shiga', 'Kyoto', 'Osaka', 'Hyogo', 'Nara',
    'Wakayama', 'Tottori', 'Shimane', 'Okayama', 'Hiroshima', 'Yamaguchi',
    'Tokushima', 'Kagawa', 'Ehime', 'Kochi', 'Fukuoka', 'Saga', 'Nagasaki',
    'Kumamoto', 'Oita', 'Miyazaki', 'Kagoshima', 'Okinawa'
  ];
 export const generateRandomHometown = () => {
    return hometowns[Math.floor(Math.random() * hometowns.length)];
};

export const electionSpeechTemplates = {
    center: [
        "I can't believe it... To be standing here, as #1... This isn't my victory. It's ours. Thank you!",
        "Is this a dream? All I can say is thank you to the fans who believed in me. I will lead this group with all my heart!",
        "From the bottom of my heart, thank you! I promise to become a center that everyone can be proud of. We'll aim for the top together!",
        "There were so many times I wanted to give up, but you never let go of my hand. This trophy belongs to every single one of you!",
        "I've always watched someone else's back from the second row. To finally see this view from the center... it's more beautiful than I ever imagined.",
        "I know I’m not the most talented or the most beautiful, but you made me #1. I will spend every day from now on proving I’m worthy of this spot!",
        "To those who said I couldn't do it—thank you for the motivation. And to my fans—thank you for the miracle. Let's start a new era for the group!",
        "I've felt so much pressure as the 'ace,' but tonight, that weight has turned into wings. I'm ready to fly higher than ever with all of you!",
        "The scenery from this podium is overwhelming. I promise not to let this be the peak. I’ll work harder than anyone else to take us even further!",
        "I was just an ordinary girl until I met you. Thank you for giving me this crown. I'll protect this group and our bond with everything I have!"
    ],    
    rankUp: [
        "My rank went up! Thank you so much for your support! Next year, I'm aiming even higher!",
        "I'm so happy you've given me this rank. I'll work hard to live up to it and show you an even better version of myself.",
        "Wow... thank you! Seeing my name climb higher is the best feeling. I won't let you down!",
        "Last year I was so frustrated, but tonight those tears have turned into smiles. Thank you for pushing me forward!",
        "I can really feel our bond getting stronger. This rank is proof that we’re moving in the right direction together!",
        "To be honest, I was scared I might drop in rank. Thank you for giving me the confidence to keep dreaming big.",
        "I've worked so hard this year, and seeing it pay off like this makes me want to work ten times harder tomorrow!",
        "I finally reached the Senbatsu! I've been looking at this wall for so long... thank you for helping me break through it!",
        "Every single vote was a message of 'keep going.' I heard you loud and clear! I'll keep climbing until I reach the top!",
        "This isn't just a number to me; it's the strength you've given me to stand tall. Let's aim for the single digits next time!"
    ],   
    rankDown: [
        "I'm a little disappointed with this rank, but this feeling will only motivate me to work harder. Please continue to watch over me.",
        "This result is frustrating, but it's a sign that I still have room to grow. I'll come back stronger next year.",
        "To everyone who supported me, I'm sorry I couldn't meet your expectations. I will use this to fuel my comeback.",
        "I'm not going to cry. This rank is a message from the fans that I need to find a new version of myself. I'll search for it starting tomorrow.",
        "It's painful to see my rank drop, but I won't let it break my spirit. I want to show you that I can rise again from here.",
        "I feel like I let you all down. But seeing your faces in the crowd reminds me that I'm not alone. Let’s start over together.",
        "This year was tough, and this rank reflects that. But I’m going to take this frustration and turn it into the best performance of my life.",
        "I realized today that I may have been too comfortable. Thank you for this 'wake-up call.' I’m going to work like a rookie all over again!",
        "Even though the number went down, the love I felt from you this year was bigger than ever. I'll work hard so we can smile together next time.",
        "I’ve hit a wall, but I won’t stop here. Please don’t give up on me yet—I promise to make you proud that you supported me."
    ],    
    newRank: [
        "My name was called! I didn't think I would rank... thank you! This is the happiest day of my life!",
        "To be given a rank in this amazing group... I'm speechless. Thank you for finding me!",
        "I can't stop shaking. Thank you for giving me this wonderful stage to stand on. I'll do my best!",
        "I've always watched this from the seats in the back. To finally be the one walking toward the microphone... it feels like a dream.",
        "I was so scared that no one noticed me. Thank you for proving me wrong and for giving me this beautiful rank!",
        "I’m just a kenkyuusei (trainee), so I never imagined I’d be standing here tonight. I will carry this pride with me forever!",
        "To my parents who supported my dream, and to the fans who voted for me—look! I finally made it into the rankings!",
        "I didn't have any confidence in myself, but this rank is the greatest gift you could ever give me. I’ll work hard to become a real idol now!",
        "I practiced my speech just in case, but now that I'm here, my mind is completely blank. I just... I love you all so much! Thank you!",
        "This is the start of my story. Thank you for giving me the courage to keep going. I won't stop until I reach the very top!"
    ],    
    holdRank: [
        "Thank you for allowing me to keep this spot. It's an honor, and I'll continue to cherish it and work hard.",
        "Maintaining your position is a battle in itself. Thank you for your unwavering support. I love you all!",
        "This rank feels just as special as the first time. Thank you for believing in me again this year.",
        "They say staying at the top is harder than getting there. Thank you for protecting my place in this group.",
        "I was worried that I had reached my limit, but seeing this result tells me that you still believe in my potential. I won't stop here!",
        "Even if the number hasn't changed, our bond has grown so much deeper over the past year. This is our shared pride.",
        "To be able to stand on this stage two years in a row at the same rank... it makes me realize how loyal and kind my fans are.",
        "I'll admit, I wanted to climb higher. But keeping this rank in such a competitive year is a miracle in itself. Thank you!",
        "This rank is a sign that I need to work even harder to break through my current self. Next year, let's move forward together!",
        "I'm so relieved... I was so afraid of falling. Thank you for holding onto my hand and keeping me right here where I belong."
    ],    
};

export const scandalResponseOptions = {
    deny: { text: 'Deny Publicly', cost: 10000, description: 'Issue a strong denial. Risky, but could work.' },
    apologize: { text: 'Apologize', cost: 5000, description: 'Issue a formal apology. Admits guilt but shows sincerity.' },
    suspend: { text: 'Suspend Member (4 Weeks)', cost: 0, description: 'Suspend the member from all activities. Shows you are taking action.' },
    ignore: { text: 'Ignore', cost: 0, description: 'Do nothing and hope the story blows over. Unpredictable.' },
};

export const tiers = [
    { id: 1, name: 'Local Casting', cost: 25000, poolSize: 20, contractFee: 5000, statMin: 10, statMax: 30, potentialMin: 20, potentialMax: 60 },
    { id: 2, name: 'Regional Audition', cost: 100000, poolSize: 20, contractFee: 15000, statMin: 20, statMax: 50, potentialMin: 40, potentialMax: 80 },
    { id: 3, name: 'National Audition', cost: 500000, poolSize: 20, contractFee: 50000, statMin: 40, statMax: 70, potentialMin: 60, potentialMax: 95 },
    { id: 4, name: 'Elite Scouting', cost: 1500000, poolSize: 10, contractFee: 200000, statMin: 60, statMax: 85, potentialMin: 85, potentialMax: 100 },
];


// --- NEW: Global Fan Calculation Helper ---
export const getTotalFansForMember = (member) => {
    if (!member || !member.fans) return 0;
    // Handle old format (number) and new format (object) for safety
    if (typeof member.fans === 'number') {
        return member.fans;
    }
    return (member.fans.hardcore || 0) + (member.fans.casual || 0);
};


export const getGraduationRisk = (member) => {
    if (!member || member.isGraduating) return { text: '', color: '' };
    const urgency = member.graduationUrgency || 0;
    if (urgency > 85) return { text: 'At Risk of Graduation', color: 'text-red-500' };
    if (urgency > 60) return { text: 'Considering Future', color: 'text-yellow-500' };
    if (urgency > 35) return { text: 'Early Warning (Starting to think of Graduation)', color: 'text-pink-500' };
    return { text: '', color: '' }; // No need to show for low urgency
};

export const ambitions = {
    'Pursue a Solo Dream': {
        description: 'Wants to become a successful solo artist, actress, or model. Success and being center are very important to them.',
        baseUrgency: 1.0,
    },
    'Reaching the Goal': {
        description: 'Has a specific, lofty goal for the group (e.g., "Perform at the Dome"). Once achieved, their graduation risk will skyrocket.',
        baseUrgency: 0.8,
    },
    'Prove My Worth': {
        description: 'Feels overlooked and is desperate to prove their talent. Will work harder, but becomes a high graduation risk if ignored.',
        baseUrgency: 1.5,
    },
    'Find Normal Happiness': {
        description: 'Values a low-stress life. Overworking them or putting them under intense pressure will quickly lead to burnout.',
        baseUrgency: 2.0,
    },
    'Space for Juniors': {
        description: 'A veteran mindset. They want to see the group succeed and will stay longer to mentor younger members.',
        baseUrgency: 0.5,
    },
    'Academic Focus': {
        description: 'Prioritizes their education. Has a shorter expected career span from the start.',
        baseUrgency: 1.8,
    },
    'The Rival': {
        description: 'Fueled by a friendly (or not-so-friendly) competition with another idol, pushing them to constantly improve. Their motivation soars when they can compete, but they might become disruptive if they feel they are losing.',
        baseUrgency: 1.2,
    },
    'The Producer': {
        description: 'Has a passion for the creative process and wants to be involved in songwriting, choreography, or concert planning. They are more loyal when given creative input, but get frustrated if their ideas are ignored.',
        baseUrgency: 0.7,
    },
    'The Unwilling Idol': {
        description: 'Pushed into the industry by family or circumstance, they may have hidden talents but lack the initial drive. They are a high graduation risk from the start, but a major success could ignite their passion.',
        baseUrgency: 2.5,
    },
    'Heal from a Scandal': {
        description: 'Trying to overcome a past scandal, this idol is extremely dedicated and cautious, but also vulnerable to public opinion. Their graduation risk is high, especially if another scandal occurs.',
        baseUrgency: 1.7,
    },
    'Family Matters': {
        description: 'As the primary breadwinner for their family, they are motivated by financial success but also under immense pressure. They might stay longer if the pay is good, but could burn out from the stress.',
        baseUrgency: 1.3,
    },
};


// --- Custom Hook for Game Logic and State Management ---
export const useIdolManager = () => {

    // --- GAME STATE ---
    const [gameStarted, setGameStarted] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [money, setMoney] = useState(250000);
    const [week, setWeek] = useState(1);
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [message, setMessage] = useState('');
    const [totalFans, setTotalFans] = useState(0);
    const [currentTab, setCurrentTab] = useState('members');
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [scheduledEvents, setScheduledEvents] = useState([]);
    const [pastReleases, setPastReleases] = useState([]); // To store all created singles
    const [formattedDate, setFormattedDate] = useState('');
    useEffect(() => {
    setFormattedDate(getFormattedDateForWeek(week));
}, [week]);

    const [songs, setSongs] = useState([]);
    const [hasPerformedThisWeek, setHasPerformedThisWeek] = useState(false);
    const [teams, setTeams] = useState([]);
    const [allSetlists, setAllSetlists] = useState([
// --- AKB48 Team A ---
{ id: 1, name: "A1 'PARTY ga Hajimaru yo'", theme: 'classic', difficulty: 100, isCustom: false },
{ id: 2, name: "A2 'Aitakatta'", theme: 'classic', difficulty: 110, isCustom: false  },
{ id: 3, name: "A3 'Dareka no Tame ni'", theme: 'vocal', difficulty: 130, isCustom: false  },
{ id: 4, name: "A4 'Tadaima Renaichuu'", theme: 'idol', difficulty: 140, isCustom: false  },
{ id: 5, name: "A5 'Renai Kinshi Jourei'", theme: 'vocal', difficulty: 170, isCustom: false  },
{ id: 6, name: "A6 'Mokugekisha'", theme: 'theatrical', difficulty: 220, isCustom: false  },
{ id: 7, name: "A7 'M.T. ni Sasagu'", theme: 'vocal', difficulty: 250, isCustom: false  }
]);
    
    const [theaterSongs, setTheaterSongs] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [buildings, setBuildings] = useState({ practiceRooms: { vocal: 0, dance: 0, variety: 0, visual: 0, charisma: 0, intelligence: 0 } });
    const [sisterGroups, setSisterGroups] = useState([]); 
    const [rivalGroups, setRivalGroups] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [hallOfFame, setHallOfFame] = useState([]);
    const [events, setEvents] = useState([]);
    const [jankenTournament, setJankenTournament] = useState(null);
    const [lastJankenResult, setLastJankenResult] = useState(null);
    const [completedPromotions, setCompletedPromotions] = useState({});
    const [completedBsidePromos, setCompletedBsidePromos] = useState({});
    const [sponsorships, setSponsorships] = useState([]);
    const [showModal, setShowModal] = useState(null);
    const [mediaJobDoneThisWeek, setMediaJobDoneThisWeek] = useState(false);
    const [groupMediaJobDoneThisWeek, setGroupMediaJobDoneThisWeek] = useState(false);
    const baseCostAlbum = 500000;
    const albumPhysicalSurcharge = 250000;

    const weeklySalesCurve = [0.35, 0.25, 0.15, 0.10, 0.05, 0.05, 0.03, 0.02];
const salesMultipliers = { tier1: 1, tier2: 1.2, tier3: 1.5 };
const fanMultipliers = { none: 1, tier1: 1.1, tier2: 1.3, tier3: 1.6 };
const promoMultipliers = { none: 1, tier1: 1.05, tier2: 1.1, tier3: 1.15, tier4: 1.25 };

    const [difficulty, setDifficulty] = useState('local');
    const [internationalMarkets, setInternationalMarkets] = useState({ asia: false, west: false });
    const [outfits, setOutfits] = useState([]);
    const [tours, setTours] = useState([]);
    const [activeTour, setActiveTour] = useState(null);
    const [musicVideos, setMusicVideos] = useState([]);
    const [varietyShows, setVarietyShows] = useState([]);
    const [photoBooks, setPhotoBooks] = useState([]);
    const [documentaries, setDocumentaries] = useState([]);
    const [collaborations, setCollaborations] = useState([]);
    const [scandals, setScandals] = useState([]);
    const [statistics, setStatistics] = useState({ totalRevenue: 0, totalConcerts: 0, totalSongs: 0, revenueHistory: [] });
    const [modalData, setModalData] = useState(null);
    const [activeScandal, setActiveScandal] = useState(null);
    const [selectedSisterGroup, setSelectedSisterGroup] = useState(null);
    const [selectedTheaterTeam, setSelectedTheaterTeam] = useState(null);
    const [username, setUsername] = useState('Guest');
    const [memberView, setMemberView] = useState('list');
    const [staff, setStaff] = useState({ merchManager: 0 }); // Level 0 = not hired

    const [merchInventory, setMerchInventory] = useState({ 
    photos_basic: 0, photos_standard: 0, photos_premium: 0,
    towels_basic: 0, towels_standard: 0, towels_premium: 0,
    lightsticks_basic: 0, lightsticks_standard: 0, lightsticks_premium: 0
});

const [merchTiers] = useState({

    photos: {
        basic: { name: 'Basic Photo Set', cost: 500, price: 1500 },
        standard: { name: 'Standard Photo Set', cost: 800, price: 2500 },
        premium: { name: 'Deluxe Fan Club Set', cost: 1500, price: 5000 }
    },
    towels: {
        basic: { name: 'Basic Towel', cost: 1000, price: 2500 },
        standard: { name: 'Standard Towel', cost: 1800, price: 4000 },
        premium: { name: 'Embroidered Premium Towel', cost: 3000, price: 7500 }
    },
    lightsticks: {
        basic: { name: 'Basic Light Stick', cost: 1500, price: 3500 },
        standard: { name: 'Custom Color Light Stick', cost: 2500, price: 6000 },
        premium: { name: 'Bluetooth Sync Light Stick', cost: 4000, price: 10000 }
    }
});

const [idolMerchTiers] = useState({
    photobook: { name: 'Solo Photo Book', cost: 2000, price: 5000 },
    tshirt: { name: 'Signature T-Shirt', cost: 2500, price: 6000 }
});

const [eventMerchTiers] = useState({
    tour_tshirt: { name: 'Concert Tour T-Shirt', cost: 2000, price: 5000 },
    finale_penlight: { name: 'Finale Penlight', cost: 3000, price: 7500 }
});

const [idolMerchInventory, setIdolMerchInventory] = useState({});
const [eventMerchInventory, setEventMerchInventory] = useState({});
const [merchDesignBonus, setMerchDesignBonus] = useState(null); // Example: { memberName: 'Yuna', weeksLeft: 4, bonus: 0.1 }
const [warehouse, setWarehouse] = useState({ level: 1 });
const [onlineStore, setOnlineStore] = useState({ level: 0 }); // Level 0 means it's not built yet
const [pendingMerch, setPendingMerch] = useState([]);

    const [activeTrainingCamp, setActiveTrainingCamp] = useState(null); 
    const [venues, setVenues] = useState([
        { id: 1, name: 'Local Theater (Own)', capacity: 250, cost: 0, maintenance: 5000 },
          // --- LEVEL 1: THEATER & LIVE HOUSE (Capacity 250 - 500) ---
          { id: 2, name: 'Dedicated Idol Theater', capacity: 250, cost: 0, maintenance: 5000 }, // General name for the 48G HQ
          { id: 3, name: 'Akihabara Cultures Theater', capacity: 300, cost: 15000, maintenance: 6000 },
          { id: 4, name: 'Shibuya Eggman', capacity: 350, cost: 20000, maintenance: 7000 },
          { id: 5, name: 'Shinjuku Loft', capacity: 400, cost: 25000, maintenance: 7500 },
          { id: 6, name: 'Aoyama RizM', capacity: 500, cost: 30000, maintenance: 8000 },
      
          // --- LEVEL 2: MAJOR HALLS & ZEPPS (Capacity 1K - 3K) ---
          { id: 7, name: 'Spotify O-EAST', capacity: 1300, cost: 80000, maintenance: 15000 },
          { id: 8, name: 'Zepp Haneda', capacity: 2900, cost: 120000, maintenance: 20000 },
          { id: 9, name: 'LINE CUBE SHIBUYA', capacity: 2000, cost: 150000, maintenance: 25000 },
          { id: 10, name: 'NHK Hall', capacity: 3000, cost: 180000, maintenance: 30000 },
          { id: 11, name: 'TDC Hall (Tokyo Dome City)', capacity: 3000, cost: 200000, maintenance: 35000 },
      
          // --- LEVEL 3: PRESTIGE ARENAS (Capacity 5K - 15K) ---
          { id: 12, name: 'Pacifico Yokohama', capacity: 5000, cost: 500000, maintenance: 60000 },
          { id: 13, name: 'Tokyo International Forum', capacity: 5000, cost: 650000, maintenance: 70000 },
          { id: 14, name: 'Ariake Arena', capacity: 12000, cost: 800000, maintenance: 85000 },
          { id: 15, name: 'Yoyogi National Gymnasium', capacity: 13000, cost: 1000000, maintenance: 95000 },
          { id: 16, name: 'Nippon Budokan', capacity: 14500, cost: 1500000, maintenance: 110000 },
      
          // --- LEVEL 4: STADIUMS & GRAND ARENAS (Capacity 17K - 37K) ---
          { id: 17, name: 'Yokohama Arena', capacity: 17000, cost: 2500000, maintenance: 150000 },
          { id: 18, name: 'Osaka-jo Hall', capacity: 16000, cost: 2200000, maintenance: 140000 },
          { id: 19, name: 'K-Arena Yokohama', capacity: 20000, cost: 3000000, maintenance: 180000 },
          { id: 20, name: 'Saitama Super Arena', capacity: 37000, cost: 4500000, maintenance: 300000 },
          { id: 21, name: 'Belluna Dome (Seibu Dome)', capacity: 33000, cost: 4000000, maintenance: 280000 },
      
          // --- LEVEL 5: THE FIVE DOMES & NATIONAL STADIUM (Capacity 40K - 75K) ---
          { id: 22, name: 'Vantelin Dome Nagoya', capacity: 40000, cost: 6000000, maintenance: 450000 },
          { id: 23, name: 'Kyocera Dome Osaka', capacity: 45000, cost: 6500000, maintenance: 480000 },
          { id: 24, name: 'Mizuho PayPay Dome Fukuoka', capacity: 40000, cost: 6000000, maintenance: 450000 },
          { id: 25, name: 'Tokyo Dome', capacity: 55000, cost: 10000000, maintenance: 600000 },
          { id: 26, name: 'Japan National Stadium', capacity: 75000, cost: 20000000, maintenance: 1200000 }
]);
    const [performanceHistory, setPerformanceHistory] = useState([]);
    const [scheduledSingles, setScheduledSingles] = useState([]);
    const [auditionCandidates, setAuditionCandidates] = useState([]);
    const [pushedMembers, setPushedMembers] = useState([]);
    const [electionVotePool, setElectionVotePool] = useState(0);
    const [isCampaignActive, setIsCampaignActive] = useState(false);
    const [campaignEndWeek, setCampaignEndWeek] = useState(0);
    const [isElectionSingleFinished, setIsElectionSingleFinished] = useState(false);
    const [lastElectionResult, setLastElectionResult] = useState(null);
    const [electionHistory, setElectionHistory] = useState([]);
    const [jankenHistory, setJankenHistory] = useState([]);
    const [groupReputation, setGroupReputation] = useState(0);
    const [kouhakuInvitationAccepted, setKouhakuInvitationAccepted] = useState(false);
    const [kouhakuHistory, setKouhakuHistory] = useState([]);
    const [sportsFestivalHistory, setSportsFestivalHistory] = useState([]);
    const [liveSportsFestival, setLiveSportsFestival] = useState(null);
    const [kouhakuInvitationOffered, setKouhakuInvitationOffered] = useState(false);
    const [kouhakuPrep, setKouhakuPrep] = useState(null);
    const [requestHourStatus, setRequestHourStatus] = useState(null); // { isActive: boolean, endWeek: number, votes: { [songId: string]: number } }
    const [votingTickets, setVotingTickets] = useState(0);
    const [requestHourHistory, setRequestHourHistory] = useState([]);
    const [lastRequestHourResult, setLastRequestHourResult] = useState(null);
    const [draftProspects, setDraftProspects] = useState([]);
    const [draftKaigi, setDraftKaigi] = useState(null); 
    const [groupRoles, setGroupRoles] = useState({});
    const [annualAwardsHistory, setAnnualAwardsHistory] = useState([]);



    // START/LOAD/SAVE FUNCTIONS

    const getSavedGames = () => {
        const savedGames = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('idol_game_save_')) {
                try {
                    const savedData = localStorage.getItem(key);
                    const data = JSON.parse(savedData);
                    if (data.username && data.groupName) { // Ensure the save is valid
                        savedGames.push({
                            username: data.username,
                            groupName: data.groupName,
                            week: data.week,
                            money: data.money,
                            timestamp: data.timestamp,
                        });
                    }
                } catch (e) {
                    console.error(`Error parsing saved game from local storage: ${key}`, e);
                }
            }
        }
        return savedGames.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    };

    const saveGame = (gameUsername) => {
        if (!gameUsername || !gameUsername.trim()) {
            setMessage("Please enter a valid username to save the game.");
            return;
        }

        try {
            const gameState = {
                groupName,
                money,
                week,
                electionVotePool,
                isCampaignActive,
                campaignEndWeek,
                lastElectionResult: JSON.stringify(lastElectionResult),
                lastJankenResult: JSON.stringify(lastJankenResult),
                members: JSON.stringify(members),
                totalFans,
                songs: JSON.stringify(songs),
                teams: JSON.stringify(teams),
                allSetlists: JSON.stringify(allSetlists),
                theaters: JSON.stringify(theaters),
                buildings: JSON.stringify(buildings),
                sisterGroups: JSON.stringify(sisterGroups),
                rivalGroups: JSON.stringify(rivalGroups),
                achievements: JSON.stringify(achievements),
                hallOfFame: JSON.stringify(hallOfFame),
                events: JSON.stringify(events),
                sponsorships: JSON.stringify(sponsorships),
                difficulty,
                electionHistory: JSON.stringify(electionHistory),
                jankenHistory: JSON.stringify(jankenHistory),
                groupReputation,
                kouhakuInvitationAccepted,
                kouhakuHistory: JSON.stringify(kouhakuHistory),
                kouhakuInvitationOffered,
                kouhakuPrep: JSON.stringify(kouhakuPrep),
                requestHourStatus: JSON.stringify(requestHourStatus),
                votingTickets,
                requestHourHistory: JSON.stringify(requestHourHistory),
                lastRequestHourResult: JSON.stringify(lastRequestHourResult),
                onlineStore: JSON.stringify(onlineStore),
                staff: JSON.stringify(staff),
                internationalMarkets: JSON.stringify(internationalMarkets),
                warehouse: JSON.stringify(warehouse),
                pendingMerch: JSON.stringify(pendingMerch),
                outfits: JSON.stringify(outfits),
                pushedMembers: JSON.stringify(pushedMembers),
                tours: JSON.stringify(tours),
                activeTour: JSON.stringify(activeTour),
                musicVideos: JSON.stringify(musicVideos),
                varietyShows: JSON.stringify(varietyShows),
                photoBooks: JSON.stringify(photoBooks),
                documentaries: JSON.stringify(documentaries),
                collaborations: JSON.stringify(collaborations),
                scandals: JSON.stringify(scandals),
                statistics: JSON.stringify(statistics),
                merchInventory: JSON.stringify(merchInventory),
                activeTrainingCamp: JSON.stringify(activeTrainingCamp),
                username: gameUsername,
                venues: JSON.stringify(venues),
                performanceHistory: JSON.stringify(performanceHistory),
                scheduledSingles: JSON.stringify(scheduledSingles),
                groupRoles: JSON.stringify(groupRoles),
                timestamp: Date.now(),
            };

            localStorage.setItem(`idol_game_save_${gameUsername}`, JSON.stringify(gameState));
            setMessage(`💾 Game saved successfully for ${gameUsername}!`);
            setShowModal(null);
            setUsername(gameUsername);
            console.log("✅ Game saved to local storage for user:", gameUsername);

        } catch (e) {
            console.error("❌ Error saving game to local storage:", e);
            setMessage(`Error saving game: ${e.message}`);
        }
    };

    const loadGame = (gameUsername) => {
        if (!gameUsername || !gameUsername.trim()) {
            setMessage("Please enter a username to load a game.");
            return;
        }
        try {
            const savedData = localStorage.getItem(`idol_game_save_${gameUsername}`);
            if (savedData) {
                const data = JSON.parse(savedData);
                
                setGroupName(data.groupName || "");
                setMoney(data.money || 0);
                setWeek(data.week || 1);
                const loadedMembers = JSON.parse(data.members || "[]").map(rawMember => {
                    const member = { ...rawMember };
if (member.relationships && !member.chemistry) {
    member.chemistry = {};
    (member.relationships.friends || []).forEach(friendId => {
        member.chemistry[friendId] = 25; // Good starting chemistry
    });
    (member.relationships.rivals || []).forEach(rivalId => {
        member.chemistry[rivalId] = -25; // Negative starting chemistry
    });
}
delete member.relationships; // Remove old data
member.chemistry = member.chemistry || {};
                    if (typeof member.fans === 'number' || !member.fans) {
                    const fanCount = typeof member.fans === 'number' ? member.fans : 0;
                    return {
                        ...member,
                        fans: {
                        hardcore: Math.floor(fanCount * 0.2),
                        casual: fanCount - Math.floor(fanCount * 0.2)
                        }
                    };
                    }
                    return member;
                });
                setMembers(loadedMembers);
                setTotalFans(data.totalFans || 0);
                setOnlineStore(JSON.parse(data.onlineStore || '{"level":0}'));
                setStaff(JSON.parse(data.staff || '{"merchManager":0}'));
                setWarehouse(JSON.parse(data.warehouse || '{"level":1}'));
                setPendingMerch(JSON.parse(data.pendingMerch || '[]'));
                setElectionVotePool(data.electionVotePool || 0);
                setIsCampaignActive(data.isCampaignActive || false);
                setCampaignEndWeek(data.campaignEndWeek || 0);
                setLastElectionResult(JSON.parse(data.lastElectionResult || "null"));

                const loadedSongs = JSON.parse(data.songs || "[]").map(song => ({
                    ...song,
                    baseSalesPotential: song.baseSalesPotential || 0,
                    weeklySales: song.weeklySales || [],
                    chartWeeksLeft: song.chartWeeksLeft ?? 0,
                }));
                setSongs(loadedSongs);
                setTeams(JSON.parse(data.teams || "[]"));
                setTheaters(JSON.parse(data.theaters || "[]"));

                const loadedBuildings = JSON.parse(data.buildings || "{}");
                if (loadedBuildings.hasOwnProperty('theater')) {
                    if (loadedBuildings.theater === true) {
                        if (!data.theaters || JSON.parse(data.theaters).length === 0) {
                            setTheaters([{
                                owner: 'main',
                                level: 1,
                                capacity: 250,
                                name: `${data.groupName || groupName} Theater`
                            }]);
                        }
                    }
                    setBuildings({ practiceRooms: {
                        ...{ vocal: 0, dance: 0, variety: 0, visual: 0, charisma: 0, intelligence: 0 },
                        ...(loadedBuildings.practiceRooms || {})
                    }});
                } else {
                    const newPracticeRooms = {
                        vocal: 0, dance: 0, variety: 0, visual: 0, charisma: 0, intelligence: 0,
                        ...(loadedBuildings.practiceRooms || {})
                    };
                    setBuildings({ practiceRooms: newPracticeRooms });
                }
                const loadedSisterGroups = JSON.parse(data.sisterGroups || "[]").map(sg => {
                    let migratedMembers = sg.members || [];
if (sg.members) {
    migratedMembers = sg.members.map(rawMember => {
        const member = { ...rawMember };
        // --- NEW MIGRATION ---
        if (member.relationships && !member.chemistry) {
            member.chemistry = {};
            (member.relationships.friends || []).forEach(friendId => {
                member.chemistry[friendId] = 25;
            });
            (member.relationships.rivals || []).forEach(rivalId => {
                member.chemistry[rivalId] = -25;
            });
        }
        delete member.relationships;
        member.chemistry = member.chemistry || {};
        // --- END MIGRATION ---

        // Existing fan migration
        if (typeof member.fans === 'number' || !member.fans) {
            const fanCount = typeof member.fans === 'number' ? member.fans : 0;
            return { ...member, fans: { hardcore: Math.floor(fanCount * 0.2), casual: fanCount - Math.floor(fanCount * 0.2) } };
        }

        return member;
    });
}

                    let migratedSongs = [];
                    if (sg.songs) {
                        const songsToParse = typeof sg.songs === 'string' ? JSON.parse(sg.songs) : (sg.songs || []);
                        migratedSongs = songsToParse.map(song => ({
                            ...song,
                            baseSalesPotential: song.baseSalesPotential || 0,
                            weeklySales: song.weeklySales || [],
                            chartWeeksLeft: song.chartWeeksLeft ?? 0,
                        }));
                    }

                    return { ...sg, members: migratedMembers, songs: migratedSongs };
                });
                setSisterGroups(loadedSisterGroups);

                setRivalGroups(JSON.parse(data.rivalGroups || "[]"));
                setAchievements(JSON.parse(data.achievements || "[]"));
                setHallOfFame(JSON.parse(data.hallOfFame || "[]"));
                setJankenTournament(JSON.parse(data.jankenTournament || "null"));
                setLastJankenResult(JSON.parse(data.lastJankenResult || "null"));
                setLastElectionResult(JSON.parse(data.lastElectionResult || "null"));
                setElectionHistory(JSON.parse(data.electionHistory || "[]"));
                setJankenHistory(JSON.parse(data.jankenHistory || "[]"));
                setGroupReputation(data.groupReputation || 0);
                setKouhakuInvitationAccepted(data.kouhakuInvitationAccepted || false);
                setKouhakuHistory(JSON.parse(data.kouhakuHistory || "[]"));
                setKouhakuInvitationOffered(data.kouhakuInvitationOffered || false);
                setKouhakuPrep(JSON.parse(data.kouhakuPrep || "null"));
                setRequestHourStatus(JSON.parse(data.requestHourStatus || "null"));
                setVotingTickets(data.votingTickets || 0);
                setRequestHourHistory(JSON.parse(data.requestHourHistory || "[]"));
                setLastRequestHourResult(JSON.parse(data.lastRequestHourResult || "null"));

                setEvents(JSON.parse(data.events || "[]"));
                setSponsorships(JSON.parse(data.sponsorships || "[]"));
                setDifficulty(data.difficulty || "normal");
                setInternationalMarkets(JSON.parse(data.internationalMarkets || "{}"));
                setOutfits(JSON.parse(data.outfits || "[]"));
                setTours(JSON.parse(data.tours || "[]"));
                setActiveTour(JSON.parse(data.activeTour || "null"));
                setPushedMembers(JSON.parse(data.pushedMembers || "[]"));
                setMusicVideos(JSON.parse(data.musicVideos || "[]"));
                setVarietyShows(JSON.parse(data.varietyShows || "[]"));
                setPhotoBooks(JSON.parse(data.photoBooks || "[]"));
                setDocumentaries(JSON.parse(data.documentaries || "[]"));
                setCollaborations(JSON.parse(data.collaborations || "[]"));
                setScandals(JSON.parse(data.scandals || "[]"));
                setStatistics(JSON.parse(data.statistics || "{}"));
                setMerchInventory(JSON.parse(data.merchInventory || "{}"));
                setActiveTrainingCamp(JSON.parse(data.activeTrainingCamp || "null"));
                setPerformanceHistory(JSON.parse(data.performanceHistory || "[]"));
                setScheduledSingles(JSON.parse(data.scheduledSingles || "[]"));
                let loadedRoles = JSON.parse(data.groupRoles || '{}');
// Compatibility for old saves
if (loadedRoles && loadedRoles.hasOwnProperty('captain')) {
    loadedRoles = { 'main': loadedRoles.captain };
}
setGroupRoles(loadedRoles);

                setGameStarted(true);
                setMessage(`🎮 Game loaded for ${data.username || gameUsername}!`);
                setShowModal(null);

            } else {
                setMessage(`⚠️ No save file found for ${gameUsername}.`);
            }
        } catch (e) {
            console.error("❌ Error loading game from local storage:", e);
            setMessage(`Error loading game: ${e.message}`);
        }
    };


    // --- MEMBER/GROUP UTILITIES ---

    const generateRandomMemberName = () => {
        const firstNames = [
            'Yui', 'Sakura', 'Miku', 'Haruka', 'Rina', 'Nana', 'Akari', 'Yuki', 'Aoi', 'Hana', 
            'Karin', 'Miyu', 'Saki', 'Hinata', 'Riko', 'Ayaka', 'Mei', 'Eri', 'Mio', 'Yuna', 
            'Kotone', 'Sumire', 'Reina', 'Noa', 'Tomomi', 'Hiyori', 'Ami', 'Nao', 'Sayaka', 'Asuka', 
            'Chihiro', 'Emi', 'Kokona', 'Misaki', 'Saeko', 'Nanami', 'Shiori', 'Aya', 'Kazumi', 'Arisa', 
            'Marina', 'Kanna', 'Azusa', 'Rin', 'Fumika', 'Suzuka', 'Nene', 'Akane', 'Mai', 'Yuuri', 
            'Seira', 'Momoka', 'Rei', 'Tsukasa', 'Ichika', 'Mafuyu', 'Yume', 'Kyouka', 'Maho', 'Sena', 
            'Tsumugi', 'Yurina', 'Himari', 'Mirei', 'Honoka', 'Ririka', 'Natsuki', 'Hikaru', 'Aina', 'Shizuku', 
            'Ryou', 'Kaho', 'Minori', 'Mariya', 'Ayame', 'Kokoro', 'Misao', 'Rion', 'Moeka', 'Haruna', 
            'Yuuna', 'Mizuki', 'Kanako', 'Ema', 'Suzu', 'Kotoha', 'Nagisa', 'Ayumi', 'Riona', 'Yuzuki', 
            'Mina', 'Chiaki', 'Nozomi', 'Miharu', 'Haruno', 'Risa', 'Saaya', 'Airu', 'Koharu', 'Rio', 
            'Fuka', 'Ruka', 'Hina', 'Sana', 'Mana', 'Kiri', 'Miki', 'Aira', 'Kiyomi', 'Satomi', 
            'Chisato', 'Miho', 'Yua', 'Meisa', 'Natsumi', 'Yuka', 'Sora', 'Riho', 'Ena', 'Kanon', 
            'Yuzuka', 'Moka', 'Himeka', 'Rika', 'Shio', 'Chiharu', 'Kumi', 'Aika', 'Natsue', 'Sae', 
            'Mikoto', 'Manami', 'Yoshino', 'Asumi', 'Sayo', 'Reika', 'Miyabi', 'Kaede', 'Aiko', 'Akiko', 
            'Atsuko', 'Ayano', 'Emiko', 'Eriko', 'Fujiko', 'Fumiko', 'Haruko', 'Hideko', 'Hiroko', 'Hitomi', 
            'Izumi', 'Junko', 'Katsumi', 'Kayoko', 'Keiko', 'Kimiko', 'Kumiko', 'Kyoko', 'Machiko', 'Madoka', 
            'Maiko', 'Makiko', 'Mariko', 'Masako', 'Mayu', 'Mayumi', 'Michiko', 'Midori', 'Mieko', 'Miya', 
            'Miyoko', 'Momoko', 'Nagako', 'Namiko', 'Naoko', 'Naomi', 'Narumi', 'Noriko', 'Reiko', 'Rie', 
            'Rikako', 'Rumiko', 'Ryoko', 'Sachiko', 'Sakiko', 'Satoko', 'Setsuko', 'Shigeko', 'Shizuka', 'Sumiko', 
            'Takako', 'Tamiko', 'Teruko', 'Tomoko', 'Toshiko', 'Wakana', 'Yasuko', 'Yayoi', 'Yoko', 'Yoshiko',
            'Yumiko', 'Yuriko', 'Kozue', 'Natsuko', 'Sachi', 'Shino', 'Mitsu', 'Ruriko', 'Kiyoko', 'Tomi', 
            'Fumi', 'Michi', 'Hisako', 'Kazuko', 'Maki', 'Mari', 'Yuko', 'Akemi', 'Asako', 'Atsumi', 
            'Chie', 'Chieko', 'Chika', 'Chiyo', 'Etsuko', 'Harue', 'Hiroe', 'Ikuko', 'Itsumi', 'Kanade', 
            'Kayo', 'Kazue', 'Kiwa', 'Koto', 'Kumie', 'Kyomi', 'Machie', 'Masae', 'Masami', 'Michie', 
            'Mikiho', 'Minao', 'Mineko', 'Misako', 'Mitsue', 'Mitsuki', 'Miyae', 'Miyuki', 'Motoko', 'Mutsumi', 
            'Nadeshiko', 'Nae', 'Naoe', 'Narue', 'Natsuhiko', 'Natsuyo', 'Nobuko', 'Norie', 'Ran', 'Reiichi', 
            'Rimiko', 'Ritsuko', 'Rurika', 'Sachie', 'Sadako', 'Saori', 'Sayoko', 'Sayuri', 'Shigemi', 'Shizue', 
            'Sumie', 'Taeko', 'Takami', 'Tamaki', 'Tamao', 'Terue', 'Terumi', 'Tokiko', 'Tomie', 'Tomoe', 
            'Toyoko', 'Tsuki', 'Tsuru', 'Ume', 'Utako', 'Waka', 'Yae', 'Yaeko', 'Yasue', 'Yemi', 
            'Yone', 'Yoshie', 'Yuiho', 'Yukako', 'Yukari', 'Yukie', 'Yukiko', 'Yumi', 'Yurika', 'Yuzue'
          ];
          const lastNames = [
            'Tanaka', 'Sato', 'Suzuki', 'Takahashi', 'Watanabe', 'Yamamoto', 'Kobayashi', 'Nakamura', 'Ito', 'Kato', 
            'Yoshida', 'Yamada', 'Sasaki', 'Yamaguchi', 'Matsumoto', 'Inoue', 'Kimura', 'Shimizu', 'Hayashi', 'Saito', 
            'Abe', 'Fujita', 'Okada', 'Goto', 'Kondo', 'Ishikawa', 'Nakajima', 'Harada', 'Otsuka', 'Hasegawa', 
            'Murakami', 'Kojima', 'Takagi', 'Kuroda', 'Takeda', 'Imai', 'Ando', 'Fukuda', 'Miyazaki', 'Ueda', 
            'Shibata', 'Kawai', 'Nagano', 'Hirano', 'Mizuno', 'Ono', 'Fujii', 'Sugiyama', 'Kishida', 'Endo', 
            'Noguchi', 'Oshima', 'Sakurai', 'Mochizuki', 'Tsukada', 'Aoki', 'Morimoto', 'Tamura', 'Oda', 'Matsuda', 
            'Azuma', 'Nishida', 'Sugimoto', 'Kubota', 'Kawamura', 'Ishii', 'Nakano', 'Kanda', 'Morita', 'Nagata', 
            'Ogawa', 'Kinoshita', 'Mori', 'Yoshikawa', 'Kawasaki', 'Higuchi', 'Suenaga', 'Kaneko', 'Miyamoto', 'Shinozaki', 
            'Kawaguchi', 'Hosoda', 'Koga', 'Okamoto', 'Kamei', 'Tsutsui', 'Arakawa', 'Imamura', 'Furukawa', 'Nishimura', 
            'Kubo', 'Okumura', 'Masuda', 'Ishida', 'Asano', 'Fukumoto', 'Sakai', 'Matsui', 'Iwasaki', 'Nakagawa', 
            'Haruna', 'Ueno', 'Fujiwara', 'Seki', 'Nojima', 'Hoshino', 'Chiba', 'Kikuchi', 'Tanimoto', 'Fukui', 
            'Ota', 'Umezu', 'Ohashi', 'Yano', 'Katayama', 'Maki', 'Kuroki', 'Hatta', 'Koike', 'Mogi', 
            'Inagaki', 'Mita', 'Sano', 'Yoshioka', 'Komatsu', 'Sogabe', 'Horii', 'Tsuchiya', 'Kurata', 'Sugawara', 
            'Tsuji', 'Ishizuka', 'Amano', 'Takeuchi', 'Nakata', 'Honma', 'Kitamura', 'Enomoto', 'Sawada', 'Uchida', 
            'Yura', 'Hamada', 'Nishio', 'Shima', 'Hada', 'Kishimoto', 'Sakamoto', 'Nomura', 'Ishibashi', 'Taki', 
            'Kurokawa', 'Morinaga', 'Oishi', 'Uchiyama', 'Nishino', 'Hiraoka', 'Yashiro', 'Kamada', 'Mizutani', 'Yagisawa', 
            'Kawashima', 'Ogasawara', 'Terada', 'Inaba', 'Shiraishi', 'Nishiura', 'Sugisaki', 'Katsura', 'Yamazaki', 'Horiguchi', 
            'Murota', 'Fujino', 'Nishikori', 'Miyake', 'Miyata', 'Shimada', 'Okazaki', 'Miyashiro', 'Fujimori', 'Nagasawa', 
            'Takada', 'Yamane', 'Nishitani', 'Asada', 'Hamasaki', 'Matsuno', 'Onozawa', 'Takano', 'Kitagawa', 'Nakahara', 
            'Shiba', 'Yoda', 'Kanamori', 'Umeda', 'Irie', 'Kurihara', 'Hirasawa', 'Kawahara', 'Nagai', 'Tsujimura', 
            'Horikawa', 'Nishikawa', 'Murata', 'Miyagi', 'Shibasaki', 'Miyamura', 'Yamanaka', 'Hosokawa', 'Ichikawa', 'Kajiwara', 
            'Obara', 'Suga', 'Nagahama', 'Katsumata', 'Nishimori', 'Fujisawa', 'Numata', 'Hirai', 'Nakamoto', 'Okabe', 
            'Matsubara', 'Hino', 'Oshita', 'Shioya', 'Takaoka', 'Inui', 'Nishi', 'Nagao', 'Kumagai', 'Tashiro', 
            'Kawano', 'Eto', 'Fukuzawa', 'Kawade', 'Ogiwara', 'Hirose', 'Asai', 'Yusa', 'Shintani', 'Mitsuoka', 
            'Sone', 'Tsuda', 'Okuyama', 'Miyoshi', 'Furusawa', 'Kurosu', 'Nishimaki', 'Toba', 'Kase', 'Mizuguchi', 
            'Teramoto', 'Hanyu', 'Sawamura', 'Okura', 'Kusano', 'Mizushima', 'Arima', 'Fujimoto', 'Iidaka', 'Kido',
            'Nanba', 'Omiya', 'Shimamura', 'Takase', 'Uehara', 'Yajima', 'Asahina', 'Fukuyama', 'Inami', 'Komiya',
            'Matsuyama', 'Nishio', 'Okino', 'Shirai', 'Takei', 'Yoshimatsu', 'Eguchi', 'Hoshina', 'Iwanaga', 'Kasai',
            'Mizoguchi', 'Ogata', 'Sano', 'Tachibana', 'Uchiumi', 'Wakabayashi', 'Yokoyama', 'Aizawa', 'Iidaka', 'Kusaka',
            'Miyakoshi', 'Okuda', 'Senda', 'Tanabe', 'Uematsu', 'Yasuoka', 'Fujimaki', 'Ikeda', 'Koshino', 'Makino'
          ];
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      return `${firstName} ${lastName}`;
    };

    
    const startGame = (startUsername, startGroupName) => {
      if (startGroupName.trim() && startUsername.trim()) {
        setMembers([]); // Start with 0 members
        setGroupName(startGroupName);
        setUsername(startUsername);
        const rivalNames = [
            'Lunar Princesses', 'Project Nova', 'Sapphire Kiss', 'Onyx7', 
            'Solstice', 'Equinox', 'Galaxy Girls', 'Cosmic Charm', 'Nebula Stars',
            'Pixel Pop', 'Melty Kiss', 'Cherry Chu', 'Violet Theory', 'Zero Gravity',
            'Saka46-X', 'Midnight Bloom', 'Neo-Genesis', 'Velvet Riot', 'Aero-Step',
            'Diamond Dust', 'Pure Rhythm', 'Kira-Kira 5', 'Digital Hearts', 'Urban Muse',
            'Crimson Edge', 'Starry Palette', 'Glass Wings', 'Next-Gen Idols', 'Prism 9',
            'Secret Garden', 'Nova-Ray', 'Luminous', 'Bitter-Sweet', 'Infinity Girl',
            'Code:Pink', 'Vivid Soul', 'Aozora Sisters', 'Techno-Tale', 'Goth-Loli Punk',
            'Sugar Rush', 'Metal Maidens', 'Silent Siren', 'Aura-Blast', 'Future-Mix',
            'Starlight 7', 'Honey-BEE', 'Lunar Eclipse', 'Paradox-G', 'Miracle-Step', 'Last-Piece'
        ];            
        
        const shuffledNames = [...rivalNames].sort(() => 0.5 - Math.random());

            const initialRivals = shuffledNames.slice(0, 2).map((name, index) => ({
                id: index + 1,
                name: name,
                fans: 5000 + Math.floor(Math.random() * 4000),
                membersCount: 8 + Math.floor(Math.random() * 6),
                songs: []
            }));
            setRivalGroups(initialRivals);
        setGameStarted(true);
        // Updated message to guide the player
        setMessage(`Welcome to ${startGroupName}, Producer ${startUsername}! จัดออดิชั่นเพื่อค้นหาไอดอลของคุณใน "Manage" จากนั้น "Hold Audition"`);
        setShowModal(null);
        if (sisterGroups.length > 0) {
          setSelectedSisterGroup(sisterGroups[0].id);
        }
      }
    };
    
const getMainGroupRoster = () => {
  const mainRoster = members.map(m => ({
    ...m,
    isSisterMember: false
  }));

  const sisterRoster = sisterGroups.flatMap(sg => 
    (sg.members || []).map(m => ({
      ...m,
      // IMPORTANT FIX: We are now replacing the ID to be consistent everywhere.
      id: `sg-${sg.id}-${m.id}`, 
      isSisterMember: true,
      displayGroupName: sg.name,
      groupId: sg.id // THE FIX: This line was missing.
    }))
  );
  
  const combined = [...mainRoster, ...sisterRoster];
  return combined.sort((a,b) => getTotalFansForMember(b) - getTotalFansForMember(a));
};

    const getAllAvailableMembers = (includeSisterGroups = false) => {
      let all = [...members];
      if (includeSisterGroups) {
          (sisterGroups || []).forEach(sg => { 
              if (sg.members) {
                  (sg.members || []).forEach(m => { 
                      all.push({
                          ...m, 
                          id: `sg-${sg.id}-${m.id}`, 
                          name: `${m.name} (${sg.name})`,
                          homeGroup: sg.name, 
                          isSister: true,
                          groupId: sg.id 
                      });
                  });
              }
          });
      }
      return all.filter(m => m.isAvailable);
    };
    
const getMemberById = (memberId) => {
  if (String(memberId).startsWith('sg-')) {
      const parts = String(memberId).split('-'); 
      const sgId = parseInt(parts[1]);
      const mId = parseInt(parts[2]);
      const sg = (sisterGroups || []).find(g => g.id === sgId);
      const member = (sg?.members || []).find(m => m.id === mId);
      if (member && sg) {
          // Return the decorated object, similar to how the roster creates it
          return {
              ...member,
              rosterId: memberId, 
              isSisterMember: true,
              displayGroupName: sg.name,
          };
      }
  }
  // Fallback for main group members
  const mainMember = members.find(m => String(m.id) === String(memberId));
  if (mainMember) {
    return {
      ...mainMember,
      isSisterMember: false
    };
  }
  return null; // Return null if not found
};
    
    const updateMemberState = (memberId, updateFn) => {
      if (!String(memberId).startsWith('sg-')) {
          setMembers(prev => prev.map(m => String(m.id) === String(memberId) ? updateFn(m) : m));
      } else {
          const parts = String(memberId).split('-');
          const sgId = parseInt(parts[1]);
          const mId = parseInt(parts[2]);

          setSisterGroups(prev => prev.map(sg => {
              if (sg.id === sgId) {
                  return {
                      ...sg,
                      members: (sg.members || []).map(m => m.id === mId ? updateFn(m) : m)
                  };
              }
              return sg;
          }));
      }
    };

const getMemberGroupStatus = (member) => {
  if (!member) return '';

  // Determine the primary group display name
  let groupPart = member.isSisterMember ? member.displayGroupName : groupName;
  
  // Check for and append any Kennin (concurrent) positions
  if (member.kenninGroups && member.kenninGroups.length > 0) {
      const kenninNames = member.kenninGroups.map(id => {
          if (id === 'main') return groupName;
          const sg = sisterGroups.find(g => String(g.id) === String(id));
          return sg ? sg.name : id;
      }).join(', ');
      
      // Add the Kennin info in parentheses
      groupPart += ` (Kennin: ${kenninNames})`;
  }

  // Get the team part (generation part is removed)
  const teamPart = member.teamName ? `Team ${member.teamName}` : '';

  // Join the parts together without the generation
  return [groupPart, teamPart].filter(Boolean).join(' | ');
};

    const getMemberRank = (member) => [...(members || [])].sort((a, b) => getTotalFansForMember(b) - getTotalFansForMember(a)).findIndex(m => m.id === member.id) + 1;

const distributeFans = (amount, memberIds, conversionRate = 0.1) => {
  if (!memberIds || memberIds.length === 0) return;

  const pushedMemberIds = memberIds.filter(id => pushedMembers.map(String).includes(String(id)));
  const regularMemberIds = memberIds.filter(id => !pushedMembers.map(String).includes(String(id)));

  const pushedFanPool = Math.floor(amount * 0.5);
  const regularFanPool = amount - pushedFanPool;

    const distribute = (pool, ids) => {
        if (ids.length === 0 || pool === 0) return;
        
        const weights = ids.map(() => Math.pow(Math.random(), 3));
        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    
        let totalGained = 0;
        ids.forEach((memberId, index) => {
          const fanGain = totalWeight > 0 ? Math.floor((weights[index] / totalWeight) * pool) : Math.floor(pool / ids.length);
          totalGained += fanGain;

          const hardcoreGain = Math.floor(fanGain * conversionRate);
          const casualGain = fanGain - hardcoreGain;

          updateMemberState(memberId, m => ({
            ...m,
            fans: {
              hardcore: (m.fans.hardcore || 0) + hardcoreGain,
              casual: (m.fans.casual || 0) + casualGain,
            }
          }));
        });
    
        const remainder = pool - totalGained;
        if (remainder > 0 && ids.length > 0) {
            const hardcoreGain = Math.floor(remainder * conversionRate);
            const casualGain = remainder - hardcoreGain;
            updateMemberState(ids[0], m => ({ 
                ...m, 
                fans: {
                  hardcore: (m.fans.hardcore || 0) + hardcoreGain,
                  casual: (m.fans.casual || 0) + casualGain,
                }
            }));
        }
    };

  distribute(pushedFanPool, pushedMemberIds);
  distribute(regularFanPool, regularMemberIds);
  
  let notificationMessage = `Gained ${amount.toLocaleString()} new fans!`;
  if (pushedMemberIds.length > 0) {
      notificationMessage += ` Pushed members received a major boost.`
  }

  addNotification({ type: 'Fans', message: notificationMessage });
};


    // --- CORE GAME LOGIC ---

    const addNotification = ({ type, message }) => {
        const title = type.charAt(0).toUpperCase() + type.slice(1);
        const newNotification = {
            id: `${Date.now()}-${Math.random()}`, // Use a more unique ID to prevent key collisions
            week: week,
            title: title,
            content: message // Ensure we are passing the message string, not the whole object
        };
        // Add the new notification and cap the list at 50 to prevent performance issues
        setNotifications(prev => [newNotification, ...prev].slice(0, 50));
    };

    const handleSetTrainingFocus = (memberId, focus) => {
      updateMemberState(memberId, m => ({ ...m, trainingFocus: focus }));
    };

   const handleTogglePushMember = (memberId) => {
  setPushedMembers(prev => {
    const memberIdStr = String(memberId);
    if (prev.map(String).includes(memberIdStr)) {
      return prev.filter(id => String(id) !== memberIdStr);
    } else {
      return [...prev, memberId];
    }
  });
};

    const assignRandomTraining = () => {
      const skills = ['singing', 'dancing', 'variety'];
      getAllAvailableMembers(true).forEach(member => {
        const randomSkill = skills[Math.floor(Math.random() * skills.length)];
        updateMemberState(member.id, m => ({ ...m, trainingFocus: randomSkill }));
      });
      setMessage('Assigned random training focus to all available members.');
    };

    const assignLowestSkillTraining = () => {
      getAllAvailableMembers(true).forEach(member => {
        const skills = {
          singing: member.singing || 0,
          dancing: member.dancing || 0,
          variety: member.variety || 0,
          visual: member.visual || 0,
          charisma: member.charisma || 0,
          intelligence: member.intelligence || 0
        };

        const lowestSkill = Object.keys(skills).reduce((lowest, skill) => {
          return skills[skill] < skills[lowest] ? skill : lowest;
        }, 'singing');

        updateMemberState(member.id, m => ({ ...m, trainingFocus: lowestSkill }));
      });
      setMessage('Assigned training focus to lowest skill for all available members.');
    };

        const getRoomType = (skill) => {
        const mapping = {
            singing: 'vocal',
            dancing: 'dance',
            variety: 'variety',
            visual: 'visual',
            charisma: 'charisma',
            intelligence: 'intelligence',
        };
        return mapping[skill];
        };


    const trainMember = (memberId, skill) => {
      if (money < 500) return setMessage('Not enough money!');
      const member = getMemberById(memberId);
      if (!member || !member.isAvailable) return setMessage(member ? `${member.name} is unavailable.` : 'Member not found.');
      
      const room = getRoomType(skill);
      if (!room) return setMessage('Invalid skill.');

      const improvement = 5 + (buildings.practiceRooms[room] || 0) * 2;
      
      updateMemberState(memberId, m => ({ 
          ...m, 
          [skill]: Math.min(100, (m[skill] || 0) + improvement), 
          stamina: Math.max(0, (m.stamina || 0) - 15),
          stress: Math.min(100, (m.stress || 0) + 10)
      }));
      
      setMoney(prev => prev - 500);
      setMessage(`Training completed! ${member.name}'s ${skill} increased by ${improvement}.`);
    };

    const restMember = (memberId) => {
      const member = getMemberById(memberId);
      if (!member || !member.isAvailable) return setMessage(member ? `${member.name} is unavailable.` : 'Member not found.');
      
      updateMemberState(memberId, m => ({ 
          ...m, 
          stamina: Math.min(100, (m.stamina || 0) + 40), 
          stress: Math.max(0, (m.stress || 0) - 30),
          morale: Math.min(100, (m.morale || 0) + 10) 
      }));
      setMessage(`${member.name} is rested.`);
    };

    const restAllTired = () => {
        const restLogic = m => ({
          ...m,
          stamina: Math.min(100, (m.stamina || 0) + 40),
          stress: Math.max(0, (m.stress || 0) - 30),
          morale: Math.min(100, (m.morale || 0) + 10)
        });
      
        setMembers(prev => prev.map(m => 
          (m.stamina < 50 && m.isAvailable) ? restLogic(m) : m
        ));
        
        setSisterGroups(prev => prev.map(sg => ({
          ...sg,
          members: (sg.members || []).map(m => 
            (m.stamina < 50 && m.isAvailable) ? restLogic(m) : m
          )
        })));
      
        setMessage('All tired, available members have been rested.');
      };
      
      
const buildTheater = () => {
    // Check if the main group already has a theater
    if (theaters.some(t => t.owner === 'main')) {
        return setMessage("You already own a theater for your main group.");
    }
  const cost = 100000;
  if (money < cost) return setMessage('Need ¥100,000 to build the theater!');

  setMoney(prev => prev - cost);

    const newTheater = {
        owner: 'main',
        level: 1,
        capacity: 250,
        name: `${groupName} Theater`
    };
  setTheaters(prev => [...prev, newTheater]);

  const successMessage = 'Theater built! You can now create teams and hold theater shows.';
  setMessage(successMessage);
  addNotification({ type: 'Facility', message: successMessage });
};

    const upgradePracticeRoom = (type) => {
      const roomType = type === 'vocal' ? 'vocal' : type;
      const currentLevel = buildings.practiceRooms[type];
      const cost = 100000 * Math.pow(2, currentLevel);      
      if (money < cost) return setMessage(`Need ¥${cost.toLocaleString()} to upgrade the ${type} room (Lvl ${currentLevel + 1})!`);
      if (currentLevel >= 5) return setMessage('Maximum room level (5) reached.');

      setMoney(prev => prev - cost);
      setBuildings(prev => ({ 
        ...prev, 
        practiceRooms: { ...prev.practiceRooms, [type]: currentLevel + 1 } 
      }));
      setMessage(`Upgraded ${type} room to level ${currentLevel + 1}! Training in ${roomType} is now easier.`);
    };

    const upgradeWarehouse = () => {
        const currentLevel = warehouse.level;
        if (currentLevel >= 5) return setMessage("Warehouse is already at maximum level (5).");

        const nextLevel = currentLevel + 1;
        const cost = warehouseTiers[nextLevel].cost;

        if (money < cost) return setMessage(`Need ¥${cost.toLocaleString()} to upgrade the warehouse!`);

        setMoney(prev => prev - cost);
        setWarehouse({ level: nextLevel });
        addNotification({ type: 'Facility', message: `Warehouse upgraded to Level ${nextLevel}! Inventory capacity is now ${warehouseTiers[nextLevel].capacity.toLocaleString()}.` });
    };

    const upgradeOnlineStore = () => {
    const currentLevel = onlineStore.level;
    if (currentLevel >= 5) return setMessage("Online Store is already at maximum level (5).");

    const cost = currentLevel === 0 ? 200000 : 100000 * Math.pow(2, currentLevel); // Initial build: 200k, then doubles
    const nextLevel = currentLevel + 1;

    if (money < cost) return setMessage(`Need ¥${cost.toLocaleString()} to ${currentLevel === 0 ? 'build' : 'upgrade'} the Online Store!`);

    setMoney(prev => prev - cost);
    setOnlineStore({ level: nextLevel });
    const message = `${currentLevel === 0 ? 'Built' : 'Upgraded'} Online Store to Level ${nextLevel}! It will now automatically sell merchandise each week.`;
    addNotification({ type: 'Facility', message: message });
    setMessage(message);
};

const hireStaff = (staffType) => {
    if (!staffTiers[staffType]) return setMessage("Invalid staff type.");

    const currentLevel = staff[staffType] || 0;
    if (currentLevel >= 3) return setMessage("This staff member is already at the maximum level.");

    const nextLevel = currentLevel + 1;
    const tierInfo = staffTiers[staffType][nextLevel];
    
    if (money < tierInfo.cost) return setMessage(`Not enough money. Hiring a ${tierInfo.name} costs ¥${tierInfo.cost.toLocaleString()}.`);

    setMoney(prev => prev - tierInfo.cost);
    setStaff(prev => ({ ...prev, [staffType]: nextLevel }));

    const message = `${currentLevel === 0 ? 'Hired' : 'Promoted'} a ${tierInfo.name}! Production costs are lower and sales revenue is higher.`;
    addNotification({ type: 'Staff', message: message });
    setMessage(message);
};

    const startTour = () => {
      const cost = 30000;
      if (!buildings.theater) return setMessage("You need a theater to organize tours.");
      if (members.length < 5) return setMessage("Need at least 5 members for a tour.");
      if (money < cost) return setMessage(`Tours cost ¥${cost.toLocaleString()}.`);
      
      setMoney(prev => prev - cost);
      setActiveTour({ name: `${groupName} National Tour`, weeksLeft: 4, cities: 4, revenue: 0 });
      setMessage("Tour started! It will run for 4 weeks. Use 'Advance Tour' to progress the tour.");
    };

    const progressTour = () => {
      if (!activeTour) return;

      const tour = activeTour;
      const membersAvailable = members.filter(m => m.isAvailable).length;
      
      const performance = members.reduce((sum, m) => sum + ((m.singing || 0) + (m.dancing || 0)), 0) / 2;
      const weekRevenue = Math.floor(performance * membersAvailable * 5);
      const fanGain = Math.floor(performance * membersAvailable / 100);

      setMoney(prev => (prev || 0) + weekRevenue);
      setTotalFans(prev => (prev || 0) + fanGain);
      
      setMembers(prev => prev.map(m => m.isAvailable ? { 
          ...m, 
          stamina: Math.max(0, (m.stamina || 100) - 40),
          stress: Math.min(100, (m.stress || 0) + 25),
          morale: Math.max(0, (m.morale || 0) - 10) 
      } : m));

      const weeksRemaining = tour.weeksLeft - 1;

      if (weeksRemaining <= 0) {
        setMessage(`Tour concluded! Total Revenue: ¥${(tour.revenue + weekRevenue).toLocaleString()}.`);
        setActiveTour(null);
      } else {
        setActiveTour(prev => ({ 
          ...prev, 
          weeksLeft: weeksRemaining, 
          revenue: (prev.revenue || 0) + weekRevenue 
        }));
        setMessage(`Tour week ${tour.weeksLeft} finished. Revenue: ¥${weekRevenue.toLocaleString()}. Remaining: ${weeksRemaining} weeks.`);
      }
    };

    const createTeam = () => {
      if (theaters.length === 0) return setMessage("Build a theater first to create teams!");
      // Set modalData to null to ensure the 'Create Team' modal is always empty
      setModalData(null); 
      setShowModal('createTeam');
    };

    const editTeam = (teamId) => {
      const teamToEdit = teams.find(t => t.id === teamId);
      if (teamToEdit) {
        // Pre-fill the modal with the existing team's data for editing
        setModalData(teamToEdit);
        setShowModal('editTeam');
      }
    };

    const saveTeam = (teamId, teamName, groupId, selectedMembers, setlistId) => {
        if (!teamName || teamName.trim() === '') return setMessage("Team name cannot be empty.");

        const newTeamId = teamId || Date.now();
        const isEditing = !!teamId;
        const oldTeam = isEditing ? teams.find(t => t.id === teamId) : null;
        
        const teamGroupName = (String(groupId) === 'main') 
            ? groupName 
            : (sisterGroups.find(sg => String(sg.id) === String(groupId))?.name || 'Unknown Group');

        // Create deep copies of the state to modify safely
        let nextMembers = JSON.parse(JSON.stringify(members));
        let nextSisterGroups = JSON.parse(JSON.stringify(sisterGroups));
        
        // --- Part 1: Prepare Team History & ID mapping ---
        let teamHistory = [];
        const idChangeMap = new Map(); // Maps old selection ID to the NEW ID after transfer

        if (isEditing) {
            teamHistory = [...(oldTeam.history || [])];
            if (oldTeam.currentSetlistId !== setlistId) {
                const oldSetlistName = allSetlists.find(s => s.id === oldTeam.currentSetlistId)?.name || 'None';
                const newSetlistName = allSetlists.find(s => s.id === setlistId)?.name || 'None';
                teamHistory.push({ week: week + 1, event: `Setlist changed from "${oldSetlistName}" to "${newSetlistName}"` });
            }
        } else {
            const setlistName = allSetlists.find(s => s.id === setlistId)?.name || 'None';
            teamHistory.push({ week: week + 1, event: `Team "${teamName}" formed for ${teamGroupName}, starting with setlist: ${setlistName}` });
        }

        // --- Part 2: Process Member Removals (if editing) ---
        if (isEditing) {
            const oldMemberIds = oldTeam.members.map(String);
            const newMemberIds = selectedMembers.map(sm => String(sm.id));
            const removedIds = oldMemberIds.filter(id => !newMemberIds.includes(id));

            removedIds.forEach(memberId => {
                const roster = [...nextMembers.map(m => ({ ...m, isSg: false })), ...nextSisterGroups.flatMap(sg => (sg.members || []).map(m => ({ ...m, id: `sg-${sg.id}-${m.id}`, isSg: true, sgId: sg.id })))];
                const memberForHistory = roster.find(m => m.id === memberId);
                if (memberForHistory) {
                    teamHistory.push({ week: week + 1, event: `Member Left: ${memberForHistory.name}` });
                }

                const updateFn = m => {
                    const event = { week: week + 1, event: `Removed from Team ${oldTeam.name}` };
                    let newConcurrent = (m.concurrentTeams || []).filter(ct => ct.id !== oldTeam.id);
                    let newTeamId_ = m.teamId;
                    let newTeamName_ = m.teamName;

                    if (m.teamId === oldTeam.id) {
                        if (newConcurrent.length > 0) {
                            const promoted = newConcurrent.shift(); newTeamId_ = promoted.id; newTeamName_ = promoted.name;
                        } else {
                            newTeamId_ = null; newTeamName_ = null;
                        }
                    }
                    return { ...m, teamId: newTeamId_, teamName: newTeamName_, concurrentTeams: newConcurrent, teamHistory: [...(m.teamHistory || []), event] };
                };
                
                if (!String(memberId).startsWith('sg-')) {
                    nextMembers = nextMembers.map(m => String(m.id) === String(memberId) ? updateFn(m) : m);
                } else {
                    const [, sgId, mId] = memberId.split('-');
                    nextSisterGroups = nextSisterGroups.map(sg => {
                        if (String(sg.id) === sgId) {
                            return { ...sg, members: (sg.members || []).map(m => String(m.id) === mId ? updateFn(m) : m) };
                        }
                        return sg;
                    });
                }
            });
        }

        // --- Part 3: Process Member Additions ---
        const oldMemberIds = oldTeam ? oldTeam.members.map(String) : [];
        const addedSelections = selectedMembers.filter(sm => !oldMemberIds.includes(String(sm.id)));

        addedSelections.forEach(selection => {
            const { id: memberId, type } = selection;

            let memberToProcess, originalLocation, originalSgIndex, originalMIndex;
            if (String(memberId).startsWith('sg-')) {
                const [, sgId, mId] = memberId.split('-');
                originalSgIndex = nextSisterGroups.findIndex(sg => String(sg.id) === sgId);
                if (originalSgIndex === -1) return;
                originalMIndex = (nextSisterGroups[originalSgIndex].members || []).findIndex(m => String(m.id) === mId);
                if (originalMIndex === -1) return;
                memberToProcess = nextSisterGroups[originalSgIndex].members[originalMIndex];
                originalLocation = 'sister';
            } else {
                originalMIndex = nextMembers.findIndex(m => String(m.id) === String(memberId));
                if (originalMIndex === -1) return;
                memberToProcess = nextMembers[originalMIndex];
                originalLocation = 'main';
            }

            if (!memberToProcess) return;

            teamHistory.push({ week: week + 1, event: `Member Joined: ${memberToProcess.name} (via ${type})` });

            if (type === 'transfer') {
                const newHomeGroupId = groupId;
                const newTeamOwnerName = newHomeGroupId === 'main' ? groupName : nextSisterGroups.find(sg => String(sg.id) === String(newHomeGroupId))?.name;
                
                const transferredMember = {
                    ...memberToProcess,
                    homeGroup: newHomeGroupId === 'main' ? 'main' : newTeamOwnerName,
                    kenninGroups: [], teamId: newTeamId, teamName: teamName, concurrentTeams: [],
                    teamHistory: [...(memberToProcess.teamHistory || []), { week: week + 1, event: `Transferred to ${newTeamOwnerName} via Team ${teamName}` }]
                };

                if (originalLocation === 'main') {
                    nextMembers.splice(originalMIndex, 1);
                } else {
                    nextSisterGroups[originalSgIndex].members.splice(originalMIndex, 1);
                }

                if (newHomeGroupId === 'main') {
                    const newId = (nextMembers.length > 0 ? Math.max(0, ...nextMembers.map(m => m.id)) : 0) + 1;
                    transferredMember.id = newId;
                    nextMembers.push(transferredMember);
                    idChangeMap.set(memberId, newId);
                } else {
                    const newSgIndex = nextSisterGroups.findIndex(sg => String(sg.id) === String(newHomeGroupId));
                    const sgMembers = nextSisterGroups[newSgIndex].members || [];
                    const newId = (sgMembers.length > 0 ? Math.max(0, ...sgMembers.map(m => m.id)) : 0) + 1;
                    transferredMember.id = newId;
                    nextSisterGroups[newSgIndex].members.push(transferredMember);
                    idChangeMap.set(memberId, `sg-${newHomeGroupId}-${newId}`);
                }

            } else { // Handle 'kennin', 'shuffle', 'concurrent', 'add'
                const updateFn = m => {
                    let historyEvent = '';
                    let newTeamId_ = m.teamId; let newTeamName_ = m.teamName;
                    let newConcurrent = [...(m.concurrentTeams || [])];
                    let newKenninGroups = [...(m.kenninGroups || [])];

                    switch (type) {
                        case 'kennin':
                            historyEvent = `Given Kennin in ${teamGroupName} via Team ${teamName}`;
                            if (!newKenninGroups.includes(teamGroupName)) newKenninGroups.push(teamGroupName);
                            if (!m.teamId) { newTeamId_ = newTeamId; newTeamName_ = teamName; }
                            else if (!newConcurrent.some(t => t.id === newTeamId)) newConcurrent.push({ id: newTeamId, name: teamName });
                            break;
                        case 'shuffle':
                            historyEvent = `Shuffled from Team ${m.teamName} to Team ${teamName}`;
                            newTeamId_ = newTeamId; newTeamName_ = teamName; newConcurrent = m.concurrentTeams.filter(ct => ct.id !== newTeamId); // Ensure it's not also concurrent
                            break;
                        case 'concurrent':
                            historyEvent = `Added concurrent position in Team ${teamName}`;
                            if (m.teamId) { if (!newConcurrent.some(t => t.id === newTeamId) && m.teamId !== newTeamId) newConcurrent.push({ id: newTeamId, name: teamName }); } 
                            else { newTeamId_ = newTeamId; newTeamName_ = teamName; }
                            break;
                        default: // 'add'
                            if (!m.teamId) {
                                historyEvent = `Promoted to Team ${teamName}`;
                                newTeamId_ = newTeamId; newTeamName_ = teamName;
                            } else if (!newConcurrent.some(t => t.id === newTeamId) && m.teamId !== newTeamId) {
                                 newConcurrent.push({ id: newTeamId, name: teamName });
                                 historyEvent = `Given concurrent position in Team ${teamName}`;
                            }
                            break;
                    }
                    if (!historyEvent) return m;
                    return { ...m, teamId: newTeamId_, teamName: newTeamName_, concurrentTeams: newConcurrent, kenninGroups: newKenninGroups, teamHistory: [...(m.teamHistory || []), { event: historyEvent, week: week + 1 }] };
                };
                
                if (originalLocation === 'main') {
                    nextMembers[originalMIndex] = updateFn(memberToProcess);
                } else {
                    nextSisterGroups[originalSgIndex].members[originalMIndex] = updateFn(memberToProcess);
                }
                idChangeMap.set(memberId, memberId); // No ID change for non-transfers
            }
        });

        // --- Part 4: Finalize Team Data ---
        const removedIds = oldTeam ? oldTeam.members.map(String).filter(id => !selectedMembers.some(sm => sm.id === id)) : [];
        const existingUnchangedIds = oldTeam ? oldTeam.members.filter(id => !removedIds.includes(id) && !addedSelections.some(s => s.id === id)) : [];
        
        const addedMemberFinalIds = addedSelections.map(sm => idChangeMap.get(sm.id) || sm.id);
        const finalTeamRoster = [...existingUnchangedIds, ...addedMemberFinalIds];

        const teamData = { id: newTeamId, name: teamName, groupId, members: finalTeamRoster, currentSetlistId: setlistId, history: teamHistory };

        const teamExists = teams.some(t => t.id === newTeamId);
        const nextTeams = teamExists 
            ? teams.map(t => (t.id === newTeamId ? teamData : t))
            : [...teams, teamData];

        // --- Part 5: ***CORRECTLY*** Prepare Setlist History State ---
        let nextAllSetlists = allSetlists; // Default to current state
        const oldSetlistId = isEditing ? oldTeam.currentSetlistId : null;
        const newSetlistId = setlistId;

        if (isEditing && oldSetlistId !== newSetlistId) {
            // First, map to "close" the old history entry
            const intermediateSetlists = allSetlists.map(sl => {
                if (String(sl.id) === String(oldSetlistId) && sl.isCustom) {
                    const updatedHistory = (sl.usageHistory || []).map(h => 
                        (String(h.teamId) === String(teamId) && h.endWeek === null) ? { ...h, endWeek: week } : h
                    );
                    return { ...sl, usageHistory: updatedHistory };
                }
                return sl;
            });
            // Then, map again to add the new history entry
            nextAllSetlists = intermediateSetlists.map(sl => {
                if (String(sl.id) === String(newSetlistId) && sl.isCustom) {
                    const newHistoryEntry = { teamId: teamId, teamName: teamName, startWeek: week, endWeek: null };
                    return { ...sl, usageHistory: [...(sl.usageHistory || []), newHistoryEntry] };
                }
                return sl;
            });
        } else if (!isEditing && newSetlistId) {
            // This is for CREATING a new team
            nextAllSetlists = allSetlists.map(sl => {
                if (String(sl.id) === String(newSetlistId) && sl.isCustom) {
                    const newHistoryEntry = { teamId: newTeamId, teamName: teamName, startWeek: week, endWeek: null };
                    return { ...sl, usageHistory: [...(sl.usageHistory || []), newHistoryEntry] };
                }
                return sl;
            });
        }

        // --- Part 6: Set all state ONCE ---
        setMembers(nextMembers);
        setSisterGroups(nextSisterGroups);
        setTeams(nextTeams);
        setAllSetlists(nextAllSetlists); // Now setting it here with the other states

        setShowModal(null);
        addNotification({ type: "Management", message: `Team "${teamName}" saved successfully.` });
    };

const deleteTeam = (teamId) => {
    const teamToDisband = teams.find(t => t.id === teamId);
    if (!teamToDisband) return;

    // When a team is deleted, we must update all its members
    teamToDisband.members.forEach(memberId => {
        updateMemberState(memberId, m => {
            const event = { week: week + 1, event: `Team ${teamToDisband.name} was disbanded` };
            let newConcurrent = (m.concurrentTeams || []).filter(ct => ct.id !== teamId);
            let newTeamId = m.teamId;
            let newTeamName = m.teamName;

            if (m.teamId === teamId) { // If the disbanded team was primary
                if (newConcurrent.length > 0) { // Promote the first concurrent team
                    const promoted = newConcurrent.shift();
                    newTeamId = promoted.id;
                    newTeamName = promoted.name;
                } else { // Member becomes a trainee
                    newTeamId = null;
                    newTeamName = null;
                }
            }
            
            return { ...m, teamId: newTeamId, teamName: newTeamName, concurrentTeams: newConcurrent, teamHistory: [...(m.teamHistory || []), event] };
        });
    });

    setTeams(prev => prev.filter(t => t.id !== teamId));
    if (selectedTheaterTeam === teamId) setSelectedTheaterTeam(null);
    
    setShowModal(null);
    addNotification({ type: "Management", message: `Team "${teamToDisband.name}" has been disbanded.` });
};
 
    const showTeamDetails = (team) => {
        setModalData(team);
        setShowModal('teamDetails');
    };


    const startTheaterShowPrep = () => {
      if (theaters.length === 0) return setMessage("Build a theater first!");
      const selection = selectedTheaterTeam; // Can be a team ID (number), group ID (string 'sg-X'), or null

      if (typeof selection === 'number') { // A Team is selected
          const team = teams.find(t => t.id === selection);
          if (!team) return;
          if (team.members.length === 0) return setMessage(`${team.name} has no members!`);
          if (!team.currentSetlistId) return setMessage(`${team.name} needs a setlist!`);

      } else if (typeof selection === 'string' && selection.startsWith('sg-')) { // A Sister Group is selected
          const sgId = selection.replace('sg-', '');
          const sg = sisterGroups.find(g => String(g.id) === sgId);
          if (sg && (sg.members || []).length === 0) {
              return setMessage(`${sg.name} has no members!`);
          }
      } else { // "All Available Members" is selected
          if (getMainGroupRoster().filter(m => m.isAvailable).length === 0) {
              return setMessage("No members are available to perform in any group.");
          }
      }

      setModalData({ selection: selection });
      setShowModal('theaterSelection');
    };
    
    
    const graduateMember = (memberId) => {
      let graduatedMember;
      let memberName = 'A member';
      let homeGroupName;

      const mainMember = members.find(m => String(m.id) === String(memberId));
      if (mainMember) {
          homeGroupName = groupName;
          graduatedMember = mainMember;
      } else {
          for (const sg of sisterGroups) {
              const foundMember = sg.members.find(m => String(m.id) === String(memberId));
              if (foundMember) {
                  homeGroupName = sg.name;
                  graduatedMember = foundMember;
                  break;
              }
          }
      }

      if (graduatedMember) {
          memberName = graduatedMember.name;
          const event = { week: week, event: `Graduated from ${homeGroupName}` };
          graduatedMember.teamHistory = [...(graduatedMember.teamHistory || []), event];
          graduatedMember.graduated = true;

          setHallOfFame(prev => [...prev, graduatedMember]);
          setMembers(prev => prev.filter(m => String(m.id) !== String(memberId)));
          setSisterGroups(prev => prev.map(sg => ({
              ...sg,
              members: sg.members.filter(m => String(m.id) !== String(memberId))
          })));

          const gradMessage = `${memberName} has graduated from ${homeGroupName}.`;
          addNotification({ type: 'Graduation', message: gradMessage });
          setMessage(gradMessage);
          setSelectedMember(null);
      }
    };

        const askAboutGraduation = (memberId) => {
            const member = getMemberById(memberId);
            if (!member) return;

            const urgency = member.graduationUrgency || 0;
            const yearsActive = member.yearsActive || 0;
            const gradWindow = member.graduationWindow || { min: 4, max: 8 };

            let response = "";

            if (urgency < 35) {
                const responses = [
                    `Me? Graduate? I haven't even thought about it! I want to do my best for the group right now.`,
                    `I'm not planning on leaving anytime soon! There's still so much I want to achieve with everyone.`,
                    `Not for a long, long time! My journey as an idol has just begun.`,
                    `As long as the fans keep calling my name, I'll stay on this stage forever! I'm not going anywhere.`,
                    `I want to see this group reach the top of the charts before I even consider my own future. We're in this together!`,
                    `Graduation? Why would you ask that? I'm having way too much fun performing with the girls right now!`,
                    `I still have so many things I want to show you all. Please keep watching me—I’m staying right here.`,
                    `I've only just started to find my own style. I want to polish my dancing and singing here for many more years!`,
                    `The thought hasn't even crossed my mind. My heart is 100% focused on our next concert tour!`,
                    `I promised my juniors I'd be here to support them. I'm not leaving until I know the group's future is secure.`
                ];
            response = responses[Math.floor(Math.random() * responses.length)];
            } 
            else if (urgency < 60) {
                const remainingYears = Math.max(1, gradWindow.min - yearsActive);
                const responses = [
                    `Hmm, I don't know... Maybe in about ${remainingYears} year(s)? For now, I'm focused on our next single.`,
                    `I've been thinking about what comes next, but I'm not ready to leave just yet.`,
                    `It's on my mind, but not for a while. I still feel like I have more to give.`,
                    `I’ve started to think about my life after this, but my heart still beats for the stage every time the lights go up.`,
                    `Sometimes I look at the new members and think about passing the torch, but I want to make a few more memories first.`,
                    `Graduation is a word that feels more real lately, but I'm not in any hurry to say it out loud.`,
                    `I want to stay until I feel I’ve truly mastered my craft. I think I need a little more time here.`,
                    `People are starting to ask me that more often. I suppose I'll know when the time is right, but it's not today.`,
                    `I’ve been an idol for a while now. I’ve started wondering about the 'outside world,' but I still love this view too much.`,
                    `I want to leave a legacy behind. Until I'm sure I've done that, I'll keep wearing this uniform with pride.`
                ];                response = responses[Math.floor(Math.random() * responses.length)];
            } 
            else if (urgency < 85) {
                const responses = [
                    `To be honest, I've been thinking about it a lot lately. Maybe within the next year or so...`,
                    `I think my time as an idol might be coming to a close soon. I'm thinking about graduating sometime in the next 6 to 12 months.`,
                    `It feels like it's getting to be that time. I'll probably make a decision within the year.`,
                    `I’ve given my all to this group, but I can feel my heart starting to look toward a new dream. It might be soon.`,
                    `I want my final performance to be perfect. I’ve started talking to the staff about when the right time might be.`,
                    `The time when I have to say goodbye is getting closer. I want to treasure every handshake and every stage until then.`,
                    `I’ve realized that I’ve accomplished what I set out to do here. I think I’ll be ready to move on before the year ends.`,
                    `It’s getting harder to say 'see you next time' because I know the 'last time' is coming up. I’m preparing myself.`,
                    `I want to pass my position to the juniors while I’m still at my best. I’m seriously considering a date for next year.`,
                    `I’ve spent half my life in this costume. I think it’s almost time to hang it up and see who I am without it.`
                ];                
                response = responses[Math.floor(Math.random() * responses.length)];
            } else { // 85+
                const responses = [
                    `Producer-san... I think we need to talk soon. I've made a decision.`,
                    `I can't say for sure, but... maybe in a few months. I'll come to you when I'm ready to talk properly.`,
                    `It's very soon. Please wait for my official announcement.`
                ];
                response = responses[Math.floor(Math.random() * responses.length)];
            }

            setModalData({ member, speech: response });
            setShowModal('graduationTalk');
        };
       
                const handleScandalResponse = (responseType) => {
            if (!activeScandal) return;
    
            const { member, scandal } = activeScandal;
            const responseOption = scandalResponseOptions[responseType];
            let fanLossMultiplier = 1;
            let moraleHitMultiplier = 1;
            let urgencyMultiplier = 1;

            // Check if the member is especially vulnerable to scandals
            if (member.ambition === 'Heal from a Scandal') {
                fanLossMultiplier = 2.0; // Double the fan loss
                moraleHitMultiplier = 2.0; // Double the morale hit
                urgencyMultiplier = 2.5; // Drastically increase the graduation urgency impact
                addNotification({ type: 'Alert', message: `Because ${member.name} is still recovering from a past issue, this new scandal is doubly damaging!` });
            }
    
            let stressChange = 0;
            let message = '';
            let reputationLoss = 0;
    
            if (money < responseOption.cost) {
                addNotification({ type: 'error', message: "Not enough money to take this action!" });
                return;
            }
            setMoney(prev => prev - responseOption.cost);
    
            switch(responseType) {
                case 'deny':
                    const successChance = scandal.severity === 'High' ? 0.2 : (scandal.severity === 'Mid' ? 0.5 : 0.8);
                    if (Math.random() < successChance) {
                        fanLossMultiplier *= 0.2;
                        moraleHitMultiplier *= 0.5;
                        stressChange = 10;
                        reputationLoss = -1;
                        message = `The denial was successful! The damage was minimal.`;
                    } else {
                        fanLossMultiplier *= 2.5;
                        moraleHitMultiplier *= 2.0;
                        stressChange = 40;
                        reputationLoss = -8;
                        message = `The denial backfired horribly! The scandal has gotten much worse.`;
                    }
                    break;
                case 'apologize':
                    fanLossMultiplier *= 1.0;
                    moraleHitMultiplier *= 1.2;
                    stressChange = 20;
                    reputationLoss = scandal.severity === 'High' ? -4 : (scandal.severity === 'Mid' ? -2 : -1);
                    message = `A formal apology was issued. Many appreciate the honesty.`;
                    break;
                case 'suspend':
                    fanLossMultiplier *= 0.8;
                    moraleHitMultiplier *= 2.5;
                    stressChange = 10;
                    reputationLoss = scandal.severity === 'High' ? -3 : (scandal.severity === 'Mid' ? -1 : 0);
                    updateMemberState(member.id, m => ({ ...m, isAvailable: false, returningWeek: week + 4 }));
                    message = `${member.name} has been suspended for 4 weeks. The public sees that you are taking action.`;
                    break;
                case 'ignore':
                    fanLossMultiplier *= (Math.random() * 2 + 0.5);
                    moraleHitMultiplier *= 1.0;
                    stressChange = 5;
                    reputationLoss = scandal.severity === 'High' ? -5 : (scandal.severity === 'Mid' ? -3 : -2);
                    message = `You chose to ignore the scandal. The story fizzled out... for now. The impact was unpredictable.`;
                    break;
            }

            if (reputationLoss < 0) {
                setGroupReputation(prev => Math.max(0, prev + reputationLoss));
                addNotification({ type: 'alert', message: `The scandal has damaged the group's reputation. (${reputationLoss} Rep)` });
            }
    
            const fanLoss = Math.floor( ((member.fans.hardcore || 0) + (member.fans.casual || 0)) * scandal.baseFanLoss * fanLossMultiplier );
            const moraleHit = Math.floor(scandal.baseMoraleHit * moraleHitMultiplier);
            const urgencyIncrease = scandal.baseUrgency * urgencyMultiplier;
            
            updateMemberState(member.id, m => {
                const newHardcore = Math.max(0, (m.fans.hardcore || 0) - Math.floor(fanLoss * 0.7));
                const newCasual = Math.max(0, (m.fans.casual || 0) - Math.floor(fanLoss * 0.3));
                return {
                    ...m,
                    fans: { hardcore: newHardcore, casual: newCasual },
                    morale: Math.max(0, m.morale - moraleHit),
                    stress: Math.min(100, m.stress + stressChange),
                    graduationUrgency: Math.min(100, (m.graduationUrgency || 0) + urgencyIncrease)
                }
            });
    
            addNotification({ type: 'Scandal', message: `${member.name}'s Scandal: ${message}` });
            setMessage(`Handled ${member.name}'s scandal. See results.`);

            setModalData({
                member,
                scandal,
                action: responseType,
                resultMessage: message,
                fanLoss,
                moraleHit,
                reputationLoss,
                urgencyIncrease
            });
            
            setActiveScandal(null);
            setShowModal('scandalResult');
        };


    const holdTheaterShow = ({ teamId, venueOwnerId, concertTheme, travelCost }) => {
        setShowModal(null);

        const team = teamId ? teams.find(t => t.id === teamId) : null;
        const setlist = team ? allSetlists.find(s => s.id === team.currentSetlistId) : null;
        // --- FIX: Compare owner and venueOwnerId as strings to avoid type mismatch ---
        const venue = theaters.find(t => String(t.owner) === String(venueOwnerId));

        if (!venue) return setMessage("Error: Selected theater not found.");

        if (hasPerformedThisWeek) {
            setMessage("You can only hold one performance activity per week.");
            return;
        }
        
        let performingMembers;
        if (team) {
            const allMembersWithStatus = getMainGroupRoster();
            performingMembers = allMembersWithStatus.filter(m => team.members.includes(String(m.id)) && m.isAvailable);
        } else {
            performingMembers = members.filter(m => m.isAvailable);
        }
        const performingMemberIds = performingMembers.map(m => m.id);
        if (performingMembers.length === 0) {
            return setMessage(team ? `${team.name} has no available members!` : 'No available members in the main group!');
        }

        const avgStamina = performingMembers.reduce((sum, m) => sum + (m.stamina || 0), 0) / performingMembers.length;
        if (avgStamina < 30) return setMessage('Performing members are too tired!');
          
        let themeBonus = 1.0;
        if (setlist && setlist.theme === concertTheme) {
            themeBonus = 1.5; 
        } else if (setlist) {
            themeBonus = 0.8; 
        }

        const memberCount = performingMembers.length || 1;
        const avgSinging = performingMembers.reduce((s, m) => s + (m.singing || 0), 0) / memberCount;
        const avgDancing = performingMembers.reduce((s, m) => s + (m.dancing || 0), 0) / memberCount;
        const avgVisual = performingMembers.reduce((s, m) => s + (m.visual || 0), 0) / memberCount;
        const avgCharisma = performingMembers.reduce((s, m) => s + (m.charisma || 0), 0) / memberCount;
let totalChemistry = 0;
let pairs = 0;
for (let i = 0; i < performingMembers.length; i++) {
    for (let j = i + 1; j < performingMembers.length; j++) {
        const memberA = performingMembers[i];
        const memberB = performingMembers[j];
        const chemistryScore = (memberA.chemistry && memberA.chemistry[memberB.rosterId]) || 0;
        totalChemistry += chemistryScore;
        pairs++;
    }
}
const avgChemistry = pairs > 0 ? totalChemistry / pairs : 0;
const chemistryBonus = 1 + (avgChemistry / 500); // e.g., avg chemistry of 50 gives a +10% bonus

        const performance = performingMembers.reduce((sum, m) => {
            const memberScore = ((m.singing || 0) * 0.3 + 
                                 (m.dancing || 0) * 0.4 + 
                                 (m.visual || 0) * 0.2 + 
                                 (m.charisma || 0) * 0.1);
            const staminaModifier = (m.stamina || 100) / 100;
            return sum + (memberScore * staminaModifier);
        }, 0) * themeBonus * chemistryBonus;

        let salesData = {};
        let merchRevenue = 0;
        const fanDemand = Math.floor(totalFans / 200);
        const newInventory = { ...merchInventory }; 

        Object.keys(merchInventory).forEach(inventoryKey => {
            const [item, tier] = inventoryKey.split('_');
            const tierInfo = merchTiers[item]?.[tier];

            if (tierInfo && newInventory[inventoryKey] > 0) {
                let demandModifier = 1.0;
                if (tier === 'standard') demandModifier = 0.8;
                if (tier === 'premium') demandModifier = 0.5;

                const toSell = Math.min(
                    newInventory[inventoryKey], 
                    Math.floor((fanDemand * demandModifier) + Math.random() * (fanDemand * 0.5))
                );

                if (toSell > 0) {
                    merchRevenue += toSell * tierInfo.price;
                    newInventory[inventoryKey] -= toSell;
                    salesData[tierInfo.name] = (salesData[tierInfo.name] || 0) + toSell;
                    if (newInventory[inventoryKey] === 0) {
                        addNotification({ type: 'Info', message: `${tierInfo.name} has sold out!` });
                        distributeFans(50, performingMemberIds, 0.05); // Small group fan boost
                    }
                }
            }
        });
        setMerchInventory(newInventory);

        const newIdolInventory = { ...idolMerchInventory };
        Object.keys(idolMerchInventory).forEach(inventoryKey => {
            const [memberId, itemType] = inventoryKey.split('_');
            const tierInfo = idolMerchTiers[itemType];
            const member = getMemberById(memberId);

            if (tierInfo && member && newIdolInventory[inventoryKey] > 0) {
                const idolFanDemand = Math.floor(getTotalFansForMember(member) / 100);
                
                const toSell = Math.min(
                    newIdolInventory[inventoryKey],
                    Math.floor(idolFanDemand + Math.random() * (idolFanDemand * 0.5))
                );

                if (toSell > 0) {
                    merchRevenue += toSell * tierInfo.price;
                    newIdolInventory[inventoryKey] -= toSell;
                    const itemName = `${member.name}'s ${tierInfo.name}`;
                    salesData[itemName] = (salesData[itemName] || 0) + toSell;
                    if (newIdolInventory[inventoryKey] === 0) {
                        addNotification({ type: 'Info', message: `${member.name}'s ${tierInfo.name} has sold out!` });
                        updateMemberState(memberId, m => ({ ...m, fans: { ...m.fans, casual: (m.fans.casual || 0) + 200 }}));
                    }
                }
            }
        });
        setIdolMerchInventory(newIdolInventory);

        const merchHypeBonus = 1 + (merchRevenue / 500000); 
        const newFans = Math.floor((20 + (performance / 10)) * merchHypeBonus);

        const bestSeller = Object.entries(salesData).reduce((best, current) => {
            return current[1] > best.quantity ? { name: current[0], quantity: current[1] } : best;
        }, { name: 'None', quantity: 0 });

        const ticketRevenue = Math.floor(performance * 50);

        if (staff.merchManager > 0) {
            const revenueBonus = staff.merchManager * 0.05; // 5% per level
            merchRevenue = Math.floor(merchRevenue * (1 + revenueBonus));
        }

        const totalRevenue = ticketRevenue + merchRevenue;
        const totalCosts = travelCost || 0; 
        const netProfit = totalRevenue - totalCosts;
        const agencyProfit = Math.floor(netProfit * 0.6); 
        const idolShare = netProfit - agencyProfit;
        distributeFans(newFans, performingMemberIds);

        performingMembers.forEach(member => {
            updateMemberState(member.id, m => ({
                ...m,
                stamina: Math.max(0, (m.stamina || 100) - 20),
                stress: Math.min(100, (m.stress || 0) + 10),
            }));
        });

        setMoney(prev => (prev || 0) + agencyProfit);
        setStatistics(prev => ({ ...prev, totalRevenue: (prev.totalRevenue || 0) + totalRevenue, totalConcerts: (prev.totalConcerts || 0) + 1 }));
          
        let concertMessage = `Theater Show at ${venue.name}!`;
        if (totalCosts > 0) concertMessage += ` Travel Costs: ¥${totalCosts.toLocaleString()}.`;
        concertMessage += ` Agency Profit: ¥${agencyProfit.toLocaleString()}. External Cost (Idol Share, Staffs, Rental, Etc): ¥${idolShare.toLocaleString()}. +${newFans.toLocaleString()} fans.`;
        
        setHasPerformedThisWeek(true);
        setMessage(concertMessage);
        addNotification({ type: 'Performance', message: concertMessage });

        setModalData({
            title: "Theater Show Result",
            message: `The crowd loved the performance! Total Revenue: ¥${totalRevenue.toLocaleString()}. Travel Costs: ¥${totalCosts.toLocaleString()}. External Cost (Idol Share, Staffs, Rental, Etc): ¥${idolShare.toLocaleString()}`,
            fansGained: newFans,
            revenue: agencyProfit,
            performanceStats: {
                singing: avgSinging,
                dancing: avgDancing,
                visual: avgVisual,
                charisma: avgCharisma
            },
            totalMerchRevenue: merchRevenue, // Correct variable name
            bestSellerName: bestSeller.name   // Correct placement
        });

        setShowModal('performanceResult');
    };
    
    const holdSisterGroupShow = (sgId) => {
      const sg = sisterGroups.find(g => g.id === sgId);
      if (!sg) return;

      const performingMembers = sg.members.filter(m => m.isAvailable);
      if (performingMembers.length < 3) return setMessage(`${sg.name} needs at least 3 available members for a show.`);

      const cost = 10000;
      if (money < cost) return setMessage(`Not enough money for a show. Cost: ¥${cost.toLocaleString()}.`);

      // --- NEW: Performance Calculation for Sister Groups ---
      const performanceScore = performingMembers.reduce((sum, m) => {
          const memberScore = (m.singing || 0) * 0.3 + 
                              (m.dancing || 0) * 0.4 + 
                              (m.visual || 0) * 0.2 + 
                              (m.charisma || 0) * 0.1;
          const staminaModifier = (m.stamina || 100) / 100;
          return sum + (memberScore * staminaModifier);
      }, 0);
      // --- END NEW ---

      const ticketRevenue = Math.floor(performanceScore * 25);
      const profit = ticketRevenue - cost;
      const fanGain = Math.floor(performanceScore / 2);

      setMoney(prev => prev + profit);
      setSisterGroups(prev => prev.map(g => g.id === sgId ? { 
          ...g, 
          fans: g.fans + fanGain, 
          members: g.members.map(m => m.isAvailable ? { ...m, stamina: Math.max(0, (m.stamina || 100) - 20) } : m) 
      } : g));
      
      setMessage(`${sg.name} held a show. Profit: ¥${profit.toLocaleString()}. +${fanGain} fans to ${sg.name}.`);
      addNotification({ type: 'Sister Group', message: `${sg.name} held a show earning ¥${profit.toLocaleString()} and gaining ${fanGain} fans.`});
    }

    const startElectionCampaign = () => {
        const cost = 100000;
        if (money < cost) {
            return setMessage("Not enough funds to start an election campaign.");
        }
        if (isCampaignActive) {
            return setMessage("An election campaign is already active.");
        }

        // --- NEW: Calculate and add fan club votes ---
        let totalHardcoreFans = 0;
        members.forEach(m => {
            totalHardcoreFans += m.fans?.hardcore || 0;
        });
        sisterGroups.forEach(sg => {
            (sg.members || []).forEach(m => {
                totalHardcoreFans += m.fans?.hardcore || 0;
            });
        });

        // Each hardcore fan contributes 1 vote
        const fanVotes = totalHardcoreFans;

        setElectionVotePool(prev => prev + fanVotes);
        // --- END NEW ---

        setMoney(prev => prev - cost);
        setIsCampaignActive(true);
        setCampaignEndWeek(week + 4);

        const successMessage = `4-week election campaign started! ${fanVotes.toLocaleString()} votes from loyal fans added to the pool.`;
        setIsElectionSingleFinished(false); // Reset the flag
        setMessage(successMessage);
        addNotification({ type: 'Election', message: successMessage });
    };

    const createElectionPoster = (memberId) => {
    if (!isCampaignActive) {
        return setMessage("There is no active election campaign.");
    }
    const cost = 5000;
    if (money < cost) {
        return setMessage(`Need ¥${cost.toLocaleString()} to create a poster.`);
    }
    const member = getMemberById(memberId);
    if (!member) return;

    setMoney(prev => prev - cost);

    const hypeGain = 10 + Math.floor((member.visual || 0) / 10); // Hype gain based on visual
    updateMemberState(memberId, m => ({
        ...m,
        electionHype: (m.electionHype || 0) + hypeGain
    }));

    const posterMessage = `An election poster was created for ${member.name}, generating +${hypeGain} hype!`;
    setMessage(posterMessage);
    addNotification({ type: 'Election', message: posterMessage });
};

    const createElectionPosterForAll = () => {
        if (!isCampaignActive) {
            return setMessage("There is no active election campaign.");
        }
        
        const posterCostPerMember = 5000;
        const availableMembers = getAllAvailableMembers(true);
        const totalCost = availableMembers.length * posterCostPerMember;

        if (availableMembers.length === 0) {
            return setMessage("No members are available to create posters for.");
        }
        if (money < totalCost) {
            return setMessage(`Need ¥${totalCost.toLocaleString()} to create posters for all ${availableMembers.length} available members.`);
        }

        setMoney(prev => prev - totalCost);

        let totalHypeGained = 0;
        availableMembers.forEach(member => {
            const hypeGain = 10 + Math.floor((member.visual || 0) / 10);
            totalHypeGained += hypeGain;
            updateMemberState(member.rosterId || member.id, m => ({
                ...m,
                electionHype: (m.electionHype || 0) + hypeGain
            }));
        });

        const successMessage = `Posters created for all ${availableMembers.length} members for ¥${totalCost.toLocaleString()}. Total Hype Gained: ${totalHypeGained}.`;
        setMessage(successMessage);
        addNotification({ type: 'Election', message: successMessage });
    };

            const createAppealVideoForAll = () => {
            if (!isCampaignActive) {
                return setMessage("There is no active election campaign.");
            }
            
            const videoCostPerMember = 20000;
            const availableMembers = getAllAvailableMembers(true);
            const totalCost = availableMembers.length * videoCostPerMember;

            if (availableMembers.length === 0) {
                return setMessage("No members are available to create videos for.");
            }
            if (money < totalCost) {
                return setMessage(`Need ¥${totalCost.toLocaleString()} to create appeal videos for all ${availableMembers.length} available members.`);
            }

            setMoney(prev => prev - totalCost);

            let totalHypeGained = 0;
            availableMembers.forEach(member => {
                const hypeGain = 25 + Math.floor((member.charisma || 0) / 4);
                totalHypeGained += hypeGain;
                updateMemberState(member.rosterId || member.id, m => ({
                    ...m,
                    electionHype: (m.electionHype || 0) + hypeGain
                }));
            });

            const successMessage = `Appeal videos produced for all ${availableMembers.length} members for ¥${totalCost.toLocaleString()}. Total Hype Gained: ${totalHypeGained}.`;
            setMessage(successMessage);
            addNotification({ type: 'Election', message: successMessage });
        };


const holdElection = () => {
  if (money < 5000) return setMessage('Elections cost ¥5,000!');

  const allMembers = getMainGroupRoster();
  const participatingMembers = [];
  const nonParticipatingMembers = [];
  const sixMonthsInWeeks = 24; // 6 months * 4 weeks

  allMembers.forEach(member => {
    // Members who have a set graduation date within the next 6 months
    if (member.isGraduating && (member.graduationWeek - week) <= sixMonthsInWeeks) {
        nonParticipatingMembers.push({ member, reason: `Graduating in ${member.graduationWeek - week} weeks` });
    } 
    // NEW: Exclude members with high graduation urgency
    else if ((member.graduationUrgency || 0) > 85) {
        nonParticipatingMembers.push({ member, reason: 'At Risk of Graduation' });
    }
    // Members on other assignments (e.g., training camp)
    else if (!member.isAvailable) {
        nonParticipatingMembers.push({ member, reason: 'On Assignment' });
    } 
    // Members who are mentally unfit for the competition
    else if (member.stress > 80) {
        nonParticipatingMembers.push({ member, reason: 'High Stress' });
    } 
    else if (member.morale < 20) {
        nonParticipatingMembers.push({ member, reason: 'Low Morale' });
    } 
    // Everyone else participates
    else {
        participatingMembers.push(member);
    }
  });
  
  setModalData({
    participating: participatingMembers,
    nonParticipating: nonParticipatingMembers,
    onConfirm: () => runElectionLogic(participatingMembers) // This function will be called by the modal
  });
  setShowModal('electionSummary');
};

const runElectionLogic = (participants) => {
    if (money < 5000) return;
    setMoney(prev => prev - 5000);

    const previousRankMap = new Map(participants.map(m => [m.rosterId || m.id, m.rank || 999]));
    const totalFanWeight = participants.reduce((sum, member) => {
        return sum + ((member.fans?.hardcore || 0) * 3) + (member.fans?.casual || 0);
    }, 1);

    const universallySortedMembers = [...participants].map((member, index) => {
        const memberFanWeight = ((member.fans?.hardcore || 0) * 3) + (member.fans?.casual || 0);
        const voteShare = memberFanWeight / totalFanWeight;
        const baseVotes = Math.floor(voteShare * electionVotePool);
        const hypeMultiplier = 1 + ((member.electionHype || 0) / 100.0);
        const randomFactor = 0.8 + (Math.random() * 0.4);
        const finalVotes = Math.floor(baseVotes * hypeMultiplier * randomFactor);
        return { ...member, votes: finalVotes, chemistry: member.chemistry || {} }; // Ensure chemistry object exists
    }).sort((a, b) => b.votes - a.votes)
    .map((member, index) => {
        const newRank = index + 1;
        const oldRank = previousRankMap.get(member.rosterId || member.id);
        let speechType;

        if (newRank === 1) speechType = 'center';
        else if (oldRank === undefined || oldRank === 999) speechType = 'newRank';
        else if (newRank < oldRank) speechType = 'rankUp';
        else if (newRank > oldRank) speechType = 'rankDown';
        else speechType = 'holdRank';

        const speeches = electionSpeechTemplates[speechType];
        const speech = speeches[Math.floor(Math.random() * speeches.length)];

        return { ...member, rank: newRank, previousRank: oldRank, speech: speech };
    });

    const getUnitNameFromRank = (rank) => {
        if (rank === 1) return "Center";
        if (rank <= 7) return "Kami 7";
        if (rank <= 16) return "Senbatsu";
        if (rank <= 32) return "Undergirls";
        if (rank <= 48) return "Next Girls";
        if (rank <= 64) return "Future Girls";
        if (rank <= 80) return "Upcoming Girls";
        return "Unranked";
    };

    const relationshipNotifications = [];

    universallySortedMembers.forEach((memberA, i) => {
        const memberA_id = String(memberA.rosterId || memberA.id);
    
        for (let j = i + 1; j < universallySortedMembers.length; j++) {
            const memberB = universallySortedMembers[j];
            const memberB_id = String(memberB.rosterId || memberB.id);
    
            if (memberA.chemistry[memberB_id] === undefined) memberA.chemistry[memberB_id] = 0;
            if (memberB.chemistry[memberA_id] === undefined) memberB.chemistry[memberA_id] = 0;
    
            const unitA = getUnitNameFromRank(i + 1);
            const unitB = getUnitNameFromRank(j + 1);
            let chemistryChange = 0;
    
            if (unitA !== 'Unranked' && unitA === unitB) {
                chemistryChange += 2;
            }
    
            if (Math.abs(memberA.rank - memberB.rank) <= 2) {
                 if (Math.random() < 0.15 && memberA.chemistry[memberB_id] > -50) { // Don't worsen already terrible relationships
                    chemistryChange -= 5;
                    relationshipNotifications.push(`A new rivalry has formed between ${memberA.name} and ${memberB.name} over the election results!`);
                 }
            }
    
            memberA.chemistry[memberB_id] = Math.max(-100, Math.min(100, memberA.chemistry[memberB_id] + chemistryChange));
            memberB.chemistry[memberA_id] = Math.max(-100, Math.min(100, memberB.chemistry[memberA_id] + chemistryChange));
        }
    });

    const resultMap = new Map(universallySortedMembers.map((member, index) => {
        const id = String(member.rosterId || member.id);
        const newRank = index + 1;
        const oldRank = member.previousRank;

        let moraleChange = 0;
        let stressChange = 0;

        if (oldRank === undefined || oldRank === 999) { moraleChange = 25; stressChange = -10; }
        else if (newRank < oldRank) { moraleChange = 15; stressChange = -5; }
        else if (newRank > oldRank) { moraleChange = -20; stressChange = 15; }
        else { moraleChange = 5; }

        if (newRank === 1) { stressChange += 25; moraleChange += 15; }

        return [id, { newRank, moraleChange, stressChange, newChemistry: member.chemistry }];
    }));

    const updateMemberWithResults = (member, isSister = false, sgId = null) => {
        const memberId = isSister ? `sg-${sgId}-${member.id}` : String(member.id);
        const result = resultMap.get(memberId);

        if (result) {
            const { newRank, moraleChange, stressChange, newChemistry } = result;
            const unitName = getUnitNameFromRank(newRank);
            const newHistoryEntry = { week: week, rank: newRank, unit: unitName, year: Math.floor(week / 52) + 1 };
            
            let newPosition;
            if (newRank === 1) newPosition = 'center'; else if (newRank <= 7) newPosition = 'front'; else if (newRank <= 16) newPosition = 'back'; else newPosition = 'under';

            return {
                ...member,
                rank: newRank,
                position: isSister ? member.position : newPosition,
                electionHistory: [...(member.electionHistory || []), newHistoryEntry],
                morale: Math.max(0, Math.min(100, (member.morale || 80) + moraleChange)),
                stress: Math.max(0, Math.min(100, (member.stress || 0) + stressChange)),
                isCurrentCenter: newRank === 1,
                chemistry: newChemistry,
            };
        } else {
            return { 
                ...member, 
                rank: 999, 
                position: 'under', 
                isCurrentCenter: false, 
                morale: Math.max(0, (member.morale || 80) - 5) 
            };
        }
    };

    setMembers(prev => prev.map(m => updateMemberWithResults(m, false)));
    setSisterGroups(prev => prev.map(sg => ({
        ...sg,
        members: (sg.members || []).map(m => updateMemberWithResults(m, true, sg.id))
    })));

    setModalData({
        rankedMembers: universallySortedMembers,
        electionYear: Math.floor(week / 52) + 1,
    });
    setShowModal('electionResult');

    const successMessage = `General Election held! New center: ${universallySortedMembers[0]?.name || 'Unknown'}.`;
    setMessage(successMessage);
    addNotification({ type: 'Election', message: successMessage });
    relationshipNotifications.forEach(notif => addNotification({ type: 'Group', message: notif }));
    setElectionVotePool(0);
    setLastElectionResult(universallySortedMembers);
    setElectionHistory(prev => [...prev, { week: week, results: universallySortedMembers }]);
};

const createSong = () => {
        setModalData({ 
            targetGroupId: 'main', 
            songs: songs, 
            sisterGroups: sisterGroups 
        }); 
        setShowModal('createSong');
        };
    
    const createCustomSetlist = () => {
      setShowModal('customSetlist');
    };

    const confirmCreateSetlist = (setlistData) => {
        const { name, theme, cost, tracks } = setlistData; // 'tracks' is now the complex tracklist array

        // 1. Final check on funds
        if (money < cost) {
            return setMessage(`Not enough money to produce this setlist. Need ¥${cost.toLocaleString()}.`);
        }

        // 2. Deduct Money
        setMoney(prev => prev - cost);

        // 3. Process the tracklist: create new songs, identify reused songs
        let lastSongId = theaterSongs.length > 0 ? Math.max(0, ...theaterSongs.map(s => s.id)) : 0;
        const setlistId = allSetlists.length > 0 ? Math.max(0, ...allSetlists.map(sl => sl.id)) : 0;
        const newSetlistId = setlistId + 1;
        
        const newlyCreatedSongs = [];
        const finalTrackIds = [];

        tracks.forEach(track => {
            if (track.origin === 'new') {
                // This is a new song. Create it and add it to our list of songs to be saved.
                    lastSongId++;
                    const songName = track.name.trim() === '' ? generateRandomTheaterSongName() : track.name;
                    const newSong = {
                        id: lastSongId,
                        name: songName,
                    type: track.type,
                    originalSetlistId: newSetlistId,
                    popularity: 1.0,
                };
                newlyCreatedSongs.push(newSong);
                finalTrackIds.push(newSong.id); // Add the brand new ID to the setlist's track array
            } else {
                // This is a reused song from the library. Just add its existing ID.
                finalTrackIds.push(track.id);
            }
        });

        // Add all newly composed songs to the main theaterSongs library at once.
        if (newlyCreatedSongs.length > 0) {
            setTheaterSongs(prev => [...prev, ...newlyCreatedSongs]);
        }

        // 4. Create the final setlist object
        const newSetlist = {
            id: newSetlistId,
            name: name,
            theme: theme,
            tracks: finalTrackIds,
            cost: cost,
            isCustom: true,
            difficulty: 50 + (tracks.length * 15), 
            creationWeek: week, // Add this
            usageHistory: [],   // And this
        };

        // 5. Add the new setlist to the game's master list
        setAllSetlists(prev => [...prev, newSetlist]);
        
        // 6. Confirmation and close modal
        setShowModal(null);
        const newSongsCount = newlyCreatedSongs.length;
        const reusedSongsCount = tracks.length - newSongsCount;
        setMessage(`Successfully produced setlist "${name}" for ¥${cost.toLocaleString()}!`);
        addNotification({ type: 'Production', message: `Setlist "${name}" created with ${newSongsCount} new and ${reusedSongsCount} reused songs.` });
    };

    const scheduleNewSingle = ({ songData, productionData, releaseWeek, physicalVersions }) => {
        const baseCostPerVersion = 100000;
        const productionTierCost = Object.keys(productionData).reduce((total, key) => {
            const choice = productionData[key];
            const tiers = { training: { standard: { cost: 0 }, workshop: { cost: 50000 }, overseas: { cost: 250000 }, bootcamp: { cost: 400000 }, elite: { cost: 650000 }, oneOnOne: { cost: 900000 } }, song: { inHouse: { cost: 0 }, rookie: { cost: 50000 }, external: { cost: 100000 }, trend: { cost: 180000 }, famous: { cost: 400000 }, hitmaker: { cost: 750000 } }, mv: { none: { cost: 0 }, practice: { cost: 20000 }, performance: { cost: 60000 }, location: { cost: 150000 }, storyline: { cost: 300000 }, cinematic: { cost: 600000 }, blockbuster: { cost: 1000000 } }, outfits: { existing: { cost: 0 }, recolor: { cost: 40000 }, custom: { cost: 120000 }, concept: { cost: 200000 }, luxury: { cost: 450000 } }, promo: { none: { cost: 0 }, social: { cost: 30000 }, teaser: { cost: 60000 }, variety: { cost: 120000 }, blitz: { cost: 200000 }, global: { cost: 400000 } } };
            return total + (tiers[key]?.[choice]?.cost || 0);
        }, 10000);
        
        const physicalCost = songData.releaseFormat === 'physical' ? baseCostPerVersion * physicalVersions : 0;
        const totalCost = productionTierCost + physicalCost;

        if (money < totalCost) {
            setMessage("Not enough money for this production!");
            return;
        }
        setMoney(prev => prev - totalCost);

        const timeline = [];
        const weeksBefore = releaseWeek - week;
        if (productionData.training !== 'standard') timeline.push({ week: week + Math.max(1, Math.floor(weeksBefore * 0.2)), message: `Special training for "${songData.name}" has begun!` });
        if (productionData.promo !== 'none') timeline.push({ week: releaseWeek - 1, message: `Promotions for "${songData.name}" have begun!` });

        const newScheduledRelease = {
            type: 'single',
            songData,
            productionData,
            releaseWeek,
            physicalVersions, // <-- THE CRUCIAL ADDITION
            timeline,
        };

    // --- Graduation Urgency on Failure (Being Left Out) ---
    const allParticipatingIds = new Set(songData.tracks.flatMap(t => (t.members || []).map(m => String(m.id))));

    // Get all members who could have participated in this single's group
    const potentialParticipants = getAllAvailableMembers(true).filter(m => {
        if (songData.targetGroup === 'main') {
            return m.homeGroup === 'main' || (m.kenninGroups || []).includes(groupName);
        } else {
            const sg = sisterGroups.find(g => g.name === songData.targetGroup);
            if (!sg) return false;
            return m.homeGroup === sg.name || (m.kenninGroups || []).includes(sg.name);
        }
    });

    const unselectedMembers = potentialParticipants.filter(m => !allParticipatingIds.has(String(m.rosterId || m.id)));

    unselectedMembers.forEach(member => {
        // Increase urgency for being left out, with a larger penalty for certain ambitions
        let urgencyIncrease = 3;
        if (member.ambition === 'Prove My Worth') {
            urgencyIncrease = 10; // Much higher penalty for being ignored
        }
        updateMemberState(member.rosterId || member.id, m => ({
            ...m,
            graduationUrgency: Math.min(100, (m.graduationUrgency || 0) + urgencyIncrease)
        }));
    });
    // ---


        setScheduledSingles(prev => [...prev, newScheduledRelease]);
        setShowModal(null);
        setMessage(`Production for "${songData.name}" scheduled for Week ${releaseWeek}! Cost: ¥${totalCost.toLocaleString()}`);
    };

    const scheduleNewAlbum = ({ albumData, productionData, releaseWeek }) => {
        
    const productionTierCost = Object.keys(productionData).reduce((total, key) => {
        const choice = productionData[key];
        const tiers = { training: { standard: { cost: 0 }, workshop: { cost: 50000 }, overseas: { cost: 250000 }, bootcamp: { cost: 400000 }, elite: { cost: 650000 }, oneOnOne: { cost: 900000 } }, song: { inHouse: { cost: 0 }, rookie: { cost: 50000 }, external: { cost: 100000 }, trend: { cost: 180000 }, famous: { cost: 400000 }, hitmaker: { cost: 750000 } }, mv: { none: { cost: 0 }, practice: { cost: 20000 }, performance: { cost: 60000 }, location: { cost: 150000 }, storyline: { cost: 300000 }, cinematic: { cost: 600000 }, blockbuster: { cost: 1000000 } }, outfits: { existing: { cost: 0 }, recolor: { cost: 40000 }, custom: { cost: 120000 }, concept: { cost: 200000 }, luxury: { cost: 450000 } }, promo: { none: { cost: 0 }, social: { cost: 30000 }, teaser: { cost: 60000 }, variety: { cost: 120000 }, blitz: { cost: 200000 }, global: { cost: 400000 } } };
        return total + (tiers[key]?.[choice]?.cost || 0);
    }, 10000);

    const totalCost = productionTierCost + baseCostAlbum + (albumData.releaseFormat === 'physical' ? albumPhysicalSurcharge : 0);

    if (money < totalCost) {
        setMessage("Not enough money for this album production!");
        return;
    }
    setMoney(prev => prev - totalCost);

    const timeline = [];
    const weeksBefore = releaseWeek - week;
    if (productionData.training !== 'standard') timeline.push({ week: week + Math.max(1, Math.floor(weeksBefore * 0.2)), message: `Special training for album "${albumData.name}" has begun!` });
    if (productionData.promo !== 'none') timeline.push({ week: releaseWeek - 1, message: `Promotions for album "${albumData.name}" have begun!` });

    const newScheduledRelease = {
        type: 'album',
        albumData,
        productionData,
        releaseWeek,
        timeline,
    };

    setScheduledSingles(prev => [...prev, newScheduledRelease]);
    setShowModal(null);
    setMessage(`Production for album "${albumData.name}" scheduled for Week ${releaseWeek}! Cost: ¥${totalCost.toLocaleString()}`);
};


    const executeSongRelease = (singleToRelease, initialMembers, initialSisterGroups, initialSongs) => {
        if (!singleToRelease || !singleToRelease.songData || !singleToRelease.songData.tracks) {
            console.error("Cancelling release of malformed single:", singleToRelease);
            addNotification({ type: 'alert', message: 'A corrupted single release was detected and automatically cancelled.' });
            return { updatedMembers: initialMembers, updatedSisterGroups: initialSisterGroups, releaseMessage: null };
        }
        let updatedMembers = initialMembers;
        let updatedSisterGroups = initialSisterGroups;

        const localUpdateMemberState = (memberId, updateFn) => {
            if (!String(memberId).startsWith('sg-')) {
                const memberIndex = updatedMembers.findIndex(m => String(m.id) === String(memberId));
                if (memberIndex > -1) updatedMembers[memberIndex] = updateFn(updatedMembers[memberIndex]);
            } else {
                const [, sgId, mId] = String(memberId).split('-');
                const sgIndex = updatedSisterGroups.findIndex(g => String(g.id) === sgId);
                if (sgIndex > -1) {
                    const memberIndex = (updatedSisterGroups[sgIndex].members || []).findIndex(m => String(m.id) === mId);
                    if (memberIndex > -1) updatedSisterGroups[sgIndex].members[memberIndex] = updateFn(updatedSisterGroups[sgIndex].members[memberIndex]);
                }
            }
        };

        const { songData, productionData } = singleToRelease;
        const titleTrack = songData.tracks.find(t => t.type === 'title');
        if (!titleTrack) return { updatedMembers, updatedSisterGroups, releaseMessage: null };

        const fullRoster = [...updatedMembers.map(m => ({ ...m, rosterId: m.id, isSisterMember: false, displayGroupName: groupName })), ...updatedSisterGroups.flatMap(sg => (sg.members || []).map(m => ({ ...m, rosterId: `sg-${sg.id}-${m.id}`, isSisterMember: true, displayGroupName: sg.name, groupId: sg.id })))];
        const senbatsuMemberIds = (titleTrack.members || []).map(m => String(m.id));
        const senbatsuWithBonuses = fullRoster.filter(member => senbatsuMemberIds.includes(String(member.rosterId))).map(member => {
            const trainingBuff = { standard: 0, workshop: 5, overseas: 15, bootcamp: 20, elite: 25, oneOnOne: 30 }[productionData.training] || 0;
            const moraleBuff = ['custom', 'concept', 'luxury'].includes(productionData.outfits) ? 10 : 0;
            return { ...member, singing: Math.min(100, (member.singing || 0) + trainingBuff), dancing: Math.min(100, (member.dancing || 0) + trainingBuff), morale: Math.min(100, (member.morale || 0) + moraleBuff) };
        });

        const fanSales = senbatsuWithBonuses.reduce((sum, m) => sum + ((m.fans?.hardcore || 0) * 0.9) + ((m.fans?.casual || 0) * 0.4), 0);
        const avgSkill = senbatsuWithBonuses.reduce((sum, m) => sum + (((m.singing || 0) * 0.30) + ((m.dancing || 0) * 0.30) + ((m.visual || 0) * 0.20) + ((m.variety || 0) * 0.067) + ((m.charisma || 0) * 0.067) + ((m.intelligence || 0) * 0.066)), 0) / (senbatsuWithBonuses.length || 1);
        const skillPower = avgSkill * 20;

        let formatBonus = 1.0;
        if (songData.releaseFormat === 'physical') {
            formatBonus += 0.10;
            const physicalVersionsCount = singleToRelease.physicalVersions || 1;
            if (physicalVersionsCount > 1) {
                formatBonus += (physicalVersionsCount - 1) * 0.05;
            }
        }
        const baseSalesPotential = ((fanSales * 0.9) + (skillPower * 0.1)) * formatBonus;

        const newFansTotal = Math.floor(100 + (baseSalesPotential / 20 * (fanMultipliers[productionData.mv] || 1) * (promoMultipliers[productionData.promo] || 1)));

        const calculateFanDistribution = (track, fanPool, memberRoster, pushedMembersList) => {
            if (!track || !track.members || track.members.length === 0 || fanPool === 0) return {};
            const trackMemberIds = track.members.map(m => String(m.id));
            const trackMembers = memberRoster.filter(m => trackMemberIds.includes(String(m.rosterId)));
            const rowWeights = { '1st Row': 5, '2nd Row': 4, '3rd Row': 3, '4th Row': 2, '5th Row': 1 };
            const luckModifiers = trackMembers.map(() => 0.7 + (Math.random() * 0.6));
            const memberWeights = trackMembers.map((member, index) => {
                const isPushed = pushedMembersList.map(String).includes(String(member.rosterId));
                const isCenter = (track.center || []).includes(String(member.rosterId));
                const row = track.lineup[String(member.rosterId)];
                let weight = rowWeights[row] || 1;
                if (isCenter) weight = 7;
                if (isPushed) weight *= 2;
                return { id: String(member.rosterId), weight: weight * luckModifiers[index] };
            });
            const totalWeight = memberWeights.reduce((sum, member) => sum + member.weight, 0);
            const gains = {};
            let distributedFans = 0;
            if (totalWeight > 0) {
                memberWeights.forEach(({ id, weight }) => {
                    const gain = Math.floor((weight / totalWeight) * fanPool);
                    gains[id] = gain;
                    distributedFans += gain;
                });
            }
            const remainder = fanPool - distributedFans;
            if (remainder > 0 && track.center && track.center.length > 0) {
                const remainderPerCenter = Math.floor(remainder / track.center.length);
                track.center.forEach(centerId => {
                    gains[String(centerId)] = (gains[String(centerId)] || 0) + remainderPerCenter;
                });
                const finalRemainder = remainder % track.center.length;
                if (finalRemainder > 0) {
                    gains[String(track.center[0])] = (gains[String(track.center[0])] || 0) + finalRemainder;
                }
            }
            return gains;
        };

        const titleTrackFans = Math.floor(newFansTotal * 0.6);
        const bSideFansTotal = newFansTotal - titleTrackFans;
        const bSideTracks = songData.tracks.filter(t => t.type === 'b-side');
        const titleTrackGains = calculateFanDistribution(titleTrack, titleTrackFans, fullRoster, pushedMembers);
        const finalFanGains = { ...titleTrackGains };

        if (bSideTracks.length > 0 && bSideFansTotal > 0) {
            const fansPerBSide = Math.floor(bSideFansTotal / bSideTracks.length);
            bSideTracks.forEach(bSideTrack => {
                const bSideTrackGains = calculateFanDistribution(bSideTrack, fansPerBSide, fullRoster, pushedMembers);
                for (const memberId in bSideTrackGains) {
                    finalFanGains[memberId] = (finalFanGains[memberId] || 0) + bSideTrackGains[memberId];
                }
            });
        }
        
        // --- TRIVIA GENERATION ---
        const triviaItems = [];
        const formatNames = (nameArray) => {
            if (nameArray.length === 0) return '';
            if (nameArray.length === 1) return nameArray[0];
            if (nameArray.length === 2) return nameArray.join(' and ');
            return nameArray.slice(0, -1).join(', ') + ', and ' + nameArray.slice(-1);
        };
        
        const releasingGroupNameForTrivia = songData.targetGroup === 'main' ? groupName : (initialSisterGroups.find(g => g.name === songData.targetGroup)?.name || songData.targetGroup);
        const allParticipatingMembers = [...new Set(songData.tracks.flatMap(t => (t.members || []).map(m => m.id)))].map(id => getMemberById(id)).filter(Boolean);

        const firstTimeParticipationThisGroup = allParticipatingMembers.filter(m => {
            const participationsForThisGroup = (m.singlesParticipation || []).filter(p => p.group === releasingGroupNameForTrivia);
            return participationsForThisGroup.length === 0;
        });
        if (firstTimeParticipationThisGroup.length > 0) {
            triviaItems.push(`First Time ${releasingGroupNameForTrivia} Single Participation of ${formatNames(firstTimeParticipationThisGroup.map(m => m.name))}.`);
        }

        if (titleTrack) {
            const senbatsuMembers = (titleTrack.members || []).map(m => getMemberById(m.id)).filter(Boolean);
            
            const firstTimeSenbatsuThisGroup = senbatsuMembers.filter(m => {
                const senbatsuHistoryForThisGroup = (m.singlesParticipation || []).filter(p => p.isTitleTrackSenbatsu && p.group === releasingGroupNameForTrivia);
                return senbatsuHistoryForThisGroup.length === 0;
            });
            if (firstTimeSenbatsuThisGroup.length > 0) {
                triviaItems.push(`First Time ${releasingGroupNameForTrivia} Senbatsu of ${formatNames(firstTimeSenbatsuThisGroup.map(m => m.name))}.`);
            }

            if (titleTrack.center && titleTrack.center.length > 0) {
                const centerMembers = titleTrack.center.map(id => getMemberById(id)).filter(Boolean);
                const firstTimeACenters = centerMembers.filter(m => (m.centerHistory || []).filter(h => h.type === 'title').length === 0);
                if (firstTimeACenters.length > 0) {
                    triviaItems.push(`First A-Side Single Center of ${formatNames(firstTimeACenters.map(m => m.name))}.`);
                }
            }

            const songListOfGroup = releasingGroupNameForTrivia === groupName ? initialSongs : (initialSisterGroups.find(sg => sg.name === releasingGroupNameForTrivia)?.songs || []);
            const previousSingle = songListOfGroup.filter(s => s.type === 'single' && s.releaseWeek < week).sort((a,b) => b.releaseWeek - a.releaseWeek)[0];

            if (previousSingle) {
                const prevTitleTrack = previousSingle.tracks.find(t => t.type === 'title');
                if (prevTitleTrack) {
                    const prevSenbatsuIds = (prevTitleTrack.members || []).map(m => String(m.id));
                    const currentSenbatsuIds = (titleTrack.members || []).map(m => String(m.id));
                    const droppedMemberIds = prevSenbatsuIds.filter(id => !currentSenbatsuIds.includes(id));
                    
                    if (droppedMemberIds.length > 0) {
                        const droppedMemberNames = droppedMemberIds.map(id => {
                            const member = getMemberById(id);
                            return member ? member.name : '';
                        }).filter(Boolean);
                        
                        if (droppedMemberNames.length > 0) {
                            triviaItems.push(`Dropped from Senbatsu: ${formatNames(droppedMemberNames)}.`);
                        }
                    }
                }
            }
        }
        
        const firstTimeBSideCenters = bSideTracks.flatMap(track => (track.center || []))
            .map(id => getMemberById(id))
            .filter(member => member && (member.centerHistory || []).filter(h => h.type === 'b-side').length === 0);
            
        if (firstTimeBSideCenters.length > 0) {
            const uniqueNames = [...new Set(firstTimeBSideCenters.map(m => m.name))];
            triviaItems.push(`First B-Side Center of ${formatNames(uniqueNames)}.`);
        }

        if (songData.isGraduationSingle && titleTrack.center && titleTrack.center.length > 0) {
            const gradMember = getMemberById(titleTrack.center[0]);
            if (gradMember) {
                triviaItems.push(`Final Single Participation of ${gradMember.name}.`);
                triviaItems.push(`Last Senbatsu of ${gradMember.name}.`);
                triviaItems.push(`Final A-Side Center of ${gradMember.name}.`);
            }
        }

        const newSong = {
            id: Date.now(),
            name: songData.name,
            type: 'single',
            isGraduationSingle: songData.isGraduationSingle,
            isElectionSingle: songData.isElectionSingle,
            releaseFormat: songData.releaseFormat,
            tracks: songData.tracks,
            baseSalesPotential: baseSalesPotential,
            weeklySales: [],
            chartWeeksLeft: 8,
            hasVideo: productionData.mv !== 'none',
            targetGroup: songData.targetGroup,
            releaseWeek: week,
            totalTracks: songData.tracks.length,
            salesHistory: [],
            production: productionData,
            trivia: triviaItems
        };

        const allMembersToUpdateIds = Object.keys(finalFanGains);
        allMembersToUpdateIds.forEach(memberId => {
            const fanGainForMember = finalFanGains[memberId] || 0;
            if (fanGainForMember === 0) return;
            const hardcoreGain = Math.floor(fanGainForMember * 0.15);
            const casualGain = fanGainForMember - hardcoreGain;
            localUpdateMemberState(memberId, m => ({ ...m, fans: { hardcore: (m.fans?.hardcore || 0) + hardcoreGain, casual: (m.fans?.casual || 0) + casualGain } }));
        });

        const allParticipatingIds = [...new Set(songData.tracks.flatMap(t => (t.members || []).map(m => String(m.id))))];
        const releasingGroupName = songData.targetGroup === 'main' ? groupName : (initialSisterGroups.find(g => g.name === songData.targetGroup)?.name || 'Unknown Group');

        allParticipatingIds.forEach(memberId => {
            const participatedTracks = songData.tracks.filter(track => (track.members || []).map(mem => String(mem.id)).includes(memberId));
            if (participatedTracks.length === 0) return;

            const titleTrackForHistory = songData.tracks.find(t => t.type === 'title');
            const isTitleSenbatsu = titleTrackForHistory ? (titleTrackForHistory.members || []).map(mem => String(mem.id)).includes(memberId) : false;
            const isTitleCenter = titleTrackForHistory ? (titleTrackForHistory.center || []).includes(memberId) : false;

            const newCenterEntries = participatedTracks
                .filter(track => (track.center || []).includes(memberId))
                .map(track => ({
                    week: week,
                    singleName: songData.name,
                    songName: track.name,
                    group: releasingGroupName,
                    type: track.type
                }));

            localUpdateMemberState(memberId, m => {
                let newAmbition = m.ambition;
                if (isTitleCenter && m.ambition === 'The Unwilling Idol') {
                    newAmbition = 'Pursue a Solo Dream';
                    addNotification({ type: 'Group', message: `After being pushed to Center for \\"${songData.name}\\", a fire has been lit in ${m.name}! Their ambition has changed.` });
                }

                return {
                    ...m,
                    singlesParticipation: [...(m.singlesParticipation || []), { singleId: newSong.id, singleName: songData.name, tracks: participatedTracks.map(t => t.name), week: week, isCenter: isTitleCenter, isTitleTrackSenbatsu: isTitleSenbatsu, group: releasingGroupName }],
                    songsParticipation: [...(m.songsParticipation || []), ...participatedTracks.map(t => ({ songName: t.name, singleName: songData.name, week: week, type: t.type, isCenter: (t.center || []).includes(memberId), group: releasingGroupName, row: t.lineup[memberId] }))],
                    centerHistory: [...(m.centerHistory || []), ...newCenterEntries],
                    ambition: newAmbition,
                };
            });
        });
        
        const sgIndex = updatedSisterGroups.findIndex(sg => sg.name === newSong.targetGroup);
        if (sgIndex > -1) {
            updatedSisterGroups[sgIndex].songs = [...(updatedSisterGroups[sgIndex].songs || []), newSong];
        }
        
        const releaseMessage = `RELEASED: \"${songData.name}\"! It will begin charting next week. Initial Hype: +${newFansTotal.toLocaleString()} fans.`;
        addNotification({ type: 'success', message: releaseMessage });
        
        return { updatedMembers, updatedSisterGroups, releaseMessage, newSong };
    };
    
    // --- Performance Management Logic ---

    const holdMajorConcert = (venue, setlist, selectedMemberIds, targetGroup, details, prices) => {
        if (!setlist) return setMessage("A setlist is required.");
        if (selectedMemberIds.length === 0) return setMessage("Must select at least one member to perform.");
        
        const performingMembers = selectedMemberIds.map(getMemberById).filter(m => m && m.isAvailable);
        if (performingMembers.length === 0) return setMessage("No selected members are available to perform.");

        const baseCost = venue.cost + venue.maintenance;
        if (money < baseCost) return setMessage(`Insufficient funds! Concert costs ¥${baseCost.toLocaleString()}.`);

        // --- UPDATED: Calculate Individual Averages for Modal ---
        const memberCount = performingMembers.length || 1;
        const avgSinging = performingMembers.reduce((s, m) => s + (m.singing || 0), 0) / memberCount;
        const avgDancing = performingMembers.reduce((s, m) => s + (m.dancing || 0), 0) / memberCount;
        const avgVisual = performingMembers.reduce((s, m) => s + (m.visual || 0), 0) / memberCount;
        const avgCharisma = performingMembers.reduce((s, m) => s + (m.charisma || 0), 0) / memberCount;
        const avgSkill = (avgSinging * 0.3 + avgDancing * 0.4 + avgVisual * 0.2 + avgCharisma * 0.1) / 100;
        // --- END UPDATED ---

        const standardPrices = {
            s: 6000 + Math.floor(venue.capacity / 10),
            a: 4000 + Math.floor(venue.capacity / 20),
            b: 2500 + Math.floor(venue.capacity / 30)
        };

        const priceModifiers = {
            s: prices.s / standardPrices.s,
            a: prices.a / standardPrices.a,
            b: prices.b / standardPrices.b
        };
        
        const getDemandMod = (mod) => {
            if (mod > 3) return 0;
            if (mod <= 0) return 2;
            return 1 / (mod * mod); 
        };

        const zoneCapacity = {
            s: Math.floor(venue.capacity * 0.1),
            a: Math.floor(venue.capacity * 0.3),
            b: venue.capacity - Math.floor(venue.capacity * 0.1) - Math.floor(venue.capacity * 0.3)
        };

        const baseFanDemand = Math.log10((totalFans || 0) + 1) * 25000; // Logarithmic scaling
        const hypeMultiplier = 1 + avgSkill;
        let potentialAttendance = baseFanDemand * hypeMultiplier;
        
        let ticketsSold = { s: 0, a: 0, b: 0 };

        const sDemand = potentialAttendance * getDemandMod(priceModifiers.s);
        ticketsSold.s = Math.min(zoneCapacity.s, Math.floor(sDemand));
        potentialAttendance -= ticketsSold.s;

        const aDemand = potentialAttendance * getDemandMod(priceModifiers.a);
        ticketsSold.a = Math.min(zoneCapacity.a, Math.floor(aDemand));
        potentialAttendance -= ticketsSold.a;

        const bDemand = potentialAttendance * getDemandMod(priceModifiers.b);
        ticketsSold.b = Math.min(zoneCapacity.b, Math.floor(bDemand));

        const totalTicketsSold = ticketsSold.s + ticketsSold.a + ticketsSold.b;
        const ticketRevenue = (ticketsSold.s * prices.s) + (ticketsSold.a * prices.a) + (ticketsSold.b * prices.b);
        // --- Event Merch Sales Logic ---
        let salesData = {};
        let eventMerchRevenue = 0;
        Object.keys(eventMerchInventory).forEach(itemType => {
            const tierInfo = eventMerchTiers[itemType];
            const stock = eventMerchInventory[itemType];
            if (tierInfo && stock > 0) {
                // High demand at concerts! Sell to a large portion of attendees.
                const demand = Math.floor(totalTicketsSold * (0.4 + Math.random() * 0.3)); // 40-70% of attendees want to buy
                const toSell = Math.min(stock, demand);
                eventMerchRevenue += toSell * tierInfo.price;
                salesData[tierInfo.name] = (salesData[tierInfo.name] || 0) + toSell;

                if (stock > 0 && toSell >= stock) {
                    addNotification({ type: 'Info', message: `Limited Edition: ${tierInfo.name} has sold out!` });
                }

            }
        });
        const bestSeller = Object.entries(salesData).reduce((best, current) => {
            return current[1] > best.quantity ? { name: current[0], quantity: current[1] } : best;
        }, { name: 'None', quantity: 0 });

        // Add a notification for the revenue
        if (eventMerchRevenue > 0) {
            addNotification({ type: 'Merch', message: `Sold ¥${eventMerchRevenue.toLocaleString()} in exclusive concert merchandise!` });
        }
        
        // Reset the event inventory after the concert is over
        setEventMerchInventory({});

        const merchHypeBonus = 1 + (eventMerchRevenue / 1000000); // Every 1M in merch revenue adds 100% fan bonus
        const fanGain = Math.floor((50 + (totalTicketsSold * 0.02 * hypeMultiplier)) * merchHypeBonus);
        const skillImprovement = 10 + Math.floor(avgSkill * 10);
        const staminaDrain = 60;
        
        if (staff.merchManager > 0) {
            const revenueBonus = staff.merchManager * 0.05; // 5% per level
            eventMerchRevenue = Math.floor(eventMerchRevenue * (1 + revenueBonus));
        }

        const netProfit = (ticketRevenue + eventMerchRevenue) - baseCost;
        const agencyProfit = Math.floor(netProfit * 0.6);
        const idolShare = netProfit - agencyProfit;

        // --- NEW: Reputation Gain/Loss from Concerts ---
        const selloutPercentage = totalTicketsSold / venue.capacity;
        let reputationChange = 0;
        if (selloutPercentage >= 0.98 && venue.capacity >= 40000) {
            reputationChange = 5; // Sell out a Dome/Stadium
            addNotification({ type: 'Reputation', message: `Selling out a Dome venue has massively boosted your reputation! (+5 Rep)` });
        } else if (selloutPercentage >= 0.98 && venue.capacity >= 5000) {
            reputationChange = 3; // Sell out a major Arena
            addNotification({ type: 'Reputation', message: `Selling out a major arena has boosted your reputation! (+3 Rep)` });
        } else if (selloutPercentage > 0.9) {
            reputationChange = 1; // High attendance
        } else if (selloutPercentage < 0.5) {
            reputationChange = -2; // Flop concert
            addNotification({ type: 'alert', message: `The concert flopped with low attendance, damaging your reputation. (-2 Rep)` });
        }
        if (reputationChange !== 0) {
            setGroupReputation(prev => Math.max(0, prev + reputationChange));
        }
        // --- END NEW ---

        setMoney(prev => prev + agencyProfit);
        setStatistics(prev => ({ ...prev, totalRevenue: (prev.totalRevenue || 0) + ticketRevenue, totalConcerts: (prev.totalConcerts || 0) + 1 }));

        const performingMemberIds = performingMembers.map(m => m.id);
        distributeFans(fanGain, performingMemberIds);

        performingMemberIds.forEach(memberId => {
            updateMemberState(memberId, m => ({
                ...m,
                stamina: Math.max(0, (m.stamina || 100) - staminaDrain),
                stress: Math.min(100, m.stress + 40),
                morale: Math.min(100, m.morale + 10),
                singing: Math.min(100, m.singing + Math.floor(skillImprovement * 0.5)),
                dancing: Math.min(100, m.dancing + Math.floor(skillImprovement * 0.5)),
            }));
        });

        // Check for "Reaching the Goal" ambition fulfillment
        if (/Dome/i.test(venue.name)) { // Check if the venue is a Dome
            performingMemberIds.forEach(memberId => {
                const member = getMemberById(memberId);
                if (member && member.ambition === 'Reaching the Goal') {
                    updateMemberState(memberId, m => ({
                        ...m,
                        graduationUrgency: 95 // Skyrocket the urgency
                    }));
                    addNotification({ type: 'Group', message: `${member.name} has achieved their dream of performing at the Dome! Their focus may now shift towards graduation.` });
                }
            });
        }

        const newEntry = {
            id: Date.now(),
            name: details.name || `${venue.name} Concert`,
            category: "Major Concert",
            venueName: venue.name,
            week,
            cost: baseCost,
            revenue: ticketRevenue,
            profit: agencyProfit,
            fansGained: fanGain,
            attendance: totalTicketsSold,
            capacity: venue.capacity,
            members: performingMembers.map(m => m.rosterId || m.id),
            tracks: setlist,
            targetGroup: targetGroup,
            kageAna: details.kageAna,
            shimeAna: details.shimeAna,
        };
        setPerformanceHistory(prev => [newEntry, ...prev]);

        const summaryMessage = `Concert "${newEntry.name}": +${fanGain.toLocaleString()} fans, Agency Profit: ¥${agencyProfit.toLocaleString()}. (External Costs: ¥${idolShare.toLocaleString()})`;
        
        setHasPerformedThisWeek(true);
        setMessage(summaryMessage);
        addNotification({ type: 'Performance', message: summaryMessage });

        setModalData({
            title: `Concert "${newEntry.name}" Results`,
            message: `A smashing success at ${newEntry.venueName}! External Costs (Idols, Staff, etc.): ¥${idolShare.toLocaleString()}`,
            fansGained: fanGain,
            revenue: ticketRevenue,
            performanceStats: {
                singing: avgSinging,
                dancing: avgDancing,
                visual: avgVisual,
                charisma: avgCharisma
            },
            totalMerchRevenue: eventMerchRevenue,
            bestSellerName: bestSeller.name,
        });
        setShowModal('performanceResult');
    };

    const recordPerformance = (typeData, setlist, selectedMemberIds, performanceName) => {

        if (hasPerformedThisWeek) {
            setMessage("You can only hold one performance activity per week.");
            return;
        }

        const songTracks = setlist.filter(item => item.type === 'song');
        if (songTracks.length === 0) return setMessage("Must select at least one song to perform.");
        if (selectedMemberIds.length === 0) return setMessage("Must select at least one member to perform.");
        
        const cost = typeData.cost;
        if (money < cost) return setMessage(`Insufficient funds! This performance costs ¥${cost.toLocaleString()}.`);

        const performingMembers = selectedMemberIds.map(getMemberById).filter(m => m && m.isAvailable);
        if (performingMembers.length === 0) return setMessage("No selected members are available to perform.");

        // --- UPDATED: Calculate Individual Averages for Modal ---
        const memberCount = performingMembers.length || 1;
        const avgSinging = performingMembers.reduce((s, m) => s + (m.singing || 0), 0) / memberCount;
        const avgDancing = performingMembers.reduce((s, m) => s + (m.dancing || 0), 0) / memberCount;
        const avgVisual = performingMembers.reduce((s, m) => s + (m.visual || 0), 0) / memberCount;
        const avgCharisma = performingMembers.reduce((s, m) => s + (m.charisma || 0), 0) / memberCount;
        const avgSkill = (avgSinging * 0.3 + avgDancing * 0.4 + avgVisual * 0.2 + avgCharisma * 0.1) / 100;
        // --- END UPDATED ---
        
        const baseFanGain = (typeData.cost * 2) * typeData.fanImpact * (1 + avgSkill);
        const fanGain = Math.floor(baseFanGain);
        const skillImprovement = typeData.skillImpact * 10;
        
        const totalRevenue = typeData.cost * (typeData.category === 'Internal' ? 1.0 : 1.5) * (1 + avgSkill * 0.5);
        const netProfit = totalRevenue - cost;
        const agencyProfit = Math.floor(netProfit * 0.6);
        const idolShare = netProfit - agencyProfit;

        setMoney(prev => prev + agencyProfit);
        setStatistics(prev => ({ ...prev, totalRevenue: (prev.totalRevenue || 0) + totalRevenue, totalConcerts: (prev.totalConcerts || 0) + 1 }));

        const performingMemberIds = performingMembers.map(m => m.id);
        
        distributeFans(fanGain, performingMemberIds);

        performingMembers.forEach(member => {
            updateMemberState(member.id, m => ({
                ...m,
                stamina: Math.max(0, (m.stamina || 100) - typeData.staminaDrain),
                stress: Math.min(100, (m.stress || 0) + (typeData.stressGain || 0)),
                morale: Math.min(100, m.morale + (typeData.category === 'Charity Stage' ? 15 : 5)),
                singing: Math.min(100, m.singing + Math.floor(skillImprovement * 0.5)),
                dancing: Math.min(100, m.dancing + Math.floor(skillImprovement * 0.5)),
            }));
        });

        const newEntry = {
            id: Date.now(),
            name: performanceName || typeData.label,
            category: typeData.label,
            week,
            cost: typeData.cost,
            revenue: totalRevenue,
            profit: agencyProfit,
            fansGained: fanGain,
            members: performingMembers.map(m => m.rosterId || m.id),
            tracks: setlist,
        };
        setPerformanceHistory(prev => [newEntry, ...prev]);
        const summaryMessage = `Performance \"${newEntry.name}\": +${fanGain.toLocaleString()} fans, Agency Profit: ¥${agencyProfit.toLocaleString()}. (External Costs: ¥${idolShare.toLocaleString()})`;
        
        setHasPerformedThisWeek(true);
        setMessage(summaryMessage);
        addNotification({ type: 'Performance', message: summaryMessage });

      // --- UPDATED: Pass Performance Stats to Modal ---
      setModalData({
        title: `Performance: \"${newEntry.name}\"`,
        message: `The performance was a success! External Costs (Idols, Staff, etc.): ¥${idolShare.toLocaleString()}`,
        fansGained: fanGain,
        revenue: totalRevenue,
        performanceStats: {
            singing: avgSinging,
            dancing: avgDancing,
            visual: avgVisual,
            charisma: avgCharisma
        }
      });
      // --- END UPDATED ---
      setShowModal('performanceResult');
    };

    const startPerformancePrep = () => {
        if (songs.length === 0 && sisterGroups.every(sg => (sg.songs || []).length === 0)) {
             return setMessage("You need to release at least one single track before scheduling a performance.");
        }
        setShowModal('performancePrep');
    };

    // --- Sister Group Transfer Logic ---
    const handleSisterMemberTransfer = (member, action) => {
        if (!member.isSister) return setMessage('This action is only for Sister Group members.');
        
        const cost = 50000;
        if (money < cost) return setMessage(`Transfer/Kennin costs ¥${cost.toLocaleString()}!`);
        
        setMoney(prev => prev - cost);
        setShowModal(null);

        const parts = String(member.id).split('-'); 
        const sgId = parseInt(parts[1]);
        const mId = parseInt(parts[2]);
        const sgName = member.homeGroup;


        if (action === 'transfer') {
            // 1. Remove from sister group members list
            setSisterGroups(prev => prev.map(g => 
                g.id === sgId ? { ...g, members: g.members.filter(m => m.id !== mId) } : g
            ));

            // 2. Add to main group members list
            const newId = Math.max(0, ...members.map(m => m.id)) + 1;
            const newMainMember = {
                ...member,
                id: newId, // Assign new integer ID
                name: member.name.replace(` (K: ${sgName})`, '').replace(` (${sgName})`, ''), // Clean up name for main roster
                homeGroup: 'main',
                isSister: false,
                groupId: undefined,
                kenninGroups: [], 
            };
            setMembers(prev => [...prev, newMainMember]);
            setMessage(`${member.name} successfully transferred to ${groupName}! (¥${cost.toLocaleString()})`);
            setSelectedMember(newMainMember);
            
        } else if (action === 'kennin') {
            setSisterGroups(prev => prev.map(g => {
                if (g.id === sgId) {
                    return {
                        ...g,
                        members: (g.members || []).map(m => m.id === mId ? { 
                            ...m, 
                            kenninGroups: [...(m.kenninGroups || []).filter(gName => gName !== 'main'), 'main'] 
                        } : m)
                    };
                }
                return g;
            }));
            
            // Update the selected member object in the sidebar immediately
            setSelectedMember(prev => prev ? { 
                ...prev, 
                kenninGroups: [...(prev.kenninGroups || []).filter(gName => gName !== 'main'), 'main'] 
            } : null);

            setMessage(`${member.name} is now a Kennin member of ${groupName} (¥${cost.toLocaleString()}).`);
        }
        setShowModal(null);
    };
    // --- End Sister Group Transfer Logic ---
    

    
    const handleDisbandSisterGroup = (sgId, independent = false) => {
      const sg = sisterGroups.find(g => g.id === sgId);
      if (!sg) return;

      setMembers(prev => prev.map(m => ({
          ...m,
          kenninGroups: (m.kenninGroups || []).filter(gName => gName !== sg.name)
      })));

      setGroupRoles(prev => {
    const { [sgId]: _, ...newRoles } = prev;
    return newRoles;
});

      if (independent) {
          setGroupReputation(prev => prev + 5); // Reputation GAIN
          addNotification({ type: 'Reputation', message: `${sg.name} going independent shows the strength of your brand! (+5 Rep)` });
          setMessage(`${sg.name} has gone independent and is now a rival group.`);
      } else {
          setGroupReputation(prev => Math.max(0, prev - 5)); // Reputation LOSS
          addNotification({ type: 'alert', message: `Forcibly disbanding ${sg.name} has hurt your public image. (-5 Rep)` });
          setMessage(`${sg.name} has been disbanded. All members are now free agents.`);
      }
      
      if (selectedSisterGroup === sgId) setSelectedSisterGroup(null);
      setShowModal(null);
    };
    const handleConfirmEditGroupName = (groupToEdit, newName) => {
        const oldName = groupToEdit.name;

        if (groupToEdit.id === 'main') {
            // --- Renaming the Main Group ---
            setGroupName(newName);
            // Update any Kennin references in sister groups
            setSisterGroups(prevSGs => prevSGs.map(sg => ({
                ...sg,
                members: (sg.members || []).map(m => ({
                    ...m,
                    kenninGroups: (m.kenninGroups || []).map(kName => kName === oldName ? newName : kName)
                }))
            })));
        } else {
            // --- Renaming a Sister Group ---
            setSisterGroups(prevSGs => prevSGs.map(sg => {
                let currentSg = { ...sg };
                // Update the group's own name and its members' homeGroup
                if (currentSg.id === groupToEdit.id) {
                    currentSg.name = newName;
                    currentSg.members = (currentSg.members || []).map(m => ({ ...m, homeGroup: newName }));
                }
                
                // Update any Kennin references this group's members might have to the old name
                currentSg.members = (currentSg.members || []).map(m => ({
                    ...m,
                    kenninGroups: (m.kenninGroups || []).map(kName => kName === oldName ? newName : kName)
                }));
                
                return currentSg;
            }));

            // Update Kennin references from the main group
            setMembers(prevMembers => prevMembers.map(m => ({
                ...m,
                kenninGroups: (m.kenninGroups || []).map(kName => kName === oldName ? newName : kName)
            })));
        }

        setMessage(`Group "${oldName}" has been renamed to "${newName}".`);
        setShowModal(null);
    };

const produceMerch = (item, tier, amount) => {
    const tierInfo = merchTiers[item]?.[tier];
    if (!tierInfo) return setMessage(`Invalid merchandise tier: ${item} - ${tier}`);

    const currentSize = Object.values(merchInventory).reduce((a, b) => a + b, 0) + Object.values(idolMerchInventory).reduce((a, b) => a + b, 0) + Object.values(eventMerchInventory).reduce((a, b) => a + b, 0) + pendingMerch.reduce((sum, item) => sum + item.amount, 0);
    const capacity = warehouseTiers[warehouse.level].capacity;

    if (currentSize + amount > capacity) {
        return setMessage(`Not enough warehouse space! Current: ${currentSize.toLocaleString()}/${capacity.toLocaleString()}.`);
    }

    let cost = tierInfo.cost * amount;

if (staff.merchManager > 0) {
    const costReduction = staff.merchManager * 0.05; // 5% per level
    cost *= (1 - costReduction);
}


    if (merchDesignBonus) {
        cost = Math.floor(cost * (1 - merchDesignBonus.bonus));
    }

    if (money < cost) return setMessage(`Not enough money! Cost: ¥${cost.toLocaleString()}`);
    
    setMoney(prev => prev - cost);

    const newPendingItem = {
        type: 'regular',
        key: `${item}_${tier}`,
        amount: amount,
        deliveryWeek: week + 1,
        name: tierInfo.name
    };

const updatedQueue = [...pendingMerch, newPendingItem];
const productionSummary = updatedQueue.map(item => `${item.amount}x ${item.name}`).join(', ');
setMessage(`In Production: ${productionSummary}`);

    setPendingMerch(prev => [...prev, newPendingItem]);
    addNotification({ type: 'Production', message: `Started production for ${amount} of ${tierInfo.name}. Delivery next week.` });
};

const produceIdolMerch = (memberId, itemType, amount) => {
    const tierInfo = idolMerchTiers[itemType];
    if (!tierInfo) return setMessage(`Invalid idol merchandise type: ${itemType}`);

    const currentSize = Object.values(merchInventory).reduce((a, b) => a + b, 0) + Object.values(idolMerchInventory).reduce((a, b) => a + b, 0) + Object.values(eventMerchInventory).reduce((a, b) => a + b, 0) + pendingMerch.reduce((sum, item) => sum + item.amount, 0);
    const capacity = warehouseTiers[warehouse.level].capacity;

    if (currentSize + amount > capacity) {
        return setMessage(`Not enough warehouse space! Current: ${currentSize.toLocaleString()}/${capacity.toLocaleString()}.`);
    }

    let cost = tierInfo.cost * amount;
if (staff.merchManager > 0) {
    const costReduction = staff.merchManager * 0.05; // 5% per level
    cost *= (1 - costReduction);
}

    if (merchDesignBonus) {
        cost = Math.floor(cost * (1 - merchDesignBonus.bonus));
    }

    if (money < cost) return setMessage(`Not enough money! Cost: ¥${cost.toLocaleString()}`);
    
    setMoney(prev => prev - cost);

    const newPendingItem = {
        type: 'idol',
        key: `${memberId}_${itemType}`,
        amount: amount,
        deliveryWeek: week + 1,
        name: getMemberById(memberId)?.name + "'s " + tierInfo.name,
    };
    
    const updatedQueue = [...pendingMerch, newPendingItem];
const productionSummary = updatedQueue.map(item => `${item.amount}x ${item.name}`).join(', ');
setMessage(`In Production: ${productionSummary}`);

    
    setPendingMerch(prev => [...prev, newPendingItem]);

    addNotification({ type: 'Production', message: `Started production for ${amount} of ${newPendingItem.name}. Delivery next week.` });
};

const produceEventMerch = (itemType, amount) => {
    const tierInfo = eventMerchTiers[itemType];
    if (!tierInfo) return; // Silent fail

    const currentSize = Object.values(merchInventory).reduce((a, b) => a + b, 0) + Object.values(idolMerchInventory).reduce((a, b) => a + b, 0) + Object.values(eventMerchInventory).reduce((a, b) => a + b, 0) + pendingMerch.reduce((sum, item) => sum + item.amount, 0);
    const capacity = warehouseTiers[warehouse.level].capacity;

    if (currentSize + amount > capacity) {
        addNotification({ type: 'Alert', message: `Not enough warehouse space for event merch!` });
        return;
    }

    let cost = tierInfo.cost * amount;
    if (merchDesignBonus) {
        cost = Math.floor(cost * (1 - merchDesignBonus.bonus));
    }

    if (money < cost) {
        addNotification({ type: 'Alert', message: `Not enough money for event merch!` });
        return;
    }
    
    setMoney(prev => prev - cost);
    setEventMerchInventory(prev => ({
        ...prev,
        [itemType]: (prev[itemType] || 0) + amount
    }));

    if (merchDesignBonus) {
        addNotification({ type: 'Production', message: `Produced ${amount} of ${tierInfo.name} with a ${(merchDesignBonus.bonus * 100).toFixed(0)}% bonus for the concert!` });
    } else {
        addNotification({ type: 'Production', message: `Produced ${amount} of ${tierInfo.name} for the upcoming concert.` });
    }
};

const beginActivity = (memberId, activityType) => {
    const member = getMemberById(memberId);
    if (!member) return setMessage("Member not found.");
    if (!member.isAvailable) return setMessage(`${member.name} is currently unavailable.`);

    switch (activityType) {
        case 'design_merch':
            // Set the member's activity and make them unavailable for 1 week
            updateMemberState(memberId, m => ({ 
                ...m, 
                currentActivity: 'design_merch', 
                activityEnd: week + 1, // This activity takes exactly one week
                isAvailable: false 
            }));
            setMessage(`${member.name} is spending the week helping design new merchandise.`);
            break;
        
        // Future activities like 'community_service' will be added here

        default:
            setMessage(`Unknown activity: ${activityType}`);
            break;
    }
};


const startHandshakeEvent = (selectedMemberIds) => {
      const cost = 50000;
      if (money < cost) return setMessage(`Handshake events cost ¥${cost.toLocaleString()}!`);
      
      const participatingMembers = selectedMemberIds.map(id => getMemberById(id)).filter(m => m && m.isAvailable);
      
      if (participatingMembers.length === 0) {
          return setMessage("No members were selected for the handshake event.");
      }

      setMoney(prev => prev - cost);
      
      let totalConvertedFans = 0;
      let totalNewFans = 0;

      participatingMembers.forEach(member => {
        const currentCasual = member.fans?.casual || 0;
        
        // --- NEW: Fan conversion and gain are now based on Charisma ---
        const charismaModifier = (member.charisma || 0) / 250; // Max of 0.4 for 100 charisma
        const fansToConvert = Math.floor(currentCasual * (0.15 + charismaModifier)); // Base 15% conversion, up to 55% with max charisma
        const newCasualFans = Math.min(50000, 500 + Math.floor(currentCasual * 0.01) + (member.charisma * 100)); // Capped, flat gain + bonus
        // --- END NEW ---

        totalConvertedFans += fansToConvert;
        totalNewFans += newCasualFans;

        updateMemberState(member.rosterId || member.id, m => {
          const casual = m.fans?.casual || 0;
          const hardcore = m.fans?.hardcore || 0;
          return {
            ...m,
            fans: {
              hardcore: hardcore + fansToConvert,
              casual: Math.max(0, casual - fansToConvert) + newCasualFans,
            },
            stamina: Math.max(0, (m.stamina || 100) - 50),
            stress: Math.min(100, (m.stress || 0) + 25),
            morale: Math.min(100, (m.morale || 0) + 5)
          };
        });
      });
      
            const successMessage = `Handshake event success! Converted ${totalConvertedFans.toLocaleString()} fans to hardcore and gained ${totalNewFans.toLocaleString()} new casual fans.`;
      addNotification({ type: 'Fans', message: successMessage });
      
      // NEW: Set modal data and show the new modal
      setModalData({
          convertedFans: totalConvertedFans,
          newFans: totalNewFans,
          members: participatingMembers
      });
      setShowModal('handshakeResult');
    };

    
    const startTrainingCamp = (memberId, skill) => {
      const cost = 75000;
      if (money < cost) return setMessage(`Special camp costs ¥${cost.toLocaleString()}!`);
      const member = getMemberById(memberId);
      if (!member || !member.isAvailable) return setMessage(member ? `${member.name} is already on assignment.` : 'Member not found.');
      
      setMoney(prev => prev - cost);
      
      updateMemberState(memberId, m => ({ ...m, isAvailable: false }));
      
      setActiveTrainingCamp({ memberId, skill, weeksLeft: 2 });
      setMessage(`${member.name} has left for a 2-week special ${skill} camp.`);
      setShowModal(null);
    };
    
    const handleTrainingCampReturn = () => {
      const member = getMemberById(activeTrainingCamp.memberId);
      const skill = activeTrainingCamp.skill;

      updateMemberState(activeTrainingCamp.memberId, m => ({ 
          ...m, 
          isAvailable: true,
          [skill]: Math.min(100, (m[skill] || 0) + 15) 
      }));
      
      const campMessage = `${member?.name || 'A member'} has returned from ${skill} camp with a huge skill boost!`;
      setActiveTrainingCamp(null);
      return campMessage;
    };
    
    const startMediaJob = (memberId, strategy) => {
      const member = getMemberById(memberId);
      if (!member || !member.isAvailable) return setMessage(member ? `${member.name} is unavailable.` : 'Member not found.');
      
      const cost = 1000;
      if (money < cost) return setMessage(`Media appearances cost ¥${cost.toLocaleString()}.`);
      
      setMoney(prev => prev - cost);
      
      updateMemberState(memberId, m => ({ ...m, stamina: Math.max(0, (m.stamina || 0) - 10) }));
      
      // --- NEW: Success chance now includes Charisma and Intelligence ---
      const baseSuccess = ((member.variety || 0) * 0.5) + ((member.charisma || 0) * 0.3) + ((member.intelligence || 0) * 0.2);
      let successChance = baseSuccess / 100;
      if (strategy === 'safe') successChance += 0.2;
      if (strategy === 'risky') successChance -= 0.1;
      // --- END NEW ---
      
      const roll = Math.random();
      
      if (roll < successChance) {
          // --- NEW: Fan gain is now weighted across multiple stats ---
          const weightedSkillGain = ((member.variety || 0) * 0.3 + (member.charisma || 0) * 0.5 + (member.intelligence || 0) * 0.2);
          let fanGain = 500 + Math.floor(weightedSkillGain * 10);
          // --- END NEW ---
          
          if (strategy === 'risky') fanGain *= 2;
          if (strategy === 'safe') fanGain *= 0.5;
          
          updateMemberState(memberId, m => ({ ...m, fans: { ...m.fans, casual: (m.fans.casual || 0) + Math.floor(fanGain) }}));
          setMessage(`Success! ${member.name}'s media job gained ${Math.floor(fanGain)} casual fans.`);
      } else {
          // --- NEW: Fan loss is mitigated by Charisma and Intelligence ---
          let fanLoss = Math.max(50, 800 - (((member.charisma || 0) + (member.intelligence || 0)) * 3));
          if (strategy === 'risky') fanLoss = Math.max(200, 1500 - (((member.charisma || 0) + (member.intelligence || 0)) * 5));
          if (strategy === 'safe') fanLoss = fanLoss / 2;
          // --- END NEW ---
          
          updateMemberState(memberId, m => ({ ...m, fans: { ...m.fans, casual: Math.max(0, (m.fans.casual || 0) - Math.floor(fanLoss)) }}));
          setMessage(`Failure! ${member.name}'s media job was poorly received. Lost ${Math.floor(fanLoss)} casual fans.`);
      }
      setShowModal(null);
    };
    
    const startGroupMediaJob = (jobType, selectedMemberIds) => {
      const cost = 20000;
      // Safety checks, though the modal should prevent these.
      if (groupMediaJobDoneThisWeek) return setMessage("You can only do one group media job per week.");
      if (money < cost) return setMessage(`This job costs ¥${cost.toLocaleString()}.`);

      const performingMembers = selectedMemberIds.map(id => getMemberById(id)).filter(m => m && m.isAvailable);
      
      let requiredMembers = 0;
      let fanBoostMultiplier = 1;
      let successMessage = 'Success! ';
      
      switch (jobType) {
          case 'music_show':
              fanBoostMultiplier = 1.5;
              requiredMembers = 7;
              successMessage += 'Performance was well-received on the music show.';
              break;
          case 'awards_show':
              fanBoostMultiplier = 3; 
              requiredMembers = 16;
              successMessage += 'Group appearance at the Awards Show generated major buzz.';
              break;
          case 'variety_program':
              fanBoostMultiplier = 1;
              requiredMembers = 5;
              successMessage += 'Group variety appearance was a hit!';
              break;
          case 'web_series':
              fanBoostMultiplier = 1.2;
              requiredMembers = 4;
              successMessage += 'The sponsored web series was a success!';
              break;
          default:
               return setMessage('Invalid job type.');
      }
      
      if (performingMembers.length < requiredMembers) {
          return setMessage(`Job requires ${requiredMembers} members. Only ${performingMembers.length} were selected or available.`);
      }

      setMoney(prev => prev - cost);
      setGroupMediaJobDoneThisWeek(true);
      
      // --- NEW: Weighted Average Skill Calculation ---
      const avgSkill = performingMembers.reduce((sum, m) => {
          const memberScore = (m.variety || 0) * 0.4 + 
                              (m.charisma || 0) * 0.3 +
                              (m.visual || 0) * 0.2 +
                              (m.intelligence || 0) * 0.1;
          return sum + memberScore;
      }, 0) / performingMembers.length;
      // --- END NEW ---

      const baseSuccess = avgSkill / 100;
      const performingMemberIds = performingMembers.map(m => m.rosterId || m.id);

      if (Math.random() < baseSuccess) {
          // SUCCESS LOGIC
          const baseFanGain = 5000;
          const fanGain = Math.floor(baseFanGain * fanBoostMultiplier * (1 + (avgSkill / 100)));
          
          distributeFans(fanGain, performingMemberIds);
          
          performingMemberIds.forEach(memberId => {
            updateMemberState(memberId, m => ({ ...m, morale: Math.min(100, (m.morale || 0) + 10) }));
          });

          const finalMessage = `${successMessage} Gained a total of ${fanGain.toLocaleString()} new fans!`;
          setMessage(finalMessage);
          addNotification({ type: 'Fans', message: finalMessage });

      } else {
          // FAILURE LOGIC (UPDATED)
          const fanLosses = performingMembers.map(member => {
              const casualFans = member.fans?.casual || 0;
              // --- NEW: Fan loss is mitigated by the group's average skill ---
              const loss = Math.min(casualFans, Math.max(50, 500 - (avgSkill * 3))); // Each member loses up to 500 casual fans, reduced by skill
              return { id: member.rosterId || member.id, loss };
          });

          const totalFansLost = fanLosses.reduce((sum, current) => sum + current.loss, 0);

          fanLosses.forEach(({ id, loss }) => {
              if (loss > 0) {
                  updateMemberState(id, m => ({
                      ...m,
                      fans: {
                          hardcore: m.fans?.hardcore || 0,
                          casual: Math.max(0, (m.fans?.casual || 0) - loss)
                      },
                      morale: Math.max(0, (m.morale || 0) - 15)
                  }));
              }
          });
          
          const finalMessage = `Failure! The group appearance was criticized. Lost ${totalFansLost.toLocaleString()} casual fans and member morale dropped.`;
          setMessage(finalMessage);
          addNotification({ type: 'alert', message: finalMessage });
      }
      setShowModal(null);
    };

    const startSenbatsuPromotion = (promoType, singleId) => {
        const allReleases = [...songs, ...sisterGroups.flatMap(sg => sg.songs || [])];
        const single = allReleases.find(s => s.id === singleId);

        if (!single) return setMessage("Promoting single not found.");

        const promotionsDone = completedPromotions[singleId] || [];
        if (promotionsDone.includes(promoType)) {
            return setMessage(`The '${promoType}' promotion has already been done for this single.`);
        }

        const titleTrack = single.tracks.find(t => t.type === 'title');
        if (!titleTrack) return setMessage("Cannot find title track for promotion.");
        
        const senbatsuMemberIds = (titleTrack.members || []).map(m => String(m.id));
        const senbatsuMembers = senbatsuMemberIds.map(id => getMemberById(id)).filter(Boolean);

        let cost = 0;
        let message = "";
        let modalPayload = null;

        switch (promoType) {
            case 'magazineCover':
                cost = 75000;
                if (money < cost) return setMessage("Not enough money for the magazine shoot.");
                const kami7Ids = (titleTrack.lineup ? Object.entries(titleTrack.lineup).filter(([, row]) => row === '1st Row' || row === '2nd Row' || row === '3rd Row').map(([id]) => id) : []).slice(0, 7);
                if (kami7Ids.length < 7) return setMessage("Not enough members in the top rows for a Kami 7 shoot.");
                const kami7Members = kami7Ids.map(id => getMemberById(id)).filter(Boolean);
                kami7Members.forEach(member => {
                    const fanGain = Math.floor(getTotalFansForMember(member) * 0.1) + 5000;
                    updateMemberState(member.rosterId || member.id, m => ({ ...m, fans: { ...m.fans, casual: (m.fans.casual || 0) + fanGain }, morale: Math.min(100, m.morale + 15), stress: Math.min(100, m.stress + 10) }));
                });
                message = `The Kami 7 magazine cover was a huge success, boosting the members' popularity!`;
                modalPayload = { promoType, singleName: single.name, members: kami7Members, message };
                break;

            case 'musicShow':
                cost = 100000;
                if (money < cost) return setMessage("Not enough money for a music show performance.");
                if (senbatsuMembers.length === 0) return setMessage("No members found for this performance.");
                const avgSkill = senbatsuMembers.reduce((sum, m) => sum + (m.singing || 0) + (m.dancing || 0), 0) / (senbatsuMembers.length * 2);
                let musicShowFanGain = 20000, performanceMessage = "a solid performance";
                if (avgSkill > 80) { musicShowFanGain = 75000; performanceMessage = "a PERFECT performance that's generating huge buzz!"; } 
                else if (avgSkill > 60) { musicShowFanGain = 40000; performanceMessage = "a great performance that impressed viewers!"; }
                distributeFans(musicShowFanGain, senbatsuMemberIds);
                senbatsuMemberIds.forEach(memberId => updateMemberState(memberId, m => ({ ...m, stamina: Math.max(0, m.stamina - 50), stress: Math.min(100, m.stress + 25) })));
                const updateSalesForMusicShow = s => s.id === singleId ? { ...s, baseSalesPotential: s.baseSalesPotential * 1.05 } : s;
                if (single.targetGroup === 'main' || single.targetGroup === groupName) setSongs(prev => prev.map(updateSalesForMusicShow));
                else setSisterGroups(prev => prev.map(sg => sg.name === single.targetGroup || String(sg.id) === String(single.targetGroup) ? { ...sg, songs: (sg.songs || []).map(updateSalesForMusicShow) } : sg));
                message = `The group delivered ${performanceMessage} on a popular music show, gaining ${musicShowFanGain.toLocaleString()} new fans and boosting sales potential!`;
                modalPayload = { promoType, singleName: single.name, totalFanGain: musicShowFanGain, salesBoost: 5, message };
                break;

            case 'animeTieIn':
                cost = 1000000;
                if (money < cost) return setMessage("Not enough money to secure an anime theme song deal.");
                distributeFans(250000, senbatsuMemberIds);
                senbatsuMemberIds.forEach(memberId => updateMemberState(memberId, m => ({ ...m, morale: Math.min(100, m.morale + 20) })));
                const updateSalesForAnime = s => s.id === singleId ? { ...s, baseSalesPotential: s.baseSalesPotential * 1.25 } : s;
                if (single.targetGroup === 'main' || single.targetGroup === groupName) setSongs(prev => prev.map(updateSalesForAnime));
                else setSisterGroups(prev => prev.map(sg => sg.name === single.targetGroup || String(sg.id) === String(single.targetGroup) ? { ...sg, songs: (sg.songs || []).map(updateSalesForAnime) } : sg));
                message = `HUGE NEWS! '${single.name}' will be the theme song for a new anime! The exposure gained ${250000 .toLocaleString()} fans and massively boosted sales potential.`;
                modalPayload = { promoType, singleName: single.name, totalFanGain: 250000, salesBoost: 25, message };
                break;
            
            case 'productCM':
                cost = -500000;
                const visualUnit = senbatsuMembers.sort((a, b) => b.visual - a.visual).slice(0, 5);
                if (visualUnit.length < 3) return setMessage("Not enough Senbatsu members with high enough visuals for a commercial deal.");
                const visualUnitIds = visualUnit.map(m => m.rosterId || m.id);
                distributeFans(100000, visualUnitIds);
                visualUnitIds.forEach(memberId => updateMemberState(memberId, m => ({ ...m, morale: Math.min(100, m.morale + 10) })));
                message = `A new commercial starring ${visualUnit.map(m => m.name).join(', ')} is on the air! It earned the group ¥${(-cost).toLocaleString()} and gained ${100000 .toLocaleString()} new fans for the featured members.`;
                modalPayload = { promoType, singleName: single.name, members: visualUnit, income: -cost, totalFanGain: 100000, message };
                break;

            case 'handshakeEvent':
                cost = 200000;
                if (money < cost) return setMessage("Not enough money to organize a national handshake event.");
                let totalFansConverted = 0;
                senbatsuMemberIds.forEach(memberId => {
                    updateMemberState(memberId, m => {
                        const toConvert = Math.floor((m.fans.casual || 0) * 0.2);
                        totalFansConverted += toConvert;
                        return { ...m, fans: { hardcore: (m.fans.hardcore || 0) + toConvert, casual: (m.fans.casual || 0) - toConvert }, stamina: Math.max(0, m.stamina - 60), stress: Math.min(100, m.stress + 30), morale: Math.min(100, m.morale + 20) };
                    });
                });
                message = `The national handshake event was exhausting but a massive success! The direct interaction converted ${totalFansConverted.toLocaleString()} casual fans into hardcore fans.`;
                modalPayload = { promoType, singleName: single.name, fansConverted: totalFansConverted, message };
                break;

            case 'tvSpecial':
                cost = 150000;
                if (money < cost) return setMessage("Not enough money for the TV special.");
                distributeFans(50000, senbatsuMemberIds);
                senbatsuMemberIds.forEach(memberId => updateMemberState(memberId, m => ({ ...m, stamina: Math.max(0, m.stamina - 40), stress: Math.min(100, m.stress + 20) })));
                const updateSalesPotential = s => s.id === singleId ? { ...s, baseSalesPotential: s.baseSalesPotential * 1.1 } : s;
                if (single.targetGroup === 'main' || single.targetGroup === groupName) setSongs(prev => prev.map(updateSalesPotential));
                else setSisterGroups(prev => prev.map(sg => sg.name === single.targetGroup || String(sg.id) === String(single.targetGroup) ? { ...sg, songs: (sg.songs || []).map(updateSalesPotential) } : sg));
                message = `The TV special boosted '${single.name}' sales and gained 50,000 new fans for the senbatsu!`;
                modalPayload = { promoType, singleName: single.name, totalFanGain: 50000, salesBoost: 10, message };
                break;

            case 'radioUnit':
                cost = 20000;
                if (money < cost) return setMessage("Not enough money for the radio guesting.");
                const radioUnit = senbatsuMembers.sort((a, b) => ((b.variety + b.charisma) / 2) - ((a.variety + a.charisma) / 2)).slice(0, 4);
                if (radioUnit.length < 4) return setMessage("Not enough Senbatsu members for a radio unit.");
                distributeFans(15000, radioUnit.map(m => m.rosterId || m.id));
                message = `${radioUnit.map(m=>m.name).join(', ')} charmed listeners on the radio, gaining 15,000 new fans!`;
                modalPayload = { promoType, singleName: single.name, members: radioUnit, totalFanGain: 15000, message };
                break;

            case 'guerillaLive':
                cost = 120000;
                if (money < cost) return setMessage("Not enough money for a guerilla concert.");
                senbatsuMemberIds.forEach(memberId => updateMemberState(memberId, m => ({ ...m, stamina: Math.max(0, m.stamina - 30), stress: Math.min(100, m.stress + 15) })));
                if (Math.random() < 0.7) { // 70% chance of success
                    distributeFans(150000, senbatsuMemberIds);
                    senbatsuMemberIds.forEach(memberId => updateMemberState(memberId, m => ({ ...m, morale: Math.min(100, m.morale + 15) })));
                    message = `The surprise guerilla live was a massive success! The huge crowd generated incredible hype, gaining ${150000 .toLocaleString()} fans!`;
                    modalPayload = { promoType, singleName: single.name, totalFanGain: 150000, message };
                } else {
                    senbatsuMemberIds.forEach(memberId => updateMemberState(memberId, m => ({ ...m, morale: Math.max(0, m.morale - 10) })));
                    message = `The guerilla live was a bust... Low turnout and technical issues led to a drop in morale.`;
                    modalPayload = { promoType, singleName: single.name, message };
                }
                break;

            case 'cdShopTour':
                cost = 60000;
                if (money < cost) return setMessage("Not enough money for a CD shop tour.");
                const tourMembers = senbatsuMembers.sort((a,b) => b.charisma - a.charisma).slice(0, 8);
                if (tourMembers.length < 4) return setMessage("Not enough members for a CD shop tour.");
                tourMembers.forEach(member => updateMemberState(member.rosterId || member.id, m => ({ ...m, stamina: Math.max(0, m.stamina - 20) })));
                const updateSalesForTour = s => s.id === singleId ? { ...s, baseSalesPotential: s.baseSalesPotential * 1.08 } : s;
                if (single.targetGroup === 'main' || single.targetGroup === groupName) setSongs(prev => prev.map(updateSalesForTour));
                else setSisterGroups(prev => prev.map(sg => sg.name === single.targetGroup || String(sg.id) === String(single.targetGroup) ? { ...sg, songs: (sg.songs || []).map(updateSalesForTour) } : sg));
                message = `The CD shop greeting tour was a success, directly boosting physical sales potential for '${single.name}'!`;
                modalPayload = { promoType, singleName: single.name, members: tourMembers, salesBoost: 8, message };
                break;

            case 'varietyShow':
                cost = 250000;
                if (money < cost) return setMessage("Not enough money for a variety game show.");
                const avgVariety = senbatsuMembers.reduce((sum, m) => sum + (m.variety || 0), 0) / senbatsuMembers.length;
                let varietyFanGain = 30000;
                let skillGain = 0;
                if (avgVariety > 70) {
                    varietyFanGain = 120000;
                    skillGain = 1;
                    message = `The senbatsu were hilarious and charming on the game show, winning the competition! They gained ${varietyFanGain.toLocaleString()} fans, and their variety skill has increased!`;
                } else {
                    message = `The senbatsu tried their best on the game show, gaining ${varietyFanGain.toLocaleString()} new fans.`;
                }
                distributeFans(varietyFanGain, senbatsuMemberIds);
                senbatsuMemberIds.forEach(memberId => updateMemberState(memberId, m => ({ ...m, variety: Math.min(100, m.variety + skillGain), stress: Math.min(100, m.stress + 10) })));
                modalPayload = { promoType, singleName: single.name, totalFanGain: varietyFanGain, message };
                break;

            case 'photobook':
                cost = 300000;
                if (money < cost) return setMessage("Not enough money for a photobook deal.");
                
                const income = 500000;
                cost -= income; // The final cost is the production cost minus the income.
                
                const photoFans = 80000;
                distributeFans(photoFans, senbatsuMemberIds, 'visual');

                message = `The '${single.name}' official photobook is a bestseller! It cost ¥${(300000).toLocaleString()} to produce and brought in ¥${income.toLocaleString()}, gaining ${photoFans.toLocaleString()} fans focused on the most visual members.`;
                modalPayload = { promoType, singleName: single.name, totalFanGain: photoFans, income: income, message };
                break;

            case 'karaoke':
                cost = 15000;
                if (money < cost) return setMessage("Not enough money for a karaoke tie-in.");
                distributeFans(25000, senbatsuMemberIds);
                message = `The '${single.name}' MV is now featured in karaoke booths nationwide! The passive exposure gained ${25000 .toLocaleString()} new fans.`;
                modalPayload = { promoType, singleName: single.name, totalFanGain: 25000, message };
                break;

            default:
                return setMessage("Unknown promotion type.");
        }

        if (modalPayload) {
            setMoney(prev => prev - cost);
            setCompletedPromotions(prev => ({
                ...prev,
                [singleId]: [...(prev[singleId] || []), promoType]
            }));
            addNotification({ type: 'Promotion', message: message });
            setModalData(modalPayload);
            setShowModal('senbatsuPromotionResult');
        } else {
            // Fallback for safety
            setMessage(message);
            addNotification({ type: 'Promotion', message: message });
            setShowModal(null);
        }
    };

    const startBsidePromotion = (promoType, singleId, trackName) => {
        const allReleases = [...songs, ...sisterGroups.flatMap(sg => sg.songs || [])];
        const single = allReleases.find(s => s.id === singleId);
        if (!single) return setMessage("Single not found.");

        const track = single.tracks.find(t => t.name === trackName && t.type === 'b-side');
        if (!track) return setMessage("B-side track not found.");

        if ((completedBsidePromos[singleId]?.[trackName] || []).includes(promoType)) {
            return setMessage("This promotion has already been done for this unit.");
        }

        const unitMemberIds = (track.members || []).map(m => String(m.id));
        const unitMembers = unitMemberIds.map(id => getMemberById(id)).filter(Boolean);
        if (unitMembers.length === 0) return setMessage("No members in this unit.");

        let cost = 0;
        let modalPayload = { promoType, unitName: track.unitName, trackName: track.name };

        switch (promoType) {
            case 'fanMeeting':
                cost = 25000;
                if (money < cost) return setMessage("Not enough money for a unit fan meeting.");
                
                let totalConverted = 0;
                unitMembers.forEach(member => {
                    const charismaBoost = (member.charisma || 0) / 500;
                    const conversionRate = 0.15 + charismaBoost;
                    const fansToConvert = Math.floor((member.fans?.casual || 0) * conversionRate);
                    totalConverted += fansToConvert;
                    updateMemberState(member.id, m => ({
                        ...m,
                        fans: { hardcore: (m.fans?.hardcore || 0) + fansToConvert, casual: Math.max(0, (m.fans?.casual || 0) - fansToConvert) },
                        morale: Math.min(100, m.morale + 15)
                    }));
                });
                modalPayload = { ...modalPayload, convertedFans: totalConverted, message: `The fan meeting was a great success, converting ${totalConverted.toLocaleString()} fans to hardcore supporters!` };
                break;

            case 'performanceVideo':
                cost = 75000;
                if (money < cost) return setMessage("Not enough money for a performance video.");
                const avgSkill = unitMembers.reduce((sum, m) => sum + (m.singing || 0) + (m.dancing || 0), 0) / (unitMembers.length * 2);
                const fanGain = Math.floor(20000 + (avgSkill * 250));
                distributeFans(fanGain, unitMemberIds);
                modalPayload = { ...modalPayload, fanGain, message: `The special performance video for '${track.unitName}' gained the unit ${fanGain.toLocaleString()} new fans!` };
                break;

            case 'selfieMV':
                cost = 5000;
                if (money < cost) return setMessage("Not enough money for a selfie MV.");
                let selfieFanGain = 5000;
                if (Math.random() < 0.01) { // 1% viral chance
                    selfieFanGain = 100000;
                    modalPayload = { ...modalPayload, fanGain: selfieFanGain, message: `The selfie MV for '${track.unitName}' went viral! The unit gained an incredible ${selfieFanGain.toLocaleString()} new fans!` };
                } else {
                    modalPayload = { ...modalPayload, fanGain: selfieFanGain, message: `The cute selfie MV from '${track.unitName}' gained them ${selfieFanGain.toLocaleString()} new fans.` };
                }
                distributeFans(selfieFanGain, unitMemberIds);
                unitMemberIds.forEach(id => updateMemberState(id, m => ({ ...m, morale: Math.min(100, m.morale + 10) })));
                break;

            case 'dancePractice':
                cost = 2000;
                if (money < cost) return setMessage("Not enough money for a dance practice video.");
                const avgDance = unitMembers.reduce((sum, m) => sum + (m.dancing || 0), 0) / unitMembers.length;
                let danceConverted = 0;
                unitMembers.forEach(member => {
                    const conversionRate = 0.05 + (avgDance / 1000);
                    const fansToConvert = Math.floor((member.fans?.casual || 0) * conversionRate);
                    danceConverted += fansToConvert;
                    updateMemberState(member.id, m => ({ ...m, fans: { hardcore: (m.fans?.hardcore || 0) + fansToConvert, casual: Math.max(0, (m.fans?.casual || 0) - fansToConvert) } }));
                });
                modalPayload = { ...modalPayload, convertedFans: danceConverted, message: `The sharp dance practice video impressed fans, converting ${danceConverted.toLocaleString()} of them to hardcore supporters.` };
                break;
            
            case 'acousticVideo':
                cost = 4000;
                if (money < cost) return setMessage("Not enough money for an acoustic video.");
                const avgSinging = unitMembers.reduce((sum, m) => sum + (m.singing || 0), 0) / unitMembers.length;
                let singingConverted = 0;
                unitMembers.forEach(member => {
                    const conversionRate = 0.05 + (avgSinging / 800);
                    const fansToConvert = Math.floor((member.fans?.casual || 0) * conversionRate);
                    singingConverted += fansToConvert;
                    updateMemberState(member.id, m => ({ ...m, fans: { hardcore: (m.fans?.hardcore || 0) + fansToConvert, casual: Math.max(0, (m.fans?.casual || 0) - fansToConvert) }, morale: Math.min(100, m.morale + 5) }));
                });
                modalPayload = { ...modalPayload, convertedFans: singingConverted, message: `The beautiful acoustic performance by '${track.unitName}' converted ${singingConverted.toLocaleString()} fans.` };
                break;

            case 'varietySkit':
                cost = 15000;
                if (money < cost) return setMessage("Not enough money for a variety skit.");
                const avgVariety = unitMembers.reduce((sum, m) => sum + (m.variety || 0), 0) / unitMembers.length;
                const varietyFanGain = 10000 + (avgVariety * 100);
                distributeFans(varietyFanGain, unitMemberIds);
                let varietyMessage = `The hilarious variety skit from '${track.unitName}' showed off their personalities, gaining them ${varietyFanGain.toLocaleString()} new fans!`;
                if (avgVariety > 60) {
                    unitMemberIds.forEach(id => updateMemberState(id, m => ({ ...m, variety: Math.min(100, m.variety + 1) })));
                    varietyMessage += " Their variety skill has improved!";
                }
                modalPayload = { ...modalPayload, fanGain: varietyFanGain, message: varietyMessage };
                break;

            case 'socialMediaTakeover':
                cost = 0;
                let socialConverted = 0;
                unitMembers.forEach(member => {
                    const fansToConvert = Math.floor((member.fans?.casual || 0) * 0.05);
                    socialConverted += fansToConvert;
                    updateMemberState(member.id, m => ({ ...m, fans: { hardcore: (m.fans?.hardcore || 0) + fansToConvert, casual: Math.max(0, (m.fans?.casual || 0) - fansToConvert) }, morale: Math.min(100, m.morale + 10) }));
                });
                modalPayload = { ...modalPayload, convertedFans: socialConverted, message: `'${track.unitName}' took over social media for a day, converting ${socialConverted.toLocaleString()} fans!` };
                break;

            case 'gravurePhotoshoot':
                cost = 20000;
                if (money < cost) return setMessage("Not enough money for a gravure shoot.");
                const gravureUnit = unitMembers.sort((a, b) => b.visual - a.visual).slice(0, 3);
                distributeFans(15000, gravureUnit.map(m => m.id));
                modalPayload = { ...modalPayload, fanGain: 15000, message: `A gravure shoot featuring ${gravureUnit.map(m=>m.name).join(', ')} gained them 15,000 new fans.` };
                break;
            
            case 'gamingStream':
                cost = -10000;
                const streamFanGain = 12000;
                distributeFans(streamFanGain, unitMemberIds);
                modalPayload = { ...modalPayload, fanGain: streamFanGain, income: -cost, message: `The sponsored gaming stream by '${track.unitName}' was a success, earning ¥${(-cost).toLocaleString()} and gaining ${streamFanGain.toLocaleString()} fans!` };
                break;

            case 'unitMerch':
                cost = -20000;
                const totalUnitFans = unitMembers.reduce((sum, m) => sum + getTotalFansForMember(m), 0);
                const income = -cost + Math.floor(totalUnitFans / 10);
                cost = -income; // Invert for final calculation
                modalPayload = { ...modalPayload, income, message: `Limited edition merchandise for '${track.unitName}' sold out, earning a total of ¥${income.toLocaleString()}!` };
                break;

            case 'fullMV':
                cost = 400000;
                if (money < cost) return setMessage("Not enough money for a full music video.");
                distributeFans(150000, unitMemberIds);
                unitMemberIds.forEach(id => updateMemberState(id, m => ({ ...m, morale: Math.min(100, m.morale + 25) })));
                modalPayload = { ...modalPayload, fanGain: 150000, message: `The full-budget Music Video for '${track.unitName}' was a massive success, gaining the unit 150,000 new fans!` };
                break;

            case 'miniTour':
                cost = 750000;
                if (money < cost) return setMessage("Not enough money for a mini-tour.");
                let tourConverted = 0;
                unitMembers.forEach(member => {
                    const fansToConvert = Math.floor((member.fans?.casual || 0) * 0.5);
                    tourConverted += fansToConvert;
                    updateMemberState(member.id, m => ({ ...m, fans: { hardcore: (m.fans?.hardcore || 0) + fansToConvert, casual: Math.max(0, (m.fans?.casual || 0) - fansToConvert) }, morale: Math.min(100, m.morale + 50), stamina: Math.max(0, m.stamina - 70), stress: Math.min(100, m.stress + 40), singing: Math.min(100, m.singing + 1), dancing: Math.min(100, m.dancing + 1), charisma: Math.min(100, m.charisma + 1) }));
                });
                distributeFans(100000, unitMemberIds);
                modalPayload = { ...modalPayload, fanGain: 100000, convertedFans: tourConverted, message: `The '${track.unitName}' mini-tour was a legendary success! It gained 100,000 new fans, converted ${tourConverted.toLocaleString()} hardcore fans, and improved member skills!` };
                break;

            default:
                return setMessage("Unknown B-side promotion type.");
        }

        setMoney(prev => prev - cost);
        
        setCompletedBsidePromos(prev => ({
            ...prev,
            [singleId]: {
                ...(prev[singleId] || {}),
                [trackName]: [...(prev[singleId]?.[trackName] || []), promoType]
            }
        }));

        addNotification({ type: 'Promotion', message: modalPayload.message });
        setModalData(modalPayload);
        setShowModal('bsidePromotionResult');
    };
    
        const holdPressConference = (memberId) => {
        const cost = 50000;
        if (money < cost) {
            return setMessage("Not enough money to hold a press conference.");
        }

        const member = getMemberById(memberId);
        if (!member || !member.isCurrentCenter) {
            return setMessage("Only a current Center can hold a press conference.");
        }

        const promotingSingle = songs.find(s => s.chartWeeksLeft > 0 && s.tracks.some(t => t.type === 'title' && (t.center || []).includes(String(memberId))));
        if (!promotingSingle) {
            return setMessage("A press conference can only be held to promote a currently charting single.");
        }

        setMoney(prev => prev - cost);

        // Success chance is based on Charisma and Intelligence
        const successChance = ((member.charisma || 0) + (member.intelligence || 0)) / 250; // Max 80% chance at 100/100

        let notificationMessage = "";

        if (Math.random() < successChance) {
            // SUCCESS
            const salesBoost = 1.15; // 15% boost
            setSongs(prevSongs => prevSongs.map(s => s.id === promotingSingle.id ? { ...s, baseSalesPotential: s.baseSalesPotential * salesBoost } : s));
            
            updateMemberState(memberId, m => ({
                ...m,
                morale: Math.min(100, m.morale + 20),
                stress: Math.max(0, m.stress - 10)
            }));

            notificationMessage = `${member.name}'s press conference was a resounding success! The hype boosted sales potential for "${promotingSingle.name}".`;
        } else {
            // FAILURE
            const salesPenalty = 0.95; // 5% penalty
            setSongs(prevSongs => prevSongs.map(s => s.id === promotingSingle.id ? { ...s, baseSalesPotential: s.baseSalesPotential * salesPenalty } : s));

            updateMemberState(memberId, m => ({
                ...m,
                morale: Math.max(0, m.morale - 15),
                stress: Math.min(100, m.stress + 25)
            }));
            
            notificationMessage = `Oh no! ${member.name} fumbled her words at the press conference, creating some negative buzz for "${promotingSingle.name}".`;
        }
        
        setMessage(notificationMessage);
        addNotification({ type: 'Promotion', message: notificationMessage });
    };


    const executeAlbumRelease = (albumToRelease, initialMembers, initialSisterGroups) => {

let updatedMembers = initialMembers;
let updatedSisterGroups = initialSisterGroups;
    
        const localUpdateMemberState = (memberId, updateFn) => {
             if (!String(memberId).startsWith('sg-')) {
                const memberIndex = updatedMembers.findIndex(m => String(m.id) === String(memberId));
                if (memberIndex > -1) updatedMembers[memberIndex] = updateFn(updatedMembers[memberIndex]);
            } else {
                const [, sgId, mId] = String(memberId).split('-');
                const sgIndex = updatedSisterGroups.findIndex(g => String(g.id) === sgId);
                if (sgIndex > -1) {
                    const memberIndex = (updatedSisterGroups[sgIndex].members || []).findIndex(m => String(m.id) === mId);
                    if (memberIndex > -1) updatedSisterGroups[sgIndex].members[memberIndex] = updateFn(updatedSisterGroups[sgIndex].members[memberIndex]);
                }
            }
        };

        const { albumData, productionData } = albumToRelease;
        const allMemberIdsInAlbum = [...new Set(albumData.tracks.flatMap(t => (t.members || []).map(m => String(m.id))))];      
        allMemberIdsInAlbum.forEach(memberId => {
            localUpdateMemberState(memberId, m => {
                const trainingBuff = {standard: 0, workshop: 5, overseas: 15, bootcamp: 20, elite: 25, oneOnOne: 30}[productionData.training] || 0;
                const moraleBuff = ['custom', 'concept', 'luxury'].includes(productionData.outfits) ? 10 : 0;
                return { ...m, singing: Math.min(100, (m.singing || 0) + trainingBuff), dancing: Math.min(100, (m.dancing || 0) + trainingBuff), morale: Math.min(100, (m.morale || 0) + moraleBuff) };
            });
        });
        
        const allMembersAfterBonuses = [...updatedMembers, ...updatedSisterGroups.flatMap(sg => sg.members || [])];
        const participatingMembers = allMembersAfterBonuses.filter(m => allMemberIdsInAlbum.includes(String(m.rosterId || m.id)));

        const fanSales = participatingMembers.reduce((sum, m) => sum + ((m.fans?.hardcore || 0) * 0.9) + ((m.fans?.casual || 0) * 0.4), 0);
        const avgSkill = participatingMembers.reduce((sum, m) => {
            const skillScore = ((m.singing || 0) * 0.30) + ((m.dancing || 0) * 0.30) + ((m.visual || 0) * 0.20) + ((m.variety || 0) * 0.067) + ((m.charisma || 0) * 0.067) + ((m.intelligence || 0) * 0.066);
            return sum + (m ? skillScore : 0);
        }, 0) / (participatingMembers.length || 1);
        const skillPower = avgSkill * 25;

        let baseSalesPotential = (fanSales * 0.9) + (skillPower * 0.1);
        if (albumData.releaseFormat === 'physical') {
            baseSalesPotential *= 1.25;
        }

        const newFansTotal = Math.floor(200 + (baseSalesPotential / 15 * (fanMultipliers[productionData.mv] || 1) * (promoMultipliers[productionData.promo] || 1)));

        // Distribute fans is a global function that needs to be temporarily local
        const localDistributeFans = (amount, memberIds) => {
             if (!memberIds || memberIds.length === 0) return;
            const pushedMemberIds = memberIds.filter(id => pushedMembers.map(String).includes(String(id)));
            const regularMemberIds = memberIds.filter(id => !pushedMembers.map(String).includes(String(id)));
            const pushedFanPool = Math.floor(amount * 0.5);
            const regularFanPool = amount - pushedFanPool;

            const distribute = (pool, ids) => {
                if (ids.length === 0 || pool === 0) return;
                const weights = ids.map(() => Math.pow(Math.random(), 3));
                const totalWeight = weights.reduce((sum, w) => sum + w, 0);
                let totalGained = 0;
                ids.forEach((memberId, index) => {
                    const fanGain = totalWeight > 0 ? Math.floor((weights[index] / totalWeight) * pool) : Math.floor(pool / ids.length);
                    totalGained += fanGain;
                    const hardcoreGain = Math.floor(fanGain * 0.1);
                    const casualGain = fanGain - hardcoreGain;
                    localUpdateMemberState(memberId, m => ({ ...m, fans: { hardcore: (m.fans.hardcore || 0) + hardcoreGain, casual: (m.fans.casual || 0) + casualGain } }));
                });
                const remainder = pool - totalGained;
                if (remainder > 0 && ids.length > 0) {
                    const hardcoreGain = Math.floor(remainder * 0.1);
                    const casualGain = remainder - hardcoreGain;
                    localUpdateMemberState(ids[0], m => ({ ...m, fans: { hardcore: (m.fans.hardcore || 0) + hardcoreGain, casual: (m.fans.casual || 0) + casualGain } }));
                }
            };
            distribute(pushedFanPool, pushedMemberIds);
            distribute(regularFanPool, regularMemberIds);
        };
        
        localDistributeFans(newFansTotal, allMemberIdsInAlbum);

        let totalCost = baseCostAlbum;
        Object.values(albumToRelease.productionData).forEach(tierKey => {
            for (const category in productionTiers) {
                if (productionTiers[category][tierKey]) {
                    totalCost += productionTiers[category][tierKey].cost;
                }
            }
        });
        if (albumToRelease.albumData.releaseFormat === 'physical') {
            totalCost += albumPhysicalSurcharge;
        }

        const newAlbum = {
            id: Date.now(),
            artist: albumToRelease.albumData.artist,
            targetGroup: albumToRelease.albumData.artist,
            name: albumToRelease.albumData.name,
            type: 'album',
            baseSalesPotential: baseSalesPotential,
            totalSales: 0,
            peakRank: -1,
            salesHistory: [],
            releaseWeek: week,
            tracks: albumToRelease.albumData.tracks,
            releaseFormat: albumToRelease.albumData.releaseFormat,
            production: albumToRelease.productionData,
            productionCost: totalCost,
            chartWeeksLeft: 8,
        };

        if (newAlbum.artist === groupName) {
            setSongs(prev => [...(prev || []), newAlbum]);
        } else {
             const sgIndex = updatedSisterGroups.findIndex(sg => sg.name === newAlbum.artist);
            if (sgIndex > -1) {
                updatedSisterGroups[sgIndex].songs = [...(updatedSisterGroups[sgIndex].songs || []), newAlbum];
            }
        }

        allMemberIdsInAlbum.forEach(memberId => {
            const participatedTracks = albumData.tracks.filter(track =>
                (track.members || []).map(mem => String(mem.id)).includes(String(memberId))
            );    
            if (participatedTracks.length === 0) return;

            localUpdateMemberState(memberId, m => {
                const newSongEntries = participatedTracks.map(track => ({
                    songName: track.name,
                    singleName: albumData.name,
                    week: week,
                    type: 'album',
                    isCenter: (track.center || []).includes(String(memberId)),
                    group: albumData.artist,
                    row: track.lineup ? track.lineup[memberId] : 'N/A',
                }));
                const newCenterEntries = participatedTracks
                    .filter(track => (track.center || []).includes(String(memberId)))
                    .map(track => ({
                        week: week,
                        singleName: albumData.name,
                        songName: track.name,
                        group: albumData.artist,
                        type: 'album'
                    }));

                let newAmbition = m.ambition;
                if (newCenterEntries.length > 0 && m.ambition === 'The Unwilling Idol') {
                    newAmbition = 'Pursue a Solo Dream';
                    addNotification({ type: 'Group', message: `After being made center for a song in the album \\"${albumData.name}\\", a fire has been lit in ${m.name}! Their ambition has changed.` });
                }

                return {
                    ...m,
                    songsParticipation: [...(m.songsParticipation || []), ...newSongEntries],
                    centerHistory: [...(m.centerHistory || []), ...newCenterEntries],
                    ambition: newAmbition,
                };
            });
        });

        const releaseMessage = `RELEASED ALBUM: \"${albumData.name}\"! It will begin charting next week. Initial Hype: +${newFansTotal.toLocaleString()} fans.`;
        addNotification({ type: 'success', message: releaseMessage });
        return { updatedMembers, updatedSisterGroups, releaseMessage };
    };

    const startDraftKaigi = () => {
        const cost = 200000;
        if (money < cost) {
            return setMessage("Not enough money to host a Draft Kaigi. It costs ¥200,000.");
        }
        setMoney(prev => prev - cost);

        const personalities = ['Cheerful', 'Shy', 'Confident', 'Ambitious', 'Easygoing', 'Energetic', 'Quiet', 'Ice Queen', 'Lone Wolf', 'Rebellious', 'Natural Leader', 'Little Sister', 'Stage Genius', 'Hot-headed', 'Mischievous', 'Clumsy', 'Elegant', 'Motherly', 'Bookworm'];
        const comments = [
            "Has a smile that captivates.", "A bit raw, but overflowing with passion.", 
            "Natural stage presence.", "Considered a top-tier visual.", "A diamond in the rough.",
            "Struggles with confidence but has immense talent."
        ];
        
        const prospects = Array.from({ length: 20 }, (_, i) => {
            const potential = Math.floor(Math.random() * 60) + 40; // 40-100
            let potentialGrade = 'C';
            if (potential >= 95) potentialGrade = 'S';
            else if (potential >= 85) potentialGrade = 'A';
            else if (potential >= 70) potentialGrade = 'B';

            const competingInterest = [...rivalGroups].sort(() => 0.5 - Math.random()).slice(0, Math.random() > 0.6 ? 2 : 1).map(r => r.name);

            return {
                id: `prospect_${i}`,
                name: generateRandomMemberName(),
                hometown: generateRandomHometown(),
                vocal: Math.floor(Math.random() * 40) + 30,
                dance: Math.floor(Math.random() * 40) + 30,
                visual: Math.floor(Math.random() * 40) + 30,
                charisma: Math.floor(Math.random() * 40) + 30,
                intelligence: Math.floor(Math.random() * 40) + 30,
                potential,
                potentialGrade,
                personality: personalities[Math.floor(Math.random() * personalities.length)],
                scoutingComment: comments[Math.floor(Math.random() * comments.length)],
                competingInterest,
                nominatedBy: [], // To be filled in the nomination stage
            };
        });

        setDraftProspects(prospects);

        const allDraftingTeams = [
            { id: 'main', name: groupName, type: 'player' },
            ...sisterGroups.map(sg => ({ id: sg.id, name: sg.name, type: 'player' })),
            ...rivalGroups.map(rg => ({ id: rg.id, name: rg.name, type: 'rival' }))
        ];

        setDraftKaigi({
            stage: 'nomination_start', // nomination_start -> nomination_reveal -> draft -> finished
            prospects,
            draftOrder: [],
            picks: [],
            currentPick: 1,
            log: ["The Draft Kaigi is about to begin!"],
            draftingTeams: allDraftingTeams,
            lotteryResults: [],
        });

        setShowModal('draftKaigi');
        addNotification({ type: 'Event', message: 'The annual Draft Kaigi is starting!' });
    };

    const handlePlayerDraftPick = (prospectId) => {
        if (!draftKaigi || !draftKaigi.draftOrder[draftKaigi.currentPick - 1]) return;

        const team = draftKaigi.draftOrder[draftKaigi.currentPick - 1];
        if (team.type !== 'player') return; // Safety check

        const prospect = draftKaigi.prospects.find(p => p.id === prospectId);
        if (!prospect) return;

        const newPick = {
            round: Math.ceil(draftKaigi.currentPick / draftKaigi.draftingTeams.length),
            pick: draftKaigi.currentPick,
            teamId: team.id,
            teamName: team.name,
            prospectId: prospect.id,
            prospectName: prospect.name
        };

        setDraftKaigi(prev => ({
            ...prev,
            picks: [...prev.picks, newPick],
            prospects: prev.prospects.filter(p => p.id !== prospectId),
            log: [...prev.log, `Pick ${prev.currentPick}: ${team.name} selects ${prospect.name}.`],
            currentPick: prev.currentPick + 1,
        }));
    };

    const handleAiDraftPick = () => {
        if (!draftKaigi || !draftKaigi.draftOrder[draftKaigi.currentPick - 1]) return;
        
        const team = draftKaigi.draftOrder[draftKaigi.currentPick - 1];
        if (team.type !== 'rival') return;

        // AI Logic: Pick the best available prospect
        const bestAvailable = [...draftKaigi.prospects].sort((a, b) => b.potential - a.potential)[0];
        if (!bestAvailable) { // No prospects left
            setDraftKaigi(prev => ({...prev, stage: 'finished'}));
            return;
        };

        const newPick = {
            round: Math.ceil(draftKaigi.currentPick / draftKaigi.draftingTeams.length),
            pick: draftKaigi.currentPick,
            teamId: team.id,
            teamName: team.name,
            prospectId: bestAvailable.id,
            prospectName: bestAvailable.name
        };

        setDraftKaigi(prev => ({
            ...prev,
            picks: [...prev.picks, newPick],
            prospects: prev.prospects.filter(p => p.id !== bestAvailable.id),
            log: [...prev.log, `Pick ${prev.currentPick}: ${team.name} selects ${bestAvailable.name}.`],
            currentPick: prev.currentPick + 1,
        }));
    };

    const finishDraft = () => {
        if (!draftKaigi) return;
        const playerPicks = draftKaigi.picks.filter(p => {
            const team = draftKaigi.draftingTeams.find(t => t.id === p.teamId);
            return team && team.type === 'player';
        });

        if (playerPicks.length > 0) {
            const allProspects = draftProspects;
            const generationName = `${Math.floor(week / 52) + 2025} Draft Class`;
            
            const picksByGroup = playerPicks.reduce((acc, pick) => {
                if (!acc[pick.teamId]) acc[pick.teamId] = [];
                const prospectData = allProspects.find(p => p.id === pick.prospectId);
                if (prospectData) acc[pick.teamId].push(prospectData);
                return acc;
            }, {});

            Object.keys(picksByGroup).forEach(teamId => {
                const prospectsForTeam = picksByGroup[teamId];
                const totalFee = prospectsForTeam.length * 10000;
                setMoney(prev => prev - totalFee);

                const isMainGroup = teamId === 'main';
                const targetGroupId = isMainGroup ? 'main' : parseInt(teamId, 10);
                confirmRecruitment(prospectsForTeam.map(p => ({...p, vocal: p.vocal, dance: p.dance, visual: p.visual, charisma: p.charisma, intelligence: p.intelligence})), {targetGroup: targetGroupId, generationName, contractFee: 10000});
            });
            addNotification({ type: 'Recruitment', message: `Successfully drafted ${playerPicks.length} new members!` });
        }

        setDraftKaigi(null);
        setDraftProspects([]);
        setShowModal(null);
    };

    const advanceDraftStage = (nextStage, payload = {}) => {
        if (!draftKaigi) return;
        let updatedKaigi = { ...draftKaigi };

        switch(nextStage) {
            case 'process_nominations': {
                const { playerNominationId } = payload;
                let prospectsWithNoms = [...updatedKaigi.prospects];
                const playerTeam = updatedKaigi.draftingTeams.find(t => t.id === 'main');

                if (playerNominationId && playerTeam) {
                    const prospectIndex = prospectsWithNoms.findIndex(p => p.id === playerNominationId);
                    if (prospectIndex !== -1) prospectsWithNoms[prospectIndex].nominatedBy.push(playerTeam);
                }

                const topProspects = prospectsWithNoms.filter(p => p.potentialGrade === 'S');
                const rivalTeams = updatedKaigi.draftingTeams.filter(t => t.type === 'rival');

                rivalTeams.forEach(rival => {
                    if (topProspects.length > 0) {
                        const targetProspect = topProspects[Math.floor(Math.random() * topProspects.length)];
                        const prospectIndex = prospectsWithNoms.findIndex(p => p.id === targetProspect.id);
                        if (prospectIndex !== -1 && !prospectsWithNoms.some(p => p.nominatedBy.some(n => n.id === rival.id))) {
                            prospectsWithNoms[prospectIndex].nominatedBy.push(rival);
                        }
                    }
                });
                
                updatedKaigi.prospects = prospectsWithNoms;
                updatedKaigi.stage = 'nomination_reveal';
                updatedKaigi.log.push("Nominations are in!");
                break;
            }
            case 'run_lottery': {
                const { prospectId } = payload;
                const prospect = updatedKaigi.prospects.find(p => p.id === prospectId);
                if (!prospect || prospect.nominatedBy.length <= 1) break;

                const winner = prospect.nominatedBy[Math.floor(Math.random() * prospect.nominatedBy.length)];
                
                updatedKaigi.lotteryResults = [...updatedKaigi.lotteryResults, { prospectId, winnerId: winner.id, winnerName: winner.name }];
                updatedKaigi.log = [...updatedKaigi.log, `${winner.name} won negotiation rights for ${prospect.name}!`];
                updatedKaigi.picks = [...updatedKaigi.picks, {
                    round: 'Nomination',
                    pick: updatedKaigi.picks.length + 1,
                    teamId: winner.id,
                    teamName: winner.name,
                    prospectId: prospect.id,
                    prospectName: prospect.name
                }];
                break;
            }
            case 'start_snake_draft': {
                const pickedProspectIds = new Set(updatedKaigi.picks.map(p => p.prospectId));
                const singleNomineePicks = updatedKaigi.prospects
                    .filter(p => p.nominatedBy.length === 1 && !pickedProspectIds.has(p.id))
                    .map(p => ({
                        round: 'Nomination',
                        pick: 0, // indicates auto-pick
                        teamId: p.nominatedBy[0].id,
                        teamName: p.nominatedBy[0].name,
                        prospectId: p.id,
                        prospectName: p.name,
                    }));
                
                singleNomineePicks.forEach(pick => {
                    updatedKaigi.log.push(`${pick.teamName} automatically selects ${pick.prospectName}.`);
                });
                
                const allPicks = [...updatedKaigi.picks, ...singleNomineePicks];
                const allPickedIds = new Set(allPicks.map(p => p.prospectId));

                const remainingProspects = draftProspects.filter(p => !allPickedIds.has(p.id));
                const shuffledTeams = [...updatedKaigi.draftingTeams].sort(() => 0.5 - Math.random());
                
                updatedKaigi.stage = 'draft';
                updatedKaigi.draftOrder = [...shuffledTeams, ...shuffledTeams.reverse()];
                updatedKaigi.prospects = remainingProspects;
                updatedKaigi.picks = allPicks;
                updatedKaigi.currentPick = 1;
                updatedKaigi.log.push("The snake draft will now begin!");
                break;
            }
        }
        setDraftKaigi(updatedKaigi);
    };

const runAnnualAwards = () => {
    const currentYear = Math.floor((week - 1) / 52) + 2025;
    const startOfWeekYear = (currentYear - 2025) * 52 + 1;

    // --- Data Collection ---
    const allMembers = getMainGroupRoster();
    const allSongs = [...songs, ...sisterGroups.flatMap(sg => sg.songs || [])];

    // --- Award 1: Rookie of the Year ---
    const MIN_FANS_FOR_ROOKIE = 1000;
    // THIS IS THE FIX: We now explicitly check the fan counts here, not relying on the helper function.
    const rookies = allMembers.filter(m => {
        const joinEvent = (m.teamHistory || []).find(e => e.event.includes('Joined'));
        const totalFans = (m.fans?.casual || 0) + (m.fans?.hardcore || 0);
        return joinEvent && joinEvent.week >= startOfWeekYear && totalFans >= MIN_FANS_FOR_ROOKIE;
    });

    const rookieOfTheYear = rookies.length > 0
        ? [...rookies].sort((a, b) => getTotalFansForMember(b) - getTotalFansForMember(a))[0]
        : null;

    let rookieWinner;
    if (rookieOfTheYear) {
        rookieWinner = { 
            name: rookieOfTheYear.name, 
            id: rookieOfTheYear.rosterId || rookieOfTheYear.id, 
            group: getMemberGroupStatus(rookieOfTheYear).split(' | ')[0],
            isRival: false,
            fans: getTotalFansForMember(rookieOfTheYear)
        };
        setMoney(prev => prev + 250000);
        updateMemberState(rookieOfTheYear.rosterId || rookieOfTheYear.id, m => ({ ...m, morale: 100 }));
        addNotification({ type: 'Awards', message: `Rookie of the Year: ${rookieOfTheYear.name}! (+¥250,000)` });
    } else {
        const topRival = rivalGroups.sort((a,b) => b.fans - a.fans)[0];
        rookieWinner = { name: `A rising star from ${topRival.name}`, group: topRival.name, isRival: true };
        addNotification({ type: 'Awards', message: `The group didn't have a strong enough rookie to win this year.` });
    }

    // --- Award 2: Song of the Year ---
    const MIN_SALES_FOR_SONG = 50000;
    const songsThisYear = allSongs.filter(s => s.releaseWeek >= startOfWeekYear && s.type === 'single' && (s.totalSales || 0) >= MIN_SALES_FOR_SONG);
    
    const songOfTheYear = songsThisYear.length > 0
        ? [...songsThisYear].sort((a, b) => (b.totalSales || 0) - (a.totalSales || 0))[0]
        : null;

    let songWinner;
    if (songOfTheYear) {
        const ownerGroup = songOfTheYear.targetGroup === 'main' ? groupName : sisterGroups.find(sg => String(sg.id) === String(songOfTheYear.targetGroup))?.name;
        songWinner = { 
            name: songOfTheYear.name, 
            sales: songOfTheYear.totalSales,
            group: ownerGroup,
            isRival: false
        };
        setMoney(prev => prev + 500000);
        setGroupReputation(prev => prev + 2);
        addNotification({ type: 'Awards', message: `Song of the Year: "${songOfTheYear.name}"! (+¥500,000, +2 Rep)` });
    } else {
        const topRival = rivalGroups.sort((a,b) => b.fans - a.fans)[0];
        songWinner = { name: `A viral hit from ${topRival.name}`, sales: Math.floor(Math.random() * (200000 - 60000) + 60000), group: topRival.name, isRival: true };
        addNotification({ type: 'Awards', message: `No song was popular enough to win Song of the Year.` });
    }

    // --- Award 3: Idol of the Year ---
    const MIN_FANS_FOR_IDOL = 10000;
    // THIS IS THE FIX: We also explicitly check the fan counts here.
    const eligibleIdols = allMembers.filter(m => {
        const totalFans = (m.fans?.casual || 0) + (m.fans?.hardcore || 0);
        return totalFans >= MIN_FANS_FOR_IDOL;
    });

    const idolOfTheYear = eligibleIdols.length > 0
        ? [...eligibleIdols].sort((a, b) => getTotalFansForMember(b) - getTotalFansForMember(a))[0]
        : null;

    let idolWinner;
    if (idolOfTheYear) {
        idolWinner = {
            name: idolOfTheYear.name,
            id: idolOfTheYear.rosterId || idolOfTheYear.id,
            fans: getTotalFansForMember(idolOfTheYear),
            group: getMemberGroupStatus(idolOfTheYear).split(' | ')[0],
            isRival: false
        };
        setMoney(prev => prev + 1000000);
        setGroupReputation(prev => prev + 3);
        updateMemberState(idolOfTheYear.rosterId || idolOfTheYear.id, m => ({ ...m, morale: 100 }));
        addNotification({ type: 'Awards', message: `Idol of the Year: ${idolOfTheYear.name}! (+¥1,000,000, +3 Rep)` });
    } else {
        const topRival = rivalGroups.sort((a,b) => b.fans - a.fans)[0];
        const rivalFans = Math.floor(topRival.fans / (topRival.membersCount * 0.8));
        idolWinner = { name: `The star member of ${topRival.name}`, fans: rivalFans, group: topRival.name, isRival: true };
        addNotification({ type: 'Awards', message: `${topRival.name} took home the Idol of the Year award this time.` });
    }

    // --- Store History & Show Modal ---
    const historyEntry = {
        week,
        year: currentYear,
        rookieOfTheYear: rookieWinner,
        songOfTheYear: songWinner,
        idolOfTheYear: idolWinner,
    };

    setAnnualAwardsHistory(prev => [historyEntry, ...prev]);

    setModalData(historyEntry);
    setShowModal('annualAwardsResult');
    return false; // Let the week advance while the modal is shown
};


    const nextWeek = () => {

            let rivalsForUpdate = JSON.parse(JSON.stringify(rivalGroups));

        // --- 0. KOUHAKU EVENT CYCLE ---
        // This now runs at the START of the function to ensure it uses the CURRENT week number.
        if (kouhakuInvitationAccepted && week % 52 === 0) {
            const { performers, fanGain, reputationGain, historyEntry } = executeKouhakuPerformance(
                JSON.parse(JSON.stringify(members)), 
                JSON.parse(JSON.stringify(sisterGroups))
            );
            
            const performerIds = performers.map(p => p.rosterId || p.id);
            performerIds.forEach(id => {
                updateMemberState(id, m => ({
                    ...m,
                    isAvailable: true,
                    currentActivity: null,
                    activityEnd: null,
                    morale: 100,
                    stamina: 20,
                }));
            });
            
            distributeFans(fanGain, performerIds);
            setGroupReputation(prev => prev + reputationGain);

            const kouhakuPerformanceForHistory = {
    id: Date.now(),
    name: `Kouhaku Uta Gassen`,
    category: "Special Event",
    week: week,
    cost: 5000000, // The participation fee
    revenue: 0,
    profit: -5000000,
    fansGained: fanGain,
    attendance: 0, // Not applicable for this event type
    capacity: 0,
    members: performerIds,
    tracks: [{ type: 'song', item: { name: historyEntry.songName } }],
    targetGroup: 'All',
    kageAna: '',
    shimeAna: '',
};
setPerformanceHistory(prev => [kouhakuPerformanceForHistory, ...prev]);

            setKouhakuHistory(prev => [historyEntry, ...prev]);
            setKouhakuInvitationAccepted(false);
            setKouhakuInvitationOffered(false);
            setKouhakuPrep(null);

            setModalData({
                songName: historyEntry.songName,
                fanGain: historyEntry.fanGain,
                performers: performers,
            });
            setShowModal('kouhakuResult');
            
            setMessage(`The group's performance at Kouhaku was a huge success, gaining ${fanGain.toLocaleString()} new fans!`);
            setWeek(prev => prev + 1); 
            return; 
        }        
        
        // --- 1. SETUP & INITIALIZATION ---
        // The newWeek number is calculated once.
        const newWeek = week + 1;

// --- ANNUAL AWARDS EVENT ---
if ((newWeek - 1) % 52 === 49) { // Trigger at the end of Week 49
    runAnnualAwards(); // This will show the modal on Week 50
    }
                    
        // This is the correct placement for the yearly checks.
        if (newWeek > 1 && (newWeek - 1) % 52 === 0) { // On the first week of a new year
            setKouhakuInvitationOffered(false);
            setKouhakuInvitationAccepted(false);
        }
        if ((newWeek -1) % 52 === 47) { // At the end of week 47
          checkForKouhakuInvitation();
        }

        // Create temporary, "draft" copies of all state variables that will be changed.
        // We will do all our calculations on these drafts.
        let membersForUpdate = JSON.parse(JSON.stringify(members));
        let sisterGroupsForUpdate = JSON.parse(JSON.stringify(sisterGroups));
        let songsForUpdate = JSON.parse(JSON.stringify(songs || []));
        let moneyForUpdate = money;
        let notificationsForUpdate = [...notifications];
        let messageForUpdate = '';
        let priorityMessage = '';
        let tempVotingTickets = votingTickets;
        let graduatingIdsThisWeek = [];
        let hallOfFameForUpdate = JSON.parse(JSON.stringify(hallOfFame)); // <--- ADD THIS LINE

        // --- MERCH FIX: Initialize draft inventories ONCE ---
        let tempMerchInv = JSON.parse(JSON.stringify(merchInventory));
        let tempIdolMerchInv = JSON.parse(JSON.stringify(idolMerchInventory));
        let tempElectionVotePool = electionVotePool;
        // --- END FIX ---

        // Reset simple weekly flags. This is safe to do directly.
        setMediaJobDoneThisWeek(false);
        setGroupMediaJobDoneThisWeek(false);
        setHasPerformedThisWeek(false);

        // --- LOCAL HELPER FUNCTIONS ---
        // These are special functions that only work inside `nextWeek`.
        // They modify our "draft" variables, preventing state update race conditions.
        const addNotificationInLoop = (notification) => {
            const title = notification.type.charAt(0).toUpperCase() + notification.type.slice(1);
            const newNotification = {
                id: `${Date.now()}-${Math.random()}`,
                week: week, // Log against the week the action happened
                title: title,
                content: notification.message
            };
            notificationsForUpdate = [newNotification, ...notificationsForUpdate].slice(0, 50);
        };

        const localUpdateMemberState = (memberId, updateFn) => {
            let found = false;
            // Update main group members
            let mainMemberIndex = membersForUpdate.findIndex(m => String(m.id) === String(memberId));
            if (mainMemberIndex !== -1) {
                membersForUpdate[mainMemberIndex] = updateFn(membersForUpdate[mainMemberIndex]);
                found = true;
            }

            // Update sister group members
            if (!found) {
                for (let i = 0; i < sisterGroupsForUpdate.length; i++) {
                    const sg = sisterGroupsForUpdate[i];
                    // Correctly construct the sister group member's roster ID for comparison
                    const memberIndex = (sg.members || []).findIndex(m => `sg-${sg.id}-${m.id}` === String(memberId));
                    if (memberIndex !== -1) {
                        sisterGroupsForUpdate[i].members[memberIndex] = updateFn(sg.members[memberIndex]);
                        break; 
                    }
                }
            }
        };

        const localDistributeFans = (amount, memberIds) => {
            if (!memberIds || memberIds.length === 0) return;
            const pushedMemberIds = pushedMembers.map(String);
            const memberFanWeights = memberIds.map(id => {
                const member = getMemberById(id); // Assumes getMemberById can find members in the original state arrays
                if (!member) return { id, weight: 0 };
                
                const isPushed = pushedMemberIds.includes(String(id));
                const fanCount = getTotalFansForMember(member);
                // Give pushed members and members with fewer fans a higher chance to gain more
                const weight = (isPushed ? 2.0 : 1.0) / (fanCount + 1000); 
                return { id, weight };
            });

            const totalWeight = memberFanWeights.reduce((sum, m) => sum + m.weight, 0);

            if (totalWeight === 0) return; // Avoid division by zero

            let distributedFans = 0;
            memberFanWeights.forEach(({ id, weight }) => {
                const fanGain = Math.floor((weight / totalWeight) * amount);
                distributedFans += fanGain;
                const hardcoreGain = Math.floor(fanGain * 0.15); // Standardized conversion rate
                const casualGain = fanGain - hardcoreGain;
                localUpdateMemberState(id, m => ({ ...m, fans: { hardcore: (m.fans?.hardcore || 0) + hardcoreGain, casual: (m.fans?.casual || 0) + casualGain } }));
            });

            // Distribute any remainder to the first member
            const remainder = amount - distributedFans;
            if (remainder > 0 && memberIds.length > 0) {
                 const hardcoreGain = Math.floor(remainder * 0.15);
                 const casualGain = remainder - hardcoreGain;
                 localUpdateMemberState(memberIds[0], m => ({ ...m, fans: { hardcore: (m.fans.hardcore || 0) + hardcoreGain, casual: (m.fans.casual || 0) + casualGain } }));
            }
        };


        // --- 2. HANDLE EARLY EXITS (Actions that pause the game) ---
// --- REQUEST HOUR COMPLETION ---
if (requestHourStatus && requestHourStatus.isActive && newWeek > requestHourStatus.endWeek) {
    executeRequestHourConcert();
    return; // Pause the game loop to show the results.
}

                // --- ELECTION CAMPAIGN COMPLETION ---
        // This checks if the campaign period is over and if we are waiting for an election single to finish charting.
        const isChartingElectionSingle = songs.some(s => s.isElectionSingle && s.chartWeeksLeft > 0);

        if (isCampaignActive && newWeek >= campaignEndWeek && !isChartingElectionSingle) {
            // If the campaign is over and we are NOT waiting on a single, hold the election.
            setIsCampaignActive(false); // Stop the campaign countdown
            holdElection(); // This function opens the election results modal
            return; // IMPORTANT: This pauses the rest of the weekly updates to show the modal.
        }


        // Handle tours, which is a separate game loop.
        if (activeTour) return progressTour();

        // Handle random scandal event, which opens a modal and pauses the week.
        const scandalRoll = Math.random();
        if (scandalRoll < 0.05 && members.length > 0) {
            const target = members[Math.floor(Math.random() * members.length)];
            const scandalsByImpact = {
                low: [
                    {
                      type: 'Reported Rudeness to Staff',
                      severity: 'Low',
                      description: 'An anonymous staff member has posted online about being treated poorly by the member. Fans are questioning their beloved idol\'s true personality behind the scenes.',
                      baseFanLoss: 0.05,
                      baseMoraleHit: 15,
                      baseUrgency: 20,
                    },
                    {
                      type: 'Family Member Causing Trouble',
                      severity: 'Low',
                      description: 'A parent or sibling of the member has made controversial statements online or is using their connection for personal gain, causing a backlash by association.',
                      baseFanLoss: 0.03,
                      baseMoraleHit: 20,
                      baseUrgency: 15,
                    },
                  ],
                  mid: [
                    {
                      type: 'Leaked Private Messages',
                      severity: 'Mid',
                      description: 'Screenshots of a private conversation have been leaked online. In them, the member complains about work, the fans, or another member in a negative light. The sense of betrayal is palpable.',
                      baseFanLoss: 0.10,
                      baseMoraleHit: 25,
                      baseUrgency: 30,
                    },
                    {
                      type: 'Past Bullying Rumors',
                      severity: 'Mid',
                      description: 'An old classmate has come forward with allegations of bullying from the member\'s school days. The story is spreading fast, with netizens digging for "proof".',
                      baseFanLoss: 0.12,
                      baseMoraleHit: 35,
                      baseUrgency: 35,
                    },
                    {
                      type: 'Association with a Disreputable Person',
                      severity: 'Mid',
                      description: 'The member was spotted with an individual known for shady business or a bad reputation. The media is questioning their judgment and character by association.',
                      baseFanLoss: 0.08,
                      baseMoraleHit: 25,
                      baseUrgency: 25,
                    },
                  ],
                  high: [
                    {
                      type: 'Paparazzi Dating Photo',
                      severity: 'High',
                      description: 'A blurry photo surfaces showing a member getting too close to an unidentified person in a private setting. The media is speculating about a secret relationship, and fans are in an uproar.',
                      baseFanLoss: 0.15,
                      baseMoraleHit: 30,
                      baseUrgency: 40,
                    },
                    {
                      type: 'Underage Drinking/Smoking Allegation',
                      severity: 'High',
                      description: 'A photo from a party, possibly old, shows the member near alcoholic beverages or cigarettes. Even if untrue, the allegation is damaging public perception and tainting their pure image.',
                      baseFanLoss: 0.20,
                      baseMoraleHit: 40,
                      baseUrgency: 50,
                    },
                  ],
                };
                      let scandal;
            const impactRoll = Math.random();
            if (impactRoll < 0.05) { scandal = scandalsByImpact.high[Math.floor(Math.random() * scandalsByImpact.high.length)]; }
            else if (impactRoll < 0.30) { scandal = scandalsByImpact.mid[Math.floor(Math.random() * scandalsByImpact.mid.length)]; }
            else { scandal = scandalsByImpact.low[Math.floor(Math.random() * scandalsByImpact.low.length)]; }

            setActiveScandal({ member: target, scandal: scandal });
            setShowModal('scandalDecision');
            return; // Stop the rest of nextWeek to focus on the decision
        }

        // --- 3. PROCESS SCHEDULED WEEKLY EVENTS ---

        // --- MERCHANDISE DELIVERY ---
        const deliveredItems = pendingMerch.filter(item => item.deliveryWeek === newWeek);
        if (deliveredItems.length > 0) {
            let deliverySummary = [];
            deliveredItems.forEach(item => {
                if (item.type === 'regular') {
                    // MERCH FIX: Modify the draft variable
                    tempMerchInv[item.key] = (tempMerchInv[item.key] || 0) + item.amount;
                } else if (item.type === 'idol') {
                    // MERCH FIX: Modify the draft variable
                    tempIdolMerchInv[item.key] = (tempIdolMerchInv[item.key] || 0) + item.amount;
                }
                deliverySummary.push(`${item.amount}x ${item.name}`);
            });

            // MERCH FIX: Remove direct state updates from here
            setPendingMerch(prev => prev.filter(item => item.deliveryWeek !== newWeek));
            addNotificationInLoop({ type: 'Delivery', message: `Merchandise delivered: ${deliverySummary.join(', ')}.` });
        }


            // --- GRADUATION & FINAL EVENTS ---
            const eventsForNextWeek = scheduledEvents.filter(e => e.week === newWeek);
            let shouldReturnAfterEvent = false;

            if (eventsForNextWeek.length > 0) {
                // 1. Separate graduation events from others to prioritize them.
                const graduationEvents = eventsForNextWeek.filter(e => e.type === 'FINAL_GRADUATION');
                const otherScheduledEvents = eventsForNextWeek.filter(e => e.type !== 'FINAL_GRADUATION');

                // 2. Process all graduations FIRST. This is the crucial change.
                if (graduationEvents.length > 0) {
                    graduationEvents.forEach(event => {
                        let graduatedMember = null;
                        let memberFound = false;
                        const memberId = String(event.memberId);
                        let homeGroupName = '';

                        // Search in main group
                        const mainMemberIndex = membersForUpdate.findIndex(m => String(m.id) === memberId);
                        if (mainMemberIndex !== -1) {
                            graduatedMember = { ...membersForUpdate[mainMemberIndex] };
                            homeGroupName = groupName;
                            memberFound = true;
                        }

                        // Search in sister groups
                        if (!memberFound) {
                            for (let i = 0; i < sisterGroupsForUpdate.length; i++) {
                                const sg = sisterGroupsForUpdate[i];
                                const memberIndex = (sg.members || []).findIndex(m => `sg-${sg.id}-${m.id}` === memberId);
                                if (memberIndex !== -1) {
                                    graduatedMember = { ...sg.members[memberIndex], id: memberId };
                                    homeGroupName = sg.name;
                                    memberFound = true;
                                    break;
                                }
                            }
                        }

                        if (graduatedMember) {
                            const gradEvent = { week: newWeek, event: `Graduated from ${homeGroupName}` };
                            graduatedMember.teamHistory = [...(graduatedMember.teamHistory || []), gradEvent];
                            graduatedMember.graduated = true;
                            graduatedMember.isGraduating = false;
                            graduatedMember.graduationWeek = undefined;
                            
                            hallOfFameForUpdate.push(graduatedMember);
                            graduatingIdsThisWeek.push(memberId);
                            
                            priorityMessage = `${graduatedMember.name} has officially graduated and entered the Hall of Fame.`;
                        }
                    });
                }

                // 3. Now, process other events that might show modals.
                if (otherScheduledEvents.length > 0) {
                    otherScheduledEvents.forEach(event => {
                        if (shouldReturnAfterEvent) return;

                        if (event.type === 'FINAL_HANDSHAKE') {
                            const member = getMemberById(event.memberId);
                            if (member) {
                                const charismaModifier = (member.charisma || 0) / 200;
                                const fansToConvert = Math.floor((member.fans?.casual || 0) * (0.25 + charismaModifier));
                                const newCasualFans = Math.floor(getTotalFansForMember(member) * (0.05 + charismaModifier)) + 500;

                                localUpdateMemberState(member.rosterId || member.id, m => ({
                                    ...m,
                                    fans: { hardcore: (m.fans.hardcore || 0) + fansToConvert, casual: Math.max(0, (m.fans.casual || 0) - fansToConvert) + newCasualFans },
                                    morale: Math.min(100, (m.morale || 0) + 20)
                                }));
                                
                                addNotificationInLoop({ type: 'Event', message: `${member.name}'s final handshake event was a huge success.` });
                                setModalData({ convertedFans: fansToConvert, newFans: newCasualFans, members: [member], isFinal: true });
                                setShowModal('handshakeResult');
                                shouldReturnAfterEvent = true;
                            }
                        } else if (event.type === 'FINAL_THEATER_SHOW') {
                            const gradMember = getMemberById(event.memberId);
                            if (gradMember) {
                                let performingVenue = null;
                                const homeGroupId = gradMember.isSisterMember ? String(gradMember.groupId) : 'main';
                                performingVenue = theaters.find(t => t.owner === homeGroupId);
                                if (!performingVenue) performingVenue = theaters.find(t => t.owner === 'main');
                                if (!performingVenue && theaters.length > 0) performingVenue = theaters[0];

                                if (performingVenue) {
                                    const team = teams.find(t => t.members.includes(String(gradMember.rosterId || gradMember.id)));
                                    holdTheaterShow({
                                        teamId: team ? team.id : null,
                                        venueOwnerId: performingVenue.owner,
                                        concertTheme: 'classic',
                                        travelCost: 0,
                                        centerMemberId: gradMember.rosterId || gradMember.id,
                                        concertName: `${gradMember.name}'s Graduation Stage` 
                                    });
                                    shouldReturnAfterEvent = true;
                                } else {
                                    localUpdateMemberState(gradMember.rosterId || gradMember.id, m => ({ ...m, fans: { hardcore: (m.fans.hardcore || 0) + 250, casual: (m.fans.casual || 0) + 1000 } }));
                                    priorityMessage = `The group held a touching final performance for ${gradMember.name}, gaining them new fans.`;
                                    addNotificationInLoop({ type: 'Event', message: priorityMessage });
                                }
                            }
                        }
                    });
                }

                // 4. Clean up all of this week's events and potentially pause the game loop.
                setScheduledEvents(prev => prev.filter(e => e.week !== newWeek));
                if (shouldReturnAfterEvent) {
                    return;
                }
            }

                if (isCampaignActive && newWeek >= campaignEndWeek) {
            setIsCampaignActive(false);
            addNotificationInLoop({ type: 'Election', message: 'The election campaign has ended! The results will be announced soon.' });
        }


        // --- SINGLE & ALBUM RELEASES ---
        const releasesForThisWeek = scheduledSingles.filter(r => r.releaseWeek === newWeek);
        if (releasesForThisWeek.length > 0) {
            releasesForThisWeek.forEach(release => {
                // We pass our DRAFT arrays into the release functions.
                const result = release.type === 'album'
                    ? executeAlbumRelease(release, membersForUpdate, sisterGroupsForUpdate)
                    : executeSongRelease(release, membersForUpdate, sisterGroupsForUpdate, songsForUpdate); // <-- THE FIX IS HERE
                
                if (result) {
                    // The functions return updated member/group drafts, which we accept for this loop.
                    membersForUpdate = result.updatedMembers;
                    sisterGroupsForUpdate = result.updatedSisterGroups;

                    if (result.newSong) {
                         if (result.newSong.targetGroup === 'main' || result.newSong.targetGroup === groupName) {
                            songsForUpdate.push(result.newSong);
                        }
                    }

                    if (result.releaseMessage && !priorityMessage) {
                        priorityMessage = result.releaseMessage;
                    }
                }
            });
             // We update the state directly here as it's safe.
            setScheduledSingles(prev => prev.filter(r => r.releaseWeek !== newWeek));
        }

        // --- 4. CALCULATE ALL INCOME STREAMS ---

        let incomeBreakdown = [];
        let totalWeeklyIncome = 0;
        
        
        // --- ENDORSEMENT INCOME ---
        // This must be calculated *before* chart sales decrement the weeks left on a single.
        let endorsementIncome = 0;
        const tempMembersForEndorsements = JSON.parse(JSON.stringify(membersForUpdate));
        
        tempMembersForEndorsements.forEach(member => {
            if (member.endorsement) {
                const single = songsForUpdate.find(s => s.id === member.endorsement.singleId);
                // A single's promotion ends when it's about to have its last chart week (weeksLeft <= 1)
                if (!single || single.chartWeeksLeft <= 1) {
                    localUpdateMemberState(member.rosterId || member.id, m => {
                        const { endorsement, ...rest } = m; // This removes the endorsement from the member object
                        return rest;
                    });
                    addNotificationInLoop({ type: 'Info', message: `${member.name}'s solo endorsement deal has successfully concluded.` });
                } else {
                    endorsementIncome += member.endorsement.weeklyIncome;
                }
            }
        });
        if (endorsementIncome > 0) {
            incomeBreakdown.push(`Endorsements: ¥${endorsementIncome.toLocaleString()}`);
            totalWeeklyIncome += endorsementIncome;
        }

        // --- ONLINE STORE WEEKLY SALES ---
        if (onlineStore.level > 0) {
            let onlineStoreRevenue = 0;
            const itemsToSellPerTier = onlineStore.level * 50;

            // MERCH FIX: Logic now reads from and modifies the draft variables
            Object.keys(tempMerchInv).forEach(key => {
                if (tempMerchInv[key] > 0) {
                    const toSell = Math.min(tempMerchInv[key], itemsToSellPerTier);
                    const [item, tier] = key.split('_');
                    const tierInfo = merchTiers[item]?.[tier];
                    if (tierInfo) {
                        onlineStoreRevenue += toSell * tierInfo.price;
                        tempMerchInv[key] -= toSell;
                        if (tempMerchInv[key] === 0) {
                            addNotificationInLoop({ type: 'Sales', message: `Online Store: ${tierInfo.name} has sold out!` });
                        }
                    }
                }
            });

            // MERCH FIX: Logic now reads from and modifies the draft variables
            Object.keys(tempIdolMerchInv).forEach(key => {
                if (tempIdolMerchInv[key] > 0) {
                    const toSell = Math.min(tempIdolMerchInv[key], itemsToSellPerTier);
                    const [memberId, itemType] = key.split('_');
                    const tierInfo = idolMerchTiers[itemType];
                    const member = getMemberById(memberId);
                    if (tierInfo && member) {
                        onlineStoreRevenue += toSell * tierInfo.price;
                        tempIdolMerchInv[key] -= toSell;
                        if (tempIdolMerchInv[key] === 0) {
                            addNotificationInLoop({ type: 'Sales', message: `Online Store: ${member.name}'s ${tierInfo.name} has sold out!` });
                            localUpdateMemberState(memberId, m => ({ ...m, fans: { ...m.fans, casual: (m.fans.casual || 0) + 100 }}));
                        }
                    }
                }
            });

            if (onlineStoreRevenue > 0) {
                if (staff.merchManager > 0) {
                    onlineStoreRevenue = Math.floor(onlineStoreRevenue * (1 + (staff.merchManager * 0.05)));
                }
                incomeBreakdown.push(`Online Store: ¥${onlineStoreRevenue.toLocaleString()}`);
                totalWeeklyIncome += onlineStoreRevenue;
                addNotificationInLoop({ type: 'Sales', message: `Online store sold merchandise for ¥${onlineStoreRevenue.toLocaleString()}.` });
            }
        }

        // --- THEATER SHOW INCOME ---
        const mainGroupTheater = theaters.find(t => t.owner === 'main');
        if (mainGroupTheater && mainGroupTheater.level > 0) {
            const capacity = getTheaterCapacity(mainGroupTheater.level);
            const ticketPrice = getTicketPrice(mainGroupTheater.level);
            const avgFanFame = (membersForUpdate.reduce((acc, m) => acc + getTotalFansForMember(m), 0) / (membersForUpdate.length || 1)) / 10000;
            const attendance = Math.min(capacity, Math.floor(capacity * (avgFanFame * 0.5 + Math.random() * 0.5)));
            const theaterRevenue = attendance * ticketPrice;

            if (theaterRevenue > 0) {
                incomeBreakdown.push(`Theater: ¥${theaterRevenue.toLocaleString()}`);
                totalWeeklyIncome += theaterRevenue;
            }

            if (isCampaignActive) {
                const theaterVotes = Math.floor(attendance / 10);
                if (theaterVotes > 0) {
                    tempElectionVotePool += theaterVotes;
                    addNotificationInLoop({ type: 'Election', message: `+${theaterVotes.toLocaleString()} votes added from this week's theater show!` });
                }
            }
        }
        
        // --- OTHER INCOME STREAMS ---
        const sisterIncome = (sisterGroupsForUpdate || []).reduce((s, g) => s + (g.income || 0), 0);
        if (sisterIncome > 0) { incomeBreakdown.push(`Sister Groups: ¥${sisterIncome.toLocaleString()}`); totalWeeklyIncome += sisterIncome; }
        const varietyIncome = (varietyShows || []).reduce((s, v) => s + (v.income || 0), 0);
        if (varietyIncome > 0) { incomeBreakdown.push(`Variety Shows: ¥${varietyIncome.toLocaleString()}`); totalWeeklyIncome += varietyIncome; }

        // --- COMMIT DRAFTS FOR THIS SECTION ---
        moneyForUpdate += totalWeeklyIncome;
        setElectionVotePool(tempElectionVotePool); // This is a simple state, safe to update.
        setMerchInventory(tempMerchInv);           // This is also safe as its data for next week is now final.
        setIdolMerchInventory(tempIdolMerchInv);

    // --- 4.5 REQUEST HOUR VOTING ---
    if (requestHourStatus && requestHourStatus.isActive && newWeek <= requestHourStatus.endWeek) {
        const allMembersById = new Map();
        membersForUpdate.forEach(m => allMembersById.set(String(m.id), m));
        sisterGroupsForUpdate.forEach(sg => {
            (sg.members || []).forEach(m => allMembersById.set(`sg-${sg.id}-${m.id}`, m));
        });

        const allSongsForVoting = [
            ...songsForUpdate.flatMap(s => (s.tracks || []).map(t => ({...t, songId: `${s.id}-${t.name}`, parentSingle: s}))),
            ...sisterGroupsForUpdate.flatMap(sg => (sg.songs || []).flatMap(s => (s.tracks || []).map(t => ({...t, songId: `sg-${sg.id}-${s.id}-${t.name}`, parentSingle: s})))),
        ];

        let newVotes = { ...(requestHourStatus.votes || {}) };

        allSongsForVoting.forEach(track => {
            if (!track.members || track.members.length === 0) return;

            const fanPower = track.members.reduce((acc, memberInfo) => {
                const member = allMembersById.get(String(memberInfo.id));
                if (!member) return acc;
                return acc + (member.fans.hardcore || 0) * 2 + (member.fans.casual || 0);
            }, 0);

            const songPopularity = track.popularity || 1.0;
            
            const weeklyVotes = Math.floor((fanPower / 20) * songPopularity * (0.6 + Math.random() * 0.8));
            
            if (weeklyVotes > 0) {
                newVotes[track.songId] = (newVotes[track.songId] || 0) + weeklyVotes;
            }
        });

        // This is a temporary state update just for the voting progress.
        // It's okay to call this here as it doesn't affect the main game loop logic.
        setRequestHourStatus(prev => ({
            ...prev,
            votes: newVotes,
        }));
        addNotificationInLoop({type: 'Info', message: `Fans have cast their votes for Request Hour! Voting ends in ${requestHourStatus.endWeek - newWeek} week(s).`});
    }


        // --- 5. CALCULATE CHART SALES & FAN GAINS (from drafts) ---

        let weeklyChartRevenue = 0;
        let weeklyChartReport = [];

        // This is a single, unified function to process any song's sales for the week.
        const processSongSales = (song, groupNameForLog = groupName) => {
            if (song.chartWeeksLeft > 0) {
                const chartWeekIndex = 8 - song.chartWeeksLeft;

                if (chartWeekIndex >= 0 && chartWeekIndex < weeklySalesCurve.length) {
                    const salesMultiplier = song.type === 'album' ? 1 : (salesMultipliers[song.production?.song] || 1);
                    const salesThisWeek = Math.floor((song.baseSalesPotential || 0) * weeklySalesCurve[chartWeekIndex] * salesMultiplier * (0.85 + Math.random() * 0.3));
                    const revenueThisWeek = salesThisWeek * 15;
                    
                    weeklyChartRevenue += revenueThisWeek;
                    
                    let fanMultiplier = 1;
                    if (song.type === 'single') { fanMultiplier = (fanMultipliers[song.production?.mv] || 1) * (promoMultipliers[song.production?.promo] || 1); }
                    else if (song.type === 'album' && song.production?.promo_album) { fanMultiplier = promoMultipliers[song.production.promo_album] || 1; }
                    const fansThisWeek = Math.floor(5 + ((salesThisWeek / 15) * fanMultiplier));

                    const allMemberIdsInSingle = (song.tracks || []).flatMap(t => (t.members || []).map(m => String(m.id)));
                    const uniqueMemberIds = [...new Set(allMemberIdsInSingle)];
                    localDistributeFans(fansThisWeek, uniqueMemberIds);

                    const logName = (groupNameForLog === groupName || !groupNameForLog) ? song.name : `${groupNameForLog}'s ${song.name}`;
                    weeklyChartReport.push(`${logName}: ${salesThisWeek.toLocaleString()} sold.`);

                    const newChartWeeksLeft = song.chartWeeksLeft - 1;
                    const finalTotalSales = (song.totalSales || 0) + salesThisWeek;

                    if (newChartWeeksLeft === 0) { // --- Song has finished its chart run ---
                        if (song.isElectionSingle) {
                            tempElectionVotePool += finalTotalSales;
                            addNotificationInLoop({ type: 'Election', message: `Votes from "${song.name}" are tallied! Added: ${finalTotalSales.toLocaleString()} votes.` });
                            setIsElectionSingleFinished(true);
                        }
                        const ticketsEarned = Math.floor(finalTotalSales / 1000);
                        if (ticketsEarned > 0) {
                            tempVotingTickets += ticketsEarned;
                            addNotificationInLoop({ type: 'Info', message: `Earned ${ticketsEarned.toLocaleString()} Request Hour Voting Tickets from "${song.name}" sales!` });
                        }

                        // --- NEW: Reputation Gain from Sales ---
                        let reputationChange = 0;
                        if (finalTotalSales >= 1000000) {
                            reputationChange = 5;
                            addNotificationInLoop({ type: 'Reputation', message: `"${song.name}" went Million! Your group's reputation has skyrocketed! (+5 Rep)` });
                        } else if (finalTotalSales >= 500000) {
                            reputationChange = 3;
                            addNotificationInLoop({ type: 'Reputation', message: `"${song.name}" is a certified hit! Your reputation grows. (+3 Rep)` });
                        } else if (finalTotalSales >= 100000) {
                            reputationChange = 1;
                        } else if (finalTotalSales < 10000) {
                            reputationChange = -1;
                            addNotificationInLoop({ type: 'alert', message: `"${song.name}" was a commercial flop, slightly damaging your reputation. (-1 Rep)` });
                        }
                        if (reputationChange !== 0) {
                             setGroupReputation(prev => Math.max(0, prev + reputationChange));
                        }
                        // --- END NEW ---
                    }
                    
                    return {
                        ...song,
                        totalSales: finalTotalSales,
                        chartWeeksLeft: newChartWeeksLeft,
                        salesHistory: [...(song.salesHistory || []), { week: newWeek, sales: salesThisWeek }],
                        weeklySales: [...(song.weeklySales || []), salesThisWeek],
                    };
                }
            }
            return song;
        };

        // Now, apply this safe function to our draft arrays.
        songsForUpdate = songsForUpdate.map(song => processSongSales(song, groupName));

        sisterGroupsForUpdate = sisterGroupsForUpdate.map(sg => {
            if (!sg.songs || sg.songs.length === 0) return sg;
            const newSgSongs = sg.songs.map(song => processSongSales(song, sg.name));
            return { ...sg, songs: newSgSongs };
        });

        // Finally, add the total chart revenue to our draft money variable.
        if (weeklyChartRevenue > 0) {
            moneyForUpdate += weeklyChartRevenue;
            incomeBreakdown.push(`Chart Sales: ¥${weeklyChartRevenue.toLocaleString()}`);
            addNotificationInLoop({ type: 'info', message: `Chart Sales Report: ${weeklyChartReport.join(' ')}` });
        }
      
        // --- 6. CALCULATE EXPENSES & FAN CHURN (from drafts) ---

        let expenseNotification = '';
        if (newWeek > 0 && newWeek % 4 === 0) {
            const allMembersForSalary = [...membersForUpdate, ...sisterGroupsForUpdate.flatMap(sg => sg.members || [])];
            const totalSalaries = allMembersForSalary.reduce((sum, member) => {
                const memberFans = getTotalFansForMember(member);
                let baseSalary;
                if (memberFans < 5000) { baseSalary = 2000; }
                else if (memberFans < 25000) { baseSalary = 5000; }
                else if (memberFans < 100000) { baseSalary = 15000; }
                else if (memberFans < 500000) { baseSalary = 40000; }
                else { baseSalary = 100000; }
                const skillBonus = Math.floor(((member.singing || 0) + (member.dancing || 0) + (member.variety || 0)) * 5);
                const fanBonus = Math.floor(memberFans / 50);
                return sum + baseSalary + skillBonus + fanBonus;
            }, 0);

            const practiceRoomUpkeep = Object.values(buildings.practiceRooms || {}).reduce((sum, level) => sum + level, 0) * 25000;
            const theaterUpkeep = (theaters || []).reduce((sum, t) => {
                let levelCost = 0;
                switch (t.level) {
                    case 1: levelCost = 10000; break;
                    case 2: levelCost = 50000; break;
                    case 3: levelCost = 200000; break;
                    case 4: levelCost = 500000; break;
                    case 5: levelCost = 1000000; break;
                    default: levelCost = 0;
                }
                return sum + levelCost;
            }, 0);
            const monthlyExpenses = totalSalaries + practiceRoomUpkeep + theaterUpkeep;
            
            // Subtract from our draft money variable
            moneyForUpdate -= monthlyExpenses;

            // Calculate fan churn and update the draft member arrays
            let totalFansActuallyLost = 0;
            const updateMemberFansForChurn = (member) => {
                if (!member.fans || typeof member.fans !== 'object') return member;
                const fansLost = Math.ceil((member.fans.casual || 0) * 0.05);
                totalFansActuallyLost += fansLost;
                return { ...member, fans: { ...member.fans, casual: Math.max(0, (member.fans.casual || 0) - fansLost) } };
            };
            
            membersForUpdate = membersForUpdate.map(updateMemberFansForChurn);
            sisterGroupsForUpdate = sisterGroupsForUpdate.map(sg => ({ ...sg, members: (sg.members || []).map(updateMemberFansForChurn) }));

            expenseNotification = `Monthly Report: Expenses ¥${monthlyExpenses.toLocaleString()}. Lost ${totalFansActuallyLost.toLocaleString()} fans.`;
            addNotificationInLoop({ type: 'info', message: expenseNotification });
        }


        // --- 7. PROCESS WEEKLY MEMBER UPDATES (Training, Stats, etc.) ---

        let campMessage = '';
        if (activeTrainingCamp) {
            if (activeTrainingCamp.weeksLeft <= 1) {
                const member = getMemberById(activeTrainingCamp.memberId);
                const skill = activeTrainingCamp.skill;
                localUpdateMemberState(activeTrainingCamp.memberId, m => ({ ...m, isAvailable: true, [skill]: Math.min(100, (m[skill] || 0) + 15) }));
                campMessage = `${member?.name || 'A member'} has returned from ${skill} camp with a huge skill boost!`;
                if (!priorityMessage) priorityMessage = campMessage;
                setActiveTrainingCamp(null);
            } else {
                setActiveTrainingCamp(prev => ({ ...prev, weeksLeft: prev.weeksLeft - 1 }));
                campMessage = `Training camp continues for ${activeTrainingCamp.weeksLeft - 1} more week(s).`;
            }
        }

        // Handle Merchandise Design Bonus Countdown
        if (merchDesignBonus) {
            const newWeeksLeft = merchDesignBonus.weeksLeft - 1;
            if (newWeeksLeft <= 0) {
                setMerchDesignBonus(null);
                addNotificationInLoop({ type: 'Info', message: "The merchandise production cost bonus has expired." });
            } else {
                setMerchDesignBonus(prev => ({ ...prev, weeksLeft: newWeeksLeft }));
            }
        }
        
        const allMembersForWeeklyUpdate = [...membersForUpdate.map(m => ({ ...m, rosterId: String(m.id) })), ...sisterGroupsForUpdate.flatMap(sg => (sg.members || []).map(m => ({ ...m, rosterId: `sg-${sg.id}-${m.id}` })))];
        
const groupBonuses = {};
for (const [groupId, captainId] of Object.entries(groupRoles)) {
    if (captainId) {
        const captain = getMemberById(captainId);
        if (captain) {
            const leadershipBonus = Math.floor(((captain.charisma || 0) + (captain.intelligence || 0)) / 40); // Max bonus of 5
            groupBonuses[groupId] = { bonus: leadershipBonus, captainId: captainId };
        }
    }
}

        allMembersForWeeklyUpdate.forEach(member => {
            if (!member.rosterId) return;

            // Handle members finishing activities
            if (!member.isAvailable && member.currentActivity && newWeek >= member.activityEnd) {
                if (member.currentActivity === 'design_merch') {
                    const bonusValue = 0.1 + ((member.charisma || 0) / 2000); // Original detailed calculation
                    setMerchDesignBonus({ memberName: member.name, weeksLeft: 4, bonus: bonusValue });
                    addNotificationInLoop({ type: 'Good', message: `${member.name} finished designing! Production costs reduced by ${(bonusValue * 100).toFixed(1)}%.` });
                }
                localUpdateMemberState(member.rosterId, m => ({ ...m, isAvailable: true, currentActivity: null, activityEnd: null, returningWeek: undefined }));
                member.isAvailable = true; 
            }

            // Handle members returning from suspension
            if (!member.isAvailable && member.returningWeek && newWeek >= member.returningWeek) {
                localUpdateMemberState(member.rosterId, m => ({ ...m, isAvailable: true, returningWeek: undefined }));
                addNotificationInLoop({ type: 'info', message: `${member.name} has returned and is available again.` });
                member.isAvailable = true;
            }

            const yearsActive = Math.floor(newWeek / 52);

            // Yearly stat decay for veterans
            if (newWeek > 52 && newWeek % 52 === 1 && yearsActive >= 4) {
                 const decay = Math.random() * 0.5 + 0.2;
                 localUpdateMemberState(member.rosterId, m => ({
                    ...m,
                    singing: Math.max(20, m.singing - decay),
                    dancing: Math.max(20, m.dancing - decay),
                    variety: Math.max(20, m.variety - decay),
                    morale: Math.max(0, m.morale - 5)
                 }));
                 addNotificationInLoop({ type: 'Info', message: `${member.name} is feeling the strain of a long career. Stats and morale have slightly decreased.` });
            }

            if (!member.isAvailable) {
                localUpdateMemberState(member.rosterId, m => ({ ...m, yearsActive: yearsActive }));
                return; // Skip the rest of the updates for unavailable members
            }

            let newStamina = member.stamina || 100;
            let newStress = member.stress || 0;
            let newMorale = member.morale || 80;

            // Passive Recovery & Relationship Effects
            newStamina = Math.min(100, newStamina + 20);
            
// Captain's passive bonus
const memberGroupId = member.isSisterMember ? String(member.groupId) : 'main';
const groupBonus = groupBonuses[memberGroupId];
if (groupBonus && member.rosterId !== groupBonus.captainId) {
    newMorale = Math.min(100, newMorale + groupBonus.bonus);
    newStress = Math.max(0, newStress - groupBonus.bonus);
}

// NEW: Team Captain's passive bonus
if (member.teamId) {
    const teamCaptainId = groupRoles[member.teamId];
    if (teamCaptainId && member.rosterId !== teamCaptainId) {
        const teamCaptain = getMemberById(teamCaptainId);
        if (teamCaptain) {
            const teamLeadershipBonus = Math.floor(((teamCaptain.charisma || 0) + (teamCaptain.intelligence || 0)) / 50); // Max bonus of 4
            newMorale = Math.min(100, newMorale + teamLeadershipBonus);
            newStress = Math.max(0, newStress - teamLeadershipBonus);
        }
    }
}

            // Center Pressure
            if (member.isCurrentCenter) {
                newStress = Math.min(100, newStress + 5);
            }

            // Check for Burnout and Exhaustion
            if (newStress >= 100) {
                addNotificationInLoop({ type: 'alert', message: `${member.name} is Burned Out! Their morale has plummeted.` });
                newMorale = Math.max(0, newMorale - 40);
                newStress = 70;
            }
            if (newStamina <= 0) {
                addNotificationInLoop({ type: 'alert', message: `${member.name} is Exhausted! They are being forced to rest.` });
                newStamina = 60;
                newStress = Math.max(0, newStress - 20);
            }

            // Training, including Rivalry Bonus
            if (member.trainingFocus && member.trainingFocus !== 'none') {
                const skill = member.trainingFocus;
                const roomType = getRoomType(skill);
                const roomLevel = roomType ? (buildings.practiceRooms[roomType] || 0) : 0;
                const numRivals = member.chemistry ? Object.values(member.chemistry).filter(score => score < -50).length : 0;
                const rivalryBonus = numRivals * 0.05;
                const focusedGain = (0.2 + Math.random() * 0.3) + (roomLevel * 0.1) + rivalryBonus;
                localUpdateMemberState(member.rosterId, m => ({ ...m, [skill]: Math.min(100, (m[skill] || 0) + focusedGain) }));
            }
            
            // Detailed Graduation Urgency Increase
            let gradUrgencyIncrease = 0;
            if (newMorale < 30) { gradUrgencyIncrease += (member.ambition === 'Find Normal Happiness') ? 5 : 2; }
            if (newStamina < 15) { gradUrgencyIncrease += (member.ambition === 'Physical Health / Injury') ? 4 : 1; }
            if (newWeek > 1 && newWeek % 52 === 1) { // Yearly check
                if (yearsActive >= member.graduationWindow.min) {
                    gradUrgencyIncrease += 5;
                    if (yearsActive >= member.graduationWindow.max) { gradUrgencyIncrease += 10; }
                    if (member.ambition === 'Space for Juniors' && yearsActive > 4) { gradUrgencyIncrease += 10; }
                    if (member.ambition === 'Study Abroad' || member.ambition === 'Academic Focus') { gradUrgencyIncrease += 8; }
                }
            }
            const newUrgency = Math.min(100, (member.graduationUrgency || 0) + gradUrgencyIncrease);
            // --- Ambition Dynamics ---
            // --- Ambition Dynamics ---
            let newAmbition = member.ambition; // Start with the current ambition
            if (newWeek % 12 === 0 && Math.random() < 0.2) { // 20% chance to check for an ambition change every 12 weeks
                let potentialNewAmbition = null;
                const oldAmbition = member.ambition;

                // Trigger: High potential but never been center
                if (member.potential > 85 && (member.centerHistory || []).length === 0 && oldAmbition !== 'Prove My Worth') {
                    potentialNewAmbition = 'Prove My Worth';
                }
                // Trigger: Low morale and high stress
                else if (newMorale < 25 && newStress > 75 && oldAmbition !== 'Find Normal Happiness') {
                    potentialNewAmbition = 'Find Normal Happiness';
                }
                // Trigger: Veteran who has been successful
                else if (yearsActive > 5 && (member.centerHistory || []).length > 2 && oldAmbition !== 'Space for Juniors') {
                    potentialNewAmbition = 'Space for Juniors';
                }

                if (potentialNewAmbition && potentialNewAmbition !== oldAmbition) {
                    newAmbition = potentialNewAmbition;
                    addNotificationInLoop({
                        type: 'Group',
                        message: `${member.name}'s ambition has changed to: "${newAmbition}"!`
                    });
                }
            }

            // --- Ambition Effects ---
            switch(member.ambition) {
                case 'The Rival': {
                    // This member thrives on competition with established rivals.
                    const rivalMember = allMembersForWeeklyUpdate.find(m => {
                        // Construct the unique ID for the potential rival (m)
                        const rivalRosterId = m.groupId ? `sg-${m.groupId}-${m.id}` : String(m.id);
                        // Construct the unique ID for the member being checked (member)
                        const memberRosterId = member.groupId ? `sg-${member.groupId}-${member.id}` : String(member.id);
                        
                        // Don't compare a member to themselves
                        if (rivalRosterId === memberRosterId) return false;

                        // Check the chemistry map using the correct unique ID
                        return member.chemistry && member.chemistry[rivalRosterId] < -50;
                    });

                    if (rivalMember) {
                        // If the rival has more fans, increase stress from the pressure
                        if (getTotalFansForMember(rivalMember) > getTotalFansForMember(member)) {
                            newStress = Math.min(100, newStress + 5);
                        } else {
                            // If they are ahead of their rival, boost morale
                            newMorale = Math.min(100, newMorale + 5);
                        }
                    }
                    break;
                }
                case 'The Producer': {
                    // This member gets frustrated if they aren't included in creative work.
                    const latestSingle = songsForUpdate.sort((a, b) => b.releaseWeek - a.releaseWeek)[0];
                    if (latestSingle) {
                        // Construct the unique ID for the member being checked
                        const memberRosterId = member.groupId ? `sg-${member.groupId}-${member.id}` : String(member.id);

                        const isIncluded = latestSingle.tracks.some(track => 
                            (track.members || []).map(m => String(m.id)).includes(memberRosterId)
                        );
                        if (!isIncluded) {
                            newMorale = Math.max(0, newMorale - 5);
                        }
                    }
                    break;
                }
                case 'The Unwilling Idol':
                    // This member has a constant desire to leave, until their passion is ignited.
                    gradUrgencyIncrease += 1;
                    break;
                case 'Family Matters':
                    // This member is motivated by financial success for their family.
                    if (moneyForUpdate < 100000) {
                        newStress = Math.min(100, newStress + 5); // Stress when group funds are low
                    } else if (moneyForUpdate > 1000000) {
                        newStress = Math.max(0, newStress - 5); // Feels secure when funds are high
                        gradUrgencyIncrease -= 1; // More likely to stay
                    }
                    break;
            }

            // --- Chemistry Evolution & Effects ---
let chemistryMoraleEffect = 0;
let chemistryStressEffect = 0;

const otherMemberIds = allMembersForWeeklyUpdate.map(m => m.rosterId).filter(id => id !== member.rosterId);
// Initialize chemistry if it doesn't exist for the current member
if (!member.chemistry) {
    member.chemistry = {};
}

otherMemberIds.forEach(otherId => {
    // Initialize chemistry if it doesn't exist
    if (member.chemistry[otherId] === undefined) {
        member.chemistry[otherId] = (Math.random() * 20) - 10; // -10 to +10
    }

    const otherMember = allMembersForWeeklyUpdate.find(m => m.rosterId === otherId);
    if (!otherMember) return;

    let change = 0;
    // Personalities clash or match
    if (member.personality === otherMember.personality) change += 0.5;
    if ( (member.personality === 'Ambitious' && otherMember.personality === 'Easygoing') || (member.personality === 'Rebellious' && otherMember.personality === 'Natural Leader') ) {
        change -= 0.5;
    }

    // Shared experiences
    if (member.teamId && member.teamId === otherMember.teamId) change += 0.5;
    if (member.generation === otherMember.generation) change += 0.2;
    
    member.chemistry[otherId] = Math.max(-100, Math.min(100, member.chemistry[otherId] + change));

    // Apply passive effects
    const chemScore = member.chemistry[otherId];
    if (chemScore > 50) chemistryMoraleEffect += 1; // Good friends boost morale
    if (chemScore < -50) chemistryStressEffect += 1; // Strong rivals increase stress
});

newMorale += chemistryMoraleEffect;
newStress += chemistryStressEffect;
// --- End Chemistry ---

            localUpdateMemberState(member.rosterId, m => ({
                ...m,
                stamina: newStamina,
                stress: newStress,
                morale: newMorale,
                yearsActive: yearsActive,
                graduationUrgency: newUrgency,
                ambition: newAmbition,
                chemistry: member.chemistry
            }));
        });

        rivalsForUpdate = simulateRivalActions(rivalsForUpdate, newWeek, addNotificationInLoop);

        // --- 8. FINAL MESSAGES & STATE COMMIT ---

        // Construct the final message for the UI
        if (priorityMessage) {
            messageForUpdate = priorityMessage;
        } else if (expenseNotification) {
            messageForUpdate = expenseNotification;
        } else {
            const incomeDetails = incomeBreakdown.length > 0 ? `(${incomeBreakdown.join(', ')})` : '';
            messageForUpdate = `Week ${newWeek}: +¥${totalWeeklyIncome.toLocaleString()} income. ${incomeDetails} ${campMessage}`;
        }

        // Add specific notifications to the log, as per the original logic
        if (totalWeeklyIncome > 0) {
            addNotificationInLoop({ type: 'info', message: `+¥${totalWeeklyIncome.toLocaleString()} income.` });
        }
        if (campMessage && !priorityMessage.includes('camp')) {
            addNotificationInLoop({ type: 'info', message: campMessage });
        }
        
        const allUpdatedMembers = [ ...membersForUpdate, ...sisterGroupsForUpdate.flatMap(sg => sg.members || []) ];
        const graduatingMember = allUpdatedMembers.find(m => (m.graduationUrgency || 0) >= 100 && !m.isGraduating);

        // --- THE GRAND FINALE: COMMIT ALL DRAFT VARIABLES TO THE REAL STATE ---
        setWeek(newWeek);
        setMessage(messageForUpdate);
        setMoney(moneyForUpdate);
        setSongs(songsForUpdate);
        setHallOfFame(hallOfFameForUpdate);
        setMembers(membersForUpdate.filter(m => !graduatingIdsThisWeek.includes(String(m.id))));
        setSisterGroups(sisterGroupsForUpdate.map(sg => ({
            ...sg,
            members: (sg.members || []).filter(m => !graduatingIdsThisWeek.includes(`sg-${sg.id}-${m.id}`))
        })));
        setNotifications(notificationsForUpdate);
        setRivalGroups(rivalsForUpdate);

        // MERCH FIX: Commit the final inventory state
        setMerchInventory(tempMerchInv);
        setIdolMerchInventory(tempIdolMerchInv);
        setElectionVotePool(tempElectionVotePool);
        setVotingTickets(tempVotingTickets);

        // If a new member is announcing graduation, pause the game to show the modal.
        if (graduatingMember) {
            setModalData(graduatingMember);
            setShowModal('graduationAnnouncement');
            return;
        }
    };
    
    const startRequestHour = () => {
        const cost = 500000;
        if (money < cost) {
            return setMessage(`Hosting the Request Hour costs ¥${cost.toLocaleString()}.`);
        }
        if (requestHourStatus && requestHourStatus.isActive) {
            return setMessage("The Request Hour voting period is already active.");
        }
        if (week > 1 && week < 12) {
            return setMessage("You must wait until after Week 12 to host the first Request Hour.");
        }

        setMoney(prev => prev - cost);

        // Collect all songs from all groups and initialize their vote counts to 0
        const allSongIds = [
            ...songs.flatMap(s => (s.tracks || []).map(t => `${s.id}-${t.name}`)),
            ...sisterGroups.flatMap(sg => (sg.songs || []).flatMap(s => (s.tracks || []).map(t => `sg-${sg.id}-${s.id}-${t.name}`))),
            ...theaterSongs.map(ts => `theater-${ts.id}`)
        ];
        const initialVotes = allSongIds.reduce((acc, id) => {
            acc[id] = 0;
            return acc;
        }, {});


        setRequestHourStatus({
            isActive: true,
            endWeek: week + 4,
            votes: initialVotes
        });

        const notifMessage = "Request Hour voting has begun! For the next 4 weeks, fans will vote for their favorite songs.";
        addNotification({ type: 'Event', message: notifMessage });
        setMessage(notifMessage);
    };

    const castPlayerVotes = (songId, amount, currency) => {
        if (!requestHourStatus || !requestHourStatus.isActive) {
            return setMessage("Voting is not currently active.");
        }
        if (amount <= 0) return;

        if (currency === 'money') {
            const cost = amount * 100;
            if (money < cost) {
                return setMessage(`Not enough money. Need ¥${cost.toLocaleString()}.`);
            }
            setMoney(prev => prev - cost);
        } else if (currency === 'tickets') {
            if (votingTickets < amount) {
                return setMessage(`Not enough Voting Tickets. You have ${votingTickets.toLocaleString()}.`);
            }
            setVotingTickets(prev => prev - amount);
        } else {
            return setMessage("Invalid currency for voting.");
        }

        const newVotes = { ...(requestHourStatus.votes || {}) };
        newVotes[songId] = (newVotes[songId] || 0) + amount;

        setRequestHourStatus(prev => ({
            ...prev,
            votes: newVotes,
        }));

        setMessage(`You cast ${amount.toLocaleString()} votes!`);
    };

const executeRequestHourConcert = () => {
    if (!requestHourStatus) return;

    const { votes } = requestHourStatus;

    // --- 1. Get all songs and their data ---
    const allSongs = [
        ...songs.flatMap(s => (s.tracks || []).map(t => ({...t, id: `${s.id}-${t.name}`, artist: s.artist || s.targetGroup, singleName: s.name}))),
        ...sisterGroups.flatMap(sg => (sg.songs || []).flatMap(s => (s.tracks || []).map(t => ({...t, id: `sg-${sg.id}-${s.id}-${t.name}`, artist: sg.name, singleName: s.name})))),
        ...theaterSongs.map(ts => ({...ts, id: `theater-${ts.id}`, artist: groupName, singleName: "Theater Stage"}))
    ];
    const songMap = new Map(allSongs.map(s => [s.id, s]));

    // --- 2. Rank the songs by votes ---
    const rankedSongs = Object.entries(votes)
        .map(([songId, voteCount]) => ({ songId, voteCount }))
        .filter(v => v.voteCount > 0)
        .sort((a, b) => b.voteCount - a.voteCount)
        .slice(0, 100) // Take the Top 100
        .map((v, index) => {
            const songData = songMap.get(v.songId);
            return {
                rank: index + 1,
                votes: v.voteCount,
                name: songData?.name || "Unknown Song",
                artist: songData?.artist === 'main' ? groupName : (songData?.artist || groupName),
                songId: v.songId,
            };
        });

    if (rankedSongs.length === 0) {
        setRequestHourStatus(null);
        addNotification({ type: 'Event', message: 'The Request Hour voting period ended, but no votes were cast.' });
        return;
    }
    
    // --- 3. Apply Popularity Boost to Songs ---
    const newSongs = [...songs];
    const newSisterGroups = [...sisterGroups];
    const newTheaterSongs = [...theaterSongs];

    rankedSongs.forEach(rankedSong => {
        const popularityBoost = (101 - rankedSong.rank) * 0.005; // Rank 1 gets +0.5, Rank 100 gets +0.005
        const [type, ...rest] = rankedSong.songId.split('-');
        
        if (type === 'theater') {
            const songIndex = newTheaterSongs.findIndex(s => String(s.id) === rest[0]);
            if(songIndex > -1) newTheaterSongs[songIndex].popularity = (newTheaterSongs[songIndex].popularity || 1.0) + popularityBoost;
        } else {
            const singleId = type === 'sg' ? rest[1] : rest[0];
            const trackName = rest.slice(type === 'sg' ? 2 : 1).join('-');

            let singleFound = false;
            for(let i=0; i<newSongs.length; i++){
                if(String(newSongs[i].id) === String(singleId)){
                    const trackIndex = newSongs[i].tracks.findIndex(t => t.name === trackName);
                    if(trackIndex > -1) newSongs[i].tracks[trackIndex].popularity += popularityBoost;
                    singleFound = true;
                    break;
                }
            }

            if(!singleFound){
                 for(let i=0; i<newSisterGroups.length; i++){
                    const sg = newSisterGroups[i];
                    const singleIndex = (sg.songs || []).findIndex(s => String(s.id) === String(singleId));
                    if(singleIndex > -1){
                        const trackIndex = sg.songs[singleIndex].tracks.findIndex(t => t.name === trackName);
                         if(trackIndex > -1) newSisterGroups[i].songs[singleIndex].tracks[trackIndex].popularity += popularityBoost;
                        break;
                    }
                }
            }
        }
    });

    setSongs(newSongs);
    setSisterGroups(newSisterGroups);
    setTheaterSongs(newTheaterSongs);
    
    // --- 4. Save history, set latest result, and clean up ---
    const historyEntry = {
        week: week,
        results: rankedSongs
    };
    setRequestHourHistory(prev => [historyEntry, ...prev]);
    setLastRequestHourResult(historyEntry); // Store the latest results for the concert modal
    setRequestHourStatus(null); // End the event

    // --- 5. Trigger Results Modal (without concert data) ---
    addNotification({type: 'Special', message: `Request Hour voting has concluded! The results are in.`});
    setModalData({ results: rankedSongs });
    setShowModal('requestHourResult');
};


    const confirmCreateSisterGroup = (groupData) => {
      const cost = 250000;
      if (money < cost) return setMessage(`Need ¥${cost.toLocaleString()} to establish a new sister group.`);

      const newId = Math.max(0, ...(sisterGroups || []).map(sg => sg.id || 0)) + 1;
      
      const newSisterGroup = {
          id: newId,
          name: groupData.groupName,
          location: groupData.location,
          type: groupData.type,
          fans: 100, // Reduced initial fans as there are no members
          members: [], // Start with 0 members
          songs: [],
          income: 0, // No income without members
      };
      
      setSisterGroups(prev => [...(prev || []), newSisterGroup]);
      setMoney(prev => prev - cost);
      setMessage(`Successfully established ${groupData.groupName} in ${groupData.location}! Hold an audition to recruit members for them.`);
      setShowModal(null);
      setGroupRoles(prev => ({ ...prev, [newId]: null }));
    };

      const startAudition = (targetGroup, tier, generationName) => {

        const selectedTier = tiers.find(t => t.id === tier);

        if (money < selectedTier.cost) {
            return setMessage(`Not enough money for a ${selectedTier.name}. Need ¥${selectedTier.cost.toLocaleString()}.`);
        }

        setMoney(prev => prev - selectedTier.cost);

        const generateStat = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const personalities = [
            // --- The Classics ---
            'Cheerful', 'Shy', 'Confident', 'Ambitious', 'Easygoing', 'Energetic', 'Quiet',
            
            // --- The "Cool" Archetypes ---
            'Ice Queen',      // Cold on the outside, but high-class
            'Lone Wolf',      // Prefers to work alone, mysterious
            'Rebellious',     // The "bad boy/girl" or delinquent vibe
            
            // --- J-Pop & Idol Roles ---
            'Natural Leader', // The "Center" energy
            'Little Sister',  // Cute, needs protection, endearing
            'Stage Genius',   // Shy in person, but a beast on stage
            
            // --- Anime Tropes in English ---
            'Hot-headed',     // Picks fights easily, very passionate
            'Mischievous',    // The "Little Devil" type, likes pranks
            'Clumsy',         // Trips over nothing, but in a cute way
            'Elegance',       // Refined, polite, and sophisticated
            'Motherly',         // Someone with a very soothing, motherly vibe
            'Bookworm'       // Intelligent, quiet, usually has glasses
          ];
        const candidates = Array.from({ length: selectedTier.poolSize }, (_, i) => ({
            id: `candidate-${i}`,
            name: generateRandomMemberName(),
            hometown: generateRandomHometown(),
            vocal: generateStat(selectedTier.statMin, selectedTier.statMax),
            dance: generateStat(selectedTier.statMin, selectedTier.statMax),
            visual: generateStat(selectedTier.statMin, selectedTier.statMax),
            charisma: generateStat(selectedTier.statMin, selectedTier.statMax),
            intelligence: generateStat(selectedTier.statMin, selectedTier.statMax),
            potential: generateStat(selectedTier.potentialMin, selectedTier.potentialMax),
            personality: personalities[Math.floor(Math.random() * personalities.length)],
        }));
        
        setAuditionCandidates(candidates);
        setModalData({ 
            targetGroup, 
            generationName, 
            contractFee: selectedTier.contractFee,
        });
        setShowModal('traineeDraft');
    };

       const confirmRecruitment = (selectedCandidates, recruitmentData) => {
        const { targetGroup, generationName, contractFee } = recruitmentData;
        const totalFee = selectedCandidates.length * contractFee;

        if (money < totalFee) {
            return setMessage(`Not enough money for contract fees. Need ¥${totalFee.toLocaleString()}.`);
        }

        setMoney(prev => prev - totalFee);

        let startingId;
        const isMainGroup = targetGroup === 'main';
        const targetGroupId = isMainGroup ? 'main' : parseInt(targetGroup, 10);
        const joinEvent = { week: week, event: `Joined ${isMainGroup ? groupName : (sisterGroups.find(g => g.id === targetGroupId)?.name || 'a group')} as ${generationName}` };

        if (isMainGroup) {
            startingId = members.length > 0 ? Math.max(...members.map(m => m.id)) : 0;
        } else {
            const sg = sisterGroups.find(g => g.id === targetGroupId);
            startingId = (sg?.members && sg.members.length > 0) ? Math.max(...sg.members.map(m => m.id)) : 0;
        }

        const newMembers = selectedCandidates.map((c, index) => {
            const newId = startingId + 1 + index;

            // --- NEW: Nickname Generation Logic ---
            const firstName = c.name.split(' ')[0];
            const suffixes = ['rin', 'tan', 'chi', 'nyan', 'pyon', 'gochi', 'run', 'non', 'kyun', 'ppi', 'mu', 'pon', 'mero'];
            // 30% chance for the classic '-chan', 70% for a random one from your list.
            const randomSuffix = Math.random() > 0.3 
                ? suffixes[Math.floor(Math.random() * suffixes.length)] 
                : 'chan';
            const nickname = `${firstName}-${randomSuffix}`;
            // --- END: Nickname Generation Logic ---

            const baseMember = {
                id: newId,
                name: c.name,
                hometown: c.hometown,
                nickname: nickname,
                singing: c.vocal,
                dancing: c.dance,
                visual: c.visual, // <-- THE FIX
                charisma: c.charisma, // <-- THE FIX
                intelligence: c.intelligence, // <-- THE FIX
                variety: Math.floor((c.vocal + c.dance) / 2),
                stamina: 100,
                morale: 100,
                stress: 0,
                fans: { hardcore: 0, casual: 0 },
                potential: c.potential,
                personality: c.personality,
                position: 'under',
                birthday: { month: 1, day: 1 },
                equippedOutfit: null,
                scandals: 0,
                age: Math.floor(Math.random() * 5) + 14,
                yearsActive: 0,
                graduated: false,
                isGraduating: false,
                generation: generationName,
                isAvailable: true,
                rank: 999, // Represents "unranked"
                trainingFocus: 'none',
                singlesParticipation: [],
                songsParticipation: [],
                centerHistory: [],
                teamHistory: [joinEvent], // <-- THE FIX
                homeGroup: isMainGroup ? 'main' : (sisterGroups.find(g => g.id === targetGroupId)?.name || 'Unknown Group'),
                kenninGroups: [],
                electionHype: 0,
                isCurrentCenter: false,
                chemistry: {},

            };
            
            const ambitionKeys = Object.keys(ambitions);
            baseMember.ambition = ambitionKeys[Math.floor(Math.random() * ambitionKeys.length)];
            let window = { min: 4, max: 8 }; // Default window
            switch (baseMember.ambition) {
                case 'Study Abroad':
                case 'Academic Focus':
                    // Short-term members who are likely to leave for school.
                    window = { min: 1, max: 4 };
                    break;
                case 'Find Normal Happiness':
                    // These members aren't aiming for a long career, just the experience.
                    window = { min: 2, max: 5 };
                    break;
                case 'The Unwilling Idol':
                    // Pushed into the industry, they have a very short expected career span.
                    window = { min: 1, max: 3 };
                    break;
                case 'Space for Juniors':
                case 'The Producer':
                    // Veterans or creatively-invested members who plan to stay longer.
                    window = { min: 6, max: 12 };
                    break;
                // Other ambitions use the default window as their graduation is more event-driven.
            }
            baseMember.graduationWindow = window;
            baseMember.graduationUrgency = 0;
            return baseMember;
        });

        if (isMainGroup) {
            setMembers(prev => [...prev, ...newMembers]);
        } else {
            setSisterGroups(prev => prev.map(sg => 
                sg.id === targetGroupId ? { ...sg, members: [...(sg.members || []), ...newMembers] } : sg
            ));
        }
        
        const groupForMessage = isMainGroup 
            ? groupName 
            : (sisterGroups.find(g => g.id === targetGroupId)?.name || 'the group');
        
        const successMessage = `Successfully recruited ${newMembers.length} new member(s) to the ${generationName} of ${groupForMessage}!`;
        setMessage(successMessage);
        addNotification({ type: 'Recruitment', message: successMessage });
        
        setShowModal(null);
        setAuditionCandidates([]);
    };

    const upgradeTheater = (ownerId) => {
      const theater = theaters.find(t => t.owner === ownerId);
      if (!theater) return setMessage("Theater not found.");

      const currentLevel = theater.level;
      if (currentLevel >= 5) return setMessage("Theater is already at maximum level (5).");

      const cost = 100000 + (currentLevel * 250000);
      if (money < cost) return setMessage(`Need ¥${cost.toLocaleString()} to upgrade the theater!`);

      setMoney(prev => prev - cost);
      
      const newCapacity = theater.capacity + 150 + (currentLevel * 50);

      setTheaters(prev => prev.map(t => 
        t.owner === ownerId 
          ? { 
              ...t, 
              level: currentLevel + 1, 
              capacity: newCapacity
            } 
          : t
      ));
      
      const successMessage = `${theater.name} upgraded to Level ${currentLevel + 1}! Capacity is now ${newCapacity}.`;
      setMessage(successMessage);
      addNotification({ type: 'Facility', message: successMessage });
    };

    const buildSisterTheater = (sgId) => {
        const sg = sisterGroups.find(g => g.id === sgId);
        if (!sg) return setMessage("Sister group not found.");
        if (theaters.some(t => t.owner === sgId)) return setMessage(`${sg.name} already has a theater.`);

        const cost = 150000;
        if (money < cost) return setMessage(`Need ¥${cost.toLocaleString()} to build a theater for ${sg.name}!`);

        setMoney(prev => prev - cost);

        const newTheater = {
            owner: sgId,
            level: 1,
            capacity: 250,
            name: `${sg.name} Theater`
        };
        setTheaters(prev => [...prev, newTheater]);
        
        const successMessage = `Theater built for ${sg.name}!`;
        setMessage(successMessage);
        addNotification({ type: 'Facility', message: successMessage });
    };

    const renameTheater = (ownerId, newName) => {
        setTheaters(prev => prev.map(t => 
            t.owner === ownerId 
            ? { ...t, name: newName }
            : t
        ));
        setMessage(`Theater renamed to "${newName}".`);
        setShowModal(null);
    };

    const handleCheatCode = (code) => {
      if (code === 'rich') {
        setMoney(prev => prev + 1000000);
        setMessage("Cheat activated! You gained ¥1,000,000.");
        setShowModal(null);
      } else if (code === 'fans') {
        const allMemberIds = getMainGroupRoster().map(m => m.rosterId || m.id);
        distributeFans(1000000, allMemberIds);
        setMessage("Cheat activated! Distributed 1,000,000 fans randomly.");
        setShowModal(null);
      } else {
        setMessage("Invalid cheat code.");
      }
    };

const appointCaptain = (groupId, memberId) => {
    const oldCaptainId = groupRoles[groupId];

    // If the user selects the "Appoint" placeholder or the same captain again
    if (!memberId || oldCaptainId === memberId) {
        // If there was a captain and now we are removing them
        if (oldCaptainId && !memberId) {
            updateMemberState(oldCaptainId, m => ({
                ...m,
                teamHistory: [...(m.teamHistory || []), { week, event: 'Stepped down as Captain' }]
            }));
            setGroupRoles(prev => ({ ...prev, [groupId]: null }));
            setMessage("Captain position is now vacant for this group.");
        }
        return;
    }

    // Update the new captain
    updateMemberState(memberId, m => ({
        ...m,
        morale: Math.min(100, m.morale + 15),
        teamHistory: [...(m.teamHistory || []), { week, event: 'Appointed Captain' }]
    }));

    // Update the old captain, if there was one
    if (oldCaptainId) {
        updateMemberState(oldCaptainId, m => ({
            ...m,
            morale: Math.max(0, m.morale - 5),
            teamHistory: [...(m.teamHistory || []), { week, event: 'Stepped down as Captain' }]
        }));
    }

    setGroupRoles(prev => ({ ...prev, [groupId]: memberId }));
    const newCaptain = getMemberById(memberId);
    setMessage(`${newCaptain.name} is the new Captain!`);
    addNotification({ type: 'Management', message: `${newCaptain.name} has been appointed Captain.` });
};


    const checkForKouhakuInvitation = () => {
    // Already have an invite or accepted one for this year.
    if (kouhakuInvitationOffered || kouhakuInvitationAccepted) return;

    // Condition 1: Total Fan Count
    const currentTotalFans = getMainGroupRoster().reduce((sum, member) => sum + getTotalFansForMember(member), 0);
    if (currentTotalFans < 1000000) {
        console.log("Kouhaku Check Failed: Not enough fans.");
        return; 
    }

    // Condition 2: Recent Single Sales
    const allSingles = [...songs, ...sisterGroups.flatMap(sg => sg.songs || [])];
    const recentSingles = allSingles
        .filter(s => s.type === 'single')
        .sort((a, b) => b.releaseWeek - a.releaseWeek)
        .slice(0, 3);
    
    const hasHitSingle = recentSingles.some(s => (s.totalSales || 0) > 500000);
    if (!hasHitSingle) {
        console.log("Kouhaku Check Failed: No recent hit single.");
        return;
    }

    // Condition 3: Group Reputation (Placeholder value)
    if (groupReputation < 50) {
        console.log("Kouhaku Check Failed: Reputation too low.");
        return;
    }

    // If all conditions are met:
        console.log("Kouhaku Check Success! Invitation offered.");
        setKouhakuInvitationOffered(true);
        // NEW: Trigger the modal
        setShowModal('kouhakuInvite'); 
        addNotification({
            type: 'special',
            message: 'A special invitation has arrived! Your group has been invited to perform at the Kouhaku Uta Gassen!'
        });
};

const acceptKouhakuInvitation = () => {
    if (!kouhakuInvitationOffered) {
        return setMessage("There is no Kouhaku invitation to accept.");
    }
    // Instead of processing, just show the preparation modal
    setShowModal('kouhakuPrep');
};

const declineKouhakuInvitation = () => {
    setKouhakuInvitationOffered(false);
    setGroupReputation(prev => Math.max(0, prev - 10)); // Reputation penalty
    addNotification({
        type: 'alert',
        message: 'Declining the Kouhaku invitation has significantly damaged your group\'s reputation (-10 Rep).'
    });
    setMessage("The Kouhaku invitation has been declined, harming your reputation.");
    setShowModal(null);
};

const confirmKouhakuParticipation = (songId, participantIds) => {
    const cost = 5000000;
    if (money < cost) {
        setMessage("Not enough money to confirm participation.");
        return;
    }

    const song = [...songs, ...sisterGroups.flatMap(sg => sg.songs || [])].find(s => s.id === songId);
    if (!song) {
        setMessage("Error: Selected song could not be found.");
        return;
    }

    setMoney(prev => prev - cost);
    setKouhakuInvitationAccepted(true);
    setKouhakuInvitationOffered(false);

    setKouhakuPrep({ songId, participantIds });

    participantIds.forEach(memberId => {
        updateMemberState(memberId, m => ({
            ...m,
            isAvailable: false,
            currentActivity: 'Kouhaku Rehearsals',
            activityEnd: week + (52 - (week - 1) % 52),
        }));
    });

    addNotification({
        type: 'special',
        message: `Confirmed Kouhaku participation with "${song.name}"! The ${participantIds.length} chosen members are now in rehearsal.`
    });
    setMessage("Kouhaku lineup confirmed! The members are preparing for the big day.");
    setShowModal(null);
};

const executeKouhakuPerformance = (membersForUpdate, sisterGroupsForUpdate) => {
    if (!kouhakuPrep) {
        console.error("ExecuteKouhakuPerformance called without preparation data.");
        return { performers: [], fanGain: 0, reputationGain: 0, historyEntry: { week, year: Math.floor((week-1)/52)+2025, songName: 'Error', fanGain: 0, reputationGain: 0 }};
    }

    const { songId, participantIds } = kouhakuPrep;
    const representativeSong = [...songs, ...sisterGroups.flatMap(sg => sg.songs || [])].find(s => s.id === songId);

    if (!representativeSong) {
         console.error("Kouhaku song not found during execution.");
         return { performers: [], fanGain: 0, reputationGain: 0, historyEntry: { week, year: Math.floor((week-1)/52)+2025, songName: 'Error', fanGain: 0, reputationGain: 0 }};
    }
    
    const getMemberFromDrafts = (rosterId) => {
        if (!String(rosterId).startsWith('sg-')) {
            const member = membersForUpdate.find(m => String(m.id) === String(rosterId));
            if (member) return { ...member, rosterId };
            return null;
        }
        const [, sgId, mId] = String(rosterId).split('-');
        const sg = sisterGroupsForUpdate.find(g => String(g.id) === sgId);
        if (!sg) return null;
        const member = (sg.members || []).find(m => String(m.id) === mId);
        if (member) return { ...member, rosterId };
        return null;
    }

    const performers = participantIds.map(getMemberFromDrafts).filter(Boolean);
    const avgSkill = performers.reduce((sum, m) => sum + ((m.singing || 0) + (m.dancing || 0)), 0) / (performers.length * 2 || 1);
    const songPrestige = (representativeSong.totalSales || 0) / 100000;
    const performanceQuality = (avgSkill * 0.7) + (groupReputation * 0.2) + (songPrestige * 0.1);
    const baseFanGain = 250000;
    const fanGain = Math.floor(baseFanGain + (performanceQuality * 7500));
    const reputationGain = Math.floor(performanceQuality / 10);
    
    const historyEntry = {
        week,
        year: Math.floor((week-1) / 52) + 2025,
        songName: representativeSong.name,
        fanGain,
        reputationGain,
    };

    return { performers, fanGain, reputationGain, historyEntry };
};


        const startJankenTournament = () => {
            const cost = 75000;
            if (money < cost) {
                return setMessage("Not enough money to host a Janken Tournament.");
            }
        
            const availableMembers = getAllAvailableMembers(true);
            if (availableMembers.length < 16) {
                return setMessage("You need at least 16 available members to host a Janken Tournament.");
            }
        
            setMoney(prev => prev - cost);
        
            const shuffled = [...availableMembers].sort(() => 0.5 - Math.random());
    
            // Distribute participants into 4 blocks as evenly as possible
            const blocks = { 'A': [], 'B': [], 'C': [], 'D': [] };
            const blockNames = Object.keys(blocks);
    
            shuffled.forEach((participant, index) => {
                blocks[blockNames[index % 4]].push(participant);
            });
    
            // For each block, create 4 matchup groups to produce 4 winners
            const initialBlockBrackets = {};
            for (const blockName of blockNames) {
                const blockParticipants = blocks[blockName];
                const numParticipants = blockParticipants.length;
                if (numParticipants === 0) {
                    initialBlockBrackets[blockName] = [];
                    continue;
                }

                // This is the core of the new grouping logic
                const groupSizeBase = Math.floor(numParticipants / 4);
                const numLargerGroups = numParticipants % 4;
                const finalGroups = [];
                let currentIndex = 0;

                for (let i = 0; i < 4; i++) {
                    const size = i < numLargerGroups ? groupSizeBase + 1 : groupSizeBase;
                    if (size > 0) {
                        finalGroups.push(blockParticipants.slice(currentIndex, currentIndex + size));
                        currentIndex += size;
                    }
                }
                initialBlockBrackets[blockName] = finalGroups;
            }
    
            setJankenTournament({
                participants: availableMembers,
                blocks: initialBlockBrackets,
                stage: 'blocks',
                finalBracket: [],
                round: 1, // Round 1 is the initial block matchups
                eliminations: [],
                winner: null,
                senbatsu: [],
                isFinished: false,
                blockWinners: { 'A': null, 'B': null, 'C': null, 'D': null },
            });
    
            addNotification({ type: 'Event', message: 'The Janken Tournament has begun!' });
            setShowModal('jankenTournament');
        };
    
    const determineWinner = (pair) => {
        if (pair.length === 1) {
            return { winner: pair[0], results: [{ member: pair[0], hand: 'bye' }] };
        }

        const hands = ['rock', 'paper', 'scissors'];
        
        while (true) {
            const results = pair.map(member => ({
                member,
                hand: hands[Math.floor(Math.random() * hands.length)]
            }));

            const moves = results.map(r => r.hand);
            const uniqueMoves = new Set(moves);

            // If everyone throws the same hand or all three different hands, it's a draw. Re-roll.
            if (uniqueMoves.size === 1 || uniqueMoves.size === 3) {
                continue; // Draw, re-simulate the loop
            }

            // At this point, there are exactly two different hands.
            let winnerHand;
            const [move1, move2] = Array.from(uniqueMoves);

            if (
                (move1 === 'rock' && move2 === 'scissors') ||
                (move1 === 'scissors' && move2 === 'paper') ||
                (move1 === 'paper' && move2 === 'rock')
            ) {
                winnerHand = move1;
            } else {
                winnerHand = move2;
            }

            const winners = results.filter(r => r.hand === winnerHand);
            
            // If there's one clear winner, return.
            if (winners.length === 1) {
                return { winner: winners[0].member, results: results };
            }
            
            // If there's a tie for the winning hand (e.g., two rocks vs. one scissors), re-roll.
            // This ensures a single, undisputed winner for the round.
            continue;
        }
    };

        const simulateJankenRound = () => {
        if (!jankenTournament || jankenTournament.isFinished) return;

        const { stage, blocks, finalBracket } = jankenTournament;
        const allMatchupResults = [];

        const processBracket = (bracket) => {
            for (const pair of bracket) {
                const outcome = determineWinner(pair); // Returns { winner, results }
                allMatchupResults.push(outcome);
            }
        };

        if (stage === 'blocks') {
            Object.values(blocks).forEach(blockBracket => {
                if (blockBracket && blockBracket.length > 0) {
                    processBracket(blockBracket);
                }
            });
        } else if (stage === 'finals') {
            if (finalBracket && finalBracket.length > 0) {
                processBracket(finalBracket);
            }
        }

        // Add the detailed simulation results to the tournament state
        setJankenTournament(prev => ({
            ...prev,
            roundResults: allMatchupResults,
        }));
    };

    
    const createFinalSenbatsu = (winner, allEliminations, allParticipants) => {
        const senbatsu = [{ ...winner, rank: 1 }];
        const finalRound = Math.max(...allEliminations.filter(e => e.stage === 'finals').map(e => e.round));

        const getLosersOfFinalRound = (roundNum) => {
            return allEliminations
                .filter(e => e.stage === 'finals' && e.round === roundNum)
                .map(e => allParticipants.find(p => p.id === e.loserId))
                .filter(Boolean);
        };

        // Rank 2: Loser of the final match
        const finalLosers = getLosersOfFinalRound(finalRound);
        if (finalLosers.length > 0) {
            senbatsu.push({ ...finalLosers[0], rank: 2 });
        }

        // Ranks 3-4: Losers of the semi-finals
        const semiFinalLosers = getLosersOfFinalRound(finalRound - 1);
        semiFinalLosers.forEach((member, index) => {
            senbatsu.push({ ...member, rank: 3 + index });
        });

        // Ranks 5-8: Losers of the quarter-finals
        const quarterFinalLosers = getLosersOfFinalRound(finalRound - 2);
        quarterFinalLosers.forEach((member, index) => {
            senbatsu.push({ ...member, rank: 5 + index });
        });

        // Ranks 9-16: Losers of the first final round (round of 16)
        const roundOf16Losers = getLosersOfFinalRound(finalRound - 3);
        roundOf16Losers.forEach((member, index) => {
            senbatsu.push({ ...member, rank: 9 + index });
        });

        return senbatsu.sort((a, b) => a.rank - b.rank);
    };

    const getBlockForMember = (memberId) => {
        if (!jankenTournament || !jankenTournament.participants) return null;
        
        // Find the member's original index in the full participant list.
        const participantIndex = jankenTournament.participants.findIndex(p => p.id === memberId);
        if (participantIndex === -1) return null;
        
        // The block is determined by their initial assignment.
        const blockNames = ['A', 'B', 'C', 'D'];
        return blockNames[participantIndex % 4];
    };
    
    const advanceJankenRound = () => {
        if (!jankenTournament || !jankenTournament.roundResults) return;
    
        const { roundResults, eliminations, round, stage } = jankenTournament;
        
        let newEliminations = [];
        roundResults.forEach(outcome => {
            const pair = outcome.results.map(r => r.member);
            const winner = outcome.winner;
            const losers = pair.filter(p => p.id !== winner.id);
            losers.forEach(loser => {
                newEliminations.push({ 
                    loserId: loser.id, 
                    winnerId: winner.id, 
                    round: round, 
                    block: stage === 'blocks' ? getBlockForMember(loser.id) : null,
                    stage: stage 
                });
            });
        });
    
        const winners = roundResults.map(r => r.winner);
    
        if (stage === 'blocks') {
            const shuffledFinalists = [...winners].sort(() => 0.5 - Math.random());
            const nextFinalBracket = [];
            for (let i = 0; i < shuffledFinalists.length; i += 2) {
                nextFinalBracket.push(shuffledFinalists.slice(i, i + 2));
            }
    
            setJankenTournament(prev => ({
                ...prev,
                stage: 'finals',
                round: 1, 
                finalBracket: nextFinalBracket,
                eliminations: [...prev.eliminations, ...newEliminations],
                roundResults: null,
            }));
        }
        else if (stage === 'finals') {
            if (winners.length === 1) {
                const finalWinner = winners[0];
                const finalElims = [...eliminations, ...newEliminations];
    
                const senbatsuRanked = createFinalSenbatsu(finalWinner, finalElims, jankenTournament.participants);
                const memberIdToNameMap = new Map(jankenTournament.participants.map(m => [m.id, m.name]));
                const eliminationMap = new Map(finalElims.map(e => [e.loserId, e]));
                const senbatsuIds = new Set(senbatsuRanked.map(m => m.id));
    
                const detailedSenbatsu = senbatsuRanked.map(member => {
                    if (member.rank === 1) return { ...member, lostTo: null, eliminationRound: 'Winner' };
                    const elimEvent = eliminationMap.get(member.id);
                    if (!elimEvent) return member;
                    const lostToName = memberIdToNameMap.get(elimEvent.winnerId) || 'Unknown';
                    const roundName = elimEvent.stage === 'finals' ? `Finals Round ${elimEvent.round}` : `Block ${elimEvent.block} Round ${elimEvent.round}`;
                    return { ...member, lostTo: lostToName, eliminationRound: roundName };
                });
    
                const unplacedMembers = jankenTournament.participants
                    .filter(p => !senbatsuIds.has(p.id))
                    .map(member => {
                        const elimEvent = eliminationMap.get(member.id);
                        if (!elimEvent) return { ...member, rank: 'Unplaced', lostTo: 'N/A', eliminationRound: 'N/A' };
                        const lostToName = memberIdToNameMap.get(elimEvent.winnerId) || 'Unknown';
                        const roundName = elimEvent.stage === 'blocks' ? `Block ${elimEvent.block} Round ${elimEvent.round}` : `Finals Round ${elimEvent.round}`;
                        return { ...member, rank: 'Unplaced', lostTo: lostToName, eliminationRound: roundName };
                    })
                    .sort((a,b) => a.name.localeCompare(b.name));
    
                const finalResults = { winner: finalWinner, senbatsu: detailedSenbatsu, unplaced: unplacedMembers };
                
                // --- THIS IS THE FIX ---
                // Combine all results and update every participant's personal history
                const allParticipantsWithResults = [...detailedSenbatsu, ...unplacedMembers];

                allParticipantsWithResults.forEach(memberResult => {
                    const historyEntry = {
                        week,
                        rank: memberResult.rank,
                        roundName: memberResult.eliminationRound,
                        lostTo: memberResult.lostTo || null,
                    };
                    updateMemberState(memberResult.id, m => ({
                        ...m,
                        jankenHistory: [...(m.jankenHistory || []), historyEntry]
                    }));
                });
                
                // Special boost for the winner (can be done after the main history update)
                updateMemberState(finalWinner.id, m => ({ ...m, morale: 100, stress: 0 }));
                
                setJankenTournament(prev => ({ ...prev, isFinished: true, winner: finalWinner, senbatsu: detailedSenbatsu, eliminations: finalElims, roundResults: null }));
                
                setJankenHistory(prev => [...prev, { 
                    week: week, 
                    ...finalResults,
                    participants: jankenTournament.participants, 
                    eliminations: finalElims 
                }]);
                
                setModalData(finalResults);
                setShowModal('jankenResult');
                setLastJankenResult
    
            } else {
                const nextRound = round + 1;
                const nextPairs = [];
                for (let i = 0; i < winners.length; i += 2) { nextPairs.push(winners.slice(i, i + 2)); }
                setJankenTournament(prev => ({ 
                    ...prev, 
                    stage: 'finals', 
                    round: nextRound, 
                    finalBracket: nextPairs, 
                    eliminations: [...prev.eliminations, ...newEliminations],
                    roundResults: null,
                }));
            }
        }
    };

const startSportsFestival = () => {
    const cost = 150000;
    if (money < cost) {
        setMessage("Not enough money to hold a Sports Festival.");
        return;
    }

    const availableMembers = getAllAvailableMembers(true).filter(m => m.isAvailable);
    if (availableMembers.length < 4) {
        setMessage("Not enough members for a Sports Festival.");
        return;
    }

    setMoney(prev => prev - cost);
    addNotification({
        type: 'Event',
        message: `The annual Sports Festival is underway! Cost: ¥${cost.toLocaleString()}`
    });

    // Setup the live event state
    const shuffledMembers = [...availableMembers].sort(() => 0.5 - Math.random());
    const midPoint = Math.ceil(shuffledMembers.length / 2);
    
    const festivalEvents = [
        { name: '50m Sprint', stat: 'dancing', points: 2, description: 'A test of pure speed!' },
        { name: 'Obstacle Course', stat: 'stamina', points: 2, description: 'Agility and endurance are key.' },
        { name: 'Tug-of-War', stat: 'stamina', points: 3, description: 'A full team effort!' },
        { name: 'Three-Legged Race', stat: 'dancing', points: 2, description: 'Coordination is everything.' },
        { name: 'Grand Relay', stat: 'dancing', points: 5, description: 'The final, decisive event!' },
    ];

    setLiveSportsFestival({
        teamRed: { members: shuffledMembers.slice(0, midPoint), score: 0 },
        teamWhite: { members: shuffledMembers.slice(midPoint), score: 0 },
        events: festivalEvents,
        currentEventIndex: 0,
        eventLog: [],
        memberScores: {}
    });

    setShowModal('liveSportsFestival');
};

const simulateSportsFestivalEvent = () => {
    if (!liveSportsFestival) return;

    const { teamRed, teamWhite, events, currentEventIndex, eventLog, memberScores } = liveSportsFestival;
    const event = events[currentEventIndex];

    let winner = null;
    let winningTeam = '';

    if (event.name === 'Tug-of-War') {
        const redPower = teamRed.members.reduce((sum, m) => sum + (m.stamina || 0) + (m.dancing / 2), 0);
        const whitePower = teamWhite.members.reduce((sum, m) => sum + (m.stamina || 0) + (m.dancing / 2), 0);
        winningTeam = redPower > whitePower ? 'Red' : 'White';
        winner = winningTeam === 'Red' ? teamRed.members[0] : teamWhite.members[0]; // Placeholder winner for log
    } else {
        const competitors = [...teamRed.members, ...teamWhite.members];
        winner = competitors.sort((a, b) => {
            const statA = (a[event.stat] || 50) + (Math.random() * 20);
            const statB = (b[event.stat] || 50) + (Math.random() * 20);
            return statB - statA;
        })[0];
        winningTeam = teamRed.members.some(m => m.id === winner.id) ? 'Red' : 'White';
    }

    const newMemberScores = { ...memberScores };
    newMemberScores[winner.id] = (newMemberScores[winner.id] || 0) + event.points;

    const newTeamRed = { ...teamRed, score: teamRed.score + (winningTeam === 'Red' ? event.points : 0) };
    const newTeamWhite = { ...teamWhite, score: teamWhite.score + (winningTeam === 'White' ? event.points : 0) };

    setLiveSportsFestival({
        ...liveSportsFestival,
        teamRed: newTeamRed,
        teamWhite: newTeamWhite,
        currentEventIndex: currentEventIndex + 1,
        eventLog: [...eventLog, {
            name: event.name,
            description: event.description,
            winnerName: winner.name,
            winningTeam: winningTeam
        }],
        memberScores: newMemberScores
    });
};

const finishSportsFestival = () => {
    if (!liveSportsFestival) return;
    const { teamRed, teamWhite, eventLog, memberScores } = liveSportsFestival;

    const winningTeamName = teamRed.score > teamWhite.score ? 'Red' : 'White';
    const losingTeamName = winningTeamName === 'Red' ? 'White' : 'Red';

    // Apply morale boosts
    teamRed.members.forEach(member => {
        const moraleBoost = winningTeamName === 'Red' ? 20 : 10;
        updateMemberState(member.id, m => ({ ...m, morale: Math.min(100, m.morale + moraleBoost) }));
    });
    teamWhite.members.forEach(member => {
        const moraleBoost = winningTeamName === 'White' ? 20 : 10;
        updateMemberState(member.id, m => ({ ...m, morale: Math.min(100, m.morale + moraleBoost) }));
    });

    // Determine and reward MVP
    let mvp = teamRed.members[0]; // Default MVP
    if(Object.keys(memberScores).length > 0) {
        const mvpId = Object.keys(memberScores).reduce((a, b) => memberScores[a] > memberScores[b] ? a : b);
        mvp = getMemberById(mvpId);
        updateMemberState(mvpId, m => ({ ...m, morale: Math.min(100, m.morale + 15), fans: {...m.fans, casual: (m.fans.casual || 0) + 500} }));
    }

    const resultData = {
        week,
        winningTeam: winningTeamName,
        mvp: {id: mvp.id, name: mvp.name},
        teamRed: { members: teamRed.members.map(m => ({id: m.id, name: m.name})), score: teamRed.score },
        teamWhite: { members: teamWhite.members.map(m => ({id: m.id, name: m.name})), score: teamWhite.score },
        events: eventLog
    };

    setSportsFestivalHistory(prev => [resultData, ...prev]);
    setModalData(resultData);
    setShowModal('sportsFestivalResult');
    setLiveSportsFestival(null); // Clean up the live state
};

const simulateRivalActions = (currentRivals, currentWeek, addNotificationInLoop) => {
    const rivalNames = [
        'Lunar Princesses', 'Project Nova', 'Sapphire Kiss', 'Onyx7', 
        'Solstice', 'Equinox', 'Galaxy Girls', 'Cosmic Charm'
    ];

    let updatedRivals = currentRivals.map(rival => {
        let newRival = { ...rival };
        // Basic fan growth
        let newFans = Math.floor((newRival.fans || 0) * 0.01 * (0.5 + Math.random()));
        newRival.fans += newFans;

        // Chance to release a new single
        if (Math.random() < 0.08) { // 8% chance each week
            const newSongName = generateSongTitle();
            newRival.songs = [...(newRival.songs || []), { name: newSongName, sales: 0, releaseWeek: currentWeek }];
            addNotificationInLoop({ 
                type: 'Rival', 
                message: `${newRival.name} has released a new single titled "${newSongName}"!` 
            });
        }

        // Update sales for existing songs
        if (newRival.songs) {
            newRival.songs = newRival.songs.map(song => ({
                ...song,
                sales: song.sales + Math.floor(Math.random() * 4000) + 1000
            }));
        }

        // Chance to recruit a new member
        if (Math.random() < 0.04) { // 4% chance each week
            newRival.membersCount = (newRival.membersCount || 10) + 1;
             addNotificationInLoop({ 
                type: 'Rival', 
                message: `${newRival.name} recruited a new member, bringing their total to ${newRival.membersCount}.` 
            });
        }
        
        return newRival;
    });

    // Chance for a new rival group to appear
    if (updatedRivals.length < 5 && Math.random() < 0.02) {
         const newRivalName = rivalNames.find(name => !updatedRivals.some(r => r.name === name));
         if (newRivalName) {
            updatedRivals.push({
                id: Date.now(),
                name: newRivalName,
                fans: 5000 + Math.floor(Math.random() * 10000),
                membersCount: 8 + Math.floor(Math.random() * 8),
                songs: []
            });
             addNotificationInLoop({ 
                type: 'Rival', 
                message: `A new rival group, ${newRivalName}, has appeared on the scene!` 
            });
         }
    }
    
    return updatedRivals;
};


    return {
    // State
    draftKaigi, draftProspects, liveSportsFestival, simulateSportsFestivalEvent, finishSportsFestival, startSportsFestival, sportsFestivalHistory, lastRequestHourResult, startRequestHour, castPlayerVotes, requestHourStatus, votingTickets, requestHourHistory, groupReputation, confirmKouhakuParticipation, declineKouhakuInvitation, kouhakuHistory, kouhakuInvitationOffered, acceptKouhakuInvitation, simulateJankenRound, electionHistory, jankenHistory, setLastJankenResult, lastJankenResult, startJankenTournament, advanceJankenRound, jankenTournament, setJankenTournament, gameStarted, setGameStarted, groupName, money, week, formattedDate, members, electionVotePool, setElectionVotePool, isElectionSingleFinished, lastElectionResult, isCampaignActive, setIsCampaignActive, campaignEndWeek, setCampaignEndWeek, setMembers, handleTogglePushMember, pushedMembers, setPushedMembers, selectedMember, scheduledEvents, setScheduledEvents, setSelectedMember, message, setMessage, totalFans, setTotalFans, currentTab, setCurrentTab, showNotifications, setShowNotifications, notifications, setNotifications, pastReleases, songs, setSongs, teams, setTeams, allSetlists, setAllSetlists, theaterSongs, setTheaterSongs, buildings, setBuildings, theaters, setTheaters, setWeek, setMoney, sisterGroups, setScheduledSingles, setSisterGroups, rivalGroups, setRivalGroups, achievements, hallOfFame, events, sponsorships, showModal, setShowModal, modalData, setModalData, activeScandal, setActiveScandal, selectedSisterGroup, setSelectedSisterGroup, selectedTheaterTeam, setSelectedTheaterTeam, username, setUsername, memberView, setMemberView, merchInventory, setMerchInventory, merchDesignBonus, beginActivity, merchTiers, idolMerchTiers, eventMerchTiers, produceEventMerch, eventMerchInventory, idolMerchInventory, produceIdolMerch, activeTour, setActiveTour, venues, setVenues, performanceHistory, setPerformanceHistory, performanceTypes, auditionCandidates, setAuditionCandidates, mediaJobDoneThisWeek, setMediaJobDoneThisWeek, groupMediaJobDoneThisWeek, setGroupMediaJobDoneThisWeek,
    // Firebase/Persistence
    getSavedGames, saveGame, loadGame,
    // Utilities
    startGame, getAllAvailableMembers, getFormattedDateForWeek, getMemberById, updateMemberState, getMemberGroupStatus, getMemberRank, addNotification, getMainGroupRoster,
    // Logic
    completedPromotions, runAnnualAwards, annualAwardsHistory, groupRoles, appointCaptain, handleAiDraftPick, finishDraft, handlePlayerDraftPick, advanceDraftStage, startDraftKaigi, pendingMerch, warehouse, upgradeWarehouse, onlineStore, upgradeOnlineStore, staff, hireStaff, trainMember, restMember, restAllTired, buildTheater, upgradePracticeRoom, upgradeTheater, buildSisterTheater, renameTheater, handleCheatCode, startTour, progressTour, createTeam, editTeam, saveTeam, deleteTeam, showTeamDetails, startTheaterShowPrep, graduateMember, askAboutGraduation, handleScandalResponse, holdTheaterShow, holdSisterGroupShow, holdElection, createSong, createCustomSetlist, confirmCreateSetlist, scheduleNewSingle, scheduleNewAlbum, executeAlbumRelease, handleDisbandSisterGroup, handleConfirmEditGroupName, produceMerch, startHandshakeEvent, startTrainingCamp, startMediaJob, startGroupMediaJob, nextWeek, confirmCreateSisterGroup, handleSisterMemberTransfer, recordPerformance, startPerformancePrep, holdMajorConcert, runElectionLogic, startSenbatsuPromotion, holdPressConference, completedBsidePromos, setCompletedBsidePromos, startBsidePromotion, startElectionCampaign, createElectionPoster, createElectionPosterForAll, createAppealVideoForAll, startAudition, confirmRecruitment, handleSetTrainingFocus, assignRandomTraining, assignLowestSkillTraining
    };
    };