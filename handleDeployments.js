var gitPayload = JSON.parse(request.rawBody);
var branch="refs/heads/master";// add the branch that you need to trigger
if(gitPayload!=null || gitPayload != ""){
    try{	
        //check if the payload is a test from git
        if(request.headers["x-github-event"]=="ping"){
            return "success";
        }
        //check if payload is a deployment
        if(request.headers["x-github-event"]=="deployment"){
            var deploymentId=gitPayload.deployment.id;
            var deploybranch = gitPayload.deployment.ref;
            if(deploybranch !=   branch){//check if the deployment is done on the specified branch
                return "Nothing to do";/// nothing to do move along
            }
            //parse the payload
            if(gitPayload.deployment){
                console.log("checking deployment Payload");
                   if(deploymentPayload.hasOwnProperty("trigger")){
                   	return "trigger is "+deploymentPayload.trigger;
                   }
                //at this level you are sure that the deployment is done 
                //you can parse the deployment details like sha for example
                //sha=gitPayload.deployment.sha;
                //do your call for the external system.
                return "do external call";
            }
        }
    }catch(e){
        console.log("Error in parsing deployment payload");
    }
}
