import { Directive, Expedition, WeaverManifesto, AxisOption } from '../types';

export const AXIS_VOCATIONS: AxisOption[] = [
  { id: 'voc_angler', name: 'Lakeside & Deep Angler', desc: 'Fish with the Exo-Skiff & Automated Traps. Catch rare aquatic species and mount trophies.', icon: 'Anchor', tier: 'Casual' },
  { id: 'voc_zoologist', name: 'Companion Geneticist', desc: 'Tame planetary wildlife, ride megafauna, and breed custom egg mutations at the Anomaly.', icon: 'Heart', tier: 'Casual' },
  { id: 'voc_xeno', name: 'Xeno-Documentarian', desc: 'Pacifist survey. Scan 100% of fauna on planets, log discoveries, and photograph rare species.', icon: 'Camera', tier: 'Casual' },
  { id: 'voc_architect', name: 'The Cosmic Architect', desc: 'Build scenic planetary bases, glass beach pavilions, and viewpoints with 100% clean power.', icon: 'Layers', tier: 'Casual' },
  { id: 'voc_chef', name: 'The Forager-Chef', desc: 'Harvest planetary crops, milk friendly fauna, and cook gourmet recipes in the Nutrient Processor.', icon: 'Utensils', tier: 'Casual' },
  { id: 'voc_curator', name: 'Curator of Antiquities', desc: 'Excavate subterranean ancient dinosaur bones and scrap to display in a planetary museum.', icon: 'BookOpen', tier: 'Casual' },
  { id: 'voc_merchant', name: 'Trade Route Merchant', desc: 'Use the Economy Scanner to buy low in supply systems and sell high in demand systems.', icon: 'TrendingUp', tier: 'Variation' },
  { id: 'voc_scrapper', name: 'Deep Space Scrapper', desc: 'Locate crashed starships, salvage modular wings and cockpits, and assemble custom ships.', icon: 'Ship', tier: 'Variation' },
  { id: 'voc_stargate', name: 'Stargate Pilgrim', desc: 'Learn alien vocabulary, locate planetary Portals, charge glyph pillars, and explore target systems.', icon: 'Compass', tier: 'Variation' },
  { id: 'voc_grandprix', name: 'Grand Prix Engineer', desc: 'Deploy exocraft (Roamer/Pilgrim), build custom jump ramp circuits, and set timed lap records.', icon: 'Zap', tier: 'Variation' },
  { id: 'voc_smuggler', name: 'Outlaw Smuggler', desc: 'Buy black-market contraband in Outlaw systems, evade Sentinel scans, and sell at high profit.', icon: 'ShieldAlert', tier: 'Variation' },
  { id: 'voc_autophage', name: 'Autophage Disciple', desc: 'Uncloak harmonic camps on Dissonant worlds, solve runic puzzles, and craft custom Voltaic Staves.', icon: 'Cpu', tier: 'Variation' },
  { id: 'voc_homestead', name: 'Planetary Homesteader', desc: 'Establish an automated homestead with agricultural biodomes, gas extractors, and mineral silos.', icon: 'Globe', tier: 'Variation' },
  { id: 'voc_bounty', name: 'Pirate Purger', desc: 'Engage in space dogfights, hunt pirate bounty targets, and disable pirate dreadnought capitals.', icon: 'Crosshair', tier: 'Challenge' },
];

export const AXIS_ECONOMY: AxisOption[] = [
  { id: 'econ_trade', name: 'Trade Route Arbitrage', desc: 'Commodity Trading: Earn all revenue exclusively through inter-system goods trading and trade outposts.', tier: 'Casual' },
  { id: 'econ_archaeology', name: 'Archaeological Bounty', desc: 'Fossil Excavation: Fund all purchases exclusively by excavating rare bones and salvageable scrap.', tier: 'Casual' },
  { id: 'econ_culinary', name: 'Culinary Commerce', desc: 'Culinary Sales: Fund your journey exclusively by cooking and selling gourmet Nutrient Processor dishes.', tier: 'Casual' },
  { id: 'econ_refiner', name: 'Refiner Alchemy Only', desc: 'Refiner Alchemy: Synthesize metals and minerals via refiner loops without direct surface strip-mining.', tier: 'Variation' },
  { id: 'econ_pawnshop', name: 'Orbital Fabricator', desc: 'Scrap & Fabricate: Salvage crashed hulls and components to craft custom ships rather than buying pre-built ships.', tier: 'Variation' },
  { id: 'econ_nomad', name: 'Nomad Protocol', desc: 'Nomadic Living: Live strictly out of your freighter or exocraft without creating permanent commercial bases.', tier: 'Variation' },
  { id: 'econ_barter', name: 'Planetary Pilot Barter', desc: 'Pilot Barter: Trade goods directly with landed starship pilots at planetary outposts instead of station terminals.', tier: 'Variation' },
  { id: 'econ_zero', name: 'The Zero Economy Rule', desc: 'Zero Commerce (Hardcore): Forbidden from spending Units or Nanites. All gear must be scavenged and crafted.', tier: 'Challenge' },
];

export const AXIS_MOBILITY: AxisOption[] = [
  { id: 'mob_safari', name: 'Exocraft Overland Safari', desc: 'Exocraft Travel: Explore planetary surfaces exclusively using the Roamer, Nomad, or Pilgrim.', tier: 'Casual' },
  { id: 'mob_glider', name: 'Scenic Cliff & Companion Flight', desc: 'Companion Flight: Traverse mountainous terrain by riding flying fauna and utilizing jetpack boosts.', tier: 'Casual' },
  { id: 'mob_nautilon', name: 'Nautilon Coral Cruiser', desc: 'Submarine Navigation: Explore submerged caverns, sunken ruins, and oceanic depths via the Nautilon.', tier: 'Casual' },
  { id: 'mob_solar', name: 'Solar Wing Glider', desc: 'Solar Sail Glider: Travel between systems in a Solar-class starship powered by solar sails and pulse drives.', tier: 'Variation' },
  { id: 'mob_hopper', name: 'Space Station Hopper', desc: 'Station Hopper: Hop between star systems by visiting space stations to scout new ship designs and pilots.', tier: 'Variation' },
  { id: 'mob_blackhole', name: 'Black Hole Roulette', desc: 'Black Hole Roulette: Travel long cosmic distances strictly by diving through anomaly black holes.', tier: 'Variation' },
  { id: 'mob_overland', name: 'Scenic Overland Trek', desc: 'Foot & Rover Trek: Journey between surface waypoints on foot or exocraft without short-hop flight.', tier: 'Variation' },
  { id: 'mob_nohud', name: 'No-HUD Cinematic Immersion', desc: 'HUD-Free Immersion (Hardcore): Disable all HUD, compass, and visor markers for pure visual navigation.', tier: 'Challenge' },
];

