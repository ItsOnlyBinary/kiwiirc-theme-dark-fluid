/* global kiwi:true */
/* global _:true */

let configBase = 'theme_dark_fluid';
let defaultConfig = {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1024,
    DENSITY_DISSIPATION: 2,
    VELOCITY_DISSIPATION: 0.1,
    PRESSURE: 0.28,
    PRESSURE_ITERATIONS: 8,
    CURL: 30,
    SPLAT_RADIUS: 0.25,
    SPLAT_FORCE: 6000,
    SHADING: true,
    COLORFUL: true,
    COLOR_UPDATE_SPEED: 10,
    PAUSED: false,
    BLOOM: false,
    BLOOM_ITERATIONS: 8,
    BLOOM_RESOLUTION: 256,
    BLOOM_INTENSITY: 0.8,
    BLOOM_THRESHOLD: 0.6,
    BLOOM_SOFT_KNEE: 0.7,
    SUNRAYS: false,
    SUNRAYS_RESOLUTION: 196,
    SUNRAYS_WEIGHT: 1.0,
};

export function setDefaults() {
    let walkConfig = (obj, _target) => {
        _.each(obj, (val, key) => {
            let target = [..._target, key];
            let targetName = target.join('.');
            if (typeof val === 'object' && !_.isArray(val)) {
                walkConfig(val, target);
            } else if (typeof getSetting(targetName) === 'undefined') {
                setSetting(targetName, val);
            }
        });
    };
    walkConfig(defaultConfig, []);
}

export function setting(name) {
    return kiwi.state.setting([configBase, name].join('.'));
}

export function getSetting(name) {
    return kiwi.state.getSetting(['settings', configBase, name].join('.'));
}

export function setSetting(name, value) {
    return kiwi.state.setSetting(['settings', configBase, name].join('.'), value);
}
