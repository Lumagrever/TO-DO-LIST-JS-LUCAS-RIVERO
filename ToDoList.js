// 1- Definir las variales

const input = document.querySelector('.input-text-task') // input de texto en html
const addTask = document.querySelector('.add-task') // form en html
const tasksLists = document.querySelector('.tasks-list') // listas renderizadas
const allDeleteBtn = document.querySelector('.all-delete-btn') // Boton que borra todas las tareas en html

// 2- Traer elementos del LS si existen

let tasks = JSON.parse(localStorage.getItem('tasks')) || [] // Esto sirve para "traer" si hay algo

// Le decimos a LocalStorage que nos traiga un item llamado "tasks" y parsearlo. 
// El array vacio se coloca se coloca vacio en caso de que no encuentre ningun valor, evita que de NULL o UNDEFINED... Esto genera que no rompa.
// El nombre del item tiene que ser el mismo que el de GET para poder "SETearlo"

// 3- Grabar en LS

const saveLocalStorage = (taskList) => {  //Esto sirve para "guardar en LocalStorage"
    localStorage.setItem ('tasks', JSON.stringify(taskList))  // Esto sirve para "guardar en LocalStorage"
}
// Guardaremos las tareas en el localstorage con Setitem y Stringify
// Va a recibir una variable como tareas y me lo va a guardar dentro de tasks con SetItem
// Con los puntos 2 y 3 ya podemos aplicar LocalStorage para que lo que nosotros queramos.

// 4- Crear el elemento a renderizar

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
    <img class="delete-btn" src= "./assets/Trash.png" alt="Boton de borrar tarea" data-id=${task.taskId}>
