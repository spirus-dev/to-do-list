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

function updateProject(event){
  const index=event.srcElement.dataset.projectindex;
  const newProjectName=prompt("Enter new project name");
  if(newProjectName!==null && newProjectName!==''){
    editProject(projectList,index,newProjectName);
    renderProjectList();
  }
}

function deleteProject(event){
    removeProject(projectList,event.srcElement.dataset.projectindex);
    renderProjectList();
}

renderProjectList();
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
    renderProjectList();
  }
}