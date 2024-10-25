import type { Todo } from '@/entities/todo/todo.slice'

export const TODOS: { items: Todo[] } = {
  items: [
    { listId: 1, id: 1, name: 'Buy milk', value: false },
    { listId: 1, id: 2, name: 'Buy bread', value: false },
    { listId: 1, id: 3, name: 'Buy vegetables', value: true },
    { listId: 1, id: 4, name: 'Buy fruits', value: false },
    { listId: 1, id: 5, name: 'Buy cereal', value: true },

    { listId: 2, id: 6, name: 'Complete report', value: false },
    { listId: 2, id: 7, name: 'Attend meeting', value: true },
    { listId: 2, id: 8, name: 'Send emails', value: false },
    { listId: 2, id: 9, name: 'Prepare presentation', value: true },
    { listId: 2, id: 10, name: 'Plan project', value: false },

    { listId: 3, id: 11, name: 'Clean kitchen', value: true },
    { listId: 3, id: 12, name: 'Vacuum house', value: false },
    { listId: 3, id: 13, name: 'Wash dishes', value: false },
    { listId: 3, id: 14, name: 'Take out trash', value: true },
    { listId: 3, id: 15, name: 'Do laundry', value: false },

    { listId: 4, id: 16, name: 'Read chapter 1', value: true },
    { listId: 4, id: 17, name: 'Watch tutorial', value: false },
    { listId: 4, id: 18, name: 'Take notes', value: true },
    { listId: 4, id: 19, name: 'Complete exercises', value: false },
    { listId: 4, id: 20, name: 'Review material', value: false },

    { listId: 5, id: 21, name: 'Run 5km', value: false },
    { listId: 5, id: 22, name: 'Stretch for 15 minutes', value: true },
    { listId: 5, id: 23, name: 'Do 30 push-ups', value: false },
    { listId: 5, id: 24, name: 'Drink 2L of water', value: true },
    { listId: 5, id: 25, name: 'Track calories', value: false }
  ]
}
