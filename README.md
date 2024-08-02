# Playwright with Typescript, Cucumber as BDD and Docs

## Installation on local
- [Puppy Bank instruction](https://vncrtech.medium.com/practice-test-automation-using-a-local-web-application-f8310ca37637)
- [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Run this command:
``` 
docker run -d -p 8000:8000 vncrtech/puppybank
```
- Puppy Bank will be accessible on:
```  
http://localhost:8000  
```
- Install Cucumber extension
- Add to settings.json:
```json
    "cucumber.features": [
        "src/features/*.feature"
    ],
    "cucumber.glue": [
        "src/steps/*.steps.ts"
    ],
    "[javascript]": {
        "editor.defaultFormatter": "CucumberOpen.cucumber-official"
    }
```
- Install dependencies by `npm install`
## How it works
- Run npm script `test` to run all tests  
- Run npm script `show-report` to generate and open Cucumber report (it will be generated in /reports/ folder)  
- Run npm script `convert-json-to-md` to generate .md file with test results (it will be generated in /reports/ folder)  
