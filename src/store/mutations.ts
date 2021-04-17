import { MutationTree } from 'vuex'
import MutationTypes from './mutation-types'
import State from './state'
import HttpRequestModel from './state/HttpRequestModel'

export type Mutations<S = State> = {
  [MutationTypes.OVERRIDE_REQUEST](state: S, payload: HttpRequestModel): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.OVERRIDE_REQUEST](state, payload: HttpRequestModel) {
    state.request = payload
  },
}
