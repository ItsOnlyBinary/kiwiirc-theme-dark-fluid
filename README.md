# KiwiIRC - Theme-Dark-Fluid

This plugin adds a theme called DarkFluid

### Building
~~~shell
yarn && yarn build
~~~

Copy `dist/theme-dark-fluid.js` && `dist/theme-dark-fluid` to your Kiwi plugins folder

### Loading the plugin into Kiwi IRC
Add the plugin javascript file to your kiwiirc `config.json` and configure the settings:

```json
{
    "plugins": [
        {
            "name": "theme-dark-fluid",
            "url": "static/plugins/theme-dark-fluid.js"
        }
    ],
}
```

To use this theme as the default set `"theme": "DarkFluid"` in `config.json`


### Extra configuration

The defaults are:
~~~json
"theme_dark_fluid": {
    "ENABLE_MOUSE_MOVE": false,
    "ENABLE_MESSAGE_SPLATS": true,
    "CONSTANT_SPLATS_FRAMES": -240,
    "CONSTANT_SPLATS_MAX": 1,
    "SIM_RESOLUTION": 128,
    "DYE_RESOLUTION": 1024,
    "DENSITY_DISSIPATION": 2,
    "VELOCITY_DISSIPATION": 0.1,
    "PRESSURE": 0.28,
    "PRESSURE_ITERATIONS": 8,
    "CURL": 30,
    "SPLAT_RADIUS": 0.25,
    "SPLAT_FORCE": 6000,
    "SHADING": true,
    "COLORFUL": true,
    "COLOR_UPDATE_SPEED": 10,
    "PAUSED": false,
    "BLOOM": false,
    "BLOOM_ITERATIONS": 8,
    "BLOOM_RESOLUTION": 256,
    "BLOOM_INTENSITY": 0.8,
    "BLOOM_THRESHOLD": 0.6,
    "BLOOM_SOFT_KNEE": 0.7,
    "SUNRAYS": false,
    "SUNRAYS_RESOLUTION": 196,
    "SUNRAYS_WEIGHT": 1.0,
}
~~~

## Powered by

[WebGL-Fluid-Simulation by PavelDoGreat](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation)

## License

[ Licensed under the MIT License ](LICENSE).
