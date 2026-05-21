import { loginApi } from './api/index.js'

export async function authenticateWithCredentials(email, password) {
  try {
    const { user, accessToken } = await loginApi(email, password)
    return { ...user, token: accessToken }
  } catch {
    return null
  }
}
