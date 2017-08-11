 var gitPayload = JSON.parse(request.rawBody);
 var sha=null;
 var branch="refs/heads/master";// add the branch that you need to trigger

if(gitPayload!=null || gitPayload != ""){
        		
        	//check if the payload is a test from git
        	if(request.headers["x-github-event"]=="ping"){
        		return "success";
        	}
        	//check if payload is a deployment
        	if(request.headers["x-github-event"]=="deployment"){
        		var deploymentId=gitPayload.deployment.id;
                var deploybranch = gitPayload.deployment.ref;
                if(deploybranch !=   branch){//check if the deployment is done on the specified branch
                    return deploybranch+"Nothing to do";/// nothing to do move along
                }
                
                try{
                    //parse the payload
        		   var deploymentPayload  = JSON.parse(gitPayload.deployment.payload);
        		   console.log(JSON.stringify(deploymentPayload));
        		   
	        		if(deploymentPayload){
	        		    console.log("checking deployment Payload");
                        //check if the deployment is triggered 
	        		   	if(deploymentPayload.hasOwnProperty("trigger")){
	        				return "success"; //nothing to do yet the deployment is not done
	        			}
	        		}
        		}catch(e){
                    console.log("Error in parsing deployment payload");
        		}
        		//at this level you are sure that the deployment is done 
                //you can parse the deployment details like sha for example
    			//sha=gitPayload.deployment.sha;
            	//do your call for the external system.
            }
        	
        }