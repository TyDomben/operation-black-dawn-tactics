// Operation Black Dawn - Map Definitions

const MAP_DATA = {
    // ============================================
    // URBAN MAPS
    // ============================================
    warehouse_district: {
        id: 'warehouse_district',
        name: 'Warehouse District',
        environment: 'urban',
        width: 25,
        height: 20,
        floors: 2,
        spawnZones: { player: { x: 0, y: 10, w: 3, h: 8 }, enemy: { x: 20, y: 5, w: 5, h: 10 } },
        features: ['crates', 'shelving', 'loading_dock', 'office'],
        destructibles: ['crates', 'windows', 'thin_walls'],
        coverDensity: 'high',
        lightLevel: 'dim'
    },
    city_center: {
        id: 'city_center',
        name: 'City Center',
        environment: 'urban',
        width: 30,
        height: 25,
        floors: 3,
        spawnZones: { player: { x: 0, y: 12, w: 3, h: 8 }, enemy: { x: 15, y: 10, w: 10, h: 10 } },
        features: ['cars', 'benches', 'kiosks', 'buildings', 'fountain'],
        destructibles: ['cars', 'benches', 'windows', 'doors'],
        hazards: ['explosive_cars'],
        coverDensity: 'high',
        lightLevel: 'bright'
    },
    office_building: {
        id: 'office_building',
        name: 'Office Building',
        environment: 'urban',
        width: 20,
        height: 25,
        floors: 4,
        spawnZones: { player: { x: 8, y: 22, w: 4, h: 3 }, enemy: { x: 5, y: 0, w: 10, h: 5 } },
        features: ['desks', 'cubicles', 'elevators', 'stairs', 'server_room'],
        destructibles: ['desks', 'glass_walls', 'doors'],
        coverDensity: 'medium',
        lightLevel: 'normal'
    },
    highway: {
        id: 'highway',
        name: 'Highway',
        environment: 'urban',
        width: 35,
        height: 15,
        floors: 2,
        spawnZones: { player: { x: 0, y: 5, w: 3, h: 5 }, enemy: { x: 30, y: 5, w: 5, h: 5 } },
        features: ['cars', 'trucks', 'barriers', 'overpass'],
        destructibles: ['cars', 'trucks', 'barriers'],
        hazards: ['explosive_cars', 'fuel_tanks'],
        coverDensity: 'medium',
        lightLevel: 'bright'
    },

    // ============================================
    // INDUSTRIAL MAPS
    // ============================================
    industrial_yard: {
        id: 'industrial_yard',
        name: 'Industrial Yard',
        environment: 'industrial',
        width: 28,
        height: 22,
        floors: 2,
        spawnZones: { player: { x: 0, y: 8, w: 3, h: 6 }, enemy: { x: 22, y: 8, w: 6, h: 6 } },
        features: ['containers', 'cranes', 'warehouses', 'trucks'],
        destructibles: ['containers', 'fences', 'crates'],
        hazards: ['fuel_tanks'],
        coverDensity: 'high',
        lightLevel: 'normal'
    },
    robot_factory: {
        id: 'robot_factory',
        name: 'Robot Factory',
        environment: 'industrial',
        width: 30,
        height: 25,
        floors: 2,
        spawnZones: { player: { x: 0, y: 10, w: 3, h: 5 }, enemy: { x: 25, y: 10, w: 5, h: 5 } },
        features: ['assembly_lines', 'control_rooms', 'catwalks', 'machinery'],
        destructibles: ['machinery', 'windows', 'pipes'],
        hazards: ['electricity', 'presses'],
        coverDensity: 'medium',
        lightLevel: 'dim'
    },
    server_farm: {
        id: 'server_farm',
        name: 'Server Farm',
        environment: 'industrial',
        width: 25,
        height: 20,
        floors: 1,
        spawnZones: { player: { x: 0, y: 8, w: 3, h: 4 }, enemy: { x: 20, y: 8, w: 5, h: 4 } },
        features: ['server_racks', 'cooling_units', 'raised_floor', 'control_center'],
        destructibles: ['server_racks', 'glass'],
        coverDensity: 'high',
        lightLevel: 'dim'
    },

    // ============================================
    // MILITARY MAPS
    // ============================================
    military_base: {
        id: 'military_base',
        name: 'Military Base',
        environment: 'military',
        width: 30,
        height: 25,
        floors: 2,
        spawnZones: { player: { x: 0, y: 10, w: 3, h: 5 }, enemy: { x: 25, y: 10, w: 5, h: 5 } },
        features: ['barracks', 'motor_pool', 'watch_towers', 'bunkers', 'fences'],
        destructibles: ['fences', 'sandbags', 'vehicles'],
        hazards: ['mines'],
        coverDensity: 'high',
        lightLevel: 'normal'
    },
    enemy_hq: {
        id: 'enemy_hq',
        name: 'Enemy Headquarters',
        environment: 'military',
        width: 35,
        height: 30,
        floors: 3,
        spawnZones: { player: { x: 15, y: 27, w: 5, h: 3 }, enemy: { x: 10, y: 0, w: 15, h: 10 } },
        features: ['command_center', 'armory', 'comms_room', 'cells', 'motor_pool'],
        destructibles: ['doors', 'windows', 'furniture'],
        coverDensity: 'medium',
        lightLevel: 'normal'
    },
    underground_bunker: {
        id: 'underground_bunker',
        name: 'Underground Bunker',
        environment: 'military',
        width: 25,
        height: 20,
        floors: 1,
        spawnZones: { player: { x: 10, y: 17, w: 5, h: 3 }, enemy: { x: 0, y: 0, w: 25, h: 5 } },
        features: ['blast_doors', 'generators', 'supplies', 'command_post'],
        destructibles: ['crates', 'equipment'],
        coverDensity: 'high',
        lightLevel: 'dim'
    },

    // ============================================
    // ALIEN MAPS
    // ============================================
    crash_site: {
        id: 'crash_site',
        name: 'Crash Site',
        environment: 'rural',
        width: 25,
        height: 25,
        floors: 1,
        spawnZones: { player: { x: 0, y: 12, w: 3, h: 5 }, enemy: { x: 12, y: 12, w: 5, h: 5 } },
        features: ['ufo_wreckage', 'debris', 'fires', 'trees'],
        destructibles: ['debris', 'trees'],
        hazards: ['fire', 'radiation'],
        coverDensity: 'medium',
        lightLevel: 'normal'
    },
    alien_base: {
        id: 'alien_base',
        name: 'Alien Base',
        environment: 'alien',
        width: 30,
        height: 30,
        floors: 2,
        spawnZones: { player: { x: 13, y: 27, w: 4, h: 3 }, enemy: { x: 10, y: 5, w: 10, h: 10 } },
        features: ['organic_walls', 'pods', 'consoles', 'elevators', 'power_nodes'],
        destructibles: ['pods', 'consoles'],
        hazards: ['acid_pools'],
        coverDensity: 'medium',
        lightLevel: 'eerie'
    },
    alien_ship_interior: {
        id: 'alien_ship_interior',
        name: 'Alien Ship Interior',
        environment: 'alien',
        width: 20,
        height: 30,
        floors: 2,
        spawnZones: { player: { x: 8, y: 27, w: 4, h: 3 }, enemy: { x: 5, y: 5, w: 10, h: 10 } },
        features: ['corridors', 'bridge', 'engine_room', 'holding_cells'],
        destructibles: ['consoles', 'doors'],
        coverDensity: 'low',
        lightLevel: 'dim'
    },
    alien_mothership: {
        id: 'alien_mothership',
        name: 'Alien Mothership',
        environment: 'alien',
        width: 35,
        height: 35,
        floors: 3,
        spawnZones: { player: { x: 15, y: 32, w: 5, h: 3 }, enemy: { x: 10, y: 5, w: 15, h: 15 } },
        features: ['command_deck', 'engine_core', 'hangars', 'labs'],
        destructibles: ['consoles', 'pods'],
        coverDensity: 'medium',
        lightLevel: 'eerie'
    },
    temple_ship: {
        id: 'temple_ship',
        name: 'Temple Ship',
        environment: 'alien',
        width: 40,
        height: 40,
        floors: 3,
        spawnZones: { player: { x: 18, y: 37, w: 4, h: 3 }, enemy: { x: 15, y: 10, w: 10, h: 10 } },
        features: ['psi_chamber', 'throne_room', 'glyph_chambers', 'power_core'],
        destructibles: ['consoles'],
        hazards: ['psi_fields'],
        coverDensity: 'medium',
        lightLevel: 'eerie'
    },
    psi_network: {
        id: 'psi_network',
        name: 'Psionic Network',
        environment: 'alien',
        width: 30,
        height: 25,
        floors: 1,
        spawnZones: { player: { x: 13, y: 22, w: 4, h: 3 }, enemy: { x: 10, y: 5, w: 10, h: 8 } },
        features: ['psi_nodes', 'energy_conduits', 'gateway'],
        destructibles: ['psi_nodes'],
        hazards: ['psi_fields'],
        coverDensity: 'low',
        lightLevel: 'eerie'
    },

    // ============================================
    // RURAL MAPS
    // ============================================
    forest_camp: {
        id: 'forest_camp',
        name: 'Forest Camp',
        environment: 'rural',
        width: 30,
        height: 25,
        floors: 1,
        spawnZones: { player: { x: 0, y: 12, w: 3, h: 5 }, enemy: { x: 20, y: 10, w: 10, h: 8 } },
        features: ['trees', 'tents', 'vehicles', 'campfires', 'trenches'],
        destructibles: ['trees', 'tents'],
        hazards: ['fires'],
        coverDensity: 'high',
        lightLevel: 'normal'
    },
    village: {
        id: 'village',
        name: 'Village',
        environment: 'rural',
        width: 30,
        height: 25,
        floors: 2,
        spawnZones: { player: { x: 0, y: 12, w: 3, h: 5 }, enemy: { x: 15, y: 8, w: 10, h: 10 } },
        features: ['houses', 'church', 'market', 'well', 'fences'],
        destructibles: ['fences', 'windows', 'doors'],
        coverDensity: 'medium',
        lightLevel: 'normal'
    },

    // ============================================
    // SPECIAL MAPS
    // ============================================
    communications_facility: {
        id: 'communications_facility',
        name: 'Communications Facility',
        environment: 'industrial',
        width: 25,
        height: 20,
        floors: 2,
        spawnZones: { player: { x: 0, y: 8, w: 3, h: 4 }, enemy: { x: 18, y: 8, w: 7, h: 4 } },
        features: ['satellite_dishes', 'control_room', 'towers', 'fences'],
        destructibles: ['dishes', 'fences', 'equipment'],
        coverDensity: 'medium',
        lightLevel: 'normal'
    },
    research_facility: {
        id: 'research_facility',
        name: 'Research Facility',
        environment: 'industrial',
        width: 25,
        height: 25,
        floors: 2,
        spawnZones: { player: { x: 10, y: 22, w: 5, h: 3 }, enemy: { x: 8, y: 5, w: 9, h: 8 } },
        features: ['labs', 'containment', 'offices', 'morgue', 'storage'],
        destructibles: ['equipment', 'glass', 'doors'],
        hazards: ['containment_breach'],
        coverDensity: 'medium',
        lightLevel: 'bright'
    },
    player_base: {
        id: 'player_base',
        name: 'HQ',
        environment: 'military',
        width: 30,
        height: 30,
        floors: 2,
        spawnZones: { player: { x: 13, y: 13, w: 4, h: 4 }, enemy: { x: 0, y: 0, w: 30, h: 5 } },
        features: ['command_center', 'barracks', 'armory', 'research', 'hangar'],
        destructibles: ['equipment', 'doors'],
        coverDensity: 'high',
        lightLevel: 'normal'
    },
    city_ruins: {
        id: 'city_ruins',
        name: 'City Ruins',
        environment: 'urban',
        width: 35,
        height: 30,
        floors: 2,
        spawnZones: { player: { x: 0, y: 13, w: 3, h: 4 }, enemy: { x: 20, y: 10, w: 15, h: 10 } },
        features: ['rubble', 'destroyed_buildings', 'craters', 'wrecked_vehicles'],
        destructibles: ['rubble', 'walls'],
        hazards: ['fires', 'collapse'],
        coverDensity: 'high',
        lightLevel: 'dim'
    }
};

// Export
window.MAP_DATA = MAP_DATA;