</li>
`;
// Debemos crear un par de backticks
// colocar el elemento de html a generar y entre llaves colocar el callback que pusimos como argumento, en este caso fue "task"
// Por cada tarea que haga le voy a ir cambiando el NOMBRE y le voy a ir cambiando el ID
// Hacemos un render DINAMICO de un elemento de HTML en JS.
// Lo que hicimos en el punto 4 renderiza UNA sola tarea, para renderizar varias tareas tenemos al punto 5.
//El data-id le colocamos "id" para que tomemos como referencia que colocamos un id porque cada tarea va a tener un boton particular de "borrar" y en un futuro cuando le agregue el evento "click" al "boton de borrar" borrará el id correspondiente a esa tarea unica.
// NO CERRAR CON LLAVES A LA FUNCION "CREATETASK"

// 5- Renderizar la o LAS tareas.

// Vamos a insertar por medio de JS los items a la UL de HTML (la class taskslist)
const renderTaskList = rendertasks => {                                 // rendertasks va a recibir va a recibir un array de tareas
    tasksLists.innerHTML = rendertasks.map(task => createTask(task)).join('')  // TasksLists es la variable que derlaramos mas arriba + insertar HTML
}
// MAPeamos la lista en busca de una tarea, por cada de una de las tareas la va a mostrar con createTask (del punto 4).
//El INNERHTML va a recibir el nombre mencionado de la tarea. EJ: "Barrer el piso" como un STRING.

// 6- Verificar si el boton delete all se muestra o no.

const hideDeleteAll = tasksList => {        
    if(!tasksList.length) {                      //Si tasksList.length...
        allDeleteBtn.classList.add('hidden');   //...Si hay tareas esto da true, por lo tanto aparece el boton de eliminar todas las tareas.
        return;                                 
    }
    allDeleteBtn.classList.remove('hidden');    //Si no hay tareas, entonces que el botón no aparezca.
}

//IMPORTANTE: CREAR EN CSS LA CLASE .HIDDEN PARA QUE SURTA EFECTO
/* .hidden {
    visibility: hidden;
  }*/

// La variable "allDeleteBtn" esta declarada al principio con el ID de HTML "all-delete-btn", esta directamente vinculado con HTML.

// 7- Formulario para agregar tareas

const addTasks = event => {
    event.preventDefault();                     //Con el preventDefault evitamos que la pagina se recargue cada vez que hagamos "SUBMIT"

    const taskName = input.value.trim();        //con .trim le sacamos los espacios del inicio y del final si es que hubieran

    if (!taskName.length){                              // Si no existe ninguna tarea...
        alert(`Escribe el nombre de alguna tarea`);       // Avisamos con una alerta que no hay tarea y que ingrese una
        return                                          // Y que retorne sin hacer nada.
    } else if (tasks.some( task => task.name.toLowerCase() === taskName.toLowerCase())) { //con .some revisamos si hay tareas de nombres iguales 
        alert(`¡Ups! Parece que ya tenes una tarea agendada con ese nombre`)                        //Si hay tareas con el mismo nombre, avisamos con alerta.
        return;                                                                                   
    }

    tasks = [...tasks, { name: taskName, taskId: tasks.length + 1 }];
    input.value = '';

    renderTaskList(tasks);       //Renderizo 
    saveLocalStorage(tasks);     //Guardo en LS           
    hideDeleteAll(tasks);        //Verifico           
}

//Vamos a usar la variable del punto 2, "tasks" va a ser la variable que nos va a permitir a nosotros saber que renderizar, cuando renderizarlo y que es lo que vamos a hacer. Todo va a pasar por "tasks". Tasks era un array de objetos que vamos a utilizar para renderizar.
//Colocar "...tasks" es mantener todas las tareas que teniamos y le agrego un objeto nuevo con name: taskName, taskId: tasks.length + 1
//Colocar tasks.length + 1 hacemos que sea las tareas siempre sean incrementales.
//Luego de tener el objeto nuevo creado y tener el preventDefault con el submit evitando que se reinicie la pagina vamos a obligar al input colocando "input.vale = ''" (Colocamos un string vacio) a que se reinicien los input anteriores.
//con renderTaskList(tasks); Renderizamos renderTaskList - Del punto 5 - y le pasamos las tasks (todas las tareas que tengamos)
//con saveLocalStorage(tasks); Guardamos en Local Storage a las tasks
//con hideDeleteAll(tasks); Verifico si hay tareas o no para que aparezca el boton.


//Lo siguiente que vamos a hacer es atrapar el id del punto 4 y hacer que suceda el evento de eliminar la tarea al tocar la imagen del "tachito" en lugar de tocar a todo el elemento.

const removeTask = eventremove => {   
    if(!eventremove.target.classList.contains('delete-btn'))       //Si hago click en otro lugar que no sea la img del "tachito" no hace nada
    return;                                                            // Si contiene la imagen del tachico, borra.

    const filterId = Number(eventremove.target.dataset.id);         //Accedemos al numero que el sistema me lo brinda como string sobre el ID

    //Si queremos borrar un elemento de tasklists... 
    tasks = tasks.filter( task => task.taskId !== filterId)  // Hace que borremos la tarea individual que queramos en base a su unico ID
    renderTaskList(tasks);
    saveLocalStorage(tasks);
    hideDeleteAll(tasks);
}

//IMPORTANTE Al lado de .Contains debe ir la clase del buton (Del LI que se agrega desde JS)


// 8- Funcionamiento del Boton para Remover todas.

const removeAllTasks = () => {
    tasks = [];                     //Vaciamos los arrays de objetos construidos anteriormente al final del punto 7
    renderTaskList(tasks);                                          // Renderizamos un array vacio
    saveLocalStorage(tasks);                                        // Guardo un array vacio (no guardamos nada en LS)
    hideDeleteAll(tasks);                                           // Verifico si corresponde el boton de "eliminar tareas" o no.
}

// 9- Funciones para inicializar

const init = () => {
    renderTaskList(tasks);
    addTask.addEventListener('submit', addTasks);
    tasksLists.addEventListener('click', removeTask);
    allDeleteBtn.addEventListener('click', removeAllTasks);
    hideDeleteAll(tasks);
}

 init()

