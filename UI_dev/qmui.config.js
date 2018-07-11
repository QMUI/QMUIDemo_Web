module.exports = {
    'project': 'Demo',
    'prefix': 'dm',
    'resultCssFileName': 'main.scss',
    'cleanFileType': ['../.sass-cache', '../.sass-cache/**/*'],
    'needsSourceMaps': false,
    'needsImagesMinAndSync': true,

    'paths': {
        'htmlSourcePath': ['../../UI_html/**/*.html'],
        'imagesSourcePath': '../project/images',
        'htmlResultPath': '../../UI_html_result',
        'imagesResultPath': '../../public/style/images',
        'independentImagesDirectory': '/independent',
        'styleResultPath': '../../public/style/css'
    },

    'browserSync': {
        'browserSyncMod': 'server',
        'browserSyncPort': 3030,
        'browserSyncShowLog': false,
        'browserSyncStartPath': '/web',
        'browserSyncHost': '',
        'browserSyncWatchPath': ['../../UI_html_result/*.html', '../../public/**/*'],
        'browserSyncServerRoute': {
            '/public': '../../public',
            '/data': '../../data',
            '/node_modules': '../../node_modules',
            '/web': '../../UI_html_result',
            '/cache.js': '../../cache.js'
        },
        'browserSyncProxy': ''
    },

    'template': {
        'openIncludeFunction': true,
        'includePrefix': '@@'
    }
};
