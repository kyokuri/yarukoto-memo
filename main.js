function save(){
  //保存ボタンを押した時の挙動
  var task = document.getElementById('newtask').value;
  if(task){
    var taskList = localStorage.getItem('tasks') || '[]';
    taskList = JSON.parse(taskList);
    var newTask = {
      title : task,
      status : 0 
    };
    taskList.push(newTask);
    localStorage.setItem('tasks',JSON.stringify(taskList));
    createTaskDom(newTask,newTask.length);
  }
}

function done(target){
  //「やった」ボタンを押した時の挙動
  var taskList = JSON.parse(localStorage.getItem('tasks'));
  console.log(taskList[target].status);
  taskList[target].status = 1;
  localStorage.tasks = JSON.stringify(taskList);
}

(function(){
  //初期化する
  document.getElementById('saveBtn').addEventListener('click',save);
  var taskList = localStorage.getItem('tasks') || '[]';
  taskList = JSON.parse(taskList);
  taskList.forEach(function(item, index){
    if(item.status === 0){
      createTaskDom(item,index);
    }
  })
})()

function createTaskDom(item,index){
  //切り分けた方が良さそうという判断
  var taskTitle = item.title;
  var taskStatus = item.status;
  var newTask = document.createElement('li');
  var doneBtn = document.createElement('input');
  doneBtn.type = 'button';
  doneBtn.value = 'やった';
  doneBtn.addEventListener('click', function(){done(index)});
  newTask.textContent = taskTitle;
  newTask.appendChild(doneBtn);
  document.getElementById('taskList').appendChild(newTask);
}