export const AXIS_BIOMES: AxisOption[] = [
  { id: 'bio_paradise', name: 'Lush Chameleon Paradise', desc: 'Lush Paradise: Bioluminescent vegetation, calm weather, zero storms, and tranquil fauna.', tier: 'Casual' },
  { id: 'bio_coral', name: 'Tropical Coral Archipelago', desc: 'Tropical Ocean: Warm turquoise seas, sandy atolls, deep water trenches, and rich marine life.', tier: 'Casual' },
  { id: 'bio_exotic', name: 'Exotic Glitch / Anomaly World', desc: 'Exotic Glitch: Anomalous worlds with floating bubbles, hexagonal trees, and collectible glitch trophies.', tier: 'Casual' },
  { id: 'bio_ringed', name: 'Ringed Verdant Moon', desc: 'Ringed Verdant Moon: Low gravity meadows with clear, uninterrupted views of planetary ring systems.', tier: 'Casual' },
  { id: 'bio_dissonant', name: 'Dissonant / Corrupted World', desc: 'Dissonant World: Corrupted purple crystals, harmonic autophage camps, and inverted mirrors.', tier: 'Variation' },
  { id: 'bio_aquatic', name: 'Deep Water / Trench Planet', desc: 'Deep Ocean Planet: Expansive 80u+ water depths, submerged caverns, and abyssal predators.', tier: 'Variation' },
  { id: 'bio_dead', name: 'Airless Low-Gravity Moon', desc: 'Airless Moon: Zero atmosphere, silent starscapes, and low-gravity craters ideal for exocraft stunts.', tier: 'Variation' },
  { id: 'bio_outlaw', name: 'Outlaw Frontier Red Star', desc: 'Pirate Outlaw Sector: Lawless star systems with pirate stations, contraband traders, and black-market deals.', tier: 'Variation' },
  { id: 'bio_extreme', name: 'Mega-Mountain Storm World', desc: 'Extreme Mountain Storm (Hardcore): Towering cliffs, frequent superheated storms, and high environmental drain.', tier: 'Challenge' },
];

