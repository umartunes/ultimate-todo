import { setTodosAction, pushTodosAction, removeTodoAction } from '../../redux/actions/actions-todos';



// INSERT TODO
test('should setup insert todo action object', () => {
    const result = pushTodosAction({ title: 'My Todo', location: 'Fsd', description: 'My Todo Test' });
    expect(result).toEqual({
        type: 'PUSH_TODOS',
        payload: { todo: { title: 'My Todo', location: 'Fsd', description: 'My Todo Test' } }
    })
});

// SHOW TODO
test('should setup set todo action object', () => {
    const result = setTodosAction({ title: 'My Todo', location: 'Fsd', description: 'My Todo Test' });
    expect(result).toEqual({
        type: 'SET_TODOS_PAYLOAD',
        payload: { todos: { title: 'My Todo', location: 'Fsd', description: 'My Todo Test' } }
    })
});

// REMOVE TODO
test('should setup remove todo action object', () => {
    const result = removeTodoAction('123');
    expect(result).toEqual({
        type: 'REMOVE_TODO',
        payload: { id: '123' }
    })
});