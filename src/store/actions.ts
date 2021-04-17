import { ActionTree, ActionContext } from 'vuex'
import State from './state'
import { Mutations } from './mutations'
import ActionTypes from './action-types'
import MutationTypes from './mutation-types'
import HttpRequestModel from './state/HttpRequestModel'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [ActionTypes.ON_REQUEST_RAW_CHANGE](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<HttpRequestModel>
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.ON_REQUEST_RAW_CHANGE]({ commit }, rawValue: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const generatedRequest: HttpRequestModel = { raw: rawValue }
        commit(MutationTypes.OVERRIDE_REQUEST, generatedRequest)
        resolve(generatedRequest)
      }, 2000)
    })
  },
}