export const OFFLINE_DIRECTIVES: Directive[] = [
  {
    protocol_id: 'ATLS-3109',
    codename: 'PROTOCOL: GASTRONOMIC PILGRIMAGE',
    classification: 'Culinary Mastery | Casual Ecology',
    intensity: 'Cadet',
    flavor_quote: 'The universe tastes of fermented star-bulb, stellar custard, and gentle cosmic rain.',
    core_vocation: 'The Forager-Chef',
    rules_of_engagement: [
      'Pacifist harvesting: do not harm wild fauna; feed them Creature Pellets.',
      'Replenish Life Support exclusively using Nutrient Processor cooked recipes.',
      'Focus on agricultural flora cultivation and companion livestock milking.'
    ],
    primary_directives: [
      'Harvest 30 native crops (e.g. Star Bulbs, Fungal Mould) on a lush planet.',
      'Feed and milk 2 companion creatures for fresh dairy ingredients.',
      'Bake 3 batches of Stellar Custard or Cosmic Doughnuts in a Nutrient Processor.'
    ],
    victory_condition: 'Present your baked dishes to Chef Cronus on the Space Anomaly and earn 80+ Nanites.',
    biome_target: 'Lush Chameleon Paradise',
    timestamp: 1720000300000
  },
  {
    protocol_id: 'ATLS-6012',
    codename: 'DIRECTIVE: ABYSSAL PURSUIT',
    classification: 'Deep Sea Fishing | Aquatic Leisure',
    intensity: 'Cadet',
    flavor_quote: 'Cast your line into the neon swell. The sea hums with ancient tranquility.',
    core_vocation: 'Lakeside & Deep Angler',
    rules_of_engagement: [
      'Deploy an automated Exo-Skiff or fishing platform on open ocean waters (depth > 40u).',
      'Craft specialized bait using kelp, meal, and harvested flora to target rare fish.',
      'Pacifist voyage: zero ground combat required.'
    ],
    primary_directives: [
      'Deploy the Exo-Skiff on a Tropical Ocean world and cast your fishing line.',
      'Catch 10 unique fish species across both daylight and nighttime conditions.',
      'Cook a 3-course seafood meal in the Nutrient Processor and mount 1 fish trophy.'
    ],
    victory_condition: 'Log 12 distinct aquatic species in your fishing records and mount a prize fish in your base.',
    biome_target: 'Tropical Coral Archipelago',
    timestamp: 1720001500000
  },
  {
    protocol_id: 'ATLS-1404',
    codename: 'PROTOCOL: GENETIC HARMONY',
    classification: 'Fauna Genetics | Companion Ranching',
    intensity: 'Cadet',
    flavor_quote: 'Every creature is a verse of the Atlas song. Let us breed a chorus of butterflies.',
    core_vocation: 'Companion Geneticist',
    rules_of_engagement: [
      'Craft Creature Pellets; killing wild fauna is strictly prohibited.',
      'Maintain 100% companion trust before collecting eggs for gene sequencing.',
      'Use the Space Anomaly Gene Sequencer to peacefully induce size or color mutations.'
    ],
    primary_directives: [
      'Adopt a colossal or winged creature and bond with it to 100% trust.',
      'Harvest its egg and sequence its traits at the Space Anomaly Gene Sequencer.',
      'Hatch the modified companion on a paradise moon and take it on a cross-country ride.'
    ],
    victory_condition: 'Hatch a custom-sequenced giant companion and ride it across 1,000 units of terrain.',
    biome_target: 'Lush Chameleon Paradise',
    timestamp: 1720001600000
  },
  {
    protocol_id: 'ATLS-6419',
    codename: 'PROTOCOL: XENO-PALEONTOLOGY',
    classification: 'Archaeology | Antiquity Survey',
    intensity: 'Cadet',
    flavor_quote: 'Eons sleep beneath the silt. We are merely the brush sweeping away forgotten millennia.',
    core_vocation: 'Curator of Antiquities',
    rules_of_engagement: [
      'Do not attack wildlife: study and excavate the ancient past with care.',
      'Preserve rare fossils in storage vaults rather than immediately liquidating them.',
      'Construct a peaceful museum pavilion with glass corridors and display plinths.'
    ],
    primary_directives: [
      'Excavate 6 Ancient Skeleton or Salvaged Scrap dig-sites using the Terrain Manipulator.',
      'Uncover a pristine Rare or Legendary prehistoric bone item.',
      'Construct a museum gallery base with display plinths and fossil exhibitions.'
    ],
    victory_condition: 'Display 5 distinct fossilized bone species inside your custom planetary museum base.',
    biome_target: 'Ringed Verdant Moon',
    timestamp: 1720000800000
  },
  {
    protocol_id: 'ATLS-9099',
    codename: 'OPERATION: SILENT ORBIT',
    classification: 'Atmospheric Architecture | Cozy Homestead',
    intensity: 'Cadet',
    flavor_quote: 'To touch the stars, one needs neither rocket nor thruster—merely an unbroken line of alloy and glass.',
    core_vocation: 'The Cosmic Architect',
    rules_of_engagement: [
      'Construct scenic base designs: glass pavilions, observation decks, and lounge rooms.',
      'Power all modules with 100% clean solar arrays and electromagnetic generators.',
      'Incorporate a landing platform with a scenic view overlooking planetary rings or ocean.'
    ],
    primary_directives: [
      'Survey a peaceful or low-gravity world for a scenic vista overlooking rings or mountains.',
      'Build a multi-level watchtower or lakehouse with lounge furnishings and viewing decks.',
      'Furnish the interior with harvested agricultural plants and ambient lighting.'
    ],
    victory_condition: 'Upload your scenic architectural base to the Telemetry network powered by 100% renewable energy.',
    biome_target: 'Ringed Verdant Moon',
    timestamp: 1720000500000
  },
  {
    protocol_id: 'ATLS-5102',
    codename: 'OPERATION: GLITCH CARTOGRAPHY',
    classification: 'Exotic Exploration | Wonder Hunting',
    intensity: 'Cadet',
    flavor_quote: 'Reality frays at the edges. The frayed threads make wonderful parlor decorations.',
    core_vocation: 'Xeno-Documentarian',
    rules_of_engagement: [
      'Locate exotic anomaly glitch worlds (Hexagonal, Bubble, Shards, or Light Fissures).',
      'Collect stabilized reality glitches to display as souvenirs in your base.',
      'Photograph exotic planetary anomalies during golden-hour lighting.'
    ],
    primary_directives: [
      'Discover 2 distinct exotic anomaly worlds (e.g. Hexagonal, Cabled, or Bubbling).',
      'Collect 5 stabilized reality glitch souvenirs (Light Fissures, Glitching Separators).',
      'Record full photographic discovery logs of anomalous flora and minerals.'
    ],
    victory_condition: 'Install 5 collected reality glitches as decorative lighting inside your personal base.',
    biome_target: 'Exotic Glitch / Anomaly World',
    timestamp: 1720001700000
  },
  {
    protocol_id: 'ATLS-2980',
    codename: 'DIRECTIVE: STRATOSPHERE RALLY',
    classification: 'Exocraft Engineering | Stunt Racing',
    intensity: 'Cadet',
    flavor_quote: 'Gravity is merely an opinion held by people who do not own booster rockets.',
    core_vocation: 'Grand Prix Engineer',
    rules_of_engagement: [
      'Deploy Roamer, Nomad, or Pilgrim exocrafts with drift tires and booster modules.',
      'Build jump ramps on a low-gravity moon or crater landscape.',
      'Casual stunt driving: focus on course design and massive air time.'
    ],
    primary_directives: [
      'Establish a 1,000u race circuit across rolling hills with checkpoint beacons.',
      'Achieve continuous airborne flight time of 5 seconds launching off a custom ramp.',
      'Set a personal best lap record and save the circuit checkpoint beacon.'
    ],
    victory_condition: 'Complete a continuous 3-lap run hitting every booster gate without collision.',
    biome_target: 'Airless Low-Gravity Moon',
    timestamp: 1720001000000
  },
  {
    protocol_id: 'ATLS-3721',
    codename: 'OPERATION: MONOLITH CONCLAVE',
    classification: 'Alien Linguistics | Peaceful Lore',
    intensity: 'Cadet',
    flavor_quote: 'The stone hums sixteen times. The words are older than the galaxies, yet gentle as breath.',
    core_vocation: 'Stargate Pilgrim',
    rules_of_engagement: [
      'Explore planetary ruins and knowledge stones at a leisurely, peaceful pace.',
      'Interact with Korvax, Gek, and Vy\'keen solely through learned native words.',
      'Unarmed diplomacy: avoid hostile confrontations.'
    ],
    primary_directives: [
      'Learn 30 new alien vocabulary words by speaking with space station inhabitants.',
      'Solve 3 Alien Monolith riddle trials across different planetary systems.',
      'Gift a Vy\'keen Dagger, Gek Relic, and Korvax Casing to their respective guild envoys.'
    ],
    victory_condition: 'Unlock 8 Portal Glyphs in your Atlas guide logbook and transcribe an ancient riddle.',
    biome_target: 'Lush Chameleon Paradise',
    timestamp: 1720001400000
  },
  {
    protocol_id: 'ATLS-4220',
    codename: 'OPERATION: ORBITAL FABRICATOR',
    classification: 'Starship Customization | Playstyle Variation',
    intensity: 'Interloper',
    flavor_quote: 'Why buy what another pilot discarded? Forge a wing that cuts the solar wind to your own design.',
    core_vocation: 'Deep Space Scrapper',
    rules_of_engagement: [
      'Salvage crashed starships and disassemble them for modular components at station fabricators.',
      'Collect custom wings, fuselages, and cockpits to forge your bespoke fighter or hauler.',
      'Trade modular scraps with station pilots for customized paint decals.'
    ],
    primary_directives: [
      'Locate and claim 2 planetary crashed starships using distress signals or visual tracking.',
      'Extract modular chassis parts using the Space Station Starship Fabricator.',
      'Assemble a completely custom starship with chosen paint scheme and cockpit geometry.'
    ],
    victory_condition: 'Successfully take flight in your newly fabricated custom starship and complete its maiden voyage.',
    biome_target: 'Outlaw Frontier Red Star',
    timestamp: 1720001800000
  },
  {
    protocol_id: 'ATLS-7310',
    codename: 'OPERATION: ECO-ALCHEMIST',
    classification: 'Refiner Loops | Pacifist Chemistry',
    intensity: 'Interloper',
    flavor_quote: 'The element is our kin. Why blast the stone when the crucible can multiply its essence?',
    core_vocation: 'Planetary Homesteader',
    rules_of_engagement: [
      'Mining laser forbidden on flora and surface rocks; use refiner chemistry loops.',
      'All Chromatic Metal and Condensed Carbon generated via Medium or Large Refiner recipes.',
      'Cultivate automated gas and oxygen harvesters to supply alchemy reactions.'
    ],
    primary_directives: [
      'Establish a biodome laboratory with medium and large refiners.',
      'Synthesize 1,000 Magnetised Ferrite using pure Carbon-Ferrite refiner chemistry.',
      'Craft 5 Antimatter cells purely from refiner multiplication loops.'
    ],
    victory_condition: 'Build a fully powered glass greenhouse laboratory without firing a single mining beam at a mineral deposit.',
    biome_target: 'Lush Chameleon Paradise',
    timestamp: 1720001100000
  },
  {
    protocol_id: 'ATLS-8821',
    codename: 'OPERATION: VOID TETHER',
    classification: 'Stargate Pilgrimage | Exploration Variation',
    intensity: 'Interloper',
    flavor_quote: 'The glass vibrates between the stars. Step through the gate; leave the hyperdrive behind.',
    core_vocation: 'Stargate Pilgrim',
    rules_of_engagement: [
      'Interstellar travel between star systems must occur via planetary Alien Portals.',
      'Hyperdrive usage reserved for intra-system maneuvers only.',
      'Establish a waypoint sanctuary near a portal hub.'
    ],
    primary_directives: [
      'Locate and activate an ancient Alien Portal using learned glyphs.',
      'Construct a welcoming Portal Traveler Lodge with a teleport terminal and refiner.',
      'Dial a random glyph sequence and explore the mysterious target system.'
    ],
    victory_condition: 'Dial a mystery portal address, establish an outpost on the other side, and return with native discoveries.',
    biome_target: 'Dissonant / Corrupted World',
    timestamp: 1720000000000
  },
  {
    protocol_id: 'ATLS-1102',
    codename: 'OPERATION: CORSAIR COURIER',
    classification: 'Smuggler Trade | Playstyle Variation',
    intensity: 'Interloper',
    flavor_quote: 'The Sentinels look for weapons. They do not look for the vintage nip-nip in the hidden compartments.',
    core_vocation: 'Outlaw Smuggler',
    rules_of_engagement: [
      'Buy contraband goods at Outlaw pirate stations (Geknip, Firstite, Spikeweed).',
      'Evade planetary Sentinel cargo scans using emergency warp, cloaking, or defensive boost.',
      'Sell black-market cargo at luxury planetary trading posts for massive profits.'
    ],
    primary_directives: [
      'Acquire 10,000,000 Units worth of contraband goods from an Outlaw station.',
      'Successfully evade a Sentinel interceptor scan without paying fines.',
      'Deliver and sell all contraband at a high-wealth planetary trading post.'
    ],
    victory_condition: 'Complete 3 successful smuggler deliveries without ever being impounded by Sentinel authorities.',
    biome_target: 'Outlaw Frontier Red Star',
    timestamp: 1720000700000
  },
  {
    protocol_id: 'ATLS-8114',
    codename: 'DIRECTIVE: NOMAD OF THE STARS',
    classification: 'Freighter Lifestyle | Mobile Fleet Home',
    intensity: 'Interloper',
    flavor_quote: 'Roots are for trees. The traveler lives in the vast spaces between the stars.',
    core_vocation: 'Planetary Homesteader',
    rules_of_engagement: [
      'Make your Capital Freighter your primary home: build living quarters, gardens, and workshops inside.',
      'Surface excursions conducted via starship landings or exocraft drops.',
      'Dispatch frigate fleets on mercantile and discovery missions.'
    ],
    primary_directives: [
      'Expand your Freighter interior by building an expansive hydroponics bay and botanical room.',
      'Commission 3 successful frigate expeditions across neighboring star systems.',
      'Conduct a scenic planetary drop from orbit to survey an untouched world.'
    ],
    victory_condition: 'Build a luxurious multi-deck Freighter interior and coordinate a 5-frigate exploratory fleet.',
    biome_target: 'Deep Water / Trench Planet',
    timestamp: 1720001300000
  },
  {
    protocol_id: 'ATLS-9204',
    codename: 'PROTOCOL: DREADNOUGHT BREAKER',
    classification: 'Capital Combat | Fleet Warfare (Kept Challenge)',
    intensity: 'Atlas Protocol',
    flavor_quote: 'Their shields are red as dying stars. Dive into the trench. Defend the convoy.',
    core_vocation: 'Pirate Purger',
    rules_of_engagement: [
      'Pilot a Solar Starship, Sentinel Interceptor, or custom fighter into capital ship battles.',
      'Defend civilian freighter fleets against attacking pirate capital dreadnoughts.',
      'Recharge starship shields in battle primarily using recovered enemy debris.'
    ],
    primary_directives: [
      'Intercept a Pirate Dreadnought attacking a civilian fleet in high orbit.',
      'Fly inside the dreadnought shield trench and disable its shield generators.',
      'Destroy the Dreadnought warp engines before it can jump to hyperspace.'
    ],
    victory_condition: 'Force the Pirate Dreadnought to surrender or destroy it outright while ensuring civilian freighter survival.',
    biome_target: 'Outlaw Frontier Red Star',
    timestamp: 1720001200000
  },
  {
    protocol_id: 'ATLS-4040',
    codename: 'OPERATION: ZERO RECLAMATION',
    classification: 'Pure Scrapper | Self-Sufficiency Challenge (Kept Challenge)',
    intensity: 'Atlas Protocol',
    flavor_quote: 'True wealth lies not in numbers on a terminal, but in salvaged iron and ignited engines.',
    core_vocation: 'Deep Space Scrapper',
    rules_of_engagement: [
      'Self-reliance challenge: Avoid spending Units or Nanites at station kiosks for 5 planetary cycles.',
      'Fly only starships you have discovered, salvaged, and repaired with gathered materials.',
      'Upgrade your gear through salvageable scrap and buried technology caches.'
    ],
    primary_directives: [
      'Locate and fully repair a crashed starship found on a planet surface.',
      'Salvage technology upgrades strictly from buried caches and crashed ship hulls.',
      'Cross 3 star systems utilizing exclusively crafted warp hypercores.'
    ],
    victory_condition: 'Rebuild a salvaged starship to full flight capability without spending a single commercial Unit.',
    biome_target: 'Dissonant / Corrupted World',
    timestamp: 1720000200000
  }
];

