const inquirer = require('inquirer');
const axios = require('axios');
const util = require("util");
const fs = require('fs');

const writeFileAsync = util.promisify(fs.writeFile);

async function main() {
    const myResponses = await inquirer.prompt([
        {
            type: "input",
            message: "What is you Github Username?",
            name: "gitUser"
        },
        {
            type: "input",
            message: "What is your email?",
            name: "email"
        },
        {
            type: 'input',
            message: "Whats is your Project Title?",
            name: 'title'
        },
        {
            type: 'input',
            message: "Write a description for the project",
            name: 'description'
        },
        //table of contents
        {
            type: 'input',
            message: "What are the installations for this project?",
            name: 'install'
        },
        {
            type: 'input',
            message: "What is the usage of the project?",
            name: 'usage'
        },
       
        {
            type: 'input',
            message:'Who are the contributors?',
            name:'contributors'
        },
        {
            type: 'input',
            message:'Testing for the projects?',
            name:'test'
        },
        {
            type: 'input',
            message:'What Licenses does the project have?',
            name:'license'
        },
        {
            type: 'input',
            message:'Any Questions?',
            name:'questions'
        }
    ]);
    const {gitUser, email, title, description, install, usage, contributors, test, license, questions} = myResponses;

    let gitProfilePic;

    try{
        response2 = await axios.get(`https://api.github.com/users/${gitUser}`);
        gitProfilePic = response2.data.avatar_url;
        // console.log(response2);
    } catch( err ){
        console.log('not valid username', err );
    }

        const markUp = `## ${gitUser}\nemail: ${email}\n![Git-hub Profile Pictures](${gitProfilePic})\n## Project Title: **${title}**\n## Description:\n${description}\n## Installations:\n${install}\n## Usage:\n${usage}\n## Contributors:\n${contributors}\n## License:\n${license}\n## Testing:\n${test}\n## Questions:\n${questions}`
  
    const writeResult = writeFileAsync('README.md', markUp);
}
main();