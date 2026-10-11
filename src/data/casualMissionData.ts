import { CasualMission, MissionCategory, MissionLore, MissionPath } from '../types';

export const MISSION_CATEGORIES: {
  id: MissionCategory;
  name: string;
  shortDesc: string;
  icon: string;
  badgeColor: string;
}[] = [
  {
    id: 'culinary_restaurant',
    name: 'Cosmic Dining & Food Outposts',
    shortDesc: 'Build restaurants, bars & food stands in unique spots, cook dishes & seafood',
    icon: 'UtensilsCrossed',
    badgeColor: 'text-[#FF7A00] bg-[#FF7A00]/15 border-[#FF7A00]/40',
  },
  {
    id: 'xeno_companion',
    name: 'Fauna Taming & Mount Safaris',
    shortDesc: 'Scout colossal megafauna, tame rideable mounts & harvest wild ingredients',
    icon: 'Heart',
    badgeColor: 'text-[#00F0FF] bg-[#00F0FF]/15 border-[#00F0FF]/40',
  },
  {
    id: 'derelict_freighter',
    name: 'Derelict Freighter Salvage',
    shortDesc: 'Board eerie ghost ships in space, extract crew logs & tainted metal',
    icon: 'Skull',
    badgeColor: 'text-[#FF2A4D] bg-[#FF2A4D]/15 border-[#FF2A4D]/40',
  },
  {
    id: 'planet_expedition',
    name: 'Planet Explorer & Outpost',
    shortDesc: 'Find a specific planet biome, explore wonders & build cozy bases',
    icon: 'Globe',
    badgeColor: 'text-[#00E5A3] bg-[#00E5A3]/15 border-[#00E5A3]/40',
  },
  {
    id: 'planet_salvage',
    name: 'Planetary Salvage & Scrapping',
    shortDesc: 'Recover crashed starships, ancient bones & harmonic encampments',
    icon: 'Wrench',
    badgeColor: 'text-[#FFB300] bg-[#FFB300]/15 border-[#FFB300]/40',
  },
  {
    id: 'space_salvage',
    name: 'Space Salvage & Corsair',
    shortDesc: 'Deep space anomalies, asteroid mining & pirate fleet interception',
    icon: 'Rocket',
    badgeColor: 'text-[#C77DFF] bg-[#C77DFF]/15 border-[#C77DFF]/40',
  },
  {
    id: 'aquarius_fishing',
    name: 'Aquarius Deep-Sea Angling',
    shortDesc: 'Exo-Skiff ocean fishing, catch storm leviathans & mount trophies',
    icon: 'Anchor',
    badgeColor: 'text-[#38BDF8] bg-[#38BDF8]/15 border-[#38BDF8]/40',
  },
  {
    id: 'classic_expedition',
    name: 'Expedition Sequences',
    shortDesc: 'Multi-step event chains inspired by seasonal community expeditions',
    icon: 'Compass',
    badgeColor: 'text-[#F59E0B] bg-[#F59E0B]/15 border-[#F59E0B]/40',
  },
  {
    id: 'orbital_stellar',
    name: 'Orbital & Stellar Waypoints',
    shortDesc: 'Construct sub-orbital observation stations, solar beacons & stellar waypoints in planetary orbit',
    icon: 'Radio',
    badgeColor: 'text-[#A855F7] bg-[#A855F7]/15 border-[#A855F7]/40',
  },
  {
    id: 'minotaur_purification',
    name: 'Minotaur Titan Worm Purge',
    shortDesc: 'Deploy heavy Minotaur mech to eradicate Vile Brood grubs & exterminate infested titan worm nests',
    icon: 'Crosshair',
    badgeColor: 'text-[#EF4444] bg-[#EF4444]/15 border-[#EF4444]/40',
  },
  {
    id: 'exocraft_combat',
    name: 'Exocraft Combat & Vehicle Rallies',
    shortDesc: 'Vehicle-restricted operations: Roamer sentinel chases, Colossus core mining & Pilgrim drift runs',
    icon: 'Car',
    badgeColor: 'text-[#F97316] bg-[#F97316]/15 border-[#F97316]/40',
  },
  {
    id: 'faction_standing',
    name: 'Galactic Faction Standings',
    shortDesc: 'Elevate race standing (+3 to +5) with Gek, Vy\'keen, Korvax & Outlaw mercenary guilds',
    icon: 'Award',
    badgeColor: 'text-[#10B981] bg-[#10B981]/15 border-[#10B981]/40',
  },
];

