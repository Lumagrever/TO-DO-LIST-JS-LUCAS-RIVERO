// 1- Definir las variales
const input = document.querySelector('input-text-task') // input de texto en html
const addTask = document.querySelector('add-task') // form en html
const tasksLists = document.querySelector('tasks-list') // listas renderizadas
const allDeleteBtn = document.querySelector('all-delete-btn') // Boton que borra todas las tareas en html

// 2- Traer elementos del LS si existen

let tasks = JSON.parse(localStorage.getItem('tasks')) || [] // Esto sirve para "traer" si hay algo

// Le decimos a LocalStorage que nos traiga un item llamado "tasks" y parsearlo. 
//El array vacio se coloca se coloca vacio en caso de que no encuentre ningun valor, evita que de NULL o UNDEFINED... Esto genera que no rompa.
// El nombre del item tiene que ser el mismo que el de GET para poder "SETearlo"

// 3- Grabar en LS
const saveLocalStorage = (taskList) => {  //Esto sirve para "guardar en LocalStorage"
    localStorage.setItem ('tasks', JSON.stringify(taskList))  // Esto sirve para "guardar en LocalStorage"
}
//Guardaremos las tareas en el localstorage con Setitem y Stringify
// Va a recibir una variable como tareas y me lo va a guardar dentro de tasks con SetItem
//Con los puntos 2 y 3 ya podemos aplicar LocalStorage para que lo que nosotros queramos.

//4- Crear el elemento a renderizar

//modelo de objeto:
/*
{
    id: number,
    name: `string`,
}
*/

const createTask = task =>
` 
<li>${task.name}
    <img class="delete-btn" src= "ubicacion de imagen de tachito" alt="Boton de borrar tarea" data-id=${task.id}>
</li>
`
//Debemos crear un par de backticks
//colocar el elemento de html a generar y entre llaves colocar el callback que pusimos como argumento, en este caso fue "task"
//Por cada tarea que haga le voy a ir cambiando el NOMBRE y le voy a ir cambiando el ID
//Hacemos un render dinamico de un elemento de HTML en JS.
//Lo que hicimos en el punto 4 renderiza UNA sola tarea, para renderizar varias tareas tenemos al punto 5.

//5- Renderizar la o LAS tareas.
//Vamos a insertar por medio de JS los items a la UL de HTML (la class taskslist)
const renderTaskList = rendertasks => {
    tasksLists.innerHTML = rendertasks.map(task => createTask(task))
}







