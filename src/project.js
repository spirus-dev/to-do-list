class Project{
    projectTasks=[];
    constructor(projectName){
        this.projectName=projectName;
    }
}

function addNewProject(projectList,projectName){
    projectList.push(new Project(projectName));
}

function editProject(projectList,index,projectName){
    projectList[index].projectName=projectName;
}

function removeProject(projectList,index){
    projectList.splice(index,1);
}

export {
    Project,
    addNewProject,
    editProject,
    removeProject
};