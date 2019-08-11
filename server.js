const express = require('express')
const fs = require('fs')
const getStat = require('util').promisify(fs.stat)


const app = express()

app.use(express.static('public'))


//ROUTES
// 10 * 1024 * 1024 // 10MB
// usamos um buffer minúsculo! O padrão é 64k
const highWaterMark = 1024

app.get('/audio/:name', async (req, res) => {
    const filePath = `./public/audio/${req.params.name}`
    const stat = await getStat(filePath)
    // file info
    console.log(stat)
    // set head info about the file
    res.writeHead(200, {
        'Content-Type': 'audio/ogg',
        'Content-Length': stat.size
    })
    //min the trafic
    const stream = fs.createReadStream(filePath, {
        highWaterMark
    })
    // end
    stream.on('end', () => console.log('end'))
    // stream
    stream.pipe(res)
})

app.get('/video/:name', async (req, res) => {
    const filePath = `./public/video/${req.params.name}`
    const stat = await getStat(filePath)
    res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Length': stat.size
    })
    const stream = fs.createReadStream(filePath)
    stream.on('end', () => console.log('end'))
    stream.pipe(res)
})

app.listen(3000, () => console.log('Listening na port 3000'))