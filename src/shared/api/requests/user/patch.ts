import { instance } from '../../index'

export type UserRequest = {
  name: string
}

export type PatchUserRequestConfig = RequestConfig<UserRequest>

export const patchUser = async ({ params, config }: PatchUserRequestConfig) =>
  instance.patch<UserResponse>('/user', params, config)
