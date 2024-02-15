#!/usr/bin/env node

import { exec } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import { setInterval } from "timers";

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
	console.log(chalk.yellow("initializing your project... "));

	const projectPath = process.cwd();

	if (fs.existsSync(projectPath) == join(__dirname, answers.projectName)) {
		console.error(chalk.red(`Error: The directory "${answers.projectName}" already exists.`));
		return process.exit(1);
	}

	const gitRepositoryUrl = "https://github.com/Rakib7425/rakib-react-setup";

	let time = 1;
	console.log(chalk.green("Fetching files...!"));

	const timer = setInterval(() => {
		console.log(chalk.green(`Fetching files..${time}`));
		time++;
	}, 800);

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

		console.log(
			chalk.yellow(" 2.1. Install dependencies with yarn:(Recommended)\n   \n \t yarn\n")
		);
		console.log(
			chalk.yellow(
				" 2.2. Start the development server with yarn:(Recommended)\n   \n \t yarn dev\n"
			)
		);
		console.log(chalk.bold("    OR\n"));
		console.log(chalk.blue(" 3.1. Install dependencies with npm:\n   \n \t npm install\n"));

		console.log(
			chalk.blue(" 3.2. Start the development server with npm:\n   \n \t npm run dev\n")
		);
		console.log(chalk.green(" !! Enjoy !! \n"));
	};

	// delete .git folder from user's directory
	const deleteFolderRecursive = function (path) {
		if (fs.existsSync(path)) {
			fs.readdirSync(path).forEach(function (file) {
				let curPath = path + "/" + file;
				if (fs.lstatSync(curPath).isDirectory()) {
					// recurse.
					deleteFolderRecursive(curPath);
				} else {
					// delete file
					fs.unlinkSync(curPath);
				}
			});

			fs.rmdirSync(path);
		}
	};

	// Execute the Git clone command
	exec(gitCloneCommand, (error, stdout, stderr) => {
		if (error) {
			console.error(chalk.red(`Error cloning repository: ${error?.message}`));

			// Stop Timer
			clearInterval(timer);
			return process.exit(1);
		}

		if (stderr) {
			const gitDirectoryPath = `${projectPath}/${answers.projectName}/.git`;
			// delete .git folder from user's directory
			deleteFolderRecursive(gitDirectoryPath);

			// Stop Timer
			clearInterval(timer);

			// If we reach this point, consider it a successful
			// Log success message
			successFn();
			return;
		}

		if (stdout.trim() === "") {
			console.error(chalk.red("Error: Unexpected output from Clone command."));
			clearInterval(timer);
			return;
		}

	});
});
