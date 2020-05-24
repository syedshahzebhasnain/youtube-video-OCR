require('youtube-frames')
module.exports = {
  async downloadAndGenerateScreenShots (videoId) {
    try {
      const video = await $ytvideo(`https://www.youtube.com/watch?v=${videoId}`, `${videoId}-SC`)
      const result = video.download(`./frames/${videoId}`).toFrames()
      await result.prom
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
