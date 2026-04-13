/** 
 *  Este Archivo escribe un comentario al realizarce la creación de 
 *  un Issue en Github
*/
github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: ```👩🏼‍🦰 Moggy Este mensaje se ha creado
    desde un script de NODE.📄📄 automáticamente usando GitHub Script desde !!!```
})

