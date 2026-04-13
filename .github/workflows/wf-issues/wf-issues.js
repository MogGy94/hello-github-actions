const core = require('@actions/core');
const github = require('@actions/github');
/** 
 *  Este Archivo escribe un comentario al realizarce la creación de 
 *  un Issue en Github
*/

async function run() {
    try {
        const token = process.env.GITHUB_TOKEN;
        if (!token) {
            throw new Error('GITHUB_TOKEN is not set');
        }
        const octokit = github.getOctokit(token);
        const { owner, repo } = github.context.repo;
        const issue_number = github.context.payload.issue.number;

        await octokit.rest.issues.createComment({
            owner,
            repo,
            issue_number,
            body: "👩🏼‍🦰 Moggy Este mensaje se ha creado desde un script de NODE.📄📄 automáticamente usando GitHub Script!!!"
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();