const net = require('net')
var arrayData = [];
const handleConnection = socket => {
    console.log('conectou')
    socket.on('end', () =>{
        console.log(arrayData);
        console.log('desconectou')
    })
    socket.on('data', data => {
        console.log(data)
        message = data.toString('hex')
        arrayData.push(data.toString('hex'))
        socket.write(data)

    })
    
}

const server = net.createServer(handleConnection)
server.listen(5023, '127.0.0.1')