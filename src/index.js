import { Project, addNewProject, editProject, removeProject} from './project.js';
import { Task, addTask, editTask, removeTask, removeCompleted, toggleComplete, toggleStar} from './task.js'
const projectList=[];

addNewProject(projectList,'General');
let currentProjectIndex=0;
addTask(projectList[currentProjectIndex].projectTasks,'Sample Task','Sample Description','Sample Start Date','Sample Due Date','Sample Priority');
addTask(projectList[currentProjectIndex].projectTasks,'Sample Task','Sample Description','Sample Start Date','Sample Due Date','Sample Priority');
// addTask(projectList[currentProjectIndex].projectTasks,'Sample Task','Sample Description','Sample Start Date','Sample Due Date','Sample Priority');
// addTask(projectList[currentProjectIndex].projectTasks,'Sample Task','Sample Description','Sample Start Date','Sample Due Date','Sample Priority');
// addTask(projectList[currentProjectIndex].projectTasks,'Sample Task','Sample Description','Sample Start Date','Sample Due Date','Sample Priority');
// toggleStar(projectList[currentProjectIndex].projectTasks,0)
// toggleComplete(projectList[currentProjectIndex].projectTasks,0)
// toggleComplete(projectList[currentProjectIndex].projectTasks,1)
// removeTask(projectList[currentProjectIndex].projectTasks,2)
// editTask(projectList[currentProjectIndex].projectTasks,2,'Edited Task','Edited Description','Edited Start Date','Edited Due Date','Edited Priority');
// removeCompleted(projectList[currentProjectIndex].projectTasks)
// addNewProject(projectList,'New List');
// currentProjectIndex=1;
// addTask(projectList[currentProjectIndex].projectTasks,'Sample Task','Sample Description','Sample Start Date','Sample Due Date','Sample Priority');
// editProject(projectList,0,'Edited Project')
// removeProject(projectList,0)

const backdrop=document.querySelector('.backdrop');
const modal=document.querySelector('.modal');
const open=document.querySelector('#open');
close=document.querySelector('#close');
open.addEventListener('click',openModal);
close.addEventListener('click',closeModal);
function openModal(){
  backdrop.style.display='block';
  modal.classList.add('open-modal');
}

backdrop.addEventListener('click',closeModal);
function closeModal(){
  const projectName=document.querySelector('#projectName')
  projectName.value='';
  backdrop.style.display='none';
  modal.classList.remove('open-modal');
}

function renderProjectList(){
    const projectListUI=document.querySelector('.projectList');
    while (projectListUI.firstChild) {
        projectListUI.removeChild(projectListUI.lastChild);
      }
    let index=0;
    projectList.forEach(project => {
        const projectElement=document.createElement('div');
        projectElement.classList.add('projectElement');
        const projectItemHeading=document.createElement('div');
        projectItemHeading.classList.add('projectItemHeading');
        projectItemHeading.innerHTML=project.projectName;
        projectItemHeading.setAttribute('data-projectindex',index);
        projectItemHeading.addEventListener('click',changeProject);
        const editProjectButton = document.createElement('div');
        editProjectButton.classList.add('editProjectButton');
        editProjectButton.innerHTML=`<img src='../assets/pencil-outline.svg' data-projectindex=${index}>`
        editProjectButton.addEventListener('click',updateProject);
        const deleteProjectButton=document.createElement('div');
        deleteProjectButton.classList.add('deleteProjectButton');
        deleteProjectButton.innerHTML=`<span data-projectindex=${index}>&times;</span>`;
        deleteProjectButton.addEventListener('click',deleteProject);
        projectElement.appendChild(projectItemHeading);
        projectElement.appendChild(editProjectButton);
        projectElement.appendChild(deleteProjectButton);
        projectElement.setAttribute('data-projectindex',index);
        projectListUI.appendChild(projectElement);
        index++;
    });
}

function changeProject(event){
  const index=event.srcElement.dataset.projectindex;
  currentProjectIndex=index;
  renderTaskList();
}

function updateProject(event){
  const index=event.srcElement.dataset.projectindex;
  openProjectModalFunction(index);
}

function deleteProject(event){
    removeProject(projectList,event.srcElement.dataset.projectindex);
    if(Number(currentProjectIndex)===Number(event.srcElement.dataset.projectindex)){
      currentProjectIndex=0;
      renderTaskList();
    }
    renderProjectList();
}

renderProjectList();
renderTaskList();

const submit=document.querySelector('#submit');
submit.addEventListener('click',handleSubmit);
function handleSubmit(event){
  event.preventDefault();
  const form=document.querySelector('#form');
  const status=form.checkValidity();
  form.reportValidity();
  if(status){
    const projectName=document.querySelector('#projectName').value;
    closeModal();
    addNewProject(projectList,projectName);
    if(projectList.length!==1) currentProjectIndex+=1;
    renderProjectList();
    renderTaskList();
  }
}

