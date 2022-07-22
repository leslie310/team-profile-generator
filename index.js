 const generateHtml = require('./util/generateHtml');
const manager= require('./lib/Manager');
const engineer = require('./lib/Engineer');
const intern = require('./lib/Intern');

const fs = require('fs');
const inquirer = require('inquirer');
const teamArray = [];

const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'What is your team managers name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please enter employee ID'
        },
        {
            type: 'input',
            name:'email',
            message:'Please enter email address'
        },
        {
            type: 'input',
            name:'officeNumber',
            message:'what is the office number? '
        },
    
        {
            type:'checkbox',
            name: 'role',
            message:'Please select your employees role to finish building team',
            choices: ['Engineer','Intern']

        },
        {
            type:'input',
            name:'name',
            message:'Please enter name'
        },
        {
            type:'input',
            name:'id',
            message:'What is employee ID?'
        },
        {
            type:'input',
            name:'email',
            message:'Please enter email'
    
        },
        {
            type:'input',
            name:'school',
            message:'Enter the Intern school',
            
        },
        {
            type:'input',
            name:'github',
            message:'Please enter employees github',
           
        },
        {
            type:'confirm',
            name:'AddEmployee',
            message:'would you like to keep adding team members?',
            default: false
        }
    
    ];

const addEmployee = ()=>{
    console.log('Add a new emplyee');


    
    return inquirer.prompt (questions)  
    .then(employeeData => {

        let { name, id, email, role, github, school } = employeeData; 
        let team;

        if (role === 'Manager') {
            team=new manager(name,id,email,officeNumber);
        }

        if ( role === "Engineer") {
        team = new engineer (name, id, email, github);
        }

        if ( role === "Intern") {
        team = new intern (name, id, email, school);

        }
         
        teamArray.push(team); 
        if (employeeData.confirmAddEmployee) {
            return addEmployee(teamArray);
        }else {
            return teamArray;
        }
    })
};
    

const writeFile= data => {
    fs.writeFile('./dist/index.html',data, (err)=> {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('your team has been created!')
        }
    })
};
        addEmployee().then(teamArray => {
            return generateHtml(teamArray);
    }).then(html => {
            return writeFile(html);
    })
        .catch(err => {
         console.log(err);
});
    
