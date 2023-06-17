const readline = require('readline');

let taskList = [];

// Función para agregar una tarea a la lista
function addTask(indicador, descripcion) {
  taskList.push({
    indicador: indicador,
    descripcion: descripcion,
    estado: "incompleta"
  });
  console.log("Tarea agregada exitosamente.");
}

// Función para marcar una tarea como completada
function completeTask(indicador) {
  const task = taskList.find(task => task.indicador === indicador);
  if (task) {
    task.estado = "completada";
    console.log("Tarea completada exitosamente.");
  } else {
    console.log("No se encontró ninguna tarea con el indicador especificado.");
  }
}

// Función para mostrar la lista de tareas
function displayTasks() {
  if (taskList.length === 0) {
    console.log("No hay tareas en la lista.");
  } else {
    console.log("Lista de tareas:");
    taskList.forEach(task => {
      console.log(`${task.indicador} - ${task.descripcion} (${task.estado})`);
    });
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askForCommand() {
  rl.question('Ingrese un comando (add, complete, display): ', (command) => {
    if (command === "add") {
      rl.question('Ingrese el indicador de la tarea: ', (indicador) => {
        rl.question('Ingrese la descripción de la tarea: ', (descripcion) => {
          addTask(indicador, descripcion);
          askForCommand();
        });
      });
    } else if (command === "complete") {
      rl.question('Ingrese el indicador de la tarea a completar: ', (indicador) => {
        completeTask(indicador);
        askForCommand();
      });
    } else if (command === "display") {
      displayTasks();
      askForCommand();
    } else {
      console.log("Comando no reconocido. Los comandos válidos son: add, complete, display.");
      askForCommand();
    }
  });
}

askForCommand();
