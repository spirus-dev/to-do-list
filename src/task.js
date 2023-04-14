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

function addTask(taskList,taskTitle,taskDescription,taskStartDate,taskDueDate,taskPriority){
    taskList.push(new Task(taskTitle,taskDescription,taskStartDate,taskDueDate,taskPriority))
}
function removeTask(taskList,index){
    taskList.splice(index,1);
}
function editTask(taskList,index,taskTitle,taskDescription,taskStartDate,taskDueDate,taskPriority){
    taskList[index].taskTitle=taskTitle;
    taskList[index].taskDescription=taskDescription;
    taskList[index].taskStartDate=taskStartDate;
    taskList[index].taskDueDate=taskDueDate;
    taskList[index].taskPriority=taskPriority;
}
function toggleStar(taskList,index){
    taskList[index].isStarred=taskList[index].isStarred===true?false:true;
}
function toggleComplete(taskList,index){
    taskList[index].isCompleted=taskList[index].isCompleted===true?false:true;
}
function removeCompleted(taskList){
    taskList=taskList.filter(x => x.isCompleted===false)
}

export{
    Task,
    addTask,
    editTask,
    removeTask,
    removeCompleted,
    toggleComplete,
    toggleStar
};