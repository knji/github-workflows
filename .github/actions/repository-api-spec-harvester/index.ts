import * as core from '@actions/core'
import {wait} from './wait'

export const Greeter = (name: string) => `Hello ${name}`; 
export const doSomething = () => {

            console.debug("running doSomething in Typescript....")
            var ms: string = core.getInput('milliseconds')

            if (ms == ""){
                  ms = "1000";
            }

            core.debug(`Waiting ${ms} milliseconds ...`)
    
           
      return "done";

}

async function run(): Promise<void> {
  try {

        console.debug("Attempting to use Typescript....")
        var ms = core.getInput('milliseconds')

        if (ms == ""){
              ms = "100";
        }
      
        core.debug(`Waiting ${ms} milliseconds ...`)

        core.debug("Starting to parse ms at " + new Date().toTimeString())
        await wait(parseInt(ms, 10))
        core.debug("Completed parsing ms at:" + new Date().toTimeString())

        core.setOutput('time', new Date().toTimeString())
  } catch (error) {
        core.setFailed(error.message)
  }
}

run()