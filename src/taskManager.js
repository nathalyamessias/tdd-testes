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

export function createTask(title) {
  return {
    id: _nextId++,
    title: title.trim(),
    completed: false,
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

