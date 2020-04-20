import * as core from '@actions/core'
import {wait} from './wait'
import * as fs from "fs";

//https://github.com/marketplace/actions/publish-api-doc-on-apitree

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
