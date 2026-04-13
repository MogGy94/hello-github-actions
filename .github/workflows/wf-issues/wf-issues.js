/**
 * Este archivo escribe un comentario al crearse un Issue en Github usando fetch y la API REST
 */

const https = require('https');

async function run() {
    try {
        const token = process.env.GITHUB_TOKEN;
        const eventPath = process.env.GITHUB_EVENT_PATH;
        if (!token) throw new Error('GITHUB_TOKEN is not set');
        if (!eventPath) throw new Error('GITHUB_EVENT_PATH is not set');

        const event = require(eventPath);
        const owner = event.repository.owner.login;
        const repo = event.repository.name;
        const issue_number = event.issue.number;

        const data = JSON.stringify({
            body: "👩🏼‍🦰 Moggy Este mensaje se ha creado desde un script de NODE.📄📄 automáticamente usando la API REST de GitHub!"
        });

        const options = {
            hostname: 'api.github.com',
            path: `/repos/${owner}/${repo}/issues/${issue_number}/comments`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'User-Agent': 'node.js',
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => { body += chunk; });
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    console.log('Comentario creado exitosamente');
                } else {
                    console.error('Error al crear comentario:', res.statusCode, body);
                    process.exit(1);
                }
            });
        });
        req.on('error', (e) => {
            console.error('Error en la petición:', e);
            process.exit(1);
        });
        req.write(data);
        req.end();
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

run();