export const PRESET_EXPEDITIONS: Expedition[] = [
  {
    id: 'exp_aquarius',
    expedition_title: 'Expedition: Deep Current',
    tagline: 'Descend into the uncharted abyss of drowning worlds (Aquarius / Worlds Part I).',
    createdAt: 1720000000000,
    phases: [
      {
        phase_number: 1,
        phase_name: 'Submerged Emergence',
        milestones: [
          { id: 'm1_1', task: 'Submerge below 50u depth in an ocean world', reward_flavor: 'Nautilon Chamber Plans', completed: false },
          { id: 'm1_2', task: 'Catch 10 hazardous deep-water species using the Fishing Rig', reward_flavor: 'Nutrient Bait Supply Pack', completed: false },
          { id: 'm1_3', task: 'Locate a sunken starship without using your ship scanner', reward_flavor: 'Scrapper Upgrade Cache', completed: false },
          { id: 'm1_4', task: 'Establish a floating marine platform base with solar power', reward_flavor: 'Aquatic Construction Modules', completed: false }
        ]
      },
      {
        phase_number: 2,
        phase_name: 'The Abyssal Trench',
        milestones: [
          { id: 'm2_1', task: 'Reach an ocean trench depth of 90u or greater', reward_flavor: 'High-Pressure Exosuit Seals', completed: false },
          { id: 'm2_2', task: 'Harvest 20 Living Pearls from Armoured Clams', reward_flavor: 'Nanite Cluster (1,500)', completed: false },
          { id: 'm2_3', task: 'Deploy and pilot the Nautilon through an underwater cavern', reward_flavor: 'Submarine Engine Supercharger', completed: false },
          { id: 'm2_4', task: 'Catch a rare Storm-Dwelling Leviathan during a hurricane', reward_flavor: 'Legendary Angler Decal & Title', completed: false }
        ]
      },
      {
        phase_number: 3,
        phase_name: 'Sunken Ruins & Echoes',
        milestones: [
          { id: 'm3_1', task: 'Unseal an Ancient Sunken Ruin and retrieve an oceanic artifact', reward_flavor: 'Trident Fragment Blueprint', completed: false },
          { id: 'm3_2', task: 'Synthesize 5 deep-sea gourmet delicacies in the Nutrient Processor', reward_flavor: 'Gourmet Chef Exosuit Cape', completed: false },
          { id: 'm3_3', task: 'Survive 15 minutes underwater without surfacing to fresh air', reward_flavor: 'Abyssal Rebreather Augment', completed: false },
          { id: 'm3_4', task: 'Photograph an oceanic apex predator swimming beneath the Skiff', reward_flavor: 'Xeno-Biologist Badge', completed: false }
        ]
      },
      {
        phase_number: 4,
        phase_name: 'Ascension to the Stars',
        milestones: [
          { id: 'm4_1', task: 'Repair and launch a sunken starship directly from the water bed', reward_flavor: 'Sub-Orbital Thruster Customizer', completed: false },
          { id: 'm4_2', task: 'Warp to an uncharted blue star system carrying oceanic goods', reward_flavor: 'Stellar Coordinate Key', completed: false },
          { id: 'm4_3', task: 'Present a colossal storm fish to Priest Entity Nada aboard the Anomaly', reward_flavor: 'Atlas Abyssal Crest Banner', completed: false },
          { id: 'm4_4', task: 'Complete the Deep Current Manifesto: upload all marine discoveries', reward_flavor: 'Exclusive Title: "The Leviathan Diver"', completed: false }
        ]
      }
    ]
  },
  {
    id: 'exp_orbital',
    expedition_title: 'Expedition: Starship Reclamation',
    tagline: 'Scrap, reconstruct, and customize starships across pirate frontier sectors (Orbital).',
    createdAt: 1720000100000,
    phases: [
      {
        phase_number: 1,
        phase_name: 'The Scrapper\'s Eye',
        milestones: [
          { id: 'mo1_1', task: 'Locate and claim your first planetary crashed starship', reward_flavor: 'Salvage Tool Recalibration', completed: false },
          { id: 'mo1_2', task: 'Dismantle starship wings at a Space Station Starship Fabricator', reward_flavor: 'Modular Chassis Component Blueprint', completed: false },
          { id: 'mo1_3', task: 'Zero Economy: survive 1 planetary cycle without spending Units', reward_flavor: 'Scavenger Supply Crate', completed: false },
          { id: 'mo1_4', task: 'Install an Emergency Warp unit on your salvage ship', reward_flavor: 'Hyperdrive Booster Cache', completed: false }
        ]
      },
      {
        phase_number: 2,
        phase_name: 'Modular Alchemy',
        milestones: [
          { id: 'mo2_1', task: 'Recover an authentic Starship Cockpit and Engine module from scrap', reward_flavor: 'Orbital Fabricator Voucher', completed: false },
          { id: 'mo2_2', task: 'Defend a civilian freighter from 6 pirate fighter escorts', reward_flavor: 'Cargo Bulkhead Upgrade', completed: false },
          { id: 'mo2_3', task: 'Construct a custom fabricated fighter at an upgraded space station', reward_flavor: 'Custom Metallic Paint Decal', completed: false },
          { id: 'mo2_4', task: 'Reach an Outlaw Star System using only planetary trade maps', reward_flavor: 'Outlaw Cape & Pirate Visor', completed: false }
        ]
      },
      {
        phase_number: 3,
        phase_name: 'The Corsair Frontier',
        milestones: [
          { id: 'mo3_1', task: 'Engage and defeat a Sentinel Capital Ship in high orbit', reward_flavor: 'Sentinel Interceptor Brain Cache', completed: false },
          { id: 'mo3_2', task: 'Smuggle 5 stacks of Contraband into a High-Security system', reward_flavor: 'Forged Passport Token', completed: false },
          { id: 'mo3_3', task: 'Scrap an exotic or solar class starship down to raw nanites', reward_flavor: '2,500 Nanite Cluster', completed: false },
          { id: 'mo3_4', task: 'Equip your custom starship with 3 synergistic S-Class weapon modules', reward_flavor: 'Photon Accelerator Core', completed: false }
        ]
      },
      {
        phase_number: 4,
        phase_name: 'Fleet Sovereign',
        milestones: [
          { id: 'mo4_1', task: 'Recruit a pirate frigate into your expeditionary fleet', reward_flavor: 'Fleet Command Console Blueprint', completed: false },
          { id: 'mo4_2', task: 'Conduct a low-altitude orbital dive from your freighter to a planet', reward_flavor: 'Orbital Drop Jetpack Trail', completed: false },
          { id: 'mo4_3', task: 'Fly your assembled custom ship to the Galactic Core or Black Hole', reward_flavor: 'Atlas Master Salvager Crest', completed: false },
          { id: 'mo4_4', task: 'Synchronize expedition telemetry at the Space Anomaly terminal', reward_flavor: 'Exclusive Title: "The Orbital Smith"', completed: false }
        ]
      }
    ]
  },
  {
    id: 'exp_echoes',
    expedition_title: 'Expedition: Shards of Glass',
    tagline: 'Uncloak the hidden Autophage camps and wield the Voltaic Staff (Echoes).',
    createdAt: 1720000200000,
    phases: [
      {
        phase_number: 1,
        phase_name: 'Dissonant Awakening',
        milestones: [
          { id: 'me1_1', task: 'Locate a corrupted dissonant planet and gather 15 Radiant Shards', reward_flavor: 'Harmonic Interface Key', completed: false },
          { id: 'me1_2', task: 'Uncloak an Autophage camp using the Scanner Resonance wave', reward_flavor: 'Autophage Cloth Hood Blueprint', completed: false },
          { id: 'me1_3', task: 'Recover an Inverted Mirror guarded by Dissonant Resonators', reward_flavor: 'Atlantideum Refiner Matrix', completed: false },
          { id: 'me1_4', task: 'Solve the harmonic arithmetic puzzle on a terminal', reward_flavor: 'Sentinel Multi-Tool Salvage Cache', completed: false }
        ]
      },
      {
        phase_number: 2,
        phase_name: 'The Staff & The Shard',
        milestones: [
          { id: 'me2_1', task: 'Craft all 3 components of a two-handed Voltaic Staff', reward_flavor: 'Havoc Staff Assembly Token', completed: false },
          { id: 'me2_2', task: 'Assemble your personalized Autophage Staff at a Synthesis Terminal', reward_flavor: 'Staff Runic Glow Augment', completed: false },
          { id: 'me2_3', task: 'Converse with 5 hidden Autophage Synthesists using Void Motes', reward_flavor: 'Autophage Visage Customization', completed: false },
          { id: 'me2_4', task: 'Survive 5 waves of corrupted sentinel attacks on foot', reward_flavor: 'Dissonant Shield Modulator', completed: false }
        ]
      },
      {
        phase_number: 3,
        phase_name: 'The World of Glass',
        milestones: [
          { id: 'me3_1', task: 'Salvage a Sentinel Interceptor starship from a crashed site', reward_flavor: 'Piloting Harmonic Brain', completed: false },
          { id: 'me3_2', task: 'Mine 500 Atlantideum and refine it into Nanite Clusters', reward_flavor: '1,800 Nanites', completed: false },
          { id: 'me3_3', task: 'Infiltrate an abandoned sentinel pillar and deactivate planetary sentinels', reward_flavor: 'Sentinel Weapons Terminal', completed: false },
          { id: 'me3_4', task: 'Construct a harmonic shrine base decorated with dissonant crystals', reward_flavor: 'Crystal Hologram Decor Pack', completed: false }
        ]
      },
      {
        phase_number: 4,
        phase_name: 'Rebirth in Sixteen',
        milestones: [
          { id: 'me4_1', task: 'Take flight in your Sentinel Interceptor and jump through a Black Hole', reward_flavor: 'Warp Singularity Matrix', completed: false },
          { id: 'me4_2', task: 'Deliver a cleansed Harmonic Core to Nada and Polo on the Anomaly', reward_flavor: 'Nada\'s Personal Commendation', completed: false },
          { id: 'me4_3', task: 'Witness the memory of the World of Glass at an Atlas Interface', reward_flavor: 'Glass Memory Cloak & Title', completed: false },
          { id: 'me4_4', task: 'Finalize the expedition record and register your Traveler callsign', reward_flavor: 'Exclusive Title: "The Disconnected"', completed: false }
        ]
      }
    ]
  }
];

