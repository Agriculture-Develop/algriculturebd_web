const baseUrl = 'http://47.115.160.54:28080/api/v1'

export const avatar = (filename) => {
  return filename ? `${baseUrl}/files/avatar/${filename}` : ''
}

export const goodImg = (filename) => {
  return filename ? `${baseUrl}/files/good/${filename}` : ''
}
export const newsImg = (filename) => {
  return filename ? `${baseUrl}/files/news/${filename}` : ''
}