export const PRESET_CASUAL_MISSIONS: CasualMission[] = [
  // 0. Cosmic Dining, Food Stands & Restaurants (User Favorites)
  {
    id: 'mis_dine_volcanic_bar',
    protocol_id: 'CHEF-01',
    title: 'The Magma Forge: Volcanic Mountain Stone Bar',
    category: 'culinary_restaurant',
    categoryName: 'Cosmic Dining & Food Outposts',
    categoryIcon: 'UtensilsCrossed',
    flavor_quote: 'Perched over roaring molten rivers, this stone tavern warms weary travelers with fresh pastries and fiery brews.',
    targetLocation: 'Mountain Ridge on a Volcanic / Scorched Planet',
    restaurantSpec: {
      venueType: 'Volcanic Cliffside Stone Tavern & Bar',
      aestheticTheme: 'Basalt stone pillars, wall fire braziers, rustic timber bar counter with stools, and an adjacent bio-dome farm station',
      signatureDishes: [
        {
          name: 'Lumpen Doughnuts',
          ingredients: ['Pulverised Wheat (Refined Flour)', 'Creature Milk (Cream -> Sweetened Butter)', 'Processed Sugar'],
          processorSteps: '1. Pulverise Wheat -> Refined Flour. 2. Process Creature Milk -> Cream -> Churned Butter -> Sweetened Butter. 3. Combine Flour + Butter + Sugar.',
        },
        {
          name: 'Fireberry Tart',
          ingredients: ['Refined Flour', 'Sweetened Butter', 'Fireberry / Cactus Flesh'],
          processorSteps: 'Combine Pie Case (Flour + Butter) with processed sweet Fireberry compote.',
        },
      ],
      decorChecklist: [
        'Heavy stone bar counter with at least 3 stools',
        'Nutrient Processor kitchen worktop station',
        'Wall torches, firepits or stone lanterns',
        'Bio-dome or Hydroponic tray growing Solar Vines / Cactus Flesh',
      ],
    },
    steps: [
      {
        step_number: 1,
        title: 'Survey Volcanic Ridge & Anchor Base',
        description: 'Locate a high mountain ledge overlooking lava rivers on a Volcanic world and place a Base Computer.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Construct the Mountain Stone Bar',
        description: 'Build stone foundations, an open-air bar counter with stools, and install decorative fire braziers.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Establish Nutrient Kitchen & Flora Station',
        description: 'Deploy a Nutrient Processor and build a small farm station with Solar Vines or Cactus Flesh for natural sugars.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Bake a Batch of Lumpen Doughnuts',
        description: 'Refine Wheat into Flour, churn Creature Milk into Sweetened Butter, and bake Lumpen Doughnuts in the processor.',
        completed: false,
      },
    ],
    bonusGoal: 'Deliver a warm Lumpen Doughnut to Iteration Cronus on the Space Anomaly for a food review and nanite reward.',
    reward: 'Master Gastronomer Title + Culinary Outpost Anchor + Nanite Bounty',
    createdAt: 1720000050000,
  },
  {
    id: 'mis_dine_cave_foodstand',
    protocol_id: 'CHEF-02',
    title: 'The Underglow Diner: Cavern Speakeasy & Food Stand',
    category: 'culinary_restaurant',
    categoryName: 'Cosmic Dining & Food Outposts',
    categoryIcon: 'UtensilsCrossed',
    flavor_quote: 'Deep beneath the planet crust, amongst glowing mushrooms, travellers gather for cold stellar desserts.',
    targetLocation: 'Deep Subterranean Cavern on a Lush or Bioluminescent Planet',
    restaurantSpec: {
      venueType: 'Underground Cavern Speakeasy & Food Stand',
      aestheticTheme: 'Food-truck style serving window, cave-carved booth seating, glowing marrow bulb chandeliers, and ambient ByteBeat lounge music',
      signatureDishes: [
        {
          name: 'Stellar Custard',
          ingredients: ['Sweetened Butter', 'Processed Sugar', 'Star Bramble / Wild Berries'],
          processorSteps: '1. Churn Creature Milk into Butter and sweeten with sugar. 2. Blend Sweetened Butter + Processed Sugar + Star Bramble in Nutrient Processor.',
        },
        {
          name: 'Cave Gourd Soufflé',
          ingredients: ['Refined Flour', 'Cream', 'Cave Marrow bulb extract'],
          processorSteps: 'Combine Pastry crust with whipped marrow cream in the processor.',
        },
      ],
      decorChecklist: [
        'Food stand window / counter with illuminated menu signs',
        'Nutrient Processor prep area',
        'Bioluminescent cave flora and mushroom lanterns',
        'Underground booth seating or rustic benches',
      ],
    },
    steps: [
      {
        step_number: 1,
        title: 'Excavate Subterranean Cavern Site',
        description: 'Explore deep natural cave networks on a lush or paradise world and claim a cavern opening with a Base Computer.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Build the Cavern Food Stand',
        description: 'Construct a cozy food-truck style counter, wooden or alloy booths, and string up glowing marrow lights.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Forage Cave Marrow & Star Berries',
        description: 'Harvest wild Cave Marrow bulbs from stalactites and forage Star Bramble from the surface.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Whip & Churn Stellar Custard',
        description: 'Process Creature Milk into Sweetened Butter, blend with Star Bramble and Processed Sugar, and serve cold Stellar Custard.',
        completed: false,
      },
    ],
    bonusGoal: 'Build a ByteBeat synthesizer inside the cave playing a slow, relaxing diner rhythm.',
    reward: 'Underground Haven Outpost + Sweet Treats Recipe Unlock',
    createdAt: 1720000060000,
  },
  {
    id: 'mis_dine_underwater_sushi',
    protocol_id: 'CHEF-03',
    title: 'The Abyssal Trench: Submerged Glass Coral Bistro',
    category: 'culinary_restaurant',
    categoryName: 'Cosmic Dining & Food Outposts',
    categoryIcon: 'UtensilsCrossed',
    flavor_quote: 'Dine fifty units beneath the surface while bioluminescent sea creatures swim past your glass dining dome.',
    targetLocation: 'Deep Ocean Coral Trench (Depth > 50u) on an Aquarius Water Planet',
    restaurantSpec: {
      venueType: 'Submerged Glass Coral Bistro & Sushi Lounge',
      aestheticTheme: 'Curved glass observation domes, aquatic blue lighting, kelp planters, and a surface Exo-Skiff mooring pier',
      signatureDishes: [
        {
          name: 'Abyssal Seafood Chowder',
          ingredients: ['Fresh Fish Fillet (Caught with Fishing Rig)', 'Creature Milk (Cream)', 'Salt / Kelp Sac'],
          processorSteps: '1. Fillet caught ocean fish in the Processor. 2. Combine Raw Fish Fillet + Cream + Kelp/Salt to simmer rich seafood chowder.',
        },
        {
          name: 'Galactic Fish & Chips',
          ingredients: ['Pulverised Wheat (Batter)', 'Raw Fish Fillet', 'Cooking Oil / Fat'],
          processorSteps: 'Dip fish fillets into flour batter and fry in the Nutrient Processor.',
        },
      ],
      fishingCatch: 'Catch 3 Deep-Sea or Storm-Tier fish using the Aquarius Fishing Rig',
      decorChecklist: [
        'Curved glass viewing dome with oceanic panorama',
        'Nutrient Processor seafood preparation bar',
        'Surface floating dock with Exo-Skiff mooring',
        'Aquarium or decorative kelp planters',
      ],
    },
    steps: [
      {
        step_number: 1,
        title: 'Deep Ocean Trench Descent',
        description: 'Sail out into deep waters on an Exo-Skiff, dive to the ocean floor (depth > 50u), and secure an underwater base foundation.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Construct the Glass Dining Dome',
        description: 'Build curved glass viewing compartments, interior dining tables, and build a vertical ladder to a surface boat dock.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Deep-Sea Fishing Expedition',
        description: 'Cast your Aquarius Fishing Rig from the surface skiff and catch 3 deep-water or nocturnal fish species.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Cook Fresh Abyssal Seafood Chowder',
        description: 'Process your caught fish into fresh fillets and simmer Abyssal Seafood Chowder in the Nutrient Processor.',
        completed: false,
      },
    ],
    bonusGoal: 'Hook a rare Storm Leviathan or Giant Angler during an active oceanic storm.',
    reward: 'Aquatic Master Chef Recognition + Aquarium Trophy Base Blueprint',
    createdAt: 1720000070000,
  },
  {
    id: 'mis_dine_orbital_skylounge',
    protocol_id: 'CHEF-04',
    title: 'The Zenith Promenade: Star-Gazer Sky Bistro',
    category: 'culinary_restaurant',
    categoryName: 'Cosmic Dining & Food Outposts',
    categoryIcon: 'UtensilsCrossed',
    flavor_quote: 'High in the clouds facing a brilliant binary star, patrons enjoy delicate pastries while watching starships drift in orbit.',
    targetLocation: 'Extreme Mountain Peak or Sub-Orbital Platform facing a Colored Star',
    restaurantSpec: {
      venueType: 'High-Altitude Star-Gazer Sky Bistro & Lounge',
      aestheticTheme: 'Open-air panoramic timber/alloy terrace, glass windbreak railings, lounge fire tables, and ornamental potted flora',
      signatureDishes: [
        {
          name: 'Interstellar Fancy',
          ingredients: ['Pie Case (Flour + Butter)', 'Sweetened Butter', 'Cactus Jelly / Fireberry Compote'],
          processorSteps: '1. Craft Pie Case. 2. Layer with sweetened whipped cream and exotic fruit reduction in the processor.',
        },
        {
          name: 'Solar Nectar Sparkler',
          ingredients: ['Sweetened Cream', 'Solar Vine Extract', 'Processed Sugar'],
          processorSteps: 'Blend sparkling solar nectar with cold whipped cream.',
        },
      ],
      decorChecklist: [
        'Panoramic outdoor patio with glass balustrades',
        'Nutrient Processor cocktail & pastry bar',
        'Fire pits or heat lamps for cloud altitude comfort',
        'Ornamental potted plants and outdoor lounge sofas',
      ],
    },
    steps: [
      {
        step_number: 1,
        title: 'Reach Mountain Summit or Orbit Point',
        description: 'Climb or fly to the highest needle-thin mountain peak above cloud level oriented towards the system star.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Build the Zenith Sky Terrace',
        description: 'Assemble wide alloy or timber patio decking, glass railings, and plush seating overlooking the horizon.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Harvest Exotic Solar Botanical Sugars',
        description: 'Harvest Solar Vines or Cactus Flesh and refine them into sweet fruit compote in the Nutrient Processor.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Bake Interstellar Fancies',
        description: 'Bake delicate pastry shells and assemble Interstellar Fancies in your high-altitude kitchen.',
        completed: false,
      },
    ],
    bonusGoal: 'Capture a Photo Mode shot of your sky bistro during binary sunset or with planetary rings framing the terrace.',
    reward: 'Skyward Sommelier Title + Orbital Lounge Waypoint',
    createdAt: 1720000080000,
  },
  {
    id: 'mis_dine_freighter_galley',
    protocol_id: 'CHEF-05',
    title: 'The Fleet Admiral’s Galley & Crew Mess Hall',
    category: 'culinary_restaurant',
    categoryName: 'Cosmic Dining & Food Outposts',
    categoryIcon: 'UtensilsCrossed',
    flavor_quote: 'A hard-working frigate fleet runs on its stomach. Keep your captains fed with piping-hot stews and fresh coffee.',
    targetLocation: 'Capital Freighter Interior Deck',
    restaurantSpec: {
      venueType: 'Freighter Industrial Galley & Fleet Mess Hall',
      aestheticTheme: 'Stainless alloy modular counters, twin Nutrient Processors, cafeteria booth seating, and a wall of hydroponic vegetable trays',
      signatureDishes: [
        {
          name: 'Hearty Hunter’s Stew',
          ingredients: ['Raw Steak / Feline Liver', 'Steamed Vegetables (Fungal Cluster / Gutrot)', 'Thick Gravy'],
          processorSteps: '1. Simmer meat into stew base. 2. Steam vegetables. 3. Combine in Processor for hearty crew stew.',
        },
        {
          name: 'Bitter Herbal Tea',
          ingredients: ['Fungal Mould', 'Purified Water / Star Bramble'],
          processorSteps: 'Brew dried herbs into steaming tea.',
        },
      ],
      decorChecklist: [
        'Twin Nutrient Processor galley kitchen line',
        'Cafeteria dining tables with bench seating',
        'Hydroponic wall growing wheat and edible fungi',
        'Coffee dispenser and fleet pantry crates',
      ],
    },
    steps: [
      {
        step_number: 1,
        title: 'Designate Freighter Mess Hall Wing',
        description: 'Expand your capital freighter interior deck to create an open cafeteria and dining hall for your crew.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Install Twin Galley Kitchen Line',
        description: 'Place 2 Nutrient Processors side-by-side, kitchen prep counters, and dining booths.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Harvest Hydroponic Provisions',
        description: 'Grow wheat and edible vegetables in freighter hydro trays and gather fresh meat from planetary expeditions.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Simmer a Giant Batch of Stew',
        description: 'Simmer Hearty Hunter\'s Stew and brew refreshing tea in the Nutrient Processors to feed the fleet.',
        completed: false,
      },
    ],
    bonusGoal: 'Store 5 bowls of gourmet stew in your Freighter storage containers ready for frigate missions.',
    reward: 'Fleet Morale Master + Frigate Expedition Supply Bonus',
    createdAt: 1720000090000,
  },
  {
    id: 'mis_xeno_megafauna',
    protocol_id: 'PET-01',
    title: 'Xeno Hunt: Colossal Strider & Sky Mounts',
    category: 'xeno_companion',
    categoryName: 'Xeno Pokemon & Companions',
    categoryIcon: 'Heart',
    flavor_quote: 'The giants shake the earth with each stride. Offer a handful of sweet pellets, and the behemoth is yours.',
    targetLocation: 'Lush Paradise or Verdant World with Gentle Climate',
    steps: [
      {
        step_number: 1,
        title: 'Locate Megafauna Fauna',
        description: 'Scan planets in green or yellow star systems to find a world harboring megafauna creatures (height > 4.0m) or giant flying beetles.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Befriend & Adopt Companion',
        description: 'Approach the wild creature, toss Creature Pellets to calm it, interact to tame it, and register it to your Companion Roster.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Overland Mount Journey',
        description: 'Summon your newly tamed companion, mount its saddle, and ride it continuously across 800u of rolling hills.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Bond & Level Up Trust',
        description: 'Feed, pat, and clean your companion until its Trust level increases by at least 15%.',
        completed: false,
      },
    ],
    bonusGoal: 'Take a Photo Mode picture riding your colossal companion during sunrise or sunset.',
    reward: 'Level-Up Trust Boost + Lifelong giant terrain mount',
    createdAt: 1720000000000,
  },
  {
    id: 'mis_xeno_robot',
    protocol_id: 'PET-02',
    title: 'Mechanical Fauna Safari: The Electric Steed',
    category: 'xeno_companion',
    categoryName: 'Xeno Pokemon & Companions',
    categoryIcon: 'Heart',
    flavor_quote: 'They hum with clockwork electricity. They do not eat plants; they feed on batteries.',
    targetLocation: 'Uncharted / Abandoned Red Star System',
    steps: [
      {
        step_number: 1,
        title: 'Warp to an Uncharted Red Star',
        description: 'Open the Galaxy Map and warp to an Uncharted or Life-Form: None red star system (Cadmium drive required).',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Discover Robotic Fauna',
        description: 'Land on planets until you encounter mechanical robotic creatures with umbrella heads, solar sails, or sphere joints.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Tame with Ion Batteries',
        description: 'Offer Ion Batteries to the mechanical creature and adopt it as your high-speed robotic mount.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Full-Speed Stunt Sprint',
        description: 'Sprint at top speed on your robot pet across rocky flats for 1,000 units.',
        completed: false,
      },
    ],
    bonusGoal: 'Harvest Chewy Wires or Mechanical Milk from your robot pet.',
    reward: 'Ultra-fast synthetic mount capable of outpacing normal exocrafts',
    createdAt: 1720000100000,
  },
  {
    id: 'mis_xeno_combat',
    protocol_id: 'PET-03',
    title: 'Combat Pet Training: The Apex Predator',
    category: 'xeno_companion',
    categoryName: 'Xeno Pokemon & Companions',
    categoryIcon: 'Heart',
    flavor_quote: 'A loyal predator will tear through Sentinel steel to protect its handler.',
    targetLocation: 'Aggressive Sentinel or Infested World',
    steps: [
      {
        step_number: 1,
        title: 'Tame a Predatory Creature',
        description: 'Locate a sharp-clawed carnivore, armored hound, or raptor species and adopt it as a companion.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Equip Companion Laser Module',
        description: 'Summon the companion and customize its accessory slots with a functional mining laser or torch unit.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Field Combat Exercise',
        description: 'Engage biological horrors at an Abandoned Building or fight corrupted sentinels, letting your companion assist in combat.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Reward & Treat Companion',
        description: 'Feed your companion high-tier meat treats in celebration of victory.',
        completed: false,
      },
    ],
    bonusGoal: 'Defeat 5 hostile biological horrors while fighting side-by-side with your companion.',
    reward: 'Combat Battle Pet trained for Sentinel and monster defense',
    createdAt: 1720000200000,
  },
  {
    id: 'mis_xeno_breeder',
    protocol_id: 'PET-04',
    title: 'Gene Sequencing: The Monster Breeder',
    category: 'xeno_companion',
    categoryName: 'Xeno Pokemon & Companions',
    categoryIcon: 'Heart',
    flavor_quote: 'Take the egg to the heart of the Anomaly. Infuse it with star-metals and watch evolution unfold.',
    targetLocation: 'Space Anomaly Egg Sequencer',
    steps: [
      {
        step_number: 1,
        title: 'Harvest Companion Egg',
        description: 'Ensure your primary companion is in its native climate and happy, then collect an egg when ready to lay.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Enter the Egg Sequencer',
        description: 'Board the Space Anomaly and access the Egg Sequencer terminal near Iteration Cronus.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Mutate Genetic Traits',
        description: 'Insert catalysts (e.g. Platinum for size increase, Storm Crystals for aggression, Activated Copper for color change).',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Hatch the Giant Offspring',
        description: 'Incubate the egg until ready to hatch, then welcome your new genetically customized pet.',
        completed: false,
      },
    ],
    bonusGoal: 'Hatch an offspring that is visibly larger than its parent specimen.',
    reward: 'Custom mutant companion with boosted size, speed, or combat stats',
    createdAt: 1720000300000,
  },

  // 2. Derelict Freighter Salvage
  {
    id: 'mis_derelict_run',
    protocol_id: 'DRLK-16',
    title: 'Deep Space Derelict: The Lost Ghost Ship',
    category: 'derelict_freighter',
    categoryName: 'Derelict Freighter Salvage',
    categoryIcon: 'Skull',
    flavor_quote: 'Cold silence hangs in the airlocks. Automated turrets still track movement in the dark.',
    targetLocation: 'Deep Space Pulse Orbit (Broadcast Receiver)',
    steps: [
      {
        step_number: 1,
        title: 'Acquire Emergency Broadcast Receiver',
        description: 'Obtain an Emergency Broadcast Receiver from the Space Station Scrap Dealer or Iteration Helios on the Anomaly.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Scan & Board Ghost Vessel',
        description: 'Activate the receiver in deep space, pulse until an anomalous derelict freighter appears, and land on its exterior pads.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Unseal Compartments & Decrypt Logs',
        description: 'Navigate through pressurized airlocks, deactivating turrets or alien hives, and extract the Captain\'s Log & Crew Manifest.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Engineering Terminal Harvest',
        description: 'Reach the final Engineering room and choose either a Freighter Cargo Bulkhead or Salvaged Fleet Upgrade Module.',
        completed: false,
      },
    ],
    bonusGoal: 'Sell the Captain\'s Log to the Space Station Scrap Dealer for Tainted Metal.',
    reward: 'Freighter Cargo Bulkhead, S-Class Fleet Module & 500+ Tainted Metal',
    createdAt: 1720000400000,
  },

  // 3. Planet Explorer & Outpost
  {
    id: 'mis_planet_paradise',
    protocol_id: 'EXPL-01',
    title: 'The Bioluminescent Sanctuary: Paradise Outpost',
    category: 'planet_expedition',
    categoryName: 'Planet Explorer & Outpost',
    categoryIcon: 'Globe',
    flavor_quote: 'Grass that glows like neon threads under violet skies. The perfect spot for a glass retreat.',
    targetLocation: 'Lush Chameleon or Bioluminescent Paradise Planet',
    steps: [
      {
        step_number: 1,
        title: 'Locate a Glowing Paradise World',
        description: 'Explore star systems to locate a Lush / Verdant / Paradise planet with glowing grass, calm weather, and no sentinels.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Claim Scenic Cliff Vista',
        description: 'Scout the landscape for a high cliff, waterfall, or ocean coast and place a Base Computer.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Construct Glass Overlook',
        description: 'Build a scenic lounge featuring glass windows, a cozy terrace, and an automated landing pad for your ship.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Power & Decorate Retreat',
        description: 'Install solar panels and batteries, then furnish the interior with couches, lights, and potted agricultural plants.',
        completed: false,
      },
    ],
    bonusGoal: 'Adopt 1 local creature from this planet to keep as a resident pet at your new base.',
    photoGoal: {
      title: 'Bioluminescent Meadow Sunset',
      targetSubject: 'Glowing Grass & Glass Base Solarium',
      description: 'Capture Photo Mode during nocturnal hours when bioluminescent flora emits neon pulses against the backdrop of your glass retreat.',
      bonusNanites: 500,
    },
    reward: 'Scenic personal homeworld sanctuary uploaded to the teleporter network',
    createdAt: 1720000500000,
  },
  {
    id: 'mis_planet_dissonant',
    protocol_id: 'EXPL-02',
    title: 'Corrupted Glass: The Dissonant Encampment',
    category: 'planet_expedition',
    categoryName: 'Planet Explorer & Outpost',
    categoryIcon: 'Globe',
    flavor_quote: 'Purple radiant crystals hum with forgotten arithmetic. The Autophage lurk in the static.',
    targetLocation: 'Corrupted Dissonant Planet (Dissonant System)',
    steps: [
      {
        step_number: 1,
        title: 'Warp to a Dissonant Star System',
        description: 'Locate a star system with "Dissonant" in its galaxy map description and land on the corrupted world.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Harvest Radiant Shards & Inverted Mirror',
        description: 'Collect 10 Radiant Shards and destroy 1 Dissonant Resonator to secure an Inverted Mirror.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Locate & Unseal Harmonic Camp',
        description: 'Use an Echo Locator or scan to uncover a Harmonic Encampment. Solve the terminal math riddle to unseal it.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Claim Sentinel Multi-Tool / Staff Scrap',
        description: 'Unlock the weapon cabinet to claim a Sentinel Multi-Tool or Autophage customization cosmetics.',
        completed: false,
      },
    ],
    bonusGoal: 'Locate a crashed Sentinel Interceptor starship using the Harmonic Camp terminal.',
    reward: 'S/A-Class Sentinel Multi-Tool + Harmonic Interceptor coordinates',
    createdAt: 1720000600000,
  },
  {
    id: 'mis_planet_ocean',
    protocol_id: 'EXPL-03',
    title: 'The Coral Abyss: Deep Water Submarine Run',
    category: 'planet_expedition',
    categoryName: 'Planet Explorer & Outpost',
    categoryIcon: 'Globe',
    flavor_quote: 'Turquoise at the surface, velvet black in the deep trenches. The Nautilon illuminates ancient coral.',
    targetLocation: 'Water World / Deep Ocean Planet (Depth > 50u)',
    steps: [
      {
        step_number: 1,
        title: 'Find an Ocean World',
        description: 'Locate a planet with vast water coverage and islands using planetary scans.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Deploy Nautilon Submarine',
        description: 'Land on an ocean island or floating platform and summon the Nautilon submarine.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Dive into Submerged Trenches',
        description: 'Pilot the Nautilon down to a depth of 50u+ into glowing underwater caves and coral valleys.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Harvest Sunken Pearls & Relics',
        description: 'Harvest 5 Living Pearls from Armoured Clams and investigate a Sunken Ruin.',
        completed: false,
      },
    ],
    bonusGoal: 'Build an underwater glass cube room with a hatch accessible from the water.',
    reward: 'Aquatic treasures, Living Pearls & Submerged base coordinates',
    createdAt: 1720000700000,
  },

  // 4. Planetary Salvage & Scrapping
  {
    id: 'mis_salvage_crashed',
    protocol_id: 'SCRP-01',
    title: 'Wreckage Scavenger: Crashed Starship Restoration',
    category: 'planet_salvage',
    categoryName: 'Planetary Salvage & Scrapping',
    categoryIcon: 'Wrench',
    flavor_quote: 'Smoke still curls from the fuselage. With a few field repairs, this beauty will fly again.',
    targetLocation: 'Planetary Distress Site (Any Inhabited System)',
    steps: [
      {
        step_number: 1,
        title: 'Locate a Distress Signal',
        description: 'Use Emergency Cartographic Data maps, transmission towers, or visual flying to discover a crashed starship.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Field Repair Thrusters & Pulse Drive',
        description: 'Repair the Launch Thruster and Pulse Engine using Pure Ferrite, Di-hydrogen, and Hermetic Seals.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Take Flight to Space Station',
        description: 'Lift off from the crash crater and pilot the salvaged ship into the nearest Space Station.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Scrap or Extract Parts',
        description: 'Use the Starship Outfitting Terminal to either scrap the vessel for high-value items/Nanites or extract custom modular wings.',
        completed: false,
      },
    ],
    bonusGoal: 'Find and salvage an Exotic (Guppy/Squid) or S-Class fighter hull.',
    reward: 'Millions of Units in scrap, Starship Storage Augmentations & Nanite clusters',
    createdAt: 1720000800000,
  },
  {
    id: 'mis_salvage_bones',
    protocol_id: 'SCRP-02',
    title: 'Jurassic Excavation: Ancient Prehistoric Bones',
    category: 'planet_salvage',
    categoryName: 'Planetary Salvage & Scrapping',
    categoryIcon: 'Wrench',
    flavor_quote: 'Million-year-old leviathans buried beneath the volcanic ash. Dig them up and admire the colossal skulls.',
    targetLocation: 'Planet with "Ancient Bones" resource tag',
    steps: [
      {
        step_number: 1,
        title: 'Locate an Ancient Bones Planet',
        description: 'Scan planets from space until you find one with "Ancient Bones" listed in its resource catalog.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Tag Subterranean Dig Sites',
        description: 'Equip your Analysis Visor to spot yellow skeleton icons indicating buried dinosaur remains.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Excavate 5 Fossil Clusters',
        description: 'Use your Terrain Manipulator to dig out 5 separate bone caches.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Unearth a Legendary Specimen',
        description: 'Uncover at least 1 Rare or Legendary golden bone worth over 500,000 Units.',
        completed: false,
      },
    ],
    bonusGoal: 'Place the rarest bone item in a storage vault to start a personal dinosaur museum.',
    reward: 'Multi-million unit fossil collection and paleontology achievements',
    createdAt: 1720000900000,
  },

  // 5. Space Salvage & Corsair
  {
    id: 'mis_space_corsair',
    protocol_id: 'COR-01',
    title: 'Fleet Guardian: The Pirate Dreadnought Interception',
    category: 'space_salvage',
    categoryName: 'Space Salvage & Corsair',
    categoryIcon: 'Rocket',
    flavor_quote: 'Red alert klaxons wail as the Pirate Dreadnought drops out of hyperspace. Dive into the trenches!',
    targetLocation: 'High-Conflict / Outlaw Star System',
    steps: [
      {
        step_number: 1,
        title: 'Warp into Fleet Battle',
        description: 'Warp between star systems until you trigger a Capital Fleet emergency battle with an attacking Pirate Dreadnought.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Trench Run: Destroy Shield Generators',
        description: 'Fly below the Dreadnought\'s energy shield into the superstructure trench and destroy its shield nodes.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Disable Hyperspace Warp Engines',
        description: 'Fly to the rear of the dreadnought and destroy its warp engines before it can jump away.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Force Surrender & Claim Salvage',
        description: 'Destroy the capital ship or force its captain to surrender and surrender its pirate freighter fleet.',
        completed: false,
      },
    ],
    bonusGoal: 'Defeat all torpedoes fired at the civilian freighter to ensure 100% civilian shield integrity.',
    reward: 'Massive Unit bounty, Cargo Bulkhead, and option to claim a Pirate Capital Ship',
    createdAt: 1720001000000,
  },
  {
    id: 'mis_space_anomaly',
    protocol_id: 'COR-02',
    title: 'Deep Space Anomaly Hunter',
    category: 'space_salvage',
    categoryName: 'Space Salvage & Corsair',
    categoryIcon: 'Rocket',
    flavor_quote: 'Pulse engines roaring through the asteroid field. A strange biological relic emerges from the cosmic void.',
    targetLocation: 'Any System (Pulse Drive Anomaly Detector)',
    steps: [
      {
        step_number: 1,
        title: 'Acquire Anomaly Detector',
        description: 'Mine asteroid fields until an Anomaly Detector drops from crystal asteroids, then activate it.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Pulse Drive into Deep Space',
        description: 'Engage pulse drive until a rare cosmic anomaly signal is locked.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Investigate Cosmic Encounter',
        description: 'Drop out of pulse drive to investigate the anomaly (e.g. Dyson Swarm, Relic Gate, Void Egg, or Giant Skull).',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Harvest Void Telemetry',
        description: 'Interact with the entity via comms or fire weapons at derelict cargo pods to harvest rare technology.',
        completed: false,
      },
    ],
    bonusGoal: 'Photograph the cosmic space anomaly with your starship in the foreground.',
    reward: 'Rare starship modules, Nanite clusters, and cosmic anomaly wonders logged',
    createdAt: 1720001100000,
  },

  // 6. Aquarius Ocean Fishing
  {
    id: 'mis_aquarius_fishing',
    protocol_id: 'FISH-01',
    title: 'Aquarius Angler: Storm Leviathan Pursuit',
    category: 'aquarius_fishing',
    categoryName: 'Aquarius Deep-Sea Angling',
    categoryIcon: 'Anchor',
    flavor_quote: 'Cast your line into the surging waves while lightning splits the clouds. The big ones bite in storms.',
    targetLocation: 'Tropical Ocean Planet during Atmospheric Storm',
    steps: [
      {
        step_number: 1,
        title: 'Deploy Automated Exo-Skiff',
        description: 'Land on an ocean planet and summon your Exo-Skiff on water with depth greater than 35u.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Craft Specialized Fishing Bait',
        description: 'Open your inventory and craft specialized fishing bait using kelp, creature meat, and processed grains.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Catch 10 Fish Across Day & Night',
        description: 'Cast your fishing line into the water and hook 10 fish species across different lighting conditions.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Storm Fishing & Trophy Catch',
        description: 'Wait for a weather storm to roll in, cast with high-tier bait, and reel in a Rare or Colossal storm specimen.',
        completed: false,
      },
    ],
    bonusGoal: 'Mount your prized catch in a wall-mounted fish display inside a shoreline base.',
    reward: 'Aquatic trophy, fishing records catalogue expansion & gourmet seafood recipes',
    createdAt: 1720001200000,
  },

  // 7. Classic Expedition Sequences
  {
    id: 'mis_classic_sequence',
    protocol_id: 'SEAS-01',
    title: 'Expedition Echo: The Stargate Pilgrimage',
    category: 'classic_expedition',
    categoryName: 'Expedition Sequences',
    categoryIcon: 'Compass',
    flavor_quote: 'Sixteen glyphs light up in obsidian stone. Step through the gate into an uncharted sector.',
    targetLocation: 'Ancient Alien Portal (Glyph Network)',
    steps: [
      {
        step_number: 1,
        title: 'Learn 10 Alien Words',
        description: 'Converse with aliens at space stations or interact with Knowledge Stones on planet surfaces.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Locate Ancient Alien Monolith',
        description: 'Use an Alien Cartographic Map from the station cartographer to discover an ancient planetary Monolith.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Charge Planetary Portal Glyphs',
        description: 'Interact with the Monolith, present an alien relic to locate the planet\'s Alien Portal, and charge its glyph pillars.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Dial & Step Through Mystery Stargate',
        description: 'Enter a sequence of glyphs, step through the shimmering event horizon, and claim your arrival in a new world.',
        completed: false,
      },
    ],
    bonusGoal: 'Build a small traveler\'s waypoint base near the destination portal exit.',
    reward: 'Complete Stargate access, 16 Glyphs catalogued & permanent waypoint hub',
    createdAt: 1720001300000,
  },
  // 8. Orbital & Stellar Waypoints (Cosmos Update)
  {
    id: 'mis_orbital_solar_waypoint',
    protocol_id: 'ORBT-01',
    title: 'Helios Crown: Stellar Orbit Waypoint',
    category: 'orbital_stellar',
    categoryName: 'Orbital & Stellar Waypoints',
    categoryIcon: 'Radio',
    flavor_quote: 'Anchor an observation platform in the upper atmosphere facing the primary star. The solar flares hold lost broadcast frequencies.',
    targetLocation: 'Upper Stratosphere / Sub-Orbital Threshold of an Airless Moon',
    lore: {
      origin: 'Korvax Sub-Stellar Array #09',
      headline: 'The Solar Observatories of the First Convergence',
      narrative: 'Ancient Korvax research units once built floating waypoints along the boundary between stellar vacuum and upper atmospheres. These orbital relays watched starspots for binary transmissions before the Atlas cycle fractured.',
      historicalContext: 'First Convergence Stellar Astronomy',
      canonEntity: 'Priest Entity Nada'
    },
    steps: [
      {
        step_number: 1,
        title: 'Survey Sub-Orbital Elevation',
        description: 'Ascend from an airless moon using jetpack burst or terrain manipulation to reach maximum building height (>1,000u) overlooking the planetary curve.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Anchor High-Altitude Base Computer',
        description: 'Drop a Base Computer at the orbital ceiling to establish the "Helios Crown Stellar Relay".',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Construct Solar Observation Deck',
        description: 'Build a glass observation rotunda, 4 Solar Panels, and a Save Beacon directly aligned with the system star.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Install Teleportation Terminal',
        description: 'Wire a Base Teleport Module and battery grid, creating a permanent sub-orbital station for fleet view.',
        completed: false,
      },
    ],
    bonusGoal: 'Summon your Capital Freighter directly below the orbital platform for a panoramic fleet screenshot.',
    photoGoal: {
      title: 'Helios Crown Solar Flare Framing',
      targetSubject: 'Solar Corona, Binary Star & Sub-Orbital Rotunda',
      description: 'Engage Photo Mode from the edge of your high-altitude observation rotunda framing the primary star rising over the planetary curve.',
      bonusNanites: 600,
    },
    reward: 'Permanent Orbital Waypoint Hub + 1,200 Nanite discovery telemetry',
    createdAt: 1720001400000,
  },
  {
    id: 'mis_orbital_station_relay',
    protocol_id: 'ORBT-02',
    title: 'Stellar Horizon: Planetary Ring Waypoint',
    category: 'orbital_stellar',
    categoryName: 'Orbital & Stellar Waypoints',
    categoryIcon: 'Radio',
    flavor_quote: 'Where the planet rings slice through the sky like silver razor wire, establish a communications beacon.',
    targetLocation: 'Mountain Peak intersecting Planetary Rings',
    lore: {
      origin: 'Stellar Cartography Log: Euclid Outer Rim',
      headline: 'The Ring-Passage Beacon',
      narrative: 'When planetary rings intersect atmospheric ceilings, interstellar static creates localized sensory echoes. Establishing an automated waypoint here gives passing freighters calibration points across hyperspace lanes.',
      historicalContext: 'Free Merchant Caravan Navigation',
      canonEntity: 'Specialist Polo'
    },
    steps: [
      {
        step_number: 1,
        title: 'Locate a Ringed World Intersection',
        description: 'Fly to a ringed planet and find a high mountain ridge that touches or aligns with the dust plane of the rings.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Deploy Long-Range Signal Booster',
        description: 'Place a Signal Booster or Save Beacon on the highest elevation point along the ring trajectory.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Erect Ring-Watch Spire',
        description: 'Construct a vertical cylindrical tower topped with an observation lounge and landing pad.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Broadcast Planetary Coordinates',
        description: 'Activate your Analysis Visor, tag planetary coordinates, and save the waypoint to your galactic discoveries.',
        completed: false,
      },
    ],
    bonusGoal: 'Land your custom fabricated starship on the spire pad during a golden star-rise.',
    reward: 'Galactic Waypoint Registration + Emergency Signal Scanners',
    createdAt: 1720001500000,
  },
  // 9. Minotaur Titan Worm Purge
  {
    id: 'mis_minotaur_worm_purge',
    protocol_id: 'MINO-01',
    title: 'Titan Purge: Vile Brood Extermination',
    category: 'minotaur_purification',
    categoryName: 'Minotaur Titan Worm Purge',
    categoryIcon: 'Crosshair',
    flavor_quote: 'Mount the Minotaur mech. The soil shudders beneath heavy treads as titan tendrils erupt from the planetary crust.',
    targetLocation: 'Infested World with Vile Brood Nests',
    lore: {
      origin: 'Vy\'keen Warrior Codex: Trial of the Wurm',
      headline: 'The Cleansing of the Crawling Dark',
      narrative: 'Vile Brood grubs burrow into corrupted planetary mantles, spawning titanic writhing horrors that devour outposts whole. Vy\'keen tradition permits only armored mechanized walkers to engage these biological monstrosities in honorable attrition.',
      historicalContext: 'Vy\'keen Extermination Crusade',
      canonEntity: 'Weapons Specialist Hirk'
    },
    steps: [
      {
        step_number: 1,
        title: 'Locate an Infested Planet',
        description: 'Scan systems for planets tagged "Infested", "The Nest", or exhibiting purple biological corruption.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Deploy Minotaur Heavy Mech',
        description: 'Call down your Minotaur Exocraft. Mount the cockpit or activate the Minotaur AI pilot module.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Destroy 3 Titan Worm Nests',
        description: 'Stomp into infested terrain and use the Minotaur Cannon or Bore to annihilate 3 writhing worm nests and eliminate spawned grubs.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Harvest Vile Flesh & Cursed Dust',
        description: 'Collect at least 250 Vile Flesh or Cursed Dust dropped from neutralized worm tendrils.',
        completed: false,
      },
    ],
    bonusGoal: 'Complete the entire nest purge exclusively using the Minotaur mech without firing handheld multi-tool weapons.',
    photoGoal: {
      title: 'Vile Titan Brood Breach',
      targetSubject: 'Emerging Titan Worm & Armored Minotaur Cannon',
      description: 'Time Photo Mode right as a colossal subterranean worm erupts from the planetary mantle with your Minotaur mech aimed at the horror.',
      bonusNanites: 750,
    },
    reward: 'Vy\'keen Battle Honor, 800 Nanites & Bio-Hazard Purification Medal',
    createdAt: 1720001600000,
  },
  {
    id: 'mis_minotaur_ai_vanguard',
    protocol_id: 'MINO-02',
    title: 'Iron Vanguard: Sentinel Walker Showdown',
    category: 'minotaur_purification',
    categoryName: 'Minotaur Titan Worm Purge',
    categoryIcon: 'Crosshair',
    flavor_quote: 'Deploy your Minotaur alongside yourself as an autonomous AI bodyguard against Sentinel Walker forces.',
    targetLocation: 'Extreme Sentinel Security Planet',
    lore: {
      origin: 'Hardframe Autophage Circuitry Notes',
      headline: 'The Awoken Steel Companion',
      narrative: 'Infusing an Exocraft Minotaur with Hardframe sentinel salvage creates an autonomous synthetic warrior that never sleeps. When high-alert drones descend, the mech charges forward with laser precision to shield its pilot.',
      historicalContext: 'Autophage Hardframe Integration',
      canonEntity: 'Iteration Tethys'
    },
    steps: [
      {
        step_number: 1,
        title: 'Land on High-Security World',
        description: 'Touch down on an Aggressive Sentinel planet with Gravitino Balls or Frenzied Sentinel alerts.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Engage Minotaur Autonomous AI',
        description: 'Summon your Minotaur and toggle its AI pilot protocol so it walks and fights autonomously at your side.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Trigger Wave 5 Sentinel Assault',
        description: 'Harvest a Gravitino Ball or blast a drone to trigger Sentinel pursuit up to Level 5 until a massive Sentinel Walker arrives.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Fell the Walker & Claim Walker Brain',
        description: 'Break both leg armor plates, destroy the core head carapace, and extract an intact pristine Walker Brain.',
        completed: false,
      },
    ],
    bonusGoal: 'Allow your Minotaur AI to land the decisive killing blow on the Sentinel Walker.',
    reward: 'Pristine Walker Brain, Sentinel Pillar Maps & 1,500 Nanites',
    createdAt: 1720001700000,
  },
  // 10. Exocraft Combat & Vehicle Rallies
  {
    id: 'mis_exocraft_sentinel_chase',
    protocol_id: 'EXO-01',
    title: 'Dust & Fury: Roamer Pursuit Trial',
    category: 'exocraft_combat',
    categoryName: 'Exocraft Combat & Vehicle Rallies',
    categoryIcon: 'Car',
    flavor_quote: 'Foot travel is strictly prohibited. Mount the Roamer rover, lock the mounted laser, and outrun the interceptor drones.',
    targetLocation: 'Arid Desert / Scorched Dunes with High Sentinel Activity',
    lore: {
      origin: 'Pilgrim Outlaw Racing Log #77',
      headline: 'The Dune Runners of the Scorched Waste',
      narrative: 'Outlaw scavengers on dune worlds resolve territorial disputes not with starships, but with high-speed exocraft chases across open sand plains. To touch ground on foot is considered cowardice; only wheels and booster fuel matter.',
      historicalContext: 'Outlaw Rover Smuggling Era',
      canonEntity: 'Exocraft Specialist Radu'
    },
    steps: [
      {
        step_number: 1,
        title: 'Summon Roamer Rover',
        description: 'Deploy your Roamer Geobay or summon it via Exocraft Summoning Station on a desert world.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Vehicle-Only Challenge: Provoke Drones',
        description: 'Without exiting the vehicle, use the Roamer Mounted Cannon to attack a Sentinel drone patrol.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Eliminate 6 Drones from the Cockpit',
        description: 'Maneuver across sand dunes at speed while destroying 6 chasing Sentinel quad quadrupeds or flying drones.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Execute 2,000u Full-Throttle Dash',
        description: 'Hit turbo boost off dune crests and maintain top speed for 2,000u without stopping until pursuit resets.',
        completed: false,
      },
    ],
    bonusGoal: 'Achieve 4+ seconds of uninterrupted mid-air hang time off a cliff edge with the booster.',
    reward: 'S-Class Exocraft Engine Module + 10x Pugneum cores',
    createdAt: 1720001800000,
  },
  {
    id: 'mis_exocraft_colossus_core',
    protocol_id: 'EXO-02',
    title: 'Iron Behemoth: Colossus Heavy Excavation',
    category: 'exocraft_combat',
    categoryName: 'Exocraft Combat & Vehicle Rallies',
    categoryIcon: 'Car',
    flavor_quote: 'The Colossus is a moving fortress. Crush through hazardous flora and mine planetary mineral deposits with industrial authority.',
    targetLocation: 'Extreme Weather Planet (Radioactive or Toxic)',
    lore: {
      origin: 'Gek Industrial Heavy Hauler Blueprint',
      headline: 'The Heavy Freighters of the Planetary Mantle',
      narrative: 'When planetary storms melt exosuit hazard shields in seconds, only the armored bulkheads of a Colossus can withstand the corrosive acid rains. It tramples boulders and harvests core resources with unyielding mechanical patience.',
      historicalContext: 'Gek Mining Cartel Operations',
      canonEntity: 'Iteration Cronus'
    },
    steps: [
      {
        step_number: 1,
        title: 'Deploy Colossus Heavy Vehicle',
        description: 'Summon the Colossus onto an extreme radioactive or toxic planet during an active storm.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Industrial Core Mining',
        description: 'Use the Colossus Mining Laser to harvest 1,500 units of Activated Copper, Uranium, or Pure Ferrite.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Crush 10 Hazardous Flora',
        description: 'Drive directly over 10 Whip Vines or Gas Pods, crushing them beneath the heavy treads without taking suit damage.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Construct Remote Mining Outpost',
        description: 'Build a fortified shelter with an Exocraft summoning beacon and mineral storage depot.',
        completed: false,
      },
    ],
    bonusGoal: 'Completely fill the Colossus cargo inventory with refined ores and mineral commodities.',
    reward: 'Industrial Trade Commodity crates + 1,000 Nanites',
    createdAt: 1720001900000,
  },
  // 11. Galactic Faction Standings
  {
    id: 'mis_faction_vykeen_honor',
    protocol_id: 'FACT-01',
    title: 'Blood of Hirk: Vy\'keen Warrior Standing',
    category: 'faction_standing',
    categoryName: 'Galactic Faction Standings',
    categoryIcon: 'Award',
    flavor_quote: 'Prove your worth in the crucible of battle. Raise your standing with the Vy\'keen through blood, deeds, and sacred relics.',
    targetLocation: 'Vy\'keen Star System (High Conflict)',
    lore: {
      origin: 'Vy\'keen Ancestral Honor Tablets',
      headline: 'The Oaths of the Great Warrior',
      narrative: 'The Vy\'keen respect only those who face the Sentinels without flinching. To rise in their clan ranks, a traveler must lay low enemy dreadnoughts and gift the daggers of their ancestors to station envoys.',
      historicalContext: 'First War with the Aerons',
      canonEntity: 'Weapons Specialist Hirk'
    },
    steps: [
      {
        step_number: 1,
        title: 'Travel to a Vy\'keen Controlled System',
        description: 'Warp to a 3-star high-conflict Vy\'keen system and verify your current standing in the Milestones menu.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Complete 2 Mercenary Guild Missions',
        description: 'Visit the Space Station Mission Board and complete 2 bounty or predator-cull contracts for the Vy\'keen.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Gift 3 Vy\'keen Daggers to Warriors',
        description: 'Speak with NPCs at trading outposts or stations and present 3 Vy\'keen Daggers or Effigies.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Achieve +3 Vy\'keen Standing Milestone',
        description: 'Elevate your reputation until your Vy\'keen Standing increases by at least 3 ranks (e.g. from Ally to Honoured).',
        completed: false,
      },
    ],
    bonusGoal: 'Destroy a Sentinel Capital Dreadnought in space battle within this Vy\'keen sector.',
    reward: 'Vy\'keen High Command Standing, Dreadnought AI Fragment & S-Class Weapon Mod',
    createdAt: 1720002000000,
  },
  {
    id: 'mis_faction_korvax_convergence',
    protocol_id: 'FACT-02',
    title: 'Echo Resonance: Korvax Convergence Elevation',
    category: 'faction_standing',
    categoryName: 'Galactic Faction Standings',
    categoryIcon: 'Award',
    flavor_quote: 'Upload pure discovery telemetry to the Echoes. Elevate your standing with the Korvax Convergence.',
    targetLocation: 'Korvax Controlled Scientific System',
    lore: {
      origin: 'Korvax Echo Shell Telemetry #101',
      headline: 'The Communion of the Convergence',
      narrative: 'Korvax entities welcome outsiders who expand the collective archive. Donating Korvax Casings and unravelling ancient planetary monolith riddles bonds the traveler into the sacred frequencies of the Convergence.',
      historicalContext: 'The Great Disconnection & Recovery',
      canonEntity: 'Priest Entity Nada'
    },
    steps: [
      {
        step_number: 1,
        title: 'Warp to Korvax Scientific System',
        description: 'Locate a Korvax system with Opulent or Wealthy economy on the Galaxy Map.',
        completed: false,
      },
      {
        step_number: 2,
        title: 'Solve 2 Alien Monolith Enigmas',
        description: 'Locate 2 ancient Korvax Monoliths and answer the riddle correctly to earn Convergence approval.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Donate 3 Korvax Casings',
        description: 'Present Korvax Casings to Research Entities on the space station or trading platforms.',
        completed: false,
      },
      {
        step_number: 4,
        title: 'Achieve +3 Korvax Standing Milestone',
        description: 'Verify your Milestones log confirms an increase of at least 3 ranks with the Korvax.',
        completed: false,
      },
    ],
    bonusGoal: 'Learn 10 new Korvax dialect words from Knowledge Stones on a single planet.',
    reward: 'Korvax Convergence Endorsement, 1,000 Nanites & Exosuit Shield Blueprints',
    createdAt: 1720002100000,
  },
];