//----------------------------------------------------------------------------------------------------

const updateBackdrop=document.querySelector('.updateBackdrop');
const updateProjectModal=document.querySelector('.updateProjectModal');
const closeProjectModal=document.querySelector('#closeUpdateProject');
closeProjectModal.addEventListener('click',closeProjectModalFunction);
function openProjectModalFunction(index){
  updateBackdrop.style.display='block';
  updateProjectModal.classList.add('open-modal');
  const projectName=document.querySelector('#newProjectName');
  projectName.value=projectList[index].projectName;
  const update=document.querySelector('#updateProject');
  update.setAttribute('data-projectindex',index);
}

updateBackdrop.addEventListener('click',closeProjectModalFunction);
function closeProjectModalFunction(){
  const newProjectName=document.querySelector('#newProjectName')
  newProjectName.value='';
  updateBackdrop.style.display='none';
  updateProjectModal.classList.remove('open-modal');
}

const update=document.querySelector('#updateProject');
update.addEventListener('click',handleUpdate);
function handleUpdate(event){
  event.preventDefault();
  const form=document.querySelector('#updateProjectForm');
  const status=form.checkValidity();
  form.reportValidity();
  if(status){
    const projectName=document.querySelector('#newProjectName').value;
    const index=event.srcElement.dataset.projectindex;
    editProject(projectList,index,projectName);
    renderProjectList();
    closeProjectModalFunction();
  }
}

//----------------------------------------------------------------------------------------------------

function renderTaskList(){
  const taskList=document.querySelector('.taskList');
  while (taskList.firstChild) {
    taskList.removeChild(taskList.lastChild);
  }
  if(projectList.length===0){
    taskList.innerHTML='<div class="warning">Add a project to continue</div>';
  }
  else if(projectList[currentProjectIndex].projectTasks.length===0){
    taskList.innerHTML='<div class="warning">No Tasks in this Project</div>';
  }
  else{
    let index=0;
    projectList[currentProjectIndex].projectTasks.forEach(task => {
      const taskUI=document.createElement('div');
      taskUI.classList.add('taskUI');
      const taskHeader=document.createElement('div');
      taskHeader.classList.add('taskHeader');
      taskHeader.innerHTML=task.taskTitle;
      taskUI.appendChild(taskHeader);
      const taskContent=document.createElement('div');
      taskContent.classList.add('taskContent');
      const taskData=[['Description',task.taskDescription.length===0?'No Description':task.taskDescription],['Start Date',task.taskStartDate],['Due Date',task.taskDueDate],['Priority',task.taskPriority],['Completed?',(task.isCompleted?'Yes':'No')]];
      taskData.forEach(taskDataItem => {
        const contentRow=document.createElement('div');
        contentRow.classList.add('contentRow');
        const rowTitle=document.createElement('div');
        rowTitle.classList.add('rowTitle');
        rowTitle.innerHTML=taskDataItem[0];
        const rowContent=document.createElement('div');
        rowContent.classList.add('rowContent');
        rowContent.innerHTML=taskDataItem[1];
        contentRow.appendChild(rowTitle);
        contentRow.appendChild(rowContent);
        taskContent.appendChild(contentRow);
      });
      taskUI.appendChild(taskContent);
      const taskControls=document.createElement('div');
      taskControls.classList.add('taskControls');
      const completeButton=document.createElement('button');
      completeButton.classList.add('complete');
      completeButton.innerHTML='COMPLETE';
      completeButton.setAttribute('data-taskindex',index);
      completeButton.addEventListener('click',completeTask);
      const editButton=document.createElement('button');
      editButton.classList.add('edit');
      editButton.innerHTML='EDIT';
      editButton.setAttribute('data-taskindex',index);
      editButton.addEventListener('click',handleEdit);
      const deleteButton=document.createElement('button');
      deleteButton.classList.add('delete');
      deleteButton.innerHTML='DELETE';
      deleteButton.setAttribute('data-taskindex',index);
      deleteButton.addEventListener('click',deleteTask);
      taskControls.appendChild(completeButton);
      taskControls.appendChild(editButton);
      taskControls.appendChild(deleteButton);
      taskUI.appendChild(taskControls);
      //taskUI.innerHTML=`${task.taskTitle} : ${task.taskDescription} : ${task.taskStartDate} : ${task.taskDueDate} : ${task.taskPriority}`;
      taskList.appendChild(taskUI);
      index++;
    });
  }
}

function completeTask(event){
  let index = event.srcElement.dataset.taskindex;
  toggleComplete(projectList[currentProjectIndex].projectTasks,index);
  renderTaskList();
}

function handleEdit(event){
  let index = event.srcElement.dataset.taskindex;
  openUpdateTaskModalFunction(index);

}

