import * as core from '@actions/core'
import * as request from "request-promise-native";
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
        await wait(30000)

        await hasFileBeenPublished("sailpoint-v3-api");

        console.debug("Completed parsing ms at:" + new Date().toTimeString())

        core.setOutput('time', new Date().toTimeString())

  } catch (error) {
        core.setFailed(error.message)
  }
}

async function hasFileBeenPublished(file : string ) : Promise<boolean> {

      if (!file){
        throw new Error("Please provide a file for publication.")
      }

      let projectId = core.getInput('stoplight-project-id');
      if (!projectId){
        throw new Error("Please provide the project id associated with this publication.")
      }
      
      let fileExists = false;
      try {
         
         console.debug("Attempting to list files in Stoplight project " + projectId);

        let fileInProjectUrl = "https://next-api.stoplight.io/projects/" + projectId + "/files";
        let getOptions = {
          qs: { order_by: 'name', sort : 'asc'},
          headers: {
             'content-type': 'application/json',
              authorization: 'Bearer ' + core.getInput('STOPLIGHT_API_KEY')
            },
            json : true
           }

        let response = await request.get(fileInProjectUrl, getOptions);
        let files = response.data;

        files.forEach((fileDescriptor: {id: string; name: string; type : string; path : string, mode:string }) => {
 
            console.debug(fileDescriptor.id + ":" + fileDescriptor.name);

          if (fileDescriptor.name === file){
            console.debug("File " + fileDescriptor.name + " already exist on server.")
            fileExists = true;
            return;
          }
        });
      }
      catch (error) {
        console.error(error)
        throw error;
      }

     return fileExists; 
    }
    

run()
export default run