// Base template generator for single category templates
function generateBaseMission(chosenCat: MissionCategory, targetBiome?: string, protoNum: number = Math.floor(100 + Math.random() * 900)): CasualMission {
  const catMeta = MISSION_CATEGORIES.find(c => c.id === chosenCat) || MISSION_CATEGORIES[0];

  // Template generators for each category
  if (chosenCat === 'culinary_restaurant') {
    const venueArchetypes = [
      {
        venue: 'Volcanic Cliffside Stone Bar',
        biome: 'Mountain Ridge on a Volcanic / Scorched Planet',
        aesthetic: 'Basalt stone pillars, wall fire braziers, stone bar counter with stools, and a nearby bio-dome farm station',
        dish: 'Lumpen Doughnuts',
        ingredients: ['Pulverised Wheat (Flour)', 'Creature Milk (Sweetened Butter)', 'Processed Sugar'],
        recipeSteps: 'Pulverise Wheat -> Flour. Churn Creature Milk -> Butter + Sugar -> Sweetened Butter. Combine in Processor.',
        dish2: 'Charred Fireberry Glaze',
        ingredients2: ['Fireberry / Cactus Flesh', 'Processed Sugar'],
        recipeSteps2: 'Reduce sweet cactus flesh or fireberries into thick glaze syrup.',
        fishing: undefined,
        decor: ['Heavy stone bar counter with stools', 'Nutrient Processor kitchen island', 'Fire pits or wall braziers', 'Hydroponic farm station with Solar Vines'],
        quote: 'Perched over roaring lava rivers, this stone tavern warms weary travelers with fresh pastries and fiery brews.',
      },
      {
        venue: 'The Underglow Diner: Cavern Speakeasy & Food Stand',
        biome: 'Deep Subterranean Cavern on a Lush / Bioluminescent Planet',
        aesthetic: 'Food-truck style serving window, carved cave booth seating, glowing marrow bulb chandeliers, and ambient lounge ByteBeat',
        dish: 'Stellar Custard',
        ingredients: ['Sweetened Butter', 'Processed Sugar', 'Star Bramble'],
        recipeSteps: 'Combine Sweetened Butter + Processed Sugar + Star Bramble in the Nutrient Processor.',
        dish2: 'Cave Gourd Soufflé',
        ingredients2: ['Refined Flour', 'Cream', 'Cave Marrow bulb extract'],
        recipeSteps2: 'Combine Pastry crust with whipped marrow cream in the processor.',
        fishing: undefined,
        decor: ['Food stand serving window with illuminated signs', 'Nutrient Processor prep area', 'Mushroom lanterns and glowing cave flora', 'Underground booth seating'],
        quote: 'Deep beneath the planet crust, amongst glowing mushrooms, travellers gather for cold stellar desserts.',
      },
      {
        venue: 'Submerged Glass Coral Bistro & Sushi Bar',
        biome: 'Deep Ocean Coral Trench (Depth > 50u) on an Aquarius Water Planet',
        aesthetic: 'Curved glass observation domes, aquatic blue lighting, kelp planters, and a surface Exo-Skiff mooring pier',
        dish: 'Abyssal Seafood Chowder',
        ingredients: ['Fresh Fish Fillet (Caught with Fishing Rig)', 'Creature Milk (Cream)', 'Salt / Kelp Sac'],
        recipeSteps: 'Fillet ocean catch in Processor. Simmer Fish Fillet + Cream + Kelp/Salt into rich chowder.',
        dish2: 'Galactic Fish & Chips',
        ingredients2: ['Pulverised Wheat (Batter)', 'Raw Fish Fillet', 'Cooking Oil / Fat'],
        recipeSteps2: 'Dip fish fillets into flour batter and fry in the Nutrient Processor.',
        fishing: 'Catch 3 Deep-Sea or Storm-Tier fish using the Aquarius Fishing Rig',
        decor: ['Curved glass viewing dome with oceanic panorama', 'Nutrient Processor seafood preparation bar', 'Surface floating dock with Exo-Skiff mooring', 'Aquarium or decorative kelp planters'],
        quote: 'Dine fifty units beneath the surface while bioluminescent sea creatures swim past your glass dining dome.',
      },
      {
        venue: 'The Zenith Promenade: Star-Gazer Sky Bistro',
        biome: 'High-Altitude Peak or Sub-Orbital Platform facing a Colored Star',
        aesthetic: 'Open-air panoramic terrace with glass windbreak railings, outdoor fire lounges, and exotic ornamental planters',
        dish: 'Interstellar Fancy',
        ingredients: ['Pie Case (Flour + Butter)', 'Sweetened Butter', 'Cactus Jelly / Fireberry Compote'],
        recipeSteps: 'Craft Pie Case. Layer with sweetened whipped cream and exotic fruit reduction in the processor.',
        dish2: 'Solar Nectar Sparkler',
        ingredients2: ['Sweetened Cream', 'Solar Vine Extract', 'Processed Sugar'],
        recipeSteps2: 'Blend sparkling solar nectar with cold whipped cream.',
        fishing: undefined,
        decor: ['Panoramic outdoor patio with glass balustrades', 'Nutrient Processor cocktail & pastry bar', 'Fire pits or heat lamps for cloud altitude comfort', 'Ornamental potted plants and outdoor lounge sofas'],
        quote: 'High in the clouds facing a brilliant binary star, patrons enjoy delicate pastries while watching starships drift in orbit.',
      },
      {
        venue: 'Floating Island Zen Tea House & Garden',
        biome: 'Floating Sky Island on a Paradise Chameleon World',
        aesthetic: 'Timber pavilion with curved rooflines, outdoor zen rock garden, stone bubbling pond, and low tatami seating',
        dish: 'Honeyed Tea Cake',
        ingredients: ['Pulverised Wheat', 'Wild Honey / Sweetroot', 'Cream'],
        recipeSteps: 'Combine flour, honey syrup, and cream in the processor for a light sponge cake.',
        dish2: 'Fragrant Star Bramble Tea',
        ingredients2: ['Star Bramble Petals', 'Purified Water'],
        recipeSteps2: 'Steep star blossom petals in steaming water in the processor.',
        fishing: undefined,
        decor: ['Timber open-air pavilion overlooking waterfalls', 'Nutrient Processor tea station', 'Ornamental bonsai trees and rock lanterns', 'Low seating benches and outdoor deck'],
        quote: 'Suspended in the sky above waterfalls, this tranquil retreat serves delicate tea cakes to travelers seeking serenity.',
      },
    ];

    const v = venueArchetypes[Math.floor(Math.random() * venueArchetypes.length)];
    const targetLoc = targetBiome || v.biome;

    return {
      id: `mis_dine_${Date.now()}_${protoNum}`,
      protocol_id: `CHEF-${protoNum}`,
      title: `Culinary Expedition: ${v.venue}`,
      category: 'culinary_restaurant',
      categoryName: catMeta.name,
      categoryIcon: catMeta.icon,
      flavor_quote: v.quote,
      targetLocation: targetLoc,
      restaurantSpec: {
        venueType: v.venue,
        aestheticTheme: v.aesthetic,
        signatureDishes: [
          {
            name: v.dish,
            ingredients: v.ingredients,
            processorSteps: v.recipeSteps,
          },
          {
            name: v.dish2,
            ingredients: v.ingredients2,
            processorSteps: v.recipeSteps2,
          },
        ],
        fishingCatch: v.fishing,
        decorChecklist: v.decor,
      },
      steps: [
        {
          step_number: 1,
          title: `Survey & Claim Venue Site`,
          description: `Locate a scenic location on ${targetLoc} and place a Base Computer to claim your dining establishment.`,
          completed: false,
        },
        {
          step_number: 2,
          title: `Construct Venue & Atmosphere`,
          description: `Build the dining space matching the theme: ${v.aesthetic}.`,
          completed: false,
        },
        {
          step_number: 3,
          title: v.fishing ? `Aquarius Fishing: Harvest Catch` : `Forage & Harvest Flora Ingredients`,
          description: v.fishing 
            ? `${v.fishing} and harvest secondary recipe ingredients.`
            : `Harvest wild crops (wheat, star berries, or cactus flesh) and dairy from friendly local herbivores.`,
          completed: false,
        },
        {
          step_number: 4,
          title: `Cook Signature Dish: ${v.dish}`,
          description: `Use the Nutrient Processor to prepare ${v.dish} (${v.recipeSteps}).`,
          completed: false,
        },
      ],
      bonusGoal: `Offer a portion of ${v.dish} to Iteration Cronus on the Space Anomaly or feed your primary companion.`,
      reward: 'Master Chef Recognition + Culinary Outpost Anchor + Nanite Bonus',
      createdAt: Date.now(),
    };
  }

  if (chosenCat === 'xeno_companion') {
    const creatureTypes = ['Giant Armored Strider', 'Winged Bioluminescent Beetle', 'Robotic Mechanical Steed', 'Predatory Stalker Raptor', 'Colossal Diplodocus'];
    const creature = creatureTypes[Math.floor(Math.random() * creatureTypes.length)];
    const biomes = ['Lush Paradise with bioluminescent grass', 'Uncharted Red Star Moon', 'Tropical Coral Archipelago', 'Low-Gravity Crater World'];
    const biome = targetBiome || biomes[Math.floor(Math.random() * biomes.length)];

    return {
      id: `mis_xeno_${Date.now()}_${protoNum}`,
      protocol_id: `XENO-${protoNum}`,
      title: `Creature Expedition: Tame & Level the ${creature}`,
      category: 'xeno_companion',
      categoryName: catMeta.name,
      categoryIcon: catMeta.icon,
      flavor_quote: `The plains of ${biome} hold wondrous fauna. Offer food, earn trust, and raise a formidable companion.`,
      targetLocation: biome,
      steps: [
        {
          step_number: 1,
          title: `Scout for ${creature}`,
          description: `Land on a ${biome} and use your Analysis Visor to track native fauna.`,
          completed: false,
        },
        {
          step_number: 2,
          title: 'Feed & Adopt as Companion',
          description: 'Feed the creature with Creature Pellets or Ion Batteries, tame it, and register it to your pet roster.',
          completed: false,
        },
        {
          step_number: 3,
          title: 'Mount & Explore Terrains',
          description: 'Ride your newly adopted companion across 800u of open terrain, testing its movement and agility.',
          completed: false,
        },
        {
          step_number: 4,
          title: 'Train & Increase Trust',
          description: 'Interact, treat, and play with your companion until its Trust level increases.',
          completed: false,
        },
      ],
      bonusGoal: 'Sequence an egg from this creature at the Space Anomaly to alter its scale or colors.',
      reward: 'Tamed Companion Mount + Trust Level Boost',
      createdAt: Date.now(),
    };
  }

  if (chosenCat === 'derelict_freighter') {
    return {
      id: `mis_drlk_${Date.now()}_${protoNum}`,
      protocol_id: `GHOST-${protoNum}`,
      title: 'Derelict Salvage Run: The Abandoned Cruiser',
      category: 'derelict_freighter',
      categoryName: catMeta.name,
      categoryIcon: catMeta.icon,
      flavor_quote: 'Emergency transponder activated. A derelict freighter drifts in cold vacuum waiting for a scavenger.',
      targetLocation: 'Deep Space Orbit (Emergency Broadcast Receiver)',
      steps: [
        {
          step_number: 1,
          title: 'Activate Broadcast Receiver',
          description: 'Acquire an Emergency Broadcast Receiver and engage pulse drive in space until the ghost vessel emerges.',
          completed: false,
        },
        {
          step_number: 2,
          title: 'Board & Breaching Sequence',
          description: 'Land on the derelict\'s external deck, open the airlock, and activate life support warming heaters.',
          completed: false,
        },
        {
          step_number: 3,
          title: 'Extract Security & Crew Manifest',
          description: 'Explore the interior rooms, bypass security turrets, and download the crew manifest & Captain\'s log.',
          completed: false,
        },
        {
          step_number: 4,
          title: 'Harvest Engineering Core',
          description: 'Reach the Engineering room and claim a Freighter Cargo Bulkhead or Fleet Tech Upgrade.',
          completed: false,
        },
      ],
      bonusGoal: 'Collect over 350 Tainted Metal from lockers and salvage containers.',
      reward: 'Freighter Cargo Bulkhead + Tainted Metal + Fleet Upgrades',
      createdAt: Date.now(),
    };
  }

  if (chosenCat === 'planet_salvage') {
    return {
      id: `mis_salvage_${Date.now()}_${protoNum}`,
      protocol_id: `SALV-${protoNum}`,
      title: 'Planetary Salvage: Crashed Starship & Ancient Scrap',
      category: 'planet_salvage',
      categoryName: catMeta.name,
      categoryIcon: catMeta.icon,
      flavor_quote: 'Valuable scrap lies buried beneath alien mud and crash craters. Grab your multi-tool.',
      targetLocation: targetBiome || 'Any Inhabited System World with Distress Signals',
      steps: [
        {
          step_number: 1,
          title: 'Locate a Crashed Starship Site',
          description: 'Use a transmission tower, distress map, or radar scan to find a grounded crash site.',
          completed: false,
        },
        {
          step_number: 2,
          title: 'Repair Ship Thrusters & Engine',
          description: 'Apply field repairs to the launch thrusters and pulse engine to make the ship flight-capable.',
          completed: false,
        },
        {
          step_number: 3,
          title: 'Excavate 3 Buried Technology / Scrap Caches',
          description: 'Use your Terrain Manipulator to dig up buried technology modules or salvageable scrap nearby.',
          completed: false,
        },
        {
          step_number: 4,
          title: 'Space Station Scrapper Harvest',
          description: 'Fly the salvaged ship to a space station and scrap it for high-value components or nanites.',
          completed: false,
        },
      ],
      bonusGoal: 'Extract modular starship wings or cockpits at the Starship Fabricator.',
      reward: 'Millions of Units in scrap parts, Nanites & Starship Storage Augments',
      createdAt: Date.now(),
    };
  }

  if (chosenCat === 'space_salvage') {
    return {
      id: `mis_space_${Date.now()}_${protoNum}`,
      protocol_id: `VOID-${protoNum}`,
      title: 'Space Scrapper: Anomaly Discovery & Corsair Defense',
      category: 'space_salvage',
      categoryName: catMeta.name,
      categoryIcon: catMeta.icon,
      flavor_quote: 'Deep space is filled with valuable debris, mineral-rich asteroid fields, and pirate raiders.',
      targetLocation: 'Deep Space Orbit & Asteroid Belts',
      steps: [
        {
          step_number: 1,
          title: 'Mine 500 Tritium & Platinum from Asteroids',
          description: 'Fly through asteroid clusters blasting mineral rocks to refuel and gather precious metals.',
          completed: false,
        },
        {
          step_number: 2,
          title: 'Trigger Deep Space Anomaly Scan',
          description: 'Activate an Anomaly Detector in pulse drive until a rare cosmic object appears.',
          completed: false,
        },
        {
          step_number: 3,
          title: 'Defeat Pirate Bounty Interceptors',
          description: 'Engage and shoot down 4 hostile pirate starships attacking system freighters.',
          completed: false,
        },
        {
          step_number: 4,
          title: 'Sell Black-Market Debris at Outlaw Station',
          description: 'Dock at a Space Station or Pirate Outlaw Station to cash in earned bounties and scrap.',
          completed: false,
        },
      ],
      bonusGoal: 'Survive the battle without suffering any starship shield collapse.',
      reward: 'Rare asteroid crystals, pirate bounty vouchers & nanite clusters',
      createdAt: Date.now(),
    };
  }

  if (chosenCat === 'aquarius_fishing') {
    return {
      id: `mis_fish_${Date.now()}_${protoNum}`,
      protocol_id: `AQUA-${protoNum}`,
      title: 'Oceanic Expedition: Deep Water Skiff & Trophy Catch',
      category: 'aquarius_fishing',
      categoryName: catMeta.name,
      categoryIcon: catMeta.icon,
      flavor_quote: 'The ocean waves rock the skiff. When the weather turns stormy, the ancient leviathans surface.',
      targetLocation: 'Tropical Ocean Planet (Depth > 40u)',
      steps: [
        {
          step_number: 1,
          title: 'Deploy Automated Exo-Skiff',
          description: 'Summon your Exo-Skiff onto open ocean waters away from the shoreline.',
          completed: false,
        },
        {
          step_number: 2,
          title: 'Craft Specialized Fishing Bait',
          description: 'Craft 3 bait recipes using kelp sacs, creature meat, or refined grains.',
          completed: false,
        },
        {
          step_number: 3,
          title: 'Catch 8 Distinct Aquatic Species',
          description: 'Cast your line and hook fish across both clear daylight and nighttime hours.',
          completed: false,
        },
        {
          step_number: 4,
          title: 'Cook a 3-Course Seafood Banquet',
          description: 'Use the Nutrient Processor to cook delicious seafood dishes from your fresh catch.',
          completed: false,
        },
      ],
      bonusGoal: 'Catch a rare Storm-tier fish while an environmental storm is actively raging.',
      reward: 'Fishing Catalogue entry, mounting trophy & gourmet dishes',
      createdAt: Date.now(),
    };
  }

  if (chosenCat === 'orbital_stellar') {
    const orbitalVariants = [
      {
        title: 'Helios Crown: Stellar Orbit Waypoint',
        loc: 'High Orbit / Stratosphere of Airless Moon',
        quote: 'Anchor an observation platform in the upper atmosphere facing the primary star. The solar corona holds lost broadcast frequencies.',
        task: 'Construct a high-altitude glass observation platform with solar panels and save beacon aligned with the system star',
      },
      {
        title: 'Stellar Horizon: Planetary Ring Waypoint',
        loc: 'Mountain Peak Intersecting Planetary Rings',
        quote: 'Where the planet rings slice through the sky like silver razor wire, establish a communications beacon.',
        task: 'Erect a vertical communications spire with a landing pad touching the planetary dust ring',
      },
      {
        title: 'Solar Flare Outpost: Deep Orbit Watch',
        loc: 'Sub-Orbital Ceiling (>1,200u Elevation)',
        quote: 'Climb above cloud layers where the binary stars fill the horizon. Register an automated beacon for passing freighters.',
        task: 'Place a Base Computer at the build height limit and establish a permanent fleet observation deck',
      },
    ];
    const pick = orbitalVariants[Math.floor(Math.random() * orbitalVariants.length)];
    return {
      id: `mis_orbt_${Date.now()}_${protoNum}`,
      protocol_id: `ORBT-${protoNum}`,
      title: pick.title,
      category: 'orbital_stellar',
      categoryName: catMeta.name,
      categoryIcon: catMeta.icon,
      flavor_quote: pick.quote,
      targetLocation: targetBiome || pick.loc,
      steps: [
        {
          step_number: 1,
          title: 'Ascend to Sub-Orbital Ceiling',
          description: 'Use jetpack burst, terrain elevation, or high-altitude flight to reach upper atmospheric limits.',
          completed: false,
        },
        {
          step_number: 2,
          title: 'Anchor Orbital Base Computer',
          description: 'Place a Base Computer or Save Beacon to permanently register the sub-orbital sector.',
          completed: false,
        },
        {
          step_number: 3,
          title: 'Construct Observation Station',
          description: pick.task,
          completed: false,
        },
        {
          step_number: 4,
          title: 'Calibrate Teleporter & Solar Grid',
          description: 'Wire 4 Solar Panels, 2 Batteries, and a Base Teleport Module to finalize the orbital hub.',
          completed: false,
        },
      ],
      bonusGoal: 'Summon your Capital Freighter directly beneath the platform for a panoramic fleet view.',
      reward: 'Permanent Orbital Waypoint Hub + 1,200 Nanite discovery bonus',
      createdAt: Date.now(),
    };
  }

  if (chosenCat === 'minotaur_purification') {
    const minoVariants = [
      {
        title: 'Titan Purge: Vile Brood Extermination',
        loc: 'Infested World with Vile Brood Nests',
        quote: 'Mount the Minotaur mech. The soil shudders beneath heavy treads as titan tendrils erupt from the planetary crust.',
        targetNests: 3,
      },
      {
        title: 'Iron Vanguard: Sentinel Walker Showdown',
        loc: 'Extreme Sentinel Security World',
        quote: 'Engage the Minotaur autonomous AI pilot to fight alongside you against Level 5 Sentinel Walker forces.',
        targetNests: 1,
      },
      {
        title: 'Brood Mother Reckoning: Minotaur Mech Strike',
        loc: 'Corrupted Bio-Hazard Moon',
        quote: 'Exterminate subterranean worm clusters before the hive awakens. Heavy firepower authorized.',
        targetNests: 4,
      },
    ];
    const pick = minoVariants[Math.floor(Math.random() * minoVariants.length)];
    return {
      id: `mis_mino_${Date.now()}_${protoNum}`,
      protocol_id: `MINO-${protoNum}`,
      title: pick.title,
      category: 'minotaur_purification',
      categoryName: catMeta.name,
      categoryIcon: catMeta.icon,
      flavor_quote: pick.quote,
      targetLocation: targetBiome || pick.loc,
      steps: [
        {
          step_number: 1,
          title: 'Touch Down on Infested World',
          description: 'Scan system planets to locate biological corruption, purple tendril markers, or extreme sentinels.',
          completed: false,
        },
        {
          step_number: 2,
          title: 'Deploy Minotaur Heavy Mech',
          description: 'Summon the Minotaur Exocraft. Mount the controls or activate the Hardframe AI pilot module.',
          completed: false,
        },
        {
          step_number: 3,
          title: `Purge ${pick.targetNests} Infested Worm Nests`,
          description: `Fire the Minotaur Cannon or Bore to exterminate ${pick.targetNests} Vile Brood nests and crush crawling grubs.`,
          completed: false,
        },
        {
          step_number: 4,
          title: 'Harvest Vile Flesh & Cursed Dust',
          description: 'Collect 250+ Vile Flesh or Cursed Dust dropped from the defeated titan biological horrors.',
          completed: false,
        },
      ],
      bonusGoal: 'Complete the purification exclusively from within the Minotaur cockpit without exiting on foot.',
      reward: 'Vy\'keen Warrior Honor + 1,200 Nanites + Bio-Hazard Purification Medal',
      createdAt: Date.now(),
    };
  }

  if (chosenCat === 'exocraft_combat') {
    const exoVariants = [
      {
        title: 'Dust & Fury: Roamer Pursuit Trial',
        loc: 'Scorched Dune / Arid Desert World',
        quote: 'Foot travel prohibited. Mount the Roamer rover, lock the mounted laser, and outrun the interceptor drones.',
        vehicle: 'Roamer',
      },
      {
        title: 'Iron Behemoth: Colossus Heavy Excavation',
        loc: 'Extreme Radioactive World with Acid Storms',
        quote: 'The Colossus is an armored fortress. Crush hazardous flora and extract deep mineral nodes.',
        vehicle: 'Colossus',
      },
      {
        title: 'Wave Skimmer: Nomad Trench Run',
        loc: 'Tropical Ocean Island Archipelago',
        quote: 'Hover over ocean waves at turbo velocity in the Nomad hovercraft, surveying coastal anomalies.',
        vehicle: 'Nomad',
      },
      {
        title: 'Pilgrim Drift: Extreme Planetary Circuit',
        loc: 'Craggy Mountain Ridge Moon',
        quote: 'Hit top speed on two wheels. Drift across planetary craters and survive extreme gravity drop-offs.',
        vehicle: 'Pilgrim',
      },
    ];
    const pick = exoVariants[Math.floor(Math.random() * exoVariants.length)];
    return {
      id: `mis_exo_${Date.now()}_${protoNum}`,
      protocol_id: `EXO-${protoNum}`,
      title: pick.title,
      category: 'exocraft_combat',
      categoryName: catMeta.name,
      categoryIcon: catMeta.icon,
      flavor_quote: pick.quote,
      targetLocation: targetBiome || pick.loc,
      steps: [
        {
          step_number: 1,
          title: `Deploy ${pick.vehicle} Exocraft`,
          description: `Construct a Geobay or summon the ${pick.vehicle} via Exocraft Summoning Station on the designated planet.`,
          completed: false,
        },
        {
          step_number: 2,
          title: 'Vehicle-Restricted Task',
          description: `Remain inside the ${pick.vehicle} cockpit and utilize its mounted cannons or mining laser for all actions.`,
          completed: false,
        },
        {
          step_number: 3,
          title: 'Combat / Resource Objective',
          description: `Neutralize 6 Sentinel drones or mine 1,000 units of planetary minerals exclusively with the ${pick.vehicle}.`,
          completed: false,
        },
        {
          step_number: 4,
          title: 'Complete 2,500u Full-Throttle Dash',
          description: 'Engage turbo boost across terrain ridges for 2,500u until the sector challenge is conquered.',
          completed: false,
        },
      ],
      bonusGoal: 'Achieve 4+ seconds of mid-air hang time jumping off a planetary canyon or cliff edge.',
      reward: 'S-Class Exocraft Upgrade Module + 1,000 Nanites',
      createdAt: Date.now(),
    };
  }

  if (chosenCat === 'faction_standing') {
    const factions = [
      {
        race: 'Vy\'keen',
        title: 'Blood of Hirk: Vy\'keen Clan Elevation',
        loc: 'Vy\'keen High-Conflict System',
        quote: 'Prove your worth in the crucible of battle. Raise your standing with the Vy\'keen through blood and deeds.',
        relic: 'Vy\'keen Dagger or Effigy',
      },
      {
        race: 'Korvax',
        title: 'Echo Resonance: Korvax Convergence Elevation',
        loc: 'Korvax Scientific System',
        quote: 'Upload pure discovery telemetry to the Echoes. Elevate your standing with the Korvax Convergence.',
        relic: 'Korvax Casing',
      },
      {
        race: 'Gek',
        title: 'First Spawn Commerce: Gek Trade Syndicate Standing',
        loc: 'Gek Mercantile High-Wealth System',
        quote: 'Accumulate wealth, negotiate trade agreements, and gift relics to Gek trade lords for syndicate favor.',
        relic: 'Gek Relic or GekNip',
      },
      {
        race: 'Outlaw / Mercenaries',
        title: 'Corsair Concord: Outlaw Guild Standing',
        loc: 'Pirate Controlled Outlaw System',
        quote: 'Complete illicit contraband bounties and build your reputation among pirate space stations.',
        relic: 'Forged Passport',
      },
    ];
    const pick = factions[Math.floor(Math.random() * factions.length)];
    return {
      id: `mis_fact_${Date.now()}_${protoNum}`,
      protocol_id: `FACT-${protoNum}`,
      title: pick.title,
      category: 'faction_standing',
      categoryName: catMeta.name,
      categoryIcon: catMeta.icon,
      flavor_quote: pick.quote,
      targetLocation: targetBiome || pick.loc,
      steps: [
        {
          step_number: 1,
          title: `Warp to a ${pick.race} Sector`,
          description: `Locate a star system controlled by ${pick.race} and check your current standing in the Milestones log.`,
          completed: false,
        },
        {
          step_number: 2,
          title: 'Complete 2 Guild Mission Contracts',
          description: 'Visit the Space Station Mission Board and complete 2 faction-aligned missions.',
          completed: false,
        },
        {
          step_number: 3,
          title: `Present 3 ${pick.relic} Offerings`,
          description: `Speak with 3 separate NPCs at trading posts or stations and gift them a ${pick.relic}.`,
          completed: false,
        },
        {
          step_number: 4,
          title: `Achieve +3 ${pick.race} Standing Milestone`,
          description: `Raise your standing milestone rank with ${pick.race} by at least 3 levels.`,
          completed: false,
        },
      ],
      bonusGoal: `Neutralize a pirate bounty hunter or Sentinel dreadnought within this ${pick.race} system.`,
      reward: `${pick.race} High Standing Endorsement + Faction Guild Tokens + 1,200 Nanites`,
      createdAt: Date.now(),
    };
  }

  // Planet Explorer default
  const planetTypes = [
    { name: 'Bioluminescent Chameleon Paradise', task: 'Build a scenic glass viewing platform overlooking glowing fields' },
    { name: 'Corrupted Dissonant World', task: 'Unseal a Harmonic Camp and collect 10 Radiant Shards' },
    { name: 'Exotic Anomaly Glitch Planet', task: 'Collect 4 stabilized reality glitch souvenirs for your base' },
    { name: 'Airless Low-Gravity Moon', task: 'Deploy an exocraft rover and jump crater ridges for 5 seconds of air time' },
    { name: 'Tropical Coral Island Planet', task: 'Deploy the Nautilon submarine and explore sunken coral caverns' },
  ];
  const pType = planetTypes[Math.floor(Math.random() * planetTypes.length)];

  return {
    id: `mis_exp_${Date.now()}_${protoNum}`,
    protocol_id: `PLANET-${protoNum}`,
    title: `Planetary Voyage: ${pType.name}`,
    category: 'planet_expedition',
    categoryName: catMeta.name,
    categoryIcon: catMeta.icon,
    flavor_quote: `Chart a course for a ${pType.name}. Explore its distinct geography and establish your footprint.`,
    targetLocation: pType.name,
    steps: [
      {
        step_number: 1,
        title: `Locate a ${pType.name}`,
        description: `Use the Galaxy Map to find and land on a ${pType.name}.`,
        completed: false,
      },
      {
        step_number: 2,
        title: 'Survey Flora & Fauna',
        description: 'Scan at least 6 native creatures and plant species on the planet surface.',
        completed: false,
      },
      {
        step_number: 3,
        title: 'Planetary Objective',
        description: pType.task,
        completed: false,
      },
      {
        step_number: 4,
        title: 'Establish Waypoint & Claim Camp',
        description: 'Drop a Base Computer or Save Beacon to permanently register your planetary visit.',
        completed: false,
      },
    ],
    bonusGoal: 'Snap a scenic Photo Mode picture capturing your starship and companion on the horizon.',
    reward: 'Discovery nanite bonus, registered waypoint & planetary souvenir',
    createdAt: Date.now(),
  };
}

