import { API, graphqlOperation } from 'aws-amplify'
import uuid from 'uuid/v4'

import {
  mutateCreateTodo,
  mutateUpdateTodo,
  mutateDeleteTodo,
  queryGetTodoList,
} from '../../graphql'

const getTodoList = () => {
  return API.graphql(graphqlOperation(queryGetTodoList))
}

const createTodo = (desc) => {
  return API.graphql(graphqlOperation(mutateCreateTodo, {
    input: {
      id: uuid(),
      desc: desc,
      status: 'PENDING',
      date: new Date().getTime(),
    }
  }))
}

const updateTodo = (id, prevStatus) => {
  return API.graphql(graphqlOperation(mutateUpdateTodo, {
    input: {
      id: id,
      status: (prevStatus === 'PENDING' ? 'DONE' : 'PENDING'),
      date: new Date().getTime(),
    }
  }))
}

const deleteTodo = (id) => {
  return API.graphql(graphqlOperation(mutateDeleteTodo, { input: { id } }))
}

export default {
  getTodoList,
  createTodo,
  updateTodo,
  deleteTodo,
}