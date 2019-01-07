var tesseract = require('node-tesseract');
const fs = require('fs-extra');
const path = require('path')
let results = []
module.exports = {
    async runOCR(videoId) {
        let promises = []
        try {
            fs.readdir(`./frames/${videoId}/`, (err, files) => {
                files.forEach(file => {
                    if (file.substring(file.indexOf('.') + 1) === 'jpg') {
                        promises.push(this.getText(videoId, file))
                    }
                });
            })
            await Promise.all(promises)
            return results
        } catch {
            return false
        }
    },

    getText(videoId, file) {
        let pathMain = path.join(__dirname, '../')
        tesseract.process(pathMain + `frames/${videoId}/${file}`, function(err, text) {
            if (err) {
                console.error(err);
                return false
            } else {
                text = text.trim()
                if (text !== '' || text !== null) {
                    results.push({ FrameNumber: file, result: text })
                }
                return true
            }
        });
    }
}