// Procedural Lore and 3-Thematic-Paths Generator
// Helper to create tailored Photo Mode objectives
export function generatePhotoGoal(
  categories: MissionCategory[],
  targetBiome: string = "Designated Sector",
  pathId: string = "alpha"
): { title: string; targetSubject: string; description: string; bonusNanites: number } {
  const hasOrbital = categories.includes("orbital_stellar");
  const hasMinotaur = categories.includes("minotaur_purification");
  const hasExocraft = categories.includes("exocraft_combat");
  const hasFaction = categories.includes("faction_standing");
  const hasFishing = categories.includes("aquarius_fishing");
  const hasDerelict = categories.includes("derelict_freighter");
  const hasFauna = categories.includes("xeno_companion");
  const hasSpace = categories.includes("space_salvage");

  if (hasOrbital) {
    if (pathId === "alpha") {
      return {
        title: "Sub-Orbital Stellar Corona Alignment",
        targetSubject: "Solar Flare & High-Altitude Horizon",
        description: "Open Photo Mode at the atmospheric ceiling (>1,000u) to frame your observation rotunda against the solar corona and planetary curvature.",
        bonusNanites: 600,
      };
    } else if (pathId === "beta") {
      return {
        title: "Planetary Ring Dust Intersection",
        targetSubject: "Mountain Spire & Planetary Rings",
        description: "Capture the dramatic silver dust plane of the rings slicing directly through your mountain communications spire.",
        bonusNanites: 500,
      };
    } else {
      return {
        title: "Capital Fleet Zenith Formation",
        targetSubject: "Capital Dreadnought & Frigate Escorts",
        description: "Frame your capital starship hovering in low planetary orbit beneath your glass viewing deck during golden dusk.",
        bonusNanites: 750,
      };
    }
  }

  if (hasMinotaur) {
    if (pathId === "alpha") {
      return {
        title: "Titan Worm Eruption Snapshot",
        targetSubject: "Colossal Titan Worm & Heavy Mech Cannon",
        description: "Time an action photo just as a massive Vile Brood titan bursts from the planetary crust with your Minotaur in the foreground.",
        bonusNanites: 750,
      };
    } else if (pathId === "beta") {
      return {
        title: "Mechanical Vanguard Duel",
        targetSubject: "Sentinel Walker & Autonomous Minotaur",
        description: "Snap a high-stakes combat photo of your Hardframe Minotaur trading laser fire with a towering Sentinel Walker.",
        bonusNanites: 700,
      };
    } else {
      return {
        title: "Quarantine Crater Panorama",
        targetSubject: "Cleansed Brood Nest & Bio-Lab Outpost",
        description: "Capture the fortified containment facility built over the smoking craters of the purged titan nest.",
        bonusNanites: 500,
      };
    }
  }

  if (hasExocraft) {
    if (pathId === "alpha") {
      return {
        title: "Canyon Stunt Hang-Time",
        targetSubject: "Exocraft Mid-Air Jump & Dune Ridge",
        description: "Trigger Photo Mode mid-flight while boosting off an extreme cliff edge with terrain receding beneath wheels.",
        bonusNanites: 600,
      };
    } else if (pathId === "beta") {
      return {
        title: "Colossus Acid Storm Fortress",
        targetSubject: "Armored Colossus & Toxic Lightning",
        description: "Photograph the massive Colossus plowing through hazardous flora amidst a blinding radioactive or toxic squall.",
        bonusNanites: 550,
      };
    } else {
      return {
        title: "Nomad Ocean Skim Crest",
        targetSubject: "Hovercraft Wake & Tropical Sunset",
        description: "Capture the Nomad skimming open water at top speed with white water rooster-tails reflecting the setting sun.",
        bonusNanites: 500,
      };
    }
  }

  if (hasFaction) {
    return {
      title: "Galactic Envoy Audience",
      targetSubject: "Alien Monolith or Space Station Core",
      description: "Frame an impressive portrait of your traveler presenting relics before an ancient Monolith or station guild dais.",
      bonusNanites: 500,
    };
  }

  if (hasFishing) {
    return {
      title: "Abyssal Tempest Leviathan",
      targetSubject: "Exo-Skiff & Monster Fish Breach",
      description: "Use Photo Mode during a raging ocean storm while reeling in a rare deep-sea fish from your floating skiff.",
      bonusNanites: 650,
    };
  }

  if (hasDerelict) {
    return {
      title: "Ghost Ship Cold Chamber",
      targetSubject: "Derelict Airlock & Void Vacuum",
      description: "Capture the eerie blue glow of emergency heaters cutting through freezing derelict corridors and alien tendrils.",
      bonusNanites: 600,
    };
  }

  if (hasFauna) {
    return {
      title: "Megafauna Steed Vista",
      targetSubject: "Colossal Companion Mount & Planetary Rings",
      description: "Pose atop your tamed gigantic companion mount against glowing alien flora or dramatic mountain ridges.",
      bonusNanites: 550,
    };
  }

  if (hasSpace) {
    return {
      title: "Deep Space Dogfight Vapor Trails",
      targetSubject: "Hostile Pirate Fighter Explosion",
      description: "Freeze combat mid-burst as an enemy corsair starship breaks apart amidst asteroid mineral belts.",
      bonusNanites: 700,
    };
  }

  // Default explorer photo
  return {
    title: "Planetary Horizon Wonder",
    targetSubject: "Scenic Vista & Starship Touchdown",
    description: `Compose a scenic panoramic photograph on ${targetBiome} featuring strange flora, glowing skies, and your parked starship.`,
    bonusNanites: 500,
  };
}

