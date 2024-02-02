const net = require('net');
const readline = require('readline');
const { Buffer } = require('node:buffer');

const client = new net.Socket()
client.connect(5023, '127.0.0.1', () => {
    setTimeout(() => {
        client.write(Buffer.from('77878262218010903000fc00042fafc05dedbbd00080002d40b00000000000109000000632f0232bac50d0a', 'hex'))
        }, 5000);
    setTimeout(() => {
        client.write(Buffer.from('7878262218010903000fc00042fafc05dedbbd00080002d40b00000000000109000000632f0232bac50d0a', 'hex'))
        }, 10000);
    setTimeout(() => {
        client.write(Buffer.from('7878262218010903000fc00042fafc05dedbbd00080002d40b00000000000109000000632f0232bac50d0a', 'hex'))
        }, 15000);
    setTimeout(() => {
        client.end()
    }, 20000);
})
