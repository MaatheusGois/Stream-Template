const express = require('express'),
    app = express(),
    fs = require('fs'),
    getStat = require('util').promisify(fs.stat);
app.use(express.static('public'));

// 10 * 1024 * 1024 // 10MB
// usamos um buffer minúsculo! O padrão é 64k
const highWaterMark =  2;

app.get('/audio', async (req, res) => {
    
    const filePath = './audio.ogg';
    const stat = await getStat(filePath);

    // file info
    console.log(stat);


    // set head info about the file
    res.writeHead(200, {
        'Content-Type': 'audio/ogg',
        'Content-Length': stat.size
    });

    const stream = fs.createReadStream(filePath);    
    //min the trafic
    // const stream = fs.createReadStream(filePath, { highWaterMark });

    // end
    stream.on('end', () => console.log('end'));

    // stream
    stream.pipe(res);
})

app.get('/video', async (req, res) => {
    
    const filePath = './video.mp4';
    const stat = await getStat(filePath);

    // file info
    console.log(stat);


    // set head info about the file
    res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Length': stat.size
    });
    
    
    //min the trafic
    // const stream = fs.createReadStream(filePath, { highWaterMark });
    const stream = fs.createReadStream(filePath);

    // end
    stream.on('end', () => console.log('end'));

    // stream
    stream.pipe(res);
})
app.listen(3000, () => console.log('App na porta 3000'));