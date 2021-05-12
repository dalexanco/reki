
import HttpRequestSerializer from '@/parser/HttpRequestSerializer'
import { GetterTree } from 'vuex'
import State from './state'

export type Getters = {
  requestRaw(state: State): string
}

export const getters: GetterTree<State, State> & Getters = {
  requestRaw: (state) => {
    console.log("getters ! %o", state.request)
    if (!state.request) return '';
    const serializer = new HttpRequestSerializer()
    return serializer.parse(state.request)
  },
}
