
import {
  createStore,
  createLogger,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import State from './state'
import { Getters, getters } from './getters'
import { Mutations, mutations } from './mutations'
import { Actions, actions } from './actions'
import MutationTypes from './mutation-types'
import { HttpRequestModel } from '@/models/HttpRequestModel'

export const store = createStore<State>({
  state: {
    request: undefined,
    raw: undefined,
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: {
  },
  plugins: [createLogger()],
})

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

export function useStore() {
  return store as Store
}

window.addEventListener("DOMContentLoaded", () => {
  window.ipc.on('open-file', (event, jsonRequest) => {
    const request = Object.assign(new HttpRequestModel(), JSON.parse(jsonRequest))
    console.log('detect open file : %o', request)
    store.commit(MutationTypes.OVERRIDE_REQUEST, request)
  })
})
