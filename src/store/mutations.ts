import { MutationTree } from 'vuex'
import MutationTypes from './mutation-types'
import State from './state'
import { HttpRequestModel } from '../models/HttpRequestModel'

export type Mutations<S = State> = {
  [MutationTypes.OVERRIDE_REQUEST](state: S, payload: HttpRequestModel): void,
  [MutationTypes.OVERRIDE_RAW_REQUEST](state: S, payload: string): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.OVERRIDE_REQUEST](state, payload: HttpRequestModel) {
    state.request = payload
  },
  [MutationTypes.OVERRIDE_RAW_REQUEST](state, payload: string) {
    state.raw = payload
  },
}
