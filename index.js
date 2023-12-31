#!/usr/bin/env node

import { exec } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const questions = [
	{
		type: "input",
		name: "projectName",
		message: "Enter your new project's name: ",
		default: "rakib-react-app",
	},
];

inquirer.prompt(questions).then((answers) => {
	console.log("initializing your project... ");

	const projectPath = process.cwd();

	if (fs.existsSync(projectPath) == join(__dirname, answers.projectName)) {
		console.error(chalk.red(`Error: The directory "${answers.projectName}" already exists.`));

		process.exit(1);
	}

	const gitRepositoryUrl = "https://github.com/Rakib7425/rakib-react-setup";

	console.log("Fetching files...");

	// Git clone command
	const gitCloneCommand = `git clone ${gitRepositoryUrl} ${projectPath}/${answers.projectName}`;

	/**
	 * The function logs a success message with the project name and path, and provides instructions for
	 * further steps.
	 */
	const successFn = () => {
		console.log(
			chalk.green("\nSuccess!") +
				` Project "${answers.projectName}" created at ${projectPath}/${answers.projectName} \n`
		);

		if (answers.projectName !== ".") {
			console.log(chalk.cyan(`-> cd ${answers.projectName} \n`));
		}

		console.log(chalk.yellow(" -> yarn OR npm install\n"));
		console.log(chalk.blue(" -> yarn dev OR npm run dev \n"));
		console.log(chalk.green("!! Enjoy !! \n"));
	};

	// Execute the Git clone command
	exec(gitCloneCommand, (error, stdout, stderr) => {
		if (error) {
			console.error(chalk.red(`Error cloning repository: ${error.message}`));
			return;
		}

		if (stderr) {
			// console.log(chalk.blue(`-> ${stderr}/${answers.projectName}`));
			// If we reach this point, consider it a successful clone
			successFn();
			return;
		}

		if (stdout.trim() === "") {
			console.error(chalk.red("Error: Unexpected output from Clone command."));
			return;
		}

		// successFn();
	});
});
