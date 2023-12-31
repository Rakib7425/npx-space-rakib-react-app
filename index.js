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

	console.log(chalk.green("Fetching files...!"));

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
			console.log(chalk.cyan(` 1-> cd ${answers.projectName} \n`));
		}

		console.log(chalk.yellow(" 2.1. Install dependencies with yarn:\n   yarn\n"));
		console.log(chalk.bold("    OR\n"));
		console.log(chalk.yellow(" 2.2. Install dependencies with npm:\n   npm install\n"));
		console.log(chalk.blue(" 3.1. Start the development server with yarn:\n   yarn dev\n"));
		console.log(chalk.bold("    OR\n"));
		console.log(
			chalk.magenta(" 3.2. Start the development server with npm:\n   npm run dev\n")
		);
		console.log(chalk.green(" !! Enjoy !! \n"));

		// console.log(chalk.yellow(" 2.1-> yarn \n"));
		// console.log(chalk.bold(" -> OR \n"));
		// console.log(chalk.yellow(" 2.2-> npm install\n"));
		// console.log(chalk.blue(" 3.1-> yarn dev \n"));
		// console.log(chalk.bold(" ->  OR \n"));
		// console.log(chalk.magenta(" 3.2-> npm run dev \n"));
		// console.log(chalk.green(" !! Enjoy !! \n"));
	};

	// Execute the Git clone command
	exec(gitCloneCommand, (error, stdout, stderr) => {
		if (error) {
			console.error(chalk.red(`Error cloning repository: ${error?.message}`));
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
