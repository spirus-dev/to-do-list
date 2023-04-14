import { Project, addNewProject, editProject, removeProject} from './project.js';
import { Task, addTask, editTask, removeTask, removeCompleted, toggleComplete, toggleStar} from './task.js'
const projectList=[];

addNewProject(projectList,'General');
let currentProjectIndex=0;
addTask(projectList[currentProjectIndex].projectTasks,'Sample Task','Sample Description','Sample Start Date','Sample Due Date','Sample Priority');
addTask(projectList[currentProjectIndex].projectTasks,'Sample Task','Sample Description','Sample Start Date','Sample Due Date','Sample Priority');
addTask(projectList[currentProjectIndex].projectTasks,'Sample Task','Sample Description','Sample Start Date','Sample Due Date','Sample Priority');
addTask(projectList[currentProjectIndex].projectTasks,'Sample Task','Sample Description','Sample Start Date','Sample Due Date','Sample Priority');
addTask(projectList[currentProjectIndex].projectTasks,'Sample Task','Sample Description','Sample Start Date','Sample Due Date','Sample Priority');
toggleStar(projectList[currentProjectIndex].projectTasks,0)
toggleComplete(projectList[currentProjectIndex].projectTasks,0)
toggleComplete(projectList[currentProjectIndex].projectTasks,1)
removeTask(projectList[currentProjectIndex].projectTasks,2)
editTask(projectList[currentProjectIndex].projectTasks,2,'Edited Task','Edited Description','Edited Start Date','Edited Due Date','Edited Priority');
removeCompleted(projectList[currentProjectIndex].projectTasks)
addNewProject(projectList,'New List');
currentProjectIndex=1;
addTask(projectList[currentProjectIndex].projectTasks,'Sample Task','Sample Description','Sample Start Date','Sample Due Date','Sample Priority');
editProject(projectList,0,'Edited Project')
removeProject(projectList,0)

