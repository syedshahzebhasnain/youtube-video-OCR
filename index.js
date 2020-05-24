const fastify = require('fastify')()
const ytService = require('./services/youtube')
const ocr = require('./services/ocr')

fastify.get('/:id', async (request, reply) => {
  try {
    const videoId = request.params.id || 'Nrz5XXuX1nc'
    const ytScreenFrames = await ytService.downloadAndGenerateScreenShots(videoId)
    if (ytScreenFrames === true) {
      const result = await ocr.runOCR(videoId)
      return { processedInfo: result }
    } else {
      res.json('Cannot process')
    }
  } catch (err) {
    console.error(err)
  }
})

const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