// Direct vocation-specific objective profiles
interface VocationProfile {
  specificRules: string[];
  getDirectives: (biomeName: string, economyName: string, mobilityName: string) => string[];
  victoryTarget: string;
}

const VOCATION_PROFILES: Record<string, VocationProfile> = {
  voc_angler: {
    specificRules: [
      'Install the Fishing Rig on your Multi-Tool and craft specialized bait types.',
      'Deploy the Exo-Skiff on deep open water for maximum fishing stability.'
    ],
    getDirectives: (biome) => [
      `Deploy an Exo-Skiff or automated fishing trap on ${biome}.`,
      'Catch 8 unique fish species across both daylight and nighttime cycles.',
      'Mount an aquatic specimen or fish display inside a shoreline base.'
    ],
    victoryTarget: 'Catch a Storm-tier trophy fish during bad weather and log 12 species in your fishing records catalogue.'
  },
  voc_zoologist: {
    specificRules: [
      'Craft Creature Pellets; killing wild fauna is strictly forbidden.',
      'Maintain 100% companion trust before collecting eggs for gene sequencing.'
    ],
    getDirectives: (biome) => [
      `Feed and tame 3 distinct wild creature species on ${biome}.`,
      'Induce egg laying in your primary companion and harvest its egg.',
      'Modify the egg at the Space Anomaly Gene Sequencer and hatch a mutated companion.'
    ],
    victoryTarget: 'Hatch a custom-sequenced giant companion with altered traits and ride it across 500u.'
  },
  voc_xeno: {
    specificRules: [
      'Pacifist exploration: complete scans without engaging in ground combat.',
      'Document natural wonders using the Multi-Tool scanner and Photo Mode.'
    ],
    getDirectives: (biome) => [
      `Land on ${biome} and scan 100% of native fauna to claim the Nanite discovery bonus.`,
      'Take 3 Photo Mode pictures of anomalous flora or rare megafauna.',
      'Chart 5 planetary waypoints and map the local planetary sector.'
    ],
    victoryTarget: 'Upload 100% complete zoological survey data for the planet to the Atlas Network.'
  },
  voc_architect: {
    specificRules: [
      'Power all base structures using 100% clean solar panels or electromagnetic generators.',
      'Build using glass corridors, scenic observation lounges, and landing pads.'
    ],
    getDirectives: (biome) => [
      `Locate an elevated scenic viewpoint on ${biome} overlooking rings or ocean.`,
      'Construct a multi-room base with at least 15 structural pieces and a landing pad.',
      'Decorate interior spaces with illuminated lights, furniture, and harvested flora.'
    ],
    victoryTarget: 'Place a Base Computer, name your retreat, and upload the completed sanctuary to the base network.'
  },
  voc_chef: {
    specificRules: [
      'Replenish Life Support exclusively using Nutrient Processor cooked dishes.',
      'Harvest native agricultural crops and milk friendly fauna rather than killing them.'
    ],
    getDirectives: (biome) => [
      `Harvest 30 native crops (e.g. Star Bulbs, Fungal Mould, or Frost Crystals) on ${biome}.`,
      'Tame and milk 2 companion creatures for fresh creature milk and eggs.',
      'Bake 4 gourmet dishes (such as Stellar Custard or Cosmic Doughnuts) in a Nutrient Processor.'
    ],
    victoryTarget: 'Deliver a 3-course banquet meal to Chef Cronus aboard the Space Anomaly and earn Nanites.'
  },
  voc_curator: {
    specificRules: [
      'Excavate prehistoric fossils using the Terrain Manipulator with care.',
      'Preserve rare bones in storage vaults to build a museum exhibition.'
    ],
    getDirectives: (biome) => [
      `Locate an Ancient Bones or Salvageable Scrap site on ${biome}.`,
      'Excavate 6 subterranean fossilized bone dig sites.',
      'Construct a dedicated museum gallery base with plinths and display stands.'
    ],
    victoryTarget: 'Unearth a Legendary (Yellow) fossilized skull and display it on an exhibit plinth in your base.'
  },
  voc_merchant: {
    specificRules: [
      'Install an Economy Scanner in your starship to locate booming wealth systems.',
      'Trade commodities strictly according to system production supply and demand loops.'
    ],
    getDirectives: (biome) => [
      `Locate a planetary Trading Post on ${biome} and purchase discounted local trade commodities.`,
      'Warp to a matching high-demand star system and sell all cargo for a profit over 2,000,000 Units.',
      'Establish a teleporter outpost at the trading post to link your trade route.'
    ],
    victoryTarget: 'Complete 3 profitable commodity trade loops and amass at least 10,000,000 Units in trade profits.'
  },
  voc_scrapper: {
    specificRules: [
      'Salvage crashed starships using distress signal coordinates or planetary towers.',
      'Dismantle damaged ships at station fabricators to collect modular wings and hulls.'
    ],
    getDirectives: (biome) => [
      `Locate and claim a crashed starship on ${biome} using distress signals or visual tracking.`,
      'Repair the launch thrusters and pulse drive using scavenged materials.',
      'Disassemble the ship at a Space Station Fabricator to extract modular customization parts.'
    ],
    victoryTarget: 'Assemble a bespoke custom starship at the Starship Fabricator using salvages collected from crashed vessels.'
  },
  voc_stargate: {
    specificRules: [
      'Travel between distant star systems exclusively through planetary Alien Portals.',
      'Learn alien dialects from Monoliths and Knowledge Stones to decode portal runes.'
    ],
    getDirectives: (biome) => [
      `Learn 15 new alien words by interacting with Knowledge Stones on ${biome}.`,
      'Locate an ancient planetary Alien Portal using an Alien Cartographic Map.',
      'Charge all 16 portal glyph pillars with basic elements (Carbon, Sodium, Copper).'
    ],
    victoryTarget: 'Step through an active Portal to a new star system and establish an observatory outpost at the exit.'
  },
  voc_grandprix: {
    specificRules: [
      'Deploy Exocraft Geobays (Roamer, Nomad, or Pilgrim) with drift and booster modules.',
      'Build custom jump ramps across canyons and crater edges.'
    ],
    getDirectives: (biome) => [
      `Deploy an Exocraft Geobay on ${biome} and tune engine booster modules.`,
      'Construct a 1,000u race circuit with at least 4 Checkpoint Beacons and jump ramps.',
      'Achieve 5 seconds of continuous air time launching off a natural ridge or custom ramp.'
    ],
    victoryTarget: 'Complete a timed lap of your custom race course without damaging your Exocraft hull.'
  },
  voc_smuggler: {
    specificRules: [
      'Purchase black-market contraband (Geknip, Firstite, Spikeweed) in Outlaw pirate stations.',
      'Evade Sentinel cargo scans using emergency warp or cloaking devices.'
    ],
    getDirectives: (biome) => [
      `Acquire 10,000,000 Units worth of contraband goods from an Outlaw pirate station.`,
      `Smuggle the contraband to a high-wealth regulated system and land on ${biome}.`,
      'Sell all black-market contraband at a planetary trading post for maximum profit.'
    ],
    victoryTarget: 'Complete 3 successful smuggler deliveries without ever being impounded by Sentinel authorities.'
  },
  voc_autophage: {
    specificRules: [
      'Locate Corrupted Dissonant worlds and avoid standard Sentinel alert escalations.',
      'Earn Void Motes by completing tasks for hidden Autophage Synthesists.'
    ],
    getDirectives: (biome) => [
      `Locate an Autophage Harmonic Camp on ${biome} and unseal the terminal via the math puzzle.`,
      'Collect 10 Radiant Shards and 1 Inverted Mirror from corrupted resonators.',
      'Purchase staff components (Head, Core, Pole) from Autophage Synthesists using Void Motes.'
    ],
    victoryTarget: 'Assemble a custom two-handed Voltaic Staff at a Harmonic Synthesis Terminal.'
  },
  voc_homestead: {
    specificRules: [
      'Construct automated farming and mineral harvesting systems for passive resource generation.',
      'Maintain an organized planetary homestead with dedicated storage and craft workshops.'
    ],
    getDirectives: (biome) => [
      `Claim a base site on ${biome} and construct 4 agricultural Bio-Domes or hydroponic trays.`,
      'Install automated Mineral or Gas Extractors connected to resource supply depots.',
      'Craft a high-tier trade item (such as a Circuit Board or Living Glass) from home-grown crops.'
    ],
    victoryTarget: 'Harvest a full yield of crafted goods from your automated homestead and store 5,000 refined materials.'
  },
  voc_bounty: {
    specificRules: [
      'Equip your starship with upgraded Phase Beams and Photon Cannons for space combat.',
      'Defend civilian freighters and engage hostile pirate squadrons.'
    ],
    getDirectives: (biome) => [
      `Accept 3 planetary or station mercenary bounty board missions in the ${biome} sector.`,
      'Destroy 8 pirate starships in space dogfights.',
      'Intercept a hostile Pirate Dreadnought in high orbit and destroy its warp engines.'
    ],
    victoryTarget: 'Disable the shields and engines of a Pirate Dreadnought, forcing its surrender or destruction.'
  }
};

