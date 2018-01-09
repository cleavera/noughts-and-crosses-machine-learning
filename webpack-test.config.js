const config = require('./webpack.config');
const path = require('path');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');

config.output = {
    path: path.resolve(__dirname, './test'),
    filename: '[name].js',
    libraryTarget: 'commonjs'
};

config.entry = {};

config.externals = {
    alsatian: 'alsatian'
};
config.target = 'node';

config.plugins = config.plugins || [];
config.plugins.push(new CleanWebpackPlugin(['test']));

glob.sync('./**/*.spec.ts').forEach(function(filename) {
    config.entry[filename.replace(/^(?:.*)\/([A-z-]+)\.(?:.*)$/i, '$1')] = path.resolve(__dirname, filename);
});

module.exports = config;