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

        function extractField(message, start, length) {
            return message.slice(start, start + length);
        }
        let protocolNumber = extractField(message, 6, 2);

        if (protocolNumber == 22){
          console.log('Position Packet');
          let dateTime = extractField(message, 8, 12)
          let gpsFixed = extractField(message, 20, 2)
          let latitude = extractField(message, 22, 8)
          let longitude = extractField(message, 30, 8)
          let speed = extractField(message, 38, 2)
          let accStatus = extractField(message, 60, 2)
          let uploadOrReupload = extractField(message, 64, 2)
          let mileage = extractField(message, 66, 8)

          let year, month, day, hour, minute, second;
          year = parseInt(extractField(dateTime, 0, 2), 16)
          month = parseInt(extractField(dateTime, 2, 2), 16)
          day = parseInt(extractField(dateTime, 4, 2), 16)
          hour = parseInt(extractField(dateTime, 6, 2), 16)
          minute = parseInt(extractField(dateTime, 8, 2), 16)
          second = parseInt(extractField(dateTime, 10, 2), 16)
          let dateGPS = ('Date - ' + day + '/' + month + '/' + year + ' - hora: ' + hour + ':' + minute + ':' + second)
          console.log(dateGPS)
        
          let speedDec = parseInt(speed, 16)
          console.log('speed = ' + speedDec);
        
          if(accStatus != 0) { console.log('acc = ON')} 
          else console.log('acc = OFF');
        
          if(uploadOrReupload != 0) { console.log('Buffer Position')} 
          else console.log('RealTime Position');
          
          let latitudeDec = (parseInt(latitude, 16)/1800000);
          let longitudeDec = (parseInt(longitude, 16)/1800000);
          console.log("https://maps.google.com/maps?q=-" + latitudeDec + ",-" + longitudeDec);
        
          let mileageDec = (parseInt(mileage, 16)/1000);
          console.log('Mileage = ' + mileageDec + 'km');
        }


    })
    
}

const server = net.createServer(handleConnection)
server.listen(5023, '127.0.0.1')
