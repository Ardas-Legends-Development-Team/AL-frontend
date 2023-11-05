[![CodeFactor](https://www.codefactor.io/repository/github/ardas-legends-development-team/al-frontend/badge)](https://www.codefactor.io/repository/github/ardas-legends-development-team/al-frontend)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/d4e7050d788c4d5d8332ea069ad0241d)](https://app.codacy.com/gh/Ardas-Legends-Development-Team/AL-frontend/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

# Description

This web app is going to be the main access point into the Arda's Legend's roleplay system.

## Commiting changes

- If the issue does not exist yet, create a new one using the predefined template and assign it a milestone corresponding to it's release period
- For each issue, create a branch from "dev". Depending on it's category (feature/bug/optimization) create a branch with this format: "category/name-representing-issue". Example: "feature/claimbuild-detail-modal"
- During development make sure your linter is working and run "npm run production" to verify that your code compiles correctly
- When development is finished on the separate branch, merge changes from "dev" and then create a pull request to put changes on the "dev" branch
- Wait validation from lead dev

## Run the project

- Development build: npm run dev
- Production build: npm run production
- Run tests: npm run test
- Run coverage: npm run coverage


## Tools Used

- Languages: Typescript, HTML
- Frameworks: Vite for Vue 3, TailwindCSS, Node.js
- Libraries: DaisyUI, Pinia, Axios, Vue cookie next
- Plugins: Vue router
- Testing: Vitest
- Analysis: Codacy, CodeFactor
