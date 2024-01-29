const typescript = require('@rollup/plugin-typescript')
const fs = require('fs')
const path = require('path')


const options = {
    input: "src/index.ts",
    output: [
        // commonjs will readed if the package consumer using commonjs format
        // commonjs is the default format of node js
        {
            file: 'dist/index.js',
            format: "cjs"
        },

        // esmodule will readed if the package consumer using commonjs format
        // since it standarized as the browser format, so it usually used for
        // Front End
        {
            file: 'dist/index.es.js',
            format: 'es'
        }
    ],
    plugins: [
        // custom plugin below to make sure, dist folder erased each time we run
        // build command
        {
            name: "Erase Dist",
            buildStart(){
                fs.rmSync(path.resolve('dist'), {recursive: true, force: true})
            }
        },
        typescript({
            module: 'esnext',
            // will produce the declaration file
            declaration: true,
            // declaration file will appear inside dist/types folder
            declarationDir: 'dist/types',
        }),
    ]
};


module.exports = options