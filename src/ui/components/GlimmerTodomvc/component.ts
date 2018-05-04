import Component, { tracked } from '@glimmer/component';

export default class GlimmerTodomvc extends Component {
  @tracked visibility = 'all';
  @tracked ids = ['0', '1'];
  @tracked byId = {
    0: { id: '0', description: 'Taste JavaScript', completed: true },
    1: { id: '1', description: 'Buy a unicorn', completed: false }
  };

  @tracked('ids', 'byId')
  get allTodos() {
    return this.ids.map(id => this.byId[id]);
  }

  @tracked('allTodos')
  get completedTodos() {
    return this.allTodos.filter(t => t.completed);
  }

  @tracked('allTodos')
  get activeTodos() {
    return this.allTodos.filter(t => !t.completed);
  }

  @tracked('visibility', 'allTodos')
  get visibleTodos() {
    return {
      all: this.allTodos,
      active: this.activeTodos,
      completed: this.completedTodos
    }[this.visibility];
  }

  viewAll() { this.visibility = 'all'; }
  viewActive() { this.visibility = 'active'; }
  viewCompleted() { this.visibility = 'completed'; }

  @tracked('visibility')
  get viewingAll() { return this.visibility === 'all' }

  @tracked('visibility')
  get viewingActive() { return this.visibility === 'active' }

  @tracked('visibility')
  get viewingCompleted() { return this.visibility === 'completed' }

  toggleTodo(id) {
    this.byId = {
      ...this.byId,
      [id]: {
        ...this.byId[id],
        completed: !this.byId[id].completed
      }
    };
  }

  toggleEditing(id) {
    this.byId = {
      ...this.byId,
      [id]: {
        ...this.byId[id],
        editing: !this.byId[id].editing
      }
    };
  }

  updateTodoDescription(id, ev) {
    this.byId = {
      ...this.byId,
      [id]: {
        ...this.byId[id],
        description: ev.target.value
      }
    };
  }

  deleteTodo(id) {
    this.ids = this.ids.filter(tid => tid !== id);
    delete this.byId[id];
  }

  addTodo(description) {
    const id = String((new Date()).getTime());
    this.byId = {
      ...this.byId,
      [id]: {
        completed: false,
        description,
        id
      }
    };
    this.ids = this.ids.concat(id);
  }

  maybeAddTodo(ev) {
    if (ev.keyCode === 13) {
      this.addTodo(ev.target.value);
      ev.target.value = '';
    }
  }

  maybeToggleEditing(id, ev) {
    if (ev.keyCode === 13) {
      this.toggleEditing(id);
    }
  }

  toggleAll() {
    const allDone = !this.ids.find(id => !this.byId[id].completed);
    this.byId = this.ids.reduce(
      (byId, id) => ({
        ...byId,
        [id]: {
          ...this.byId[id],
          completed: !allDone
        }
      }),
      {}
    );
  }

  clearCompleted() {
    this.ids = this.ids.filter(id => !this.byId[id].completed);
    this.byId = this.ids.reduce(
      (byId, id) => ({
        ...byId,
        [id]: this.byId[id]
      }),
      {}
    );
  }
}
