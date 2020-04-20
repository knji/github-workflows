import * as core from '@actions/core'
import {wait} from './wait'
import * as fs from "fs";

//https://github.com/marketplace/actions/publish-api-doc-on-apitree

export const Greeter = (name: string) => `Hello ${name}`; 
export const doSomething = () => {

            console.debug("running doSomething in Typescript....")
            var ms: string = core.getInput('milliseconds')

            if (ms == ""){
                  ms = "1000";
            }

            core.debug(`Waiting ${ms} milliseconds ...`)
    
            var directory = ".";

            fs.readdir(directory, (err, files) => {
                  files.forEach(file => {
                    //console.debug(file);
                  });
                }); 
           
      return "done";

}


export async function readFiles() : Promise<string>{
      var directory = ".";
      await fs.readdir(directory, (err, files) => {
            files.forEach(file => {
              // console.debug(file);
            });
          }); 

          return "done";
}

export async function run(): Promise<void> {
  try {

        console.debug("Attempting to use Typescript in a promise...")
        var ms = core.getInput('milliseconds')

        if (ms == ""){
              ms = "100";
        }
      
        console.debug("Waiting ${ms} milliseconds.  Looks like core.debug does not work!!!")
        console.debug("Printing some inputs:")
        console.debug("who-to-greet:" + core.getInput("who-to-greet"))
        //console.debug("some-key" + core.getInput("stoplight-api-key"))

        console.debug("Starting to parse ms at " + new Date().toTimeString())
        await wait(parseInt(ms, 10))
        console.debug("Completed parsing ms at:" + new Date().toTimeString())

        core.setOutput('time', new Date().toTimeString())

  } catch (error) {
        core.setFailed(error.message)
  }
}

run()
export default run
