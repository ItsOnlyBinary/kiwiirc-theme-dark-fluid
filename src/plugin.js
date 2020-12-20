/* global kiwi:true */
import * as config from './config';
import * as glfluid from './glfluid';

// eslint-disable-next-line no-var
var themeDarkFluidPath = getPluginPath();

kiwi.plugin('theme-dark-fluid', (kiwi) => {
    config.setDefaults();

    const ourConfig = { ...kiwi.state.setting('theme_dark_fluid') };
    kiwi.state.$watch('user_settings.theme_dark_fluid', onConfigChange);

    const themes = kiwi.state.getSetting('settings.themes');
    themes.push({ name: 'DarkFluid', url: themeDarkFluidPath + 'theme-dark-fluid/theme/' });

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.right = 0;
    canvas.style.bottom = 0;
    canvas.style.left = 0;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-100';
    canvas.style.backgroundColor = '#000';

    const Misc = kiwi.require('helpers/Misc');
    const queryTheme = Misc.queryStringVal('theme');

    kiwi.on('theme.change', onThemeChange);

    if (queryTheme === 'DarkFluid' || kiwi.state.setting('theme') === 'DarkFluid') {
        kiwi.themes.setTheme('DarkFluid');
    }

    function onMessage(event) {
        if (!event.buffer || kiwi.state.getActiveBuffer() !== event.buffer) {
            return;
        }
        const message = event.message;
        if (['traffic', 'topic'].includes(message.type)) {
            return;
        }
        const count = Math.min(message.message.split(' ').length, 10);
        if (count) {
            glfluid.multipleSplats(count);
        }
    }

    function onThemeChange(_theme) {
        const theme = _theme || kiwi.state.setting('theme');
        if (theme === 'DarkFluid') {
            document.body.prepend(canvas);
            glfluid.start(canvas, ourConfig);
            kiwi.on('message.new', onMessage);
        } else if (glfluid.isActive()) {
            kiwi.off('message.new', onMessage);
            glfluid.destroy();
            document.body.removeChild(canvas);
        }
    }

    function onConfigChange() {
        const keys = Object.keys(ourConfig);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const val = ourConfig[key];
            const newVal = kiwi.state.setting('theme_dark_fluid.' + key);
            if (val === newVal) {
                continue;
            }
            ourConfig[key] = newVal;

            if (!glfluid.isActive()) {
                return;
            }

            switch (key) {
            case 'DYE_RESOLUTION':
            case 'SIM_RESOLUTION':
                glfluid.initFrameBuffers();
                break;
            case 'SHADING':
            case 'BLOOM':
            case 'SUNRAYS':
                glfluid.updateKeywords();
                break;
            default:
            }
        }
    }
});

function getPluginPath() {
    const scriptEls = document.getElementsByTagName('script');
    const thisScriptEl = scriptEls[scriptEls.length - 1];
    const scriptPath = thisScriptEl.src;
    return scriptPath.substr(0, scriptPath.lastIndexOf('/') + 1);
}