// Offline procedural combinator generator for 0-token immediate generation
export function generateProceduralDirective(intensity: 'Cadet' | 'Interloper' | 'Atlas Protocol'): Directive {
  // Filter appropriate vocations/mobility/economy based on intensity
  let vocPool = AXIS_VOCATIONS;
  let econPool = AXIS_ECONOMY;
  let mobPool = AXIS_MOBILITY;
  let bioPool = AXIS_BIOMES;

  if (intensity === 'Cadet') {
    vocPool = AXIS_VOCATIONS.filter(v => v.tier === 'Casual');
    econPool = AXIS_ECONOMY.filter(e => e.tier === 'Casual');
    mobPool = AXIS_MOBILITY.filter(m => m.tier === 'Casual');
    bioPool = AXIS_BIOMES.filter(b => b.tier === 'Casual');
  } else if (intensity === 'Interloper') {
    vocPool = AXIS_VOCATIONS.filter(v => v.tier === 'Variation' || v.tier === 'Casual');
    econPool = AXIS_ECONOMY.filter(e => e.tier === 'Variation' || e.tier === 'Casual');
    mobPool = AXIS_MOBILITY.filter(m => m.tier === 'Variation' || m.tier === 'Casual');
    bioPool = AXIS_BIOMES.filter(b => b.tier === 'Variation' || b.tier === 'Casual');
  }

  const vocation = vocPool[Math.floor(Math.random() * vocPool.length)] || AXIS_VOCATIONS[0];
  const economy = econPool[Math.floor(Math.random() * econPool.length)] || AXIS_ECONOMY[0];
  const mobility = mobPool[Math.floor(Math.random() * mobPool.length)] || AXIS_MOBILITY[0];
  const biome = bioPool[Math.floor(Math.random() * bioPool.length)] || AXIS_BIOMES[0];

  const protoNum = Math.floor(1000 + Math.random() * 9000);
  const codeWords = ['VOID TETHER', 'SILENT PROTOCOL', 'DISSONANT SCHISM', 'CHRONO WEFT', 'ABYSSAL VECTOR', 'SOLAR EXILE', 'ECHO DRIFT', 'NADA TELEMETRY', 'ATLAS RECKONING', 'GLASS HORIZON'];
  const codename = `OPERATION: ${codeWords[Math.floor(Math.random() * codeWords.length)]} ${protoNum.toString().slice(-2)}`;

  const quotes = [
    'Sixteen echoes pulse beneath the continental crust. Walk peacefully, Traveler.',
    'The Sentinel gaze shifts across the quadrant. In calm curiosity, we chart the stars.',
    'Stars burn steady in the outer rim. Enjoy the celestial panorama from your cockpit.',
    'The glass sings a song of forgotten empires. Take your time before the horizon.',
    'Trade routes weave the galaxy together. Wealth is but fuel for your next discovery.',
    'The boundary weakens where shadows pool. Trust your scanner, enjoy the flight.',
    'Sixteen minutes or sixteen millennia—to the stars, every moment of wonder counts.',
    'Nada whispers through the transceiver: "Traveler discovers beauty in the simplest creatures."',
    'Telemetry diagnostic: Exosuit systems nominal. Pacing set to optimal leisure.',
    'Atlas observation: Attempting to resolve cosmic dread with a fishing rod or bakery stove is remarkably effective.'
  ];

  const profile = VOCATION_PROFILES[vocation.id] || VOCATION_PROFILES['voc_angler'];

  const rules: string[] = [
    profile.specificRules[0] || vocation.desc,
    economy.desc,
    mobility.desc,
    intensity === 'Atlas Protocol'
      ? 'Challenging Survival Rules: Elevated Sentinel alert and environmental hazards active.'
      : intensity === 'Interloper'
      ? 'Thematic Playstyle Rules: Adhere strictly to your chosen vocation and mobility restrictions.'
      : 'Relaxed Exploration Rules: Stress-free discovery, cozy base building, and casual gameplay pacing.'
  ];

  const directives: string[] = profile.getDirectives(biome.name, economy.name, mobility.name);

  return {
    protocol_id: `ATLS-${protoNum}`,
    codename,
    classification: `${vocation.name} | ${intensity}`,
    intensity,
    flavor_quote: quotes[Math.floor(Math.random() * quotes.length)],
    core_vocation: vocation.name,
    rules_of_engagement: rules,
    primary_directives: directives,
    victory_condition: profile.victoryTarget,
    biome_target: biome.name,
    timestamp: Date.now()
  };
}

