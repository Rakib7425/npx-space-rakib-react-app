#!/usr/bin/env node
import chalk from "chalk";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import inquirer from "inquirer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const __dirname = "https://github.com/Rakib7425/rakib-react-setup";
const url = "https://github.com/Rakib7425/rakib-react-setup";
const questions = [
	{
		type: "input",
		name: "projectName",
		message: "Enter your new project's name: ",
		default: "rakib-react-app",
	},
];

inquirer.prompt(questions).then((answers) => {
	const projectPath = join(__dirname, answers.projectName);

	if (fs.existsSync(projectPath)) {
		console.error(`Error: The directory "${answers.projectName}" already exists.`);
		process.exit(1);
	}

	fs.mkdirSync(projectPath);
	fs.mkdirSync(join(projectPath, "public"));
	fs.mkdirSync(join(projectPath, "src"));
	fs.mkdirSync(join(projectPath, "src", "assets"));
	fs.mkdirSync(join(projectPath, "src", "components"));
	fs.mkdirSync(join(projectPath, "src", "pages"));
	fs.mkdirSync(join(projectPath, "src", "store"));
	fs.mkdirSync(join(projectPath, "src", "store", "slices"));

	// Copy public folder
	fs.copyFileSync(join(url, "/src/public", "vite.svg"), join(projectPath, "public", "vite.svg"));

	// Copy root level files
	[
		"index.html",
		"main.jsx",
		"App.jsx",
		"App.css",
		"index.css",
		"package-lock.json",
		"package.json",
		"yarn.lock",
		"postcss.config.js",
		"vite.config.js",
		"README.md",
		".gitignore",
		".eslintrc.cjs",
	].forEach((fileName) => {
		fs.copyFileSync(join(url, "./", "src", fileName), join(projectPath, fileName));
	});

	// Copy src folder and its contents
	fs.copyFileSync(
		join(url, "src", "components", "Counter.jsx"),
		join(projectPath, "src", "components", "Counter.jsx")
	);
	fs.copyFileSync(
		join(url, "src", "components", "ToggleDarkMode.jsx"),
		join(projectPath, "src", "components", "ToggleDarkMode.jsx")
	);

	// // Copy pages folder and its contents
	// fs.copyFileSync(
	// 	join(url, "src", "pages", "index.jsx"),
	// 	join(projectPath, "src", "pages", "index.jsx")
	// );

	// Copy store folder and its contents
	fs.copyFileSync(
		join(url, "src", "store", "rootReducer.js"),
		join(projectPath, "src", "store", "rootReducer.js")
	);
	fs.copyFileSync(
		join(url, "src", "store", "rootSaga.js"),
		join(projectPath, "src", "store", "rootSaga.js")
	);
	fs.copyFileSync(
		join(url, "src", "store", "store.js"),
		join(projectPath, "src", "store", "store.js")
	);

	// Copy store slices folder and its contents
	fs.copyFileSync(
		join(url, "src", "store", "slices", "counterSlice.js"),
		join(projectPath, "src", "store", "slices", "counterSlice.js")
	);
	fs.copyFileSync(
		join(url, "src", "store", "slices", "themeSlice.js"),
		join(projectPath, "src", "store", "slices", "themeSlice.js")
	);
	console.log(
		chalk.green("\nSuccess!") + ` Project "${answers.projectName}" created at ${projectPath} \n`
	);
	console.log(chalk.cyan(`cd ${answers.projectName} \n`));
	console.log(chalk.yellow("yarn OR npm install\n"));
	console.log(chalk.blue("yarn dev OR npm run dev \n"));
	console.log(chalk.green("!! Enjoy !! \n"));
});
