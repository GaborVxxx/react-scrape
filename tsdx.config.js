//tsdx.config.js
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
    rollup(config, options) {
        config.plugins.push(
            postcss({
                plugins: [
                    autoprefixer(),
                    cssnano({
                        preset: 'default',
                    }),
                ],
                // only write out CSS for the first bundle (avoids redundant extra files)
                extract: !!options.writeMeta,
                inject: false,
            })
        );
        return config;
    },
};