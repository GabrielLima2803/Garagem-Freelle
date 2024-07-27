import fs from 'fs';
import os from 'os';

// const fs = require('fs');
// const os = require('os');
const networkInterfaces = os.networkInterfaces();

function getIPAddress() {
    for (const interfaceName in networkInterfaces) {
        const interfaces = networkInterfaces[interfaceName];
        for (const iface of interfaces) {
            if (iface.family === 'IPv4' && iface.address !== '127.0.0.1') {
                return iface.address;
            }
        }
    }
    return null;
}

function updateEnvFile(ip) {
    try {
        let envData = [];
        if (fs.existsSync('.env')) {
            envData = fs.readFileSync('.env', 'utf8').toString().split('\n');
        }
        
        let newEnvData = envData.filter(line => !line.startsWith('VITE_MY_IP='));
        newEnvData.push(`VITE_MY_IP=${ip}`);
        
        fs.writeFileSync('.env', newEnvData.join('\n'));
        
        console.log(`IP atualizado no arquivo .env: VITE_MY_IP=${ip}`);
    } catch (error) {
        console.error(`Erro ao atualizar o arquivo .env: ${error.message}`);
    }
}

function main() {
    const ip = getIPAddress();
    if (ip) {
        updateEnvFile(ip);
    }
}

main();

