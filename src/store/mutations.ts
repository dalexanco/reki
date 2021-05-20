import { MutationTree } from 'vuex'
import MutationTypes from './mutation-types'
import State from './state'
import { HttpRequestModel } from '../models/HttpRequestModel'
import { HttpRequestHeaderModel } from '@/models/HttpRequestHeaderModel'

export type Mutations<S = State> = {
  [MutationTypes.OVERRIDE_REQUEST](state: S, payload: HttpRequestModel): void,
  [MutationTypes.OVERRIDE_RAW_REQUEST](state: S, payload: string): void,
  [MutationTypes.PATCH_REQUEST_HEADER](state: S, payload: HttpRequestHeaderModel): void,

}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.OVERRIDE_REQUEST](state, payload: HttpRequestModel) {
    state.request = payload
  },
  [MutationTypes.OVERRIDE_RAW_REQUEST](state, payload: string) {
    state.raw = payload
  },
  [MutationTypes.PATCH_REQUEST_HEADER](state, payload: HttpRequestHeaderModel) {
    const header = state.request?.getHeader(payload.id)
    if (!header) return;
    header.key = payload.key
    header.value = payload.value
  },
}
