let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let TasksDiv = document.querySelector(".tasks");
let DeleteAll = document.querySelector(".del1");
        //create ArrayOfTasks
    let ArrayOfTasks = [];
    // check if there is tasks in local storage 
    if(localStorage.getItem("tasks")) {
      ArrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
    }
             //  Trigger get data from local storage
    getdatafromlocalstorage();
           // Add task 
   submit.onclick = function () {
  if(input.value !== "") {
    AddTasktoArray(input.value) // Add Tasks To ArrayOfTasks
       input.value= "";
   }
 };
   // click in Delete , task element Button
   TasksDiv.addEventListener("click" , (e) => {
                // Delete Button 
      if(e.target.classList.contains("del")) {
               // Delete Task From Local storage
      deletetaskswith(e.target.parentElement.getAttribute("data-id"));
              // remove elements from page
        e.target.parentElement.remove();
      }
              // task element\
              if(e.target.classList.contains("task")) {
                  // toggle complated for the class   
                toggleStatusTasksWith(e.target.getAttribute("data-id"))
                // toggle Done class 
                e.target.classList.toggle("done");
              }
    });
    
   
   function AddTasktoArray (taskText) {
     //  Task Data
     const task = {
      id:Date.now(),
      title:taskText,
      completed : false ,
      };
       // push Tasks to ArrayOfTasks
         ArrayOfTasks.push(task);
         //Add tasks to page
         AddElementsTopagefrom(ArrayOfTasks);
         // Add tasks to Local storage
         AddDataToLocalStoragefrom(ArrayOfTasks);
};
   function AddElementsTopagefrom(ArrayOfTasks) {
             // Empty Task Div 
         TasksDiv.innerHTML = "" ;
            // looping Array Of Tasks
     ArrayOfTasks.forEach((task) => {
       // create Main Div
      let div =document.createElement("div");
      div.className= "task";
         // CHECK task is done 
         if(task.completed) {
          div.className= "task done";
         }
      div.setAttribute("data-id" , task.id);
      div.appendChild(document.createTextNode(task.title));
           // create delete button 
       let span = document.createElement("span");
       span.className = "del" ;
       span.appendChild(document.createTextNode("Delete"));
               // Append button button to Main div
         div.appendChild(span);
         // Add task Div to main tasks div
          TasksDiv.appendChild(div);  
});
   }
   function AddDataToLocalStoragefrom(ArrayOfTasks) {
    window.localStorage.setItem("tasks" , JSON.stringify(ArrayOfTasks));
   }
    
   function getdatafromlocalstorage() {
     let data = window.localStorage.getItem("tasks");
    if(data) {
      let tasks = JSON.parse(data);
      AddElementsTopagefrom(tasks);
    }
   }
    function deletetaskswith(taskId) {
    // for explain only
    //  for(let i = 0 ; i<ArrayOfTasks.length; i++) {
    //   console.log(`${ArrayOfTasks[i].id} === ${taskid}`);
    //  }
        ArrayOfTasks = ArrayOfTasks.filter((task) => task.id != taskId)
        AddDataToLocalStoragefrom(ArrayOfTasks);
  }

   function toggleStatusTasksWith(taskId) {
     for(let i = 0 ; i<ArrayOfTasks.length; i++) {
      if(ArrayOfTasks[i].id == taskId) {
        ArrayOfTasks[i].completed == false ?  (ArrayOfTasks[i].completed = true) : (ArrayOfTasks[i].completed = false )
          }
      }
      AddDataToLocalStoragefrom(ArrayOfTasks);
     }
     DeleteAll.onclick = function () {
      TasksDiv.innerHTML = "" ;
      window.localStorage.clear();
     }
   