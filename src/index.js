class Project{
    projectTasks=[];
    constructor(projectName){
        this.projectName=projectName;
    }
    addTask(taskTitle,taskDescription,taskStartDate,taskDueDate,taskPriority){
        this.projectTasks.push(new Task(taskTitle,taskDescription,taskStartDate,taskDueDate,taskPriority))
    }
    removeTask(index){
        this.projectTasks.splice(index,1);
    }
    editTask(index,taskTitle,taskDescription,taskStartDate,taskDueDate,taskPriority){
        this.projectTasks[index].taskTitle=taskTitle;
        this.projectTasks[index].taskDescription=taskDescription;
        this.projectTasks[index].taskStartDate=taskStartDate;
        this.projectTasks[index].taskDueDate=taskDueDate;
        this.projectTasks[index].taskPriority=taskPriority;
    }
    toggleStar(index){
        this.projectTasks[index].isStarred=this.projectTasks[index].isStarred===true?false:true;
    }
    toggleComplete(index){
        this.projectTasks[index].isCompleted=this.projectTasks[index].isCompleted===true?false:true;
    }
    removeCompleted(){
        this.projectTasks=this.projectTasks.filter(x => x.isCompleted===false)
    }
}

class Task{
    isStarred=false;
    isCompleted=false;
    constructor(taskTitle,taskDescription,taskStartDate,taskDueDate,taskPriority){
        this.taskTitle=taskTitle;
        this.taskDescription=taskDescription;
        this.taskStartDate=taskStartDate;
        this.taskDueDate=taskDueDate;
        this.taskPriority=taskPriority;
    }
}

function addNewProject(projectName){
    projectList.push(new Project(projectName));
}

function editProject(index,projectName){
    projectList[index].projectName=projectName;
}

function removeProject(index){
    projectList.splice(index,1);
}

const projectList=[];
projectList.push(new Project('General'));
let currentProjectIndex=0;
projectList[currentProjectIndex].addTask('Sample Task','Sample Description','Sample Start Date','Sample Due Date','Sample Priority');
projectList[currentProjectIndex].toggleStar(0)
addNewProject('New Project');
currentProjectIndex=1;
projectList[currentProjectIndex].addTask('Sample Task','Sample Description','Sample Start Date','Sample Due Date','Sample Priority');
projectList[currentProjectIndex].toggleStar(0)