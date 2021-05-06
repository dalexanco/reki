import { ActionTree, ActionContext } from 'vuex'
import State from './state'
import { Mutations } from './mutations'
import ActionTypes from './action-types'
import MutationTypes from './mutation-types'
import { HttpRequestModel } from '../models/HttpRequestModel'
import HttpRequestDeserializer from '../parser/HttpRequestDeserializer'
import HttpRequestSerializer from '../parser/HttpRequestSerializer'

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
  async [ActionTypes.ON_REQUEST_RAW_CHANGE]({ commit }, rawValue: string) {
    const deserializer = new HttpRequestDeserializer()
    const generatedRequest = await deserializer.parse(rawValue)
    const serializer = new HttpRequestSerializer();
    const rawSerialized = await serializer.parse(generatedRequest)
    commit(MutationTypes.OVERRIDE_RAW_REQUEST, rawSerialized)
    commit(MutationTypes.OVERRIDE_REQUEST, generatedRequest)
    return generatedRequest;
  },
}
