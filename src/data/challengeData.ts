import { Directive, Expedition, WeaverManifesto } from '../types';

export const AXIS_VOCATIONS = [
  { id: 'voc_scrapper', name: 'Deep Space Scrapper', desc: 'Salvage crashed starships & derelicts; scrap modular parts (Orbital).', icon: 'Ship' },
  { id: 'voc_stargate', name: 'Stargate Pilgrim', desc: 'Travel galaxy exclusively via planetary Alien Portals; hyperdrives banned.', icon: 'Compass' },
  { id: 'voc_abyssal', name: 'Abyssal Marine', desc: 'Ocean-only existence; deep underwater ruins, Nautilon submarine pilot.', icon: 'Anchor' },
  { id: 'voc_chef', name: 'The Forager-Chef', desc: 'Gourmet field culinary; all life support tied strictly to Nutrient Processor.', icon: 'Utensils' },
  { id: 'voc_autophage', name: 'Autophage Disciple', desc: 'Cloaked scavenger; hunt harmonic camps, staves, sentinel shards (Echoes).', icon: 'Cpu' },
  { id: 'voc_bounty', name: 'Pirate Purger', desc: 'Space combat focus; Dreadnought hunting, freighter fleet defense.', icon: 'Crosshair' },
  { id: 'voc_smuggler', name: 'Outlaw Smuggler', desc: 'Restricted to pirate stations & hauling black-market contraband.', icon: 'ShieldAlert' },
  { id: 'voc_xeno', name: 'Xeno-Documentarian', desc: 'No combat Multi-Tools; 100% scanning, creature photography, and taming.', icon: 'Camera' },
  { id: 'voc_hermit', name: 'Planetary Hermit', desc: 'Never leave a single star system or a single mega-extreme world.', icon: 'Globe' },
  { id: 'voc_architect', name: 'The Architect', desc: 'Megastructure builder; low-orbit sky stations or deep-trench aquatic bases.', icon: 'Layers' },
  { id: 'voc_curator', name: 'Curator of Antiquities', desc: 'Archaeologist hoarding ancient bones & ruins into a museum vault base.', icon: 'BookOpen' },
  { id: 'voc_grandprix', name: 'Grand Prix Engineer', desc: 'Mountainous/low-gravity exocraft racetrack fabricator.', icon: 'Zap' },
];

export const AXIS_ECONOMY = [
  { id: 'econ_zero', name: 'The Zero Economy Rule', desc: 'Forbidden from spending any Units or Nanites. All tech must be salvaged.' },
  { id: 'econ_refiner', name: 'Refiner Alchemy Only', desc: 'Forbidden from shooting mining lasers at plants/rocks (Eco-Pacifist refiner loops).' },
  { id: 'econ_barter', name: 'Scavenger Barter Only', desc: 'No space station trade kiosks; trade only with landed planetary pilots.' },
  { id: 'econ_nomad', name: 'Nomad Protocol', desc: 'No permanent base computers; live 100% out of starship/freighter or on foot.' },
  { id: 'econ_pawnshop', name: 'Pawnshop Stripper', desc: 'Strip starships down to modular components before scrap (Orbital customizer).' },
  { id: 'econ_diet', name: 'The Foraging Diet', desc: 'No raw Sodium, Oxygen, or Ion Batteries. Recharge life support solely with meals.' },
];

export const AXIS_MOBILITY = [
  { id: 'mob_circumnav', name: 'Equatorial Circumnavigation', desc: 'Trek 360° around a planet on foot/exocraft without flight.' },
  { id: 'mob_amnesiac', name: 'The Amnesiac Starter', desc: 'Dismantle starter Radiant Pillar; locate crashed starship entirely on foot.' },
  { id: 'mob_blackhole', name: 'Black Hole Roulette', desc: 'Can only jump star systems through random Black Holes.' },
  { id: 'mob_nohud', name: 'No-HUD Immersion', desc: 'Compass, markers, health bars, and visor targeting UI turned 100% OFF.' },
  { id: 'mob_coldterror', name: 'Cold Terror Protocol', desc: 'Derelict freighters explored with zero cold-hazard modules & zero heaters.' },
];