function deleteTask(event){
  let index = event.srcElement.dataset.taskindex;
  removeTask(projectList[currentProjectIndex].projectTasks,index);
  renderTaskList();
}
//----------------------------------------------------------------------------------------------------

const newTaskBackdrop=document.querySelector('.newTaskBackdrop');
const newTaskModal=document.querySelector('.newTaskModal');
const openNewTask=document.querySelector('#openNewTask');
const closeNewTask=document.querySelector('#closeNewTask');
openNewTask.addEventListener('click',openNewTaskModalFunction);
closeNewTask.addEventListener('click',closeNewTaskModalFunction);
function openNewTaskModalFunction(){
  const date=document.querySelector('#dueDate');
  date.setAttribute('min',new Date().toISOString().split("T")[0])
  newTaskBackdrop.style.display='block';
  newTaskModal.classList.add('open-modal');
}

newTaskBackdrop.addEventListener('click',closeNewTaskModalFunction);
function closeNewTaskModalFunction(){
  const newTaskName=document.querySelector('#newTaskName');
  newTaskName.value='';
  const description=document.querySelector('#description');
  description.value='';
  const dueDate=document.querySelector('#dueDate');
  dueDate.value='';
  const priority=document.querySelector('#priority');
  priority.value='Low';
  newTaskBackdrop.style.display='none';
  newTaskModal.classList.remove('open-modal');
}

const add=document.querySelector('#addTask');
add.addEventListener('click',handleAddTask);
function handleAddTask(event){
  event.preventDefault();
  const form=document.querySelector('#newTaskForm');
  const status=form.checkValidity();
  form.reportValidity();
  if(status){
    const taskName=document.querySelector('#newTaskName').value;
    const description=document.querySelector('#description').value;
  const dueDate=document.querySelector('#dueDate').value;
  const priority=document.querySelector('#priority').value;
    closeNewTaskModalFunction();
    addTask(projectList[currentProjectIndex].projectTasks,taskName,description,new Date().toISOString().split("T")[0],dueDate,priority);
    renderTaskList();
  }
}

//----------------------------------------------------------------------------------------------------

const updateTaskBackdrop=document.querySelector('.updateTaskBackdrop');
const updateTaskModal=document.querySelector('.updateTaskModal');
const closeUpdateTask=document.querySelector('#closeUpdateTask');
closeUpdateTask.addEventListener('click',closeUpdateTaskModalFunction);

function openUpdateTaskModalFunction(index){
  const date=document.querySelector('#updateTaskDueDate');
  date.setAttribute('min',new Date().toISOString().split("T")[0])
  updateTaskBackdrop.style.display='block';
  updateTaskModal.classList.add('open-modal');
  const taskName=document.querySelector('#updateTaskName');
  taskName.value=projectList[currentProjectIndex].projectTasks[index].taskTitle;
  const description=document.querySelector('#updateTaskDescription');
  description.value=projectList[currentProjectIndex].projectTasks[index].taskDescription;
  const dueDate=document.querySelector('#updateTaskDueDate');
  dueDate.value=projectList[currentProjectIndex].projectTasks[index].taskDueDate;
  const priority=document.querySelector('#updateTaskPriority');
  priority.value=projectList[currentProjectIndex].projectTasks[index].taskPriority;
  const updateTaskButton=document.querySelector('#updateTask');
  updateTaskButton.setAttribute('data-taskindex',index);
}

updateTaskBackdrop.addEventListener('click',closeUpdateTaskModalFunction);
function closeUpdateTaskModalFunction(){
  const updateTaskName=document.querySelector('#updateTaskName');
  updateTaskName.value='';
  const updateTaskDescription=document.querySelector('#updateTaskDescription');
  updateTaskDescription.value='';
  const updateTaskDueDate=document.querySelector('#updateTaskDueDate');
  updateTaskDueDate.value='';
  const updateTaskPriority=document.querySelector('#updateTaskPriority');
  updateTaskPriority.value='Low';
  updateTaskBackdrop.style.display='none';
  updateTaskModal.classList.remove('open-modal');
}

const updateTaskButton=document.querySelector('#updateTask');
updateTaskButton.addEventListener('click',handleUpdateTask);
function handleUpdateTask(event){
  event.preventDefault();
  const updateTaskForm=document.querySelector('#updateTaskForm');
  const status=updateTaskForm.checkValidity();
  updateTaskForm.reportValidity();
  if(status){
    let index=event.srcElement.dataset.taskindex;
    const taskName=document.querySelector('#updateTaskName').value;
    const description=document.querySelector('#updateTaskDescription').value;
    const dueDate=document.querySelector('#updateTaskDueDate').value;
    const priority=document.querySelector('#updateTaskPriority').value;
    closeUpdateTaskModalFunction();
    editTask(projectList[currentProjectIndex].projectTasks,index,taskName,description,dueDate,priority);
    renderTaskList();
  }
}