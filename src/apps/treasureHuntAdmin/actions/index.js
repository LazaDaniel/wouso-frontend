import { apiRequest } from 'core/app/actions/api'
import {
  SET_QUESTION,
  SET_QUESTIONS,
  SET_QUEST,
  SET_QUESTS,
  SET_ACTIVE,
  SET_GRADEBOOK
} from './types'

export const postQuestion = question => dispatch => {
  return new Promise((resolve, reject) =>
    dispatch(
      apiRequest({
        method: 'POST',
        path: 'apps/wouso-treasure-hunt/questions',
        data: question,
        success: payload => () => {
          dispatch(setQuestion(payload))
          resolve(payload)
        },
        failure: err => () => {
          reject(err)
        }
      })
    )
  )
}

const setQuestion = question => {
  return {
    type: SET_QUESTION,
    payload: question
  }
}

export const getQuestions = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiRequest({
        method: 'GET',
        path: 'apps/wouso-treasure-hunt/questions',
        success: payload => dispatch => {
          dispatch(setQuestions(payload))
          resolve(payload)
        },
        failure: err => () => {
          reject(err)
        }
      })
    )
  )

const setQuestions = questions => {
  return {
    type: SET_QUESTIONS,
    payload: questions
  }
}

export const getActive = id => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiRequest({
        method: 'GET',
        path: `apps/wouso-treasure-hunt/active/${id}`,
        success: payload => dispatch => {
          dispatch(setActive(payload))
          resolve(payload)
        },
        failure: err => () => {
          reject(err)
        }
      })
    )
  )

const setActive = active => {
  return {
    type: SET_ACTIVE,
    payload: active
  }
}

export const postQuest = quest => dispatch => {
  return new Promise((resolve, reject) =>
    dispatch(
      apiRequest({
        method: 'POST',
        path: 'apps/wouso-treasure-hunt/sessions',
        data: quest,
        success: payload => () => {
          dispatch(setQuest(payload))
          resolve(payload)
        },
        failure: err => () => {
          reject(err)
        }
      })
    )
  )
}

const setQuest = quest => {
  return {
    type: SET_QUEST,
    payload: quest
  }
}

export const getQuests = () => dispatch => {
  return new Promise((resolve, reject) =>
    dispatch(
      apiRequest({
        method: 'GET',
        path: 'apps/wouso-treasure-hunt/sessions',
        success: payload => () => {
          dispatch(setQuests(payload))
          resolve(payload)
        },
        failure: err => () => {
          reject(err)
        }
      })
    )
  )
}

const setQuests = quest => {
  return {
    type: SET_QUESTS,
    payload: quest
  }
}

export const answerQuestion = (sessionId, answer) => dispatch => {
  return new Promise((resolve, reject) =>
    dispatch(
      apiRequest({
        method: 'POST',
        path: 'apps/wouso-treasure-hunt/active',
        data: { sessionId, answer },
        success: payload => () => {
          // console.log(payload)
          resolve(payload)
        },
        failure: err => () => {
          reject(err)
        }
      })
    )
  )
}

export const getGradebook = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiRequest({
        method: 'GET',
        path: `apps/wouso-treasure-hunt/active/gradebook`,
        success: payload => dispatch => {
          dispatch(setGradebook(payload))
          resolve(payload)
        },
        failure: err => () => {
          reject(err)
        }
      })
    )
  )

const setGradebook = gradebook => {
  return {
    type: SET_GRADEBOOK,
    payload: gradebook
  }
}