export function buildLoreAndPaths(
  selectedCategories: MissionCategory[],
  targetBiome: string = 'The Designated Sector',
  protoNum: number = Math.floor(100 + Math.random() * 900)
): {
  lore: MissionLore;
  paths: MissionPath[];
  photoGoal: { title: string; targetSubject: string; description: string; bonusNanites: number };
  hybridTitle: string;
  hybridQuote: string;
  categoryNames: string[];
} {
  const catMetas = selectedCategories.map(
    (c) => MISSION_CATEGORIES.find((m) => m.id === c) || MISSION_CATEGORIES[0]
  );
  const categoryNames = catMetas.map((m) => m.name);

  const hasCulinary = selectedCategories.includes('culinary_restaurant');
  const hasDerelict = selectedCategories.includes('derelict_freighter');
  const hasFishing = selectedCategories.includes('aquarius_fishing');
  const hasPlanetSalvage = selectedCategories.includes('planet_salvage');
  const hasSpaceSalvage = selectedCategories.includes('space_salvage');
  const hasFauna = selectedCategories.includes('xeno_companion');
  const hasExpedition = selectedCategories.includes('planet_expedition') || selectedCategories.includes('classic_expedition');
  const hasOrbital = selectedCategories.includes('orbital_stellar');
  const hasMinotaur = selectedCategories.includes('minotaur_purification');
  const hasExocraft = selectedCategories.includes('exocraft_combat');
  const hasFaction = selectedCategories.includes('faction_standing');

  // Hybrid Title synthesis
  let hybridTitle = `Hybrid Protocol: ${catMetas.map((m) => m.name.split(' ')[0]).join(' × ')}`;
  if (hasOrbital && hasSpaceSalvage) {
    hybridTitle = 'Orbital Colossus: Star-Orbit Relay & Deep Space Salvage';
  } else if (hasMinotaur && hasPlanetSalvage) {
    hybridTitle = 'Mech Purifier: Titan Worm Cleansing & Crashed Starship Recovery';
  } else if (hasExocraft && hasMinotaur) {
    hybridTitle = 'Titan Vanguard: Combined Armored Mech & Exocraft Assault';
  } else if (hasOrbital && hasCulinary) {
    hybridTitle = 'Stellar Hearth: Sub-Orbital Star-Gazer Sky Bistro';
  } else if (hasExocraft && hasFaction) {
    hybridTitle = 'Outlaw Rally: Planetary Exocraft Trial & Guild Reputation';
  } else if (hasMinotaur && hasFaction) {
    hybridTitle = 'Vy\'keen Crucible: Minotaur Wurm Extermination & Clan Honor';
  } else if (hasCulinary && hasDerelict) {
    hybridTitle = 'The Ghost Galley: Derelict Salvage & Void Hearth';
  } else if (hasCulinary && hasFishing) {
    hybridTitle = 'The Abyssal Feast: Deep Trench Skiff & Coral Bistro';
  } else if (hasDerelict && hasPlanetSalvage) {
    hybridTitle = "The Scrapper's Descent: Deep Space Ghost Hull & Planetary Wreck";
  } else if (hasFauna && hasPlanetSalvage) {
    hybridTitle = 'Beast & Machine: Crashed Starship Extraction with Megafauna Steeds';
  } else if (hasSpaceSalvage && hasPlanetSalvage) {
    hybridTitle = 'The Dual Scavenger: Orbital Asteroid Wreck & Planetary Encampment';
  } else if (hasCulinary && hasExpedition) {
    hybridTitle = 'The Frontier Rest-Stop: High-Altitude Peak Lounge & Exploration Anchor';
  }

  const hybridQuote =
    'When the traveler unites disparate disciplines across the star cluster, the boundary registers an enduring anomaly. Choose your path wisely.';

  // Lore Generation
  let loreOrigin = 'Recovered Data Core: Autophage Memory Fragment #16';
  let loreHeadline = 'Echoes of the Interloper Union';
  let loreContext = 'Post-Sentinel Reclamation Era';
  let loreEntity = 'Iteration Cronus & Specialist Polo';
  let loreNarrative =
    'Planetary surveys in this sector indicate multiple overlapping signatures left by a legendary star-caravan. Explorers of old did not specialize in a single craft; they salvaged fallen hulls from orbit, tamed indigenous beasts for planetary traverses, and erected warm dining hearths upon volcanic ledges to sustain their fleet.';

  if (hasOrbital) {
    loreOrigin = 'Sub-Stellar Telemetry Core: Cosmos Frequency #16';
    loreHeadline = 'The Guardians of the Solar Crown';
    loreContext = 'Cosmos Era Orbital Observation';
    loreEntity = 'Priest Entity Nada & Specialist Polo';
    loreNarrative =
      'Before the great collapse, the First Convergence anchored orbital waypoints above world atmospheres to chart stellar pulses. By building observation relays in high orbit facing the solar crown, Travelers reopen frequencies lost to the Crimson Eye.';
  } else if (hasMinotaur) {
    loreOrigin = 'Vy\'keen Warrior Codex: Trial of the Wurm';
    loreHeadline = 'The Purge of the Crawling Dark';
    loreContext = 'Vile Brood Infestation Wars';
    loreEntity = 'Weapons Specialist Hirk';
    loreNarrative =
      'Where biological corruption takes root, Vile Brood worms burrow beneath planetary mantles to poison planetary cores. Only heavily armored Minotaur walkers possess the thermal artillery to cleanse these subterranean hives and extract sacred cursed dust.';
  } else if (hasExocraft) {
    loreOrigin = 'Pilgrim Outlaw Circuit Log #77';
    loreHeadline = 'The Dune Drifters of the Scorched Waste';
    loreContext = 'Outlaw Rover Smuggling Era';
    loreEntity = 'Exocraft Specialist Radu';
    loreNarrative =
      'Planetary outlaws resolved disputes not with starships, but with high-speed exocraft dashes across hostile terrain. To touch ground on foot was considered weakness; true mastery demanded conquering alien biomes exclusively from the vehicle cockpit.';
  } else if (hasFaction) {
    loreOrigin = 'Galactic Guild High Commission Protocol';
    loreHeadline = 'The Test of Clan Endorsement';
    loreContext = 'Post-Sentinel Galactic Diplomacy';
    loreEntity = 'Guild Envoy Gek-Nid & Warrior Nal';
    loreNarrative =
      'Star systems do not reveal their richest secrets to strangers. By completing high-tier contracts, offering sacred daggers or casings, and proving unshakeable allegiance, a Traveler commands the true respect of the galactic races.';
  } else if (hasDerelict) {
    loreOrigin = 'Derelict Log Transceiver: Emergency Sub-Beacon';
    loreHeadline = 'The Ghost Carrier of the Outer Rim';
    loreContext = 'Pre-Collapse Gek Merchant Guild Transit';
    loreEntity = 'Iteration Helios & Scrap Dealer Gek-Rakh';
    loreNarrative =
      'Deep space telemetry caught an eerie radio echo from a decommissioned freighter drifting without attitude control. Its automated manifests show pressurized storage bays containing intact nutrient rations and high-value salvaged bulkheads, waiting for an intrepid traveler to unseal the airlocks.';
  } else if (hasCulinary) {
    loreOrigin = 'Gastronomic Field Journal: Iteration Cronus Archives';
    loreHeadline = 'The Nomadic Hearth of the Starways';
    loreContext = 'The Traveling Gourmets of the Space Anomaly';
    loreEntity = 'Iteration Cronus';
    loreNarrative =
      'Cronus once wrote: "The true measure of a traveler is not how fast their hyperdrive ignites, but whether they can transform raw planetary flora and creature milk into a dish worthy of the stars." Outposts built at scenic vistas become beacons of hope for all wanderers traversing the dark.';
  } else if (hasPlanetSalvage || hasSpaceSalvage) {
    loreOrigin = 'Autophage Salvage Song: Scraps of the Void Mother';
    loreHeadline = 'Awakening the Slumbering Alloy';
    loreContext = 'Void Mother Atlantid Awakening';
    loreEntity = 'Autophage Construct Null-7';
    loreNarrative =
      'Steel that has fallen from the sky is not discarded—it is waiting. The Autophage sing harmonic frequencies over rusted fuselages, teaching travelers how to coax life back into dead engines and claim the rare inverted mirrors hidden within harmonic camps.';
  } else if (hasFishing) {
    loreOrigin = 'Deep Ocean Hydrographic Archive: Aquarius Log 08';
    loreHeadline = 'Whispers from the Abyssal Trenches';
    loreContext = 'Oceanic Cartography Expedition';
    loreEntity = 'Nautilus Pilot Orun';
    loreNarrative =
      'Far from continental shores, beneath heavy planetary cloud cover, ancient aquatic behemoths swim through underwater caverns. Interlopers equipped with automated Exo-Skiffs and deep-sea lures can pull relics and delicacies from depths untouched by Sentinel patrols.';
  }

  // 3 Distinct Thematic Paths tailored to active styles
  let paths: MissionPath[] = [];

  if (hasOrbital) {
    paths = [
      {
        path_id: 'alpha',
        themeTitle: 'Path Alpha: Sub-Orbital Zenith Rig',
        approach: 'High-altitude engineering, solar observation rotunda & star flare monitoring',
        description: 'Ascend to the atmosphere limit, anchor a stellar base computer, and wire solar panels aligned with the star.',
        tacticalAdvantage: 'Unlocks panoramic orbital skyports, stellar telemetry arrays, and 1,200 Nanites.',
        steps: [
          {
            step_number: 1,
            title: 'Reach Atmospheric Ceiling',
            description: `Ascend to maximum build limit (>1,000u) overlooking the horizon on ${targetBiome}.`,
            completed: false,
          },
          {
            step_number: 2,
            title: 'Anchor High-Altitude Base Computer',
            description: 'Claim the orbital waypoint sector and deploy an automated Save Beacon.',
            completed: false,
          },
          {
            step_number: 3,
            title: 'Construct Solar Observation Deck',
            description: 'Build a glass observation lounge with 4 Solar Panels wired to the system star.',
            completed: false,
          },
          {
            step_number: 4,
            title: 'Link Teleport Relay',
            description: 'Power a Base Teleport Module to link the high-orbit waypoint to your galactic network.',
            completed: false,
          },
        ],
      },
      {
        path_id: 'beta',
        themeTitle: 'Path Beta: Planetary Ring Waypoint',
        approach: 'Intersection spire scouting & communications beacon broadcast',
        description: 'Scale a mountain peak that aligns with planetary dust rings and erect a navigational beacon spire.',
        tacticalAdvantage: 'Provides interplanetary trade route telemetry and emergency signal frequencies.',
        steps: [
          {
            step_number: 1,
            title: 'Locate Ring Alignment Peak',
            description: `Identify a high mountain ridge that touches or aligns with the dust plane on ${targetBiome}.`,
            completed: false,
          },
          {
            step_number: 2,
            title: 'Deploy Long-Range Signal Booster',
            description: 'Place an emergency beacon or signal booster directly along the ring plane trajectory.',
            completed: false,
          },
          {
            step_number: 3,
            title: 'Build Ring-Watch Spire',
            description: 'Construct a vertical cylindrical spire topped with a starship landing pad.',
            completed: false,
          },
          {
            step_number: 4,
            title: 'Transmit Galactic Waypoint',
            description: 'Tag coordinates in your Discovery log to permanently register the navigational beacon.',
            completed: false,
          },
        ],
      },
      {
        path_id: 'gamma',
        themeTitle: 'Path Gamma: Deep Space Fleet Anchor',
        approach: 'Capital freighter positioning & sub-space orbital fleet review',
        description: 'Summon your Capital Freighter directly under the orbital platform and calibrate system fleet frigates.',
        tacticalAdvantage: 'Earns Salvaged Frigate Modules and fleet expedition coordination buffs.',
        steps: [
          {
            step_number: 1,
            title: 'Summon Capital Dreadnought',
            description: 'Call your Capital Freighter into low planetary orbit beneath your orbital platform.',
            completed: false,
          },
          {
            step_number: 2,
            title: 'Board & Inspect Fleet Command Room',
            description: 'Access the Bridge terminal and inspect your frigate squadron alignment.',
            completed: false,
          },
          {
            step_number: 3,
            title: 'Deploy Deep Space Frigate Expedition',
            description: 'Launch an industrial or exploration frigate expedition from the Fleet Navigator.',
            completed: false,
          },
          {
            step_number: 4,
            title: 'Photograph Fleet Horizon',
            description: 'Use Photo Mode from your orbital deck to capture your capital ship framed against the system star.',
            completed: false,
          },
        ],
      },
    ];
  } else if (hasMinotaur) {
    paths = [
      {
        path_id: 'alpha',
        themeTitle: 'Path Alpha: Titan Wurm Eradication',
        approach: 'Cockpit-locked heavy Minotaur cannon purge of Vile Brood nests',
        description: 'Pilot the Minotaur mech directly into infested planetary crust and obliterate 3 titan worm nests.',
        tacticalAdvantage: 'Extracts Vile Flesh, Cursed Dust, and massive Vy\'keen warrior commendations.',
        steps: [
          {
            step_number: 1,
            title: 'Deploy Minotaur Heavy Mech',
            description: `Summon your Minotaur Exocraft onto infested terrain in ${targetBiome}.`,
            completed: false,
          },
          {
            step_number: 2,
            title: 'Target Titan Worm Nests',
            description: 'Use the Minotaur Cannon or Bore to shatter 3 writhing Vile Brood hives.',
            completed: false,
          },
          {
            step_number: 3,
            title: 'Crush Crawling Brood Grubs',
            description: 'Eliminate all spawned infested grubs and tendrils with heavy mech stomps.',
            completed: false,
          },
          {
            step_number: 4,
            title: 'Harvest Biological Trophies',
            description: 'Collect 250+ Vile Flesh or Cursed Dust dropped from the defeated titan horrors.',
            completed: false,
          },
        ],
      },
      {
        path_id: 'beta',
        themeTitle: 'Path Beta: Autonomous Hardframe AI Vanguard',
        approach: 'Coordinated tandem assault with autonomous Minotaur AI bodyguard',
        description: 'Activate the Minotaur AI pilot module to fight shoulder-to-shoulder against high-alert Sentinel forces.',
        tacticalAdvantage: 'High survivability during Wave 5 battles + pristine Sentinel Walker Brain harvest.',
        steps: [
          {
            step_number: 1,
            title: 'Engage Minotaur AI Protocol',
            description: 'Summon the Minotaur and toggle its autonomous AI pilot to follow and protect you.',
            completed: false,
          },
          {
            step_number: 2,
            title: 'Provoke High-Security Sentinels',
            description: 'Trigger Sentinel alerts until heavy armored quads and mechs enter the battle zone.',
            completed: false,
          },
          {
            step_number: 3,
            title: 'Defeat Sentinel Walker',
            description: 'Coordinate fire with your Minotaur to shatter the Walker\'s leg armor and head chassis.',
            completed: false,
          },
          {
            step_number: 4,
            title: 'Claim Pristine Walker Brain',
            description: 'Loot the fallen mechanical titan for an intact Walker Brain and Hardframe salvage.',
            completed: false,
          },
        ],
      },
      {
        path_id: 'gamma',
        themeTitle: 'Path Gamma: Subterranean Bio-Containment',
        approach: 'Quarantine outpost construction & toxic core sealing',
        description: 'Erect an armored bio-containment outpost over cleansed infested craters to prevent brood re-emergence.',
        tacticalAdvantage: 'Generates automated biological specimen yields and discovery milestones.',
        steps: [
          {
            step_number: 1,
            title: 'Excavate Cleansed Nest Crater',
            description: 'Use the Minotaur Bore to carve a perimeter trench around the neutralized nest.',
            completed: false,
          },
          {
            step_number: 2,
            title: 'Deploy Quarantine Base Unit',
            description: 'Place a Base Computer and build reinforced metal or alloy containment walls.',
            completed: false,
          },
          {
            step_number: 3,
            title: 'Install Bio-Hazard Lab',
            description: 'Place an Exocraft summoning bay and scientific terminal inside the shelter.',
            completed: false,
          },
          {
            step_number: 4,
            title: 'Register Cleansed Sector',
            description: 'Upload the planetary base to the teleporter network as an official Purged Outpost.',
            completed: false,
          },
        ],
      },
    ];
  } else if (hasExocraft) {
    paths = [
      {
        path_id: 'alpha',
        themeTitle: 'Path Alpha: High-Speed Vehicle Blitz',
        approach: 'Cockpit-locked speed dash & vehicle mounted cannon engagements',
        description: 'Mount the Roamer or Pilgrim and clear sector objectives without your boots touching alien soil.',
        tacticalAdvantage: 'S-Class Exocraft Engine Modules, Pugneum crates, and hazard immunity.',
        steps: [
          {
            step_number: 1,
            title: 'Summon High-Speed Exocraft',
            description: `Deploy a Roamer or Pilgrim geobay on the rugged terrain of ${targetBiome}.`,
            completed: false,
          },
          {
            step_number: 2,
            title: 'Cockpit-Only Combat Trial',
            description: 'Without dismounting, use mounted vehicle cannons to neutralize 6 hostile drones or predators.',
            completed: false,
          },
          {
            step_number: 3,
            title: 'Execute 2,000u Full-Throttle Dash',
            description: 'Hold turbo boost across hills and dunes for 2,000u without stopping.',
            completed: false,
          },
          {
            step_number: 4,
            title: 'Crater Rim Stunt Jump',
            description: 'Launch off a mountain cliff or crater ridge for at least 3 seconds of sustained air time.',
            completed: false,
          },
        ],
      },
      {
        path_id: 'beta',
        themeTitle: 'Path Beta: Colossus Heavy Fortress',
        approach: 'Industrial heavy mining, hazard crushing & mobile refinery',
        description: 'Roll the colossal armored hauler into extreme weather storms and extract planetary mineral nodes.',
        tacticalAdvantage: 'Maximizes Activated Copper, Uranium, and trade commodity storage.',
        steps: [
          {
            step_number: 1,
            title: 'Deploy Colossus Heavy Vehicle',
            description: 'Summon the Colossus onto an extreme storm planet.',
            completed: false,
          },
          {
            step_number: 2,
            title: 'Mine 1,500 Ore Nodes',
            description: 'Use the Colossus Mining Laser to harvest 1,500 mineral ores directly into vehicle storage.',
            completed: false,
          },
          {
            step_number: 3,
            title: 'Crush 10 Hazardous Plants',
            description: 'Drive over 10 Whip Vines or Gas Pods, flattening them beneath the heavy treads.',
            completed: false,
          },
          {
            step_number: 4,
            title: 'Anchor Heavy Cargo Depot',
            description: 'Build a fortified shelter with vehicle geobays and mineral supply pipes.',
            completed: false,
          },
        ],
      },
      {
        path_id: 'gamma',
        themeTitle: 'Path Gamma: Nomad Hydro-Rally',
        approach: 'Water-skimming hovercraft survey across coastal trenches',
        description: 'Hover at high speed across open oceans and island archipelagos in the Nomad hovercraft.',
        tacticalAdvantage: 'Unlocks coastal waypoints and aquatic cartography data.',
        steps: [
          {
            step_number: 1,
            title: 'Deploy Nomad Hovercraft',
            description: 'Summon the Nomad onto the shoreline of an oceanic planet.',
            completed: false,
          },
          {
            step_number: 2,
            title: 'Skim Ocean Waves for 3,000u',
            description: 'Glide across deep ocean water at maximum speed without sinking or dismounting.',
            completed: false,
          },
          {
            step_number: 3,
            title: 'Island-Hop Waypoint Tagging',
            description: 'Land the hovercraft on 3 separate offshore islands and scan native flora.',
            completed: false,
          },
          {
            step_number: 4,
            title: 'Build Floating Hover Pier',
            description: 'Drop a Base Computer on an oceanic rock and build a scenic wooden jetty for your Nomad.',
            completed: false,
          },
        ],
      },
    ];
  } else if (hasFaction) {
    paths = [
      {
        path_id: 'alpha',
        themeTitle: 'Path Alpha: Warrior Contract Crucible',
        approach: 'High-tier bounty hunting & mercenary guild mission completion',
        description: 'Take on high-tier combat contracts from the Space Station Mission Board to boost guild standing.',
        tacticalAdvantage: 'Earns Faction High Command Endorsements, S-Class upgrades, and standing boosts.',
        steps: [
          {
            step_number: 1,
            title: 'Accept 2 Space Station Contracts',
            description: 'Dock at the system space station and accept 2 high-level guild contracts.',
            completed: false,
          },
          {
            step_number: 2,
            title: 'Execute Bounty Targets',
            description: 'Hunt down rogue pirates in space or cull hostile planetary predators as contracted.',
            completed: false,
          },
          {
            step_number: 3,
            title: 'Turn In Completed Contracts',
            description: 'Return to the Mission Envoy to cash in rewards and claim reputation milestones.',
            completed: false,
          },
          {
            step_number: 4,
            title: 'Achieve +3 Standing Milestone',
            description: 'Verify your Milestone log registers an increase of 3 standing ranks with the controlling race.',
            completed: false,
          },
        ],
      },
      {
        path_id: 'beta',
        themeTitle: 'Path Beta: Sacred Relic Diplomacy',
        approach: 'Gift offerings, cultural dialect immersion & elder respect',
        description: 'Present sacred relics (daggers, casings, or effigies) to station inhabitants and learn ancient dialects.',
        tacticalAdvantage: 'Fastest route to top-tier faction standing without engaging in combat.',
        steps: [
          {
            step_number: 1,
            title: 'Acquire 3 Cultural Relics',
            description: 'Purchase or dig up 3 race-specific relics (Vy\'keen Daggers, Korvax Casings, or Gek Relics).',
            completed: false,
          },
          {
            step_number: 2,
            title: 'Present Offerings to Envoys',
            description: 'Speak with 3 separate NPCs at trading posts or stations and gift the relics.',
            completed: false,
          },
          {
            step_number: 3,
            title: 'Decipher 8 Knowledge Stones',
            description: 'Interact with 8 Knowledge Stones on the planet surface to master native dialect words.',
            completed: false,
          },
          {
            step_number: 4,
            title: 'Claim Guild Envoy Blessing',
            description: 'Visit the Space Station Guild Envoy and claim free daily supplies unlocked by your rank.',
            completed: false,
          },
        ],
      },
      {
        path_id: 'gamma',
        themeTitle: 'Path Gamma: Outlaw Corsair Alliance',
        approach: 'Contraband smuggling, forged passports & pirate station allegiance',
        description: 'Warp to an outlaw pirate system, smuggle banned commodities, and clear bounties with forged passports.',
        tacticalAdvantage: 'Unlocks black-market X-Class modules and lucrative contraband trade routes.',
        steps: [
          {
            step_number: 1,
            title: 'Dock at Outlaw Space Station',
            description: 'Find a system with the pirate skull icon and land at the Outlaw Station.',
            completed: false,
          },
          {
            step_number: 2,
            title: 'Acquire Contraband Cargo',
            description: 'Purchase NipNip Buds, GekNip, or Prismatic Feathers from the Salvage Dealer.',
            completed: false,
          },
          {
            step_number: 3,
            title: 'Smuggle Past Sentinel Probes',
            description: 'Warp to a high-economy regulated system and sell the contraband at a planetary trade post.',
            completed: false,
          },
          {
            step_number: 4,
            title: 'Clear Bounty with Forged Passport',
            description: 'Access the Space Station Core terminal and apply a Forged Passport to reset faction standings.',
            completed: false,
          },
        ],
      },
    ];
  } else {
    // Default 3 Paths (Kinetic, Harmonic Hearth, Astral Cartography)
    paths = [
      {
        path_id: 'alpha',
        themeTitle: 'Path Alpha: Kinetic Reclamation',
        approach: 'Direct assault, industrial demolition & high-yield scrap extraction',
        description:
          'Prioritize raw power, plasma torches, and heavy salvage. Cut into sealed airlocks, extract heavy freighter bulkheads, and recover high-grade starship tech.',
        tacticalAdvantage:
          'Maximizes Salvaged Frigate Modules, Storage Augmentations, and Tainted Metal yield.',
        steps: [
          {
            step_number: 1,
            title: 'Deploy Heavy Cutting Torches',
            description: `Navigate to ${targetBiome} and blast open pressurized security seals or crashed starship cockpit canopies.`,
            completed: false,
          },
          {
            step_number: 2,
            title: 'Extract Core Industrial Machinery',
            description:
              'Recover 3 high-value components: an Inverted Mirror, Freighter Hyperdrive Core, or Walker Brain.',
            completed: false,
          },
          {
            step_number: 3,
            title: 'Dismantle Defense Grid / Sentinel Turrets',
            description:
              'Neutralize automated security drones, derelict security turrets, or territorial planetary sentinels.',
            completed: false,
          },
          {
            step_number: 4,
            title: 'Claim Heavy Engineering Terminal',
            description:
              'Jack into the primary engineering mainframe to download blueprint schematics and extract tainted metal.',
            completed: false,
          },
        ],
      },
      {
        path_id: 'beta',
        themeTitle: 'Path Beta: Harmonic Hearth',
        approach: 'Ecological foraging, Nutrient Processing & hospitable outpost construction',
        description:
          'Emphasize harmony with the planet. Harvest wild grains, milk gentle herbivore fauna, prepare a signature multi-course meal in the Nutrient Processor, and build a scenic resting lounge.',
        tacticalAdvantage:
          'Earns massive praise and Nanite payouts from Iteration Cronus at the Space Anomaly + companion trust bonuses.',
        steps: [
          {
            step_number: 1,
            title: 'Forage Native Flora & Creature Provisions',
            description: `Scout ${targetBiome} for wild Wheat, Star Bramble, or Sweetroot, and feed local wild fauna to harvest Creature Milk.`,
            completed: false,
          },
          {
            step_number: 2,
            title: 'Construct Scenic Outpost / Dining Counter',
            description:
              'Erect a welcoming shelter featuring a serving counter, stools, and an indoor Nutrient Processor kitchen island.',
            completed: false,
          },
          {
            step_number: 3,
            title: 'Cook a 2-Course Specialty Feast',
            description:
              'Use the Nutrient Processor to churn butter, mill flour, and bake Lumpen Doughnuts, Stellar Custard, or Abyssal Chowder.',
            completed: false,
          },
          {
            step_number: 4,
            title: 'Deliver Feast to Iteration Cronus',
            description:
              'Board the Space Anomaly and present your freshly cooked specialty dish to Iteration Cronus for culinary critique.',
            completed: false,
          },
        ],
      },
      {
        path_id: 'gamma',
        themeTitle: 'Path Gamma: Astral Cartography',
        approach: 'Vantage point scouting, stealth telemetry & permanent waypoint beacons',
        description:
          'Operate as an explorer and cartographer. Scale the highest mountain peak or anchor an Exo-Skiff in open water, triangulate anomaly signals, and register a permanent galactic waypoint.',
        tacticalAdvantage:
          'Unlocks planetary portal glyph sequences, system trade route maps, and discovery milestone bonuses.',
        steps: [
          {
            step_number: 1,
            title: 'Ascend to Strategic Vantage Vista',
            description: `Locate a dramatic cliff, floating island, or deep sea trench on ${targetBiome}.`,
            completed: false,
          },
          {
            step_number: 2,
            title: 'Deploy Save Beacon & Triangulation Sensor',
            description:
              'Place a Save Beacon or Base Computer to claim the sector and triangulate anomalous radio frequencies.',
            completed: false,
          },
          {
            step_number: 3,
            title: 'Scan 6 Undiscovered Biological Wonders',
            description:
              'Use the Analysis Visor to document native creatures, mineral formations, and ancient floral specimens.',
            completed: false,
          },
          {
            step_number: 4,
            title: 'Transmit Coordinates via Planetary Portal',
            description:
              'Locate a Planetary Monolith or Portal structure and input your discovery coordinates into the galactic network.',
            completed: false,
          },
        ],
      },
    ];
  }
  // Attach tailored photography sub-goals to each path
  paths.forEach((p) => {
    if (!p.photoGoal) {
      p.photoGoal = generatePhotoGoal(selectedCategories, targetBiome, p.path_id);
    }
  });

  const mainPhotoGoal = generatePhotoGoal(selectedCategories, targetBiome, "alpha");

  return {
    lore: {
      origin: loreOrigin,
      headline: loreHeadline,
      narrative: loreNarrative,
      historicalContext: loreContext,
      canonEntity: loreEntity,
    },
    paths,
    photoGoal: mainPhotoGoal,
    hybridTitle,
    hybridQuote,
    categoryNames,
  };
}

