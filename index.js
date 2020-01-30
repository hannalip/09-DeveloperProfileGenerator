const fs = require('fs');
const axios = require("axios");
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML.js");
const HTML5ToPDF = require("html5-to-pdf");
const path = require("path");

// function writeToFile(fileName, data) {
 
// }

// function init() {

// init();

const run = async () => {
    const questions = await inquirer.prompt([
        {
            type: "input",
            message: "What is your Github username?",
            name: "username"
          },
          {
            type: 'list',
            name: 'color',
            message: 'What is your favorite color?',
            choices: [
              'red',
              'blue',
              'pink',
              'green'
            ]
      }
    ]);

    const username = questions.username;
    const color = questions.color;
    console.log(username);

    const queryUrl = `https://api.github.com/users/${username}`;

    const result = await axios.get(queryUrl);
    console.log(result);

    const makeGeneratedHtml = generateHTML(result, color);

    const html5ToPDF = new HTML5ToPDF({
      inputBody: makeGeneratedHtml,
      outputPath: path.join(__dirname, "resume.pdf"),
    });

    await html5ToPDF.start()
    await html5ToPDF.build()
    await html5ToPDF.close()
  
  
  };

run().then(function(){
    console.log('complete');
});