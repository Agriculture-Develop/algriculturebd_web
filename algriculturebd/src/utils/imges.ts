import { BASE_URL } from './config'

const baseUrl = BASE_URL

export const avatar = (filename) => {
  return filename ? `${baseUrl}/files/avatar/${filename}` : ''
}

export const goodImg = (filename) => {
  return filename ? `${baseUrl}/files/good/${filename}` : ''
}
export const newsImg = (filename) => {
  return filename ? `${baseUrl}/files/news/${filename}` : ''
}
