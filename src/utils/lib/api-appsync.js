// src/utils/lib/api-appsync.js
import { API, graphqlOperation } from 'aws-amplify'
import uuid from 'uuid/v4'

// 위에서 정의한 GraphQL 쿼리 코드들을 불러옵니다
import mutateCreateTodo from '../../queries/createTodo'
import mutateUpdateTodo from '../../queries/updateTodo'
import mutateDeleteTodo from '../../queries/deleteTodo'
import queryGetTodoList from '../../queries/getTodoList'

// 'aws-amplify' 라이브러리의 API 함수를 사용하여 graphql 요청을 보냅니다
// 1. 모든 할일 목록을 불러옵니다
const getTodoList = () => {
  return API.graphql(graphqlOperation(queryGetTodoList))
}

// 2. 새로운 할일을 생성합니다
// 이때, 생성될 할일의 정보를 객체 형태로 전달합니다
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

// 3. 기존의 할일을 수정합니다
// 이때, 수정될 대상 할일에 대한 정보를 `id` 속성으로 전달하고,
// 수정할 정보를 다른 속성들을 통하여 전달합니다
const updateTodo = (id, prevStatus) => {
  return API.graphql(graphqlOperation(mutateUpdateTodo, {
    input: {
      id: id,
      status: (prevStatus === 'PENDING' ? 'DONE' : 'PENDING'),
      date: new Date().getTime(),
    }
  }))
}

// 4. 기존의 할일을 제거합니다
// 제거 대상 할일은 `id` 속성으로 전달합니다
const deleteTodo = (id) => {
  return API.graphql(graphqlOperation(mutateDeleteTodo, { input: { id } }))
}

// 객체 형태로 내보냅니다
// 외부에서 이 파일을 불러오면, 객체를 다루듯이 API 호출 함수에 접근할 수 있게 됩니다
export default {
  getTodoList,
  createTodo,
  updateTodo,
  deleteTodo,
}