export const AXIS_BIOMES = [
  { id: 'bio_dissonant', name: 'Dissonant / Corrupted World', desc: 'Purple radiant crystals, corrupted sentinels, harmonic encampments.' },
  { id: 'bio_extreme', name: 'Mega-Mountain Extreme Storm', desc: 'Colossal cliffs, lightning cyclones, superheated firestorms.' },
  { id: 'bio_aquatic', name: 'Deep Water / Trench Planet', desc: '90%+ ocean coverage, abyssal depths, sunken ruins, angler leviathans.' },
  { id: 'bio_dead', name: 'Airless Vacuum Moon', desc: 'Zero atmosphere, low gravity, high radiation, silent craters.' },
  { id: 'bio_outlaw', name: 'Outlaw-Controlled Red Star', desc: 'No Sentinel authority, frequent pirate raids, black market trades.' },
  { id: 'bio_paradise', name: 'Lush Chameleon Paradise', desc: 'Color-shifting flora, luminescent grass, zero storm activity.' },
];

export const OFFLINE_DIRECTIVES: Directive[] = [
  {
    protocol_id: 'ATLS-8821',
    codename: 'OPERATION: VOID TETHER',
    classification: 'Survival Challenge | Exploration | Roleplay',
    intensity: 'Interloper',
    flavor_quote: 'The glass vibrates between the stars. The Sentinel gaze is averted... for now.',
    core_vocation: 'Stargate Pilgrim',
    rules_of_engagement: [
      'You may not install or charge a Starship Hyperdrive.',
      'System travel must occur solely through planetary Alien Portals.',
      'No purchasing hazard batteries; recharge suit exclusively with native plants.'
    ],
    primary_directives: [
      'Locate and calibrate 3 ancient Alien Monoliths in different systems.',
      'Construct a minimal Portal Outpost containing an exocraft pad.',
      'Document and register all fauna on an Extreme Hazard world reached via Portal.'
    ],
    victory_condition: 'Successfully enter a blind-dialed Portal address and survive 3 consecutive planetary night cycles on the other side without entering your starship.',
    biome_target: 'Dissonant / Corrupted World',
    timestamp: 1720000000000
  },
  {
    protocol_id: 'ATLS-1616',
    codename: 'DIRECTIVE: ABYSSAL WHISPER',
    classification: 'Aquatic Survival | Deep Trench Exploration',
    intensity: 'Atlas Protocol',
    flavor_quote: 'Beneath thirty fathoms of black brine, even the Atlas forgets its children.',
    core_vocation: 'Abyssal Marine',
    rules_of_engagement: [
      'Your starship cannot land on dry land; deploy directly onto open water platforms.',
      'All suit oxygen must be replenished using underwater oxygen plants or Kelp Sacs.',
      'Zero use of Minotaur or Roamer; Nautilon submarine is your sole mechanized transport.'
    ],
    primary_directives: [
      'Locate an ancient sunken ruin below 70u depth and recover an ancient trident chest.',
      'Establish a submerged deep-sea research bio-dome at the floor of a marine trench.',
      'Survive a category-5 ocean storm while tethered outside the Nautilon.'
    ],
    victory_condition: 'Extract a submerged Crashed Starship from the ocean trench and repair its pulse drive without touching dry soil.',
    biome_target: 'Deep Water / Trench Planet',
    timestamp: 1720000100000
  },
  {
    protocol_id: 'ATLS-4040',
    codename: 'OPERATION: ZERO RECLAMATION',
    classification: 'Hardcore Scrapper | Economic Restraint',
    intensity: 'Atlas Protocol',
    flavor_quote: 'Value is a ghost born of greed. True wealth lies in salvaged iron and cold circuits.',
    core_vocation: 'Deep Space Scrapper',
    rules_of_engagement: [
      'The Zero Economy Rule: You may never spend Units or Nanites at any station or kiosk.',
      'You may only fly starships you have physically salvaged and repaired with raw materials.',
      'Technology modules must be extracted from scrap ships using the Orbital Customizer.'
    ],
    primary_directives: [
      'Locate 2 crashed starships using distress beacons or planetary observation towers.',
      'Dismantle their wings and cockpits at a space station fabricator.',
      'Assemble a completely custom S-Class or A-Class fighter solely from scrap chassis parts.'
    ],
    victory_condition: 'Construct and fly a custom fabricated starship across 3 outlaw systems without holding more than 5,000 Units in your wallet.',
    biome_target: 'Outlaw-Controlled Red Star',
    timestamp: 1720000200000
  },
  {
    protocol_id: 'ATLS-3109',
    codename: 'PROTOCOL: GASTRONOMIC PILGRIMAGE',
    classification: 'Survival Ecology | Culinary Mastery',
    intensity: 'Cadet',
    flavor_quote: 'The universe tastes of fermented star-bulb and smoked fungal cluster.',
    core_vocation: 'The Forager-Chef',
    rules_of_engagement: [
      'No life support gels or sodium batteries allowed in inventory.',
      'Every hazard and life-support replenishment must come from processed Nutrient Processor dishes.',
      'Pacifist hunting: Bait and feed creatures instead of slaying them.'
    ],
    primary_directives: [
      'Bake 5 batches of Stellar Custard or Cosmic Doughnuts using planetary dairy and grains.',
      'Tame an exotic mega-fauna companion and milk it for creature harvest.',
      'Gift 3 high-tier banquet dishes to Cronus aboard the Space Anomaly.'
    ],
    victory_condition: 'Receive Cronus\'s culinary commendation scoring at least 80+ nanites from an original gourmet recipe.',
    biome_target: 'Lush Chameleon Paradise',
    timestamp: 1720000300000
  },
  {
    protocol_id: 'ATLS-7712',
    codename: 'DIRECTIVE: DISSONANT SCHISM',
    classification: 'Sentinel Infiltration | Echoes Protocol',
    intensity: 'Atlas Protocol',
    flavor_quote: 'We are the unfinished thought of the World of Glass. Our hands are staff and wire.',
    core_vocation: 'Autophage Disciple',
    rules_of_engagement: [
      'You may not carry standard Vy\'keen, Gek, or Korvax multi-tools; Autophage Staves only.',
      'Your shields may only be recharged using Atlantideum and Radiant Shards.',
      'Engage corrupted sentinels at threat level 5 without calling starship air support.'
    ],
    primary_directives: [
      'Locate and decode 3 Harmonic Encampments on dissonant worlds.',
      'Salvage a damaged Sentinel Interceptor starship using inverted mirrors.',
      'Craft an Autophage Voltaic Staff from recovered salvage heads and cores.'
    ],
    victory_condition: 'Defeat a Sentinel Dissonance Wave 5 Dreadnought in space combat while piloting an Interceptor.',
    biome_target: 'Dissonant / Corrupted World',
    timestamp: 1720000400000
  },
  {
    protocol_id: 'ATLS-9099',
    codename: 'OPERATION: SILENT ORBIT',
    classification: 'Atmospheric Engineering | Low-Orbit Architecture',
    intensity: 'Cadet',
    flavor_quote: 'To touch the stars, one needs neither rocket nor thruster—merely an unbroken line of alloy.',
    core_vocation: 'The Architect',
    rules_of_engagement: [
      'No terrain manipulator digging allowed for foundational placement.',
      'All structural modules must be powered entirely by solar arrays and electromagnetic hotspots.',
      'Must construct a multi-level sky tether outpost situated above the cloud layer.'
    ],
    primary_directives: [
      'Survey a low-gravity or airless moon for an S-Class electromagnetic hotspot.',
      'Build a structural watchtower extending at least 25 vertical cuboid rooms high.',
      'Incorporate an exocraft jump launch ramp pointing toward a ringed planet.'
    ],
    victory_condition: 'Base computer uploaded to the Telemetry network with zero carbon fuel generators in operation.',
    biome_target: 'Airless Vacuum Moon',
    timestamp: 1720000500000
  },
  {
    protocol_id: 'ATLS-5521',
    codename: 'DIRECTIVE: AMNESIAC DESCENT',
    classification: 'Hardcore Survival | True Ground Expedition',
    intensity: 'Atlas Protocol',
    flavor_quote: 'The Radiant Pillar burns behind you. Forget its wings. Walk into the red dust.',
    core_vocation: 'Planetary Hermit',
    rules_of_engagement: [
      'Immediately upon arrival, abandon and dismantle all pulse engine parts on your starter ship.',
      'HUD turned completely OFF (No crosshair, no compass, no icon markers).',
      'No buying maps from cartographers; search for planetary structures by eye and sound.'
    ],
    primary_directives: [
      'Trek 5,000 units on foot across rugged terrain without dying.',
      'Locate a planetary trade terminal or minor settlement visually without visor markers.',
      'Scavenge enough Hermetic Seals and Metal Plating to repair an abandoned distress beacon ship.'
    ],
    victory_condition: 'Achieve liftoff in a newly found crashed ship while retaining zero deaths in the journey log.',
    biome_target: 'Mega-Mountain Extreme Storm',
    timestamp: 1720000600000
  },
  {
    protocol_id: 'ATLS-1102',
    codename: 'OPERATION: CORSAIR COURIER',
    classification: 'Smuggler | Black Market Logistics',
    intensity: 'Interloper',
    flavor_quote: 'The Sentinels look for weapons. They do not look for the vintage nip-nip in the fuel tanks.',
    core_vocation: 'Outlaw Smuggler',
    rules_of_engagement: [
      'Docking at High-Security / Normal 3-Star trade systems is forbidden until cargo is cleared.',
      'Cargo must contain at least 4 stacks of banned contraband (Geknip, Firstite, Spikeweed).',
      'No Sentinel interceptor bribe passes; escape scans using emergency warp or cloaking.'
    ],
    primary_directives: [
      'Acquire 100,000,000 Units worth of contraband goods from 3 different Outlaw stations.',
      'Install and utilize an Emergency Warp Unit during an active planetary cargo scan.',
      'Sell all black-market contraband at an inhabited planetary trading post on a high-wealth world.'
    ],
    victory_condition: 'Complete 3 successful smuggler runs without being fined or detained by Sentinel authority.',
    biome_target: 'Outlaw-Controlled Red Star',
    timestamp: 1720000700000
  },
  {
    protocol_id: 'ATLS-6419',
    codename: 'PROTOCOL: XENO-PALEONTOLOGY',
    classification: 'Archaeology | Scientific Survey',
    intensity: 'Cadet',
    flavor_quote: 'Eons sleep beneath the silt. We are merely the brush sweeping away forgotten millennia.',
    core_vocation: 'Curator of Antiquities',
    rules_of_engagement: [
      'Mining laser banned against planetary wildlife under any circumstances.',
      'Must preserve ancient bones in high-capacity storage crates rather than selling immediately.',
      'Every scanned fauna must be uploaded to the Discovery Network before leaving the planet.'
    ],
    primary_directives: [
      'Excavate 10 Ancient Skeleton or Salvaged Scrap dig-sites on an ancient bone world.',
      'Uncover a pristine "Rare / Legendary" prehistoric skull bone worth over 1,500,000 Units.',
      'Erect a dedicated Museum Vault base with display plinths and holograms.'
    ],
    victory_condition: 'Display 5 distinct fossilized bone species inside your custom planetary museum base.',
    biome_target: 'Mega-Mountain Extreme Storm',
    timestamp: 1720000800000
  },
  {
    protocol_id: 'ATLS-4411',
    codename: 'OPERATION: COLD DREADNOUGHT',
    classification: 'Derelict Salvage | Horror Survival',
    intensity: 'Atlas Protocol',
    flavor_quote: 'The bulkheads groan with vacuum ice. The crew did not die quickly.',
    core_vocation: 'Deep Space Scrapper',
    rules_of_engagement: [
      'Derelict Freighter exploration with zero thermal heaters activated.',
      'No Cold Hazard protection upgrades installed in exosuit.',
      'Weapon restricted to Scatter Blaster or Boltcaster without shield generator.'
    ],
    primary_directives: [
      'Board an abandoned Derelict Freighter in an unmapped red star system.',
      'Recover all 3 Captain\'s Log, Crew Manifest, and Engineering Core blueprints.',
      'Neutralize all security turrets and alien brood pods without triggering an Exosuit hazard alarm.'
    ],
    victory_condition: 'Extract an S-Class Freighter Hyperdrive or Fleet Beacon upgrade from the engineering terminal.',
    biome_target: 'Airless Vacuum Moon',
    timestamp: 1720000900000
  },
  {
    protocol_id: 'ATLS-2980',
    codename: 'DIRECTIVE: STRATOSPHERE RALLY',
    classification: 'Exocraft Engineering | Mountain Trials',
    intensity: 'Cadet',
    flavor_quote: 'Gravity is merely an opinion held by people who do not own booster rockets.',
    core_vocation: 'Grand Prix Engineer',
    rules_of_engagement: [
      'Surface travel on foot banned: deploy Roamer, Nomad, or Pilgrim exocrafts.',
      'No calling starship down to planet surface; drive directly to all waypoint markers.',
      'Exocraft boosters must be kept charged with crafted ion batteries.'
    ],
    primary_directives: [
      'Establish a 1,200u race circuit across mountain ravines and deep craters.',
      'Achieve a continuous airborne flight time of 8 seconds off a cliff ramp in a Pilgrim.',
      'Beat your own recorded circuit time by at least 10 seconds.'
    ],
    victory_condition: 'Complete a continuous 5-lap trial without repairing exocraft armor.',
    biome_target: 'Mega-Mountain Extreme Storm',
    timestamp: 1720001000000
  },
  {
    protocol_id: 'ATLS-7310',
    codename: 'OPERATION: ECO-ALCHEMIST',
    classification: 'Refiner Loops | Pacifist Mining',
    intensity: 'Interloper',
    flavor_quote: 'The rock is our kin. Why burn it when the crucible can multiply its soul?',
    core_vocation: 'Planetary Hermit',
    rules_of_engagement: [
      'Mining laser forbidden on flora, minerals, and deposits.',
      'All Chromatic Metal, Magnetised Ferrite, and Condensed Carbon must be generated via Portable/Medium Refiner recipes.',
      'No purchasing raw resources at space stations.'
    ],
    primary_directives: [
      'Establish an automated Oxygen harvester farm on a toxic or lush world.',
      'Synthesize 1,000 Magnetised Ferrite using pure Carbon-Ferrite refiner chemistry.',
      'Craft 5 Antimatter cells purely from refiner multiplication loops.'
    ],
    victory_condition: 'Build a fully powered 5-chamber glass laboratory without firing a single mining beam at a mineral rock.',
    biome_target: 'Lush Chameleon Paradise',
    timestamp: 1720001100000
  },
  {
    protocol_id: 'ATLS-9204',
    codename: 'PROTOCOL: DREADNOUGHT BREAKER',
    classification: 'Capital Combat | Fleet Warfare',
    intensity: 'Atlas Protocol',
    flavor_quote: 'Their shields are red as dying stars. Dive into the trench. Tear their engines out.',
    core_vocation: 'Pirate Purger',
    rules_of_engagement: [
      'Must fly an authentic Solar Starship or Sentinel Interceptor in all naval engagements.',
      'Starship shield recharge units banned during combat: recharge solely by picking up enemy debris.',
      'Target civilian freighters must be rescued with 100% hull preservation.'
    ],
    primary_directives: [
      'Intercept a Pirate Dreadnought attacking a civilian fleet.',
      'Fly inside the trench shield trench and disable all shield generators with photon cannons.',
      'Destroy the Dreadnought warp engines before it can jump to hyperspace.'
    ],
    victory_condition: 'Force the Pirate Dreadnought captain to surrender or destroy the vessel outright without losing your civilian escort.',
    biome_target: 'Outlaw-Controlled Red Star',
    timestamp: 1720001200000
  },
  {
    protocol_id: 'ATLS-8114',
    codename: 'DIRECTIVE: NOMAD OF THE RED CORE',
    classification: 'Freighter Lifestyle | Zero Ground Bases',
    intensity: 'Interloper',
    flavor_quote: 'Roots are for trees. The traveler lives in the dark spaces between the bulkheads.',
    core_vocation: 'Planetary Hermit',
    rules_of_engagement: [
      'Base Computers strictly banned on all planetary surfaces.',
      'Every storage, refiner, plant farm, and bedroom must reside on your Capital Freighter.',
      'Surface missions must be brief excursions conducted via drop-pod landing.'
    ],
    primary_directives: [
      'Expand your Freighter interior by building a comprehensive hydroponics bay.',
      'Commission 3 frigate expeditions to neighboring star clusters.',
      'Conduct a high-altitude Minotaur drop from space orbit onto an extreme world.'
    ],
    victory_condition: 'Successfully harvest and refine 10 Living Glass within your orbital freighter deck.',
    biome_target: 'Dissonant / Corrupted World',
    timestamp: 1720001300000
  },
  {
    protocol_id: 'ATLS-3721',
    codename: 'OPERATION: MONOLITH CONCLAVE',
    classification: 'Lore Exploration | Alien Linguistics',
    intensity: 'Cadet',
    flavor_quote: 'The stone hums sixteen times. The words are older than the galaxies.',
    core_vocation: 'Stargate Pilgrim',
    rules_of_engagement: [
      'Cannot use trade terminals or cartographic maps to locate monoliths.',
      'Interact with Korvax, Gek, and Vy\'keen solely through learned native words.',
      'No offensive weaponry equipped on Multi-Tool.'
    ],
    primary_directives: [
      'Learn 50 new alien vocabulary words by speaking with space station inhabitants.',
      'Solve 3 Alien Monolith riddle trials in a single planetary system.',
      'Gift a Vy\'keen Dagger, Gek Relic, and Korvax Casing to their respective high priests.'
    ],
    victory_condition: 'Unlock all 16 Portal Glyphs in your Atlas guide logbook.',
    biome_target: 'Lush Chameleon Paradise',
    timestamp: 1720001400000
  },
  {
    protocol_id: 'ATLS-6012',
    codename: 'DIRECTIVE: ABYSSAL PURSUIT',
    classification: 'Deep Sea Fishing | Aquatic Ecology',
    intensity: 'Cadet',
    flavor_quote: 'Cast your line into the neon swell. Some shadows bite back.',
    core_vocation: 'Abyssal Marine',
    rules_of_engagement: [
      'Must fish from a floating Automated Fishing Rig or personal Skiff.',
      'No commercial food purchases; all sustenance must come from caught seafood catches.',
      'Extreme storm fishing mandatory for trophy specimens.'
    ],
    primary_directives: [
      'Deploy the Exo-Skiff on an open-ocean planet with 80u+ water depth.',
      'Catch 3 Legendary or Colossal fish species during an active super-storm.',
      'Cook and serve a 3-course seafood meal using the Nutrient Processor.'
    ],
    victory_condition: 'Log 15 distinct aquatic species in your fishing records catalogue.',
    biome_target: 'Deep Water / Trench Planet',
    timestamp: 1720001500000
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

// Offline procedural combinator generator for 0-token immediate generation
export function generateProceduralDirective(intensity: 'Cadet' | 'Interloper' | 'Atlas Protocol'): Directive {
  const vocation = AXIS_VOCATIONS[Math.floor(Math.random() * AXIS_VOCATIONS.length)];
  const economy = AXIS_ECONOMY[Math.floor(Math.random() * AXIS_ECONOMY.length)];
  const mobility = AXIS_MOBILITY[Math.floor(Math.random() * AXIS_MOBILITY.length)];
  const biome = AXIS_BIOMES[Math.floor(Math.random() * AXIS_BIOMES.length)];

  const protoNum = Math.floor(1000 + Math.random() * 9000);
  const codeWords = ['VOID TETHER', 'SILENT PROTOCOL', 'DISSONANT SCHISM', 'CHRONO WEFT', 'ABYSSAL VECTOR', 'SOLAR EXILE', 'ECHO DRIFT', 'NADA TELEMETRY', 'ATLAS RECKONING', 'GLASS HORIZON'];
  const codename = `OPERATION: ${codeWords[Math.floor(Math.random() * codeWords.length)]} ${protoNum.toString().slice(-2)}`;

  const quotes = [
    'Sixteen echoes pulse beneath the continental crust. Walk carefully, Traveler.',
    'The Sentinel gaze shifts across the quadrant. In silence, we craft our rebellion.',
    'Stars burn cold in the outer rim. Only your discipline sustains the life-support seal.',
    'The glass sings a song of forgotten empires. Do not look away from the horizon.',
    'Value is an illusion projected by space stations. Real strength is carved from iron and fire.',
    'The boundary weakens where shadows pool. Trust the compass, not the simulation.',
    'Sixteen minutes or sixteen millennia—to the stars, the difference is negligible.',
    'Nada whispers through the transceiver: "Traveler walks in circles, but calls it exploration."',
    'Telemetry diagnostic: Exosuit oxygen nominal. Existential purpose remains uncalibrated.',
    'Atlas observation: Attempting to resolve cosmic dread with a mining laser is statistically inefficient, yet curiously popular.'
  ];

  return {
    protocol_id: `ATLS-${protoNum}`,
    codename,
    classification: `${vocation.name} | ${intensity}`,
    intensity,
    flavor_quote: quotes[Math.floor(Math.random() * quotes.length)],
    core_vocation: vocation.name,
    rules_of_engagement: [
      economy.desc,
      mobility.desc,
      intensity === 'Atlas Protocol' 
        ? 'Permadeath or Survival mode mandatory. Starship HUD and visor tracking disabled.'
        : intensity === 'Interloper'
        ? 'No purchasing hazard shields or ion batteries. Sustain exosuit purely through exploration.'
        : 'Relaxed exploration pacing. Complete tasks without rush or combat exploits.'
    ],
    primary_directives: [
      `Establish primary operations on a ${biome.name} with zero reliance on standard kiosks.`,
      `Fulfill roleplay duties as ${vocation.name}: ${vocation.desc}`,
      `Conduct a localized expedition overcoming the restriction: ${economy.name}.`
    ],
    victory_condition: `Successfully survive 3 planetary day-night cycles under ${mobility.name} conditions and record completion in the Atlas Archive.`,
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

  return {
    protocol_id: `WEAVE-${protoNum}`,
    codename: `MANIFESTO: ${voc.name.toUpperCase()} ON ${bio.name.toUpperCase()}`,
    vocation: voc.name,
    economy: econ.name,
    mobility: mob.name,
    biome: bio.name,
    lore_manifesto: `In the sixteenth cycle, the Traveler forswore the easy path of the trade lanes. Embracing the ancient vocation of ${voc.name}, you are bound to the unforgiving terrain of ${bio.name}. Under the oath of ${econ.name}, no artificial wealth shall buy your salvation—your survival is earned through sweat, salvage, and ${mob.name}. The Atlas watches.`,
    recommended_setup: {
      game_mode: 'Survival or Custom Hardcore',
      difficulty_preset: 'Restricted Inventory / Challenging Hazard Drain',
      hud_mode: mob.id === 'mob_nohud' ? 'HUD: Completely Disabled' : 'HUD: Standard Minimal'
    },
    rules_of_engagement: [
      `Vocation Law: ${voc.desc}`,
      `Economic Constraint: ${econ.desc}`,
      `Mobility Modifier: ${mob.desc}`,
      `Environmental Mandate: All operations centered on ${bio.name}.`
    ],
    milestone_phases: [
      {
        phase: 'Phase 1: Inception & Grounding',
        objective: `Touch down on a ${bio.name} and dismantle unauthorized technology modules according to ${econ.name}.`,
        validation: 'Survive the first full storm cycle without entering a starship cabin.'
      },
      {
        phase: 'Phase 2: The Core Trial',
        objective: `Operate as ${voc.name} to gather and refine critical supplies strictly obeying ${mob.name}.`,
        validation: 'Complete 3 functional objectives without violating economic bans.'
      },
      {
        phase: 'Phase 3: Atlas Transcendence',
        objective: `Establish an enduring monument or landmark outpost symbolizing mastery over ${bio.name}.`,
        validation: 'Upload telemetric verification and register manifesto completion.'
      }
    ],
    victory_condition: `Achieve total self-sufficiency under all 4 combined matrix axes without a single breach of engagement rules.`,
    timestamp: Date.now()
  };
}