export function generateProceduralManifesto(vocationId: string, economyId: string, mobilityId: string, biomeId: string): WeaverManifesto {
  const voc = AXIS_VOCATIONS.find(v => v.id === vocationId) || AXIS_VOCATIONS[0];
  const econ = AXIS_ECONOMY.find(e => e.id === economyId) || AXIS_ECONOMY[0];
  const mob = AXIS_MOBILITY.find(m => m.id === mobilityId) || AXIS_MOBILITY[0];
  const bio = AXIS_BIOMES.find(b => b.id === biomeId) || AXIS_BIOMES[0];

  const protoNum = Math.floor(1000 + Math.random() * 9000);
  const hasChallenge = voc.tier === 'Challenge' || econ.tier === 'Challenge' || mob.tier === 'Challenge' || bio.tier === 'Challenge';

  const profile = VOCATION_PROFILES[voc.id] || VOCATION_PROFILES['voc_angler'];
  const directTasks = profile.getDirectives(bio.name, econ.name, mob.name);

  return {
    protocol_id: `WEAVE-${protoNum}`,
    codename: `MANIFESTO: ${voc.name.toUpperCase()} ON ${bio.name.toUpperCase()}`,
    vocation: voc.name,
    economy: econ.name,
    mobility: mob.name,
    biome: bio.name,
    lore_manifesto: hasChallenge
      ? `For the intrepid Traveler seeking to test their mettle, the path of ${voc.name} demands skill and focus across ${bio.name}. Guided by ${econ.name} and ${mob.name}, your journey stands as a bold testament to survival in the simulation.`
      : `Embracing the rewarding path of ${voc.name}, you journey across the wondrous landscapes of ${bio.name}. Guided by the creative lifestyle of ${econ.name} and traveling via ${mob.name}, your expedition celebrates discovery, variety, and stress-free adventure.`,
    recommended_setup: {
      game_mode: hasChallenge ? 'Normal / Survival (Custom Challenge)' : 'Normal or Relaxed (Stress-Free & Casual)',
      difficulty_preset: hasChallenge ? 'Challenging Hazard Drain / Standard Inventory' : 'Relaxed / Casual (Zero Stress Exploration)',
      hud_mode: mob.id === 'mob_nohud' ? 'HUD: Completely Disabled (Immersion)' : 'HUD: Standard On'
    },
    rules_of_engagement: [
      `Vocation Rule: ${profile.specificRules[0] || voc.desc}`,
      `Economic Rule: ${econ.desc}`,
      `Mobility Rule: ${mob.desc}`,
      `Operational Target: Centered on ${bio.name}.`
    ],
    milestone_phases: [
      {
        phase: 'Phase 1: Arrival & Settlement',
        objective: `Land on a ${bio.name} and establish a Base Computer with a Save Beacon under ${econ.name} rules.`,
        validation: 'Interact with the Base Computer and register your landing site.'
      },
      {
        phase: 'Phase 2: Core Operation',
        objective: directTasks[1] || `Operate as ${voc.name} strictly utilizing ${mob.name}.`,
        validation: 'Complete 3 specific vocation actions and verify in your log.'
      },
      {
        phase: 'Phase 3: The Masterwork',
        objective: directTasks[2] || `Establish a landmark or trophy showcasing your stay on ${bio.name}.`,
        validation: 'Record and upload completion telemetry to the Atlas Archive.'
      }
    ],
    victory_condition: profile.victoryTarget,
    timestamp: Date.now()
  };
}
