// ============================================================
// taskManager.js — Regras de negócio do gerenciador de tarefas
// ============================================================

// ------------------------------------------------------------
// Validação
// ------------------------------------------------------------

let _nextId = 1;

/**
 * Reseta o contador de IDs (útil para testes determinísticos).
 */
export function resetId() {
  _nextId = 1;
}

export function validateTitle(title) {
  if (typeof title !== 'string') {
    return false;
  }

  const trimmed = title.trim();
  return trimmed.length >= 3;
}

// ------------------------------------------------------------
// Criação
// ------------------------------------------------------------

export function createTask(title, priority = 'medium') {
  return {
    id: _nextId++,
    title: title.trim(),
    completed: false,
    priority: priority, // Adicionando o novo campo aqui
  };
}

// ------------------------------------------------------------
// Adição com validação
// ------------------------------------------------------------

export function addTask(tasks, title) {
  if (!validateTitle(title)) {
    throw new Error(
      'Título inválido: deve ser uma string com pelo menos 3 caracteres.'
    );
  }

  if (isDuplicate(tasks, title)) {
    throw new Error('Tarefa duplicada: já existe uma tarefa com este título.');
  }

  const newTask = createTask(title);
  return [...tasks, newTask];
}


// ------------------------------------------------------------
// Alteração de estado
// ------------------------------------------------------------

export function toggleTask(task) {
  return {
    ...task, // Copia todas as propriedades originais (id, title)
    completed: !task.completed, // Sobrescreve apenas o completed invertendo o valor atual
  };
}

// ------------------------------------------------------------
// Remoção
// ------------------------------------------------------------

export function removeTask(tasks, taskId) {
  // O .filter() já retorna um NOVO array, garantindo a imutabilidade
  return tasks.filter((task) => task.id !== taskId);
}

// ------------------------------------------------------------
// Filtros
// ------------------------------------------------------------

export function filterTasks(tasks, status) {
  switch (status) {
    case 'completed':
      return tasks.filter((task) => task.completed === true);
    case 'pending':
      return tasks.filter((task) => task.completed === false);
    case 'all':
    default:
      // Retorna uma cópia do array original usando spread para garantir imutabilidade
      return [...tasks]; 
  }
}

// ------------------------------------------------------------
// Contagens
// ------------------------------------------------------------

export function countTasks(tasks) {
  return tasks.length;
}

export function countCompleted(tasks) {
  // Filtra as concluídas e pega o tamanho do array resultante
  return tasks.filter((task) => task.completed === true).length;
}

export function countPending(tasks) {
  // Filtra as não concluídas e pega o tamanho do array resultante
  return tasks.filter((task) => task.completed === false).length;
}

// ------------------------------------------------------------
// Prioridades
// ------------------------------------------------------------

export function validatePriority(priority) {
  // Verifica se o valor passado está dentro do array de prioridades válidas
  return ['low', 'medium', 'high'].includes(priority);
}

export function filterByPriority(tasks, priority) {
  // Retorna um novo array contendo apenas as tarefas que tem a prioridade pedida
  return tasks.filter((task) => task.priority === priority);
}

// ------------------------------------------------------------
// Validação de Duplicatas
// ------------------------------------------------------------

export function isDuplicate(tasks, title) {
  // Padroniza o título buscado: remove espaços das pontas e deixa tudo minúsculo
  const normalizedTitle = title.trim().toLowerCase();
  
  // Verifica se alguma tarefa já existente tem o mesmo título padronizado
  return tasks.some((task) => task.title.toLowerCase() === normalizedTitle);
}




