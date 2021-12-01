import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    //verificando se meu titulo está vazio ou não, utilizando o trim para remover os espaços em branco
    if(!newTaskTitle.trim()) {
      return;
    }

    const newTask = {
      id: Math.random(), 
      title: newTaskTitle, 
      isComplete: false
    }
    
    //utilizando a desestruturação para pegar o array de tasks e setar o novo valor, sem alterar o array original adicionando uma nova task com um id aleatório, novo titulo e o valor falso para task completa
    setTasks(oldState => [...oldState, newTask]);
    setNewTaskTitle(''); //limpando o input após criar a task
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    // utilizando o map pra percorrer todas as minhas tasks e verificar se o id da task é igual ao id passado por parametro, em caso de ser igual, altero o valor da task para true ou false
    const newTasks = tasks.map(task => task.id === id ? {...task, isComplete: !task.isComplete} : task);
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    // utilizando o filter pra percorrer todas as minhas tasks e verificar se o id da task é igual ao id passado por parametro, em caso de ser igual, removo a task
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}