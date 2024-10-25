import { instance } from '../../index'

export type GetUserRequestConfig = RequestConfig

export const getUser = async (params?: GetUserRequestConfig) =>
  instance.get<UserResponse>('/user', params?.config)

export const logoutUser = async (params?: GetUserRequestConfig) =>
  instance.get('/logout', params?.config)