// Offline procedural generator for casual missions (0 tokens, immediate!)
export function generateCasualMission(
  category?: MissionCategory,
  targetBiome?: string,
  categories?: MissionCategory[]
): CasualMission {
  const chosenCats: MissionCategory[] =
    Array.isArray(categories) && categories.length > 0
      ? categories
      : [category || MISSION_CATEGORIES[Math.floor(Math.random() * MISSION_CATEGORIES.length)].id];

  const primaryCat = chosenCats[0];
  const catMeta = MISSION_CATEGORIES.find((c) => c.id === primaryCat) || MISSION_CATEGORIES[0];
  const protoNum = Math.floor(100 + Math.random() * 900);
  const isHybrid = chosenCats.length > 1;

  const baseMission = generateBaseMission(primaryCat, targetBiome, protoNum);
  const synthesis = buildLoreAndPaths(chosenCats, targetBiome || baseMission.targetLocation, protoNum);

  const { reward: _unusedReward, ...cleanBase } = baseMission;

  return {
    ...cleanBase,
    id: `mis_${isHybrid ? 'hyb' : primaryCat}_${Date.now()}_${protoNum}`,
    protocol_id: isHybrid ? `HYB-${protoNum}` : baseMission.protocol_id,
    title: isHybrid ? synthesis.hybridTitle : baseMission.title,
    category: primaryCat,
    categories: chosenCats,
    categoryName: isHybrid ? `Hybrid (${chosenCats.length} Styles)` : baseMission.categoryName,
    categoryNames: synthesis.categoryNames,
    flavor_quote: isHybrid ? synthesis.hybridQuote : baseMission.flavor_quote,
    lore: synthesis.lore,
    paths: synthesis.paths,
    photoGoal: synthesis.paths[0]?.photoGoal || synthesis.photoGoal,
    activePathId: 'alpha',
    steps: synthesis.paths[0].steps,
    createdAt: Date.now(),
  };
}
