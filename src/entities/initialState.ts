import type { State } from './store'

export const initialState: State = {
  lists: {
    entities: {
      1: { id: 1, name: 'Grocery Shopping' },
      2: { id: 2, name: 'Work Tasks' },
      3: { id: 3, name: 'House Chores' },
      4: { id: 4, name: 'Study Plan' },
      5: { id: 5, name: 'Fitness Goals' }
    },
    ids: [1, 2, 3, 4, 5]
  },
  todos: {
    entities: {
      1: { listId: 1, id: 1, name: 'Buy milk', value: false },
      2: { listId: 1, id: 2, name: 'Buy bread', value: false },
      3: { listId: 1, id: 3, name: 'Buy vegetables', value: true },
      4: { listId: 1, id: 4, name: 'Buy fruits', value: false },
      5: { listId: 1, id: 5, name: 'Buy cereal', value: true },

      6: { listId: 2, id: 6, name: 'Complete report', value: false },
      7: { listId: 2, id: 7, name: 'Attend meeting', value: true },
      8: { listId: 2, id: 8, name: 'Send emails', value: false },
      9: { listId: 2, id: 9, name: 'Prepare presentation', value: true },
      10: { listId: 2, id: 10, name: 'Plan project', value: false },

      11: { listId: 3, id: 11, name: 'Clean kitchen', value: true },
      12: { listId: 3, id: 12, name: 'Vacuum house', value: false },
      13: { listId: 3, id: 13, name: 'Wash dishes', value: false },
      14: { listId: 3, id: 14, name: 'Take out trash', value: true },
      15: { listId: 3, id: 15, name: 'Do laundry', value: false },

      16: { listId: 4, id: 16, name: 'Read chapter 1', value: true },
      17: { listId: 4, id: 17, name: 'Watch tutorial', value: false },
      18: { listId: 4, id: 18, name: 'Take notes', value: true },
      19: { listId: 4, id: 19, name: 'Complete exercises', value: false },
      20: { listId: 4, id: 20, name: 'Review material', value: false },

      21: { listId: 5, id: 21, name: 'Run 5km', value: false },
      22: { listId: 5, id: 22, name: 'Stretch for 15 minutes', value: true },
      23: { listId: 5, id: 23, name: 'Do 30 push-ups', value: false },
      24: { listId: 5, id: 24, name: 'Drink 2L of water', value: true },
      25: { listId: 5, id: 25, name: 'Track calories', value: false }
    },
    idsByList: {
      1: [1, 2, 3, 4, 5],
      2: [6, 7, 8, 9, 10],
      3: [11, 12, 13, 14, 15],
      4: [16, 17, 18, 19, 20],
      5: [21, 22, 23, 24, 25]
    }
  },
  user: {
    name: 'name'
  }
}
