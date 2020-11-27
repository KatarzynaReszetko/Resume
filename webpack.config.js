module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/dist',
        filename: './bundle.js'
    },
    externals: {
      canvg: "canvg",
      html2canvas: "html2canvas",
      dompurify: "dompurify"
    }
}