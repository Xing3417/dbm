import serviceAxios from '../index'
export const getcategory = (params) => {
  return serviceAxios({
    url: '/api/getparent',
    method: 'get',
    params
  })
}
export const getlogin = (params) => {
  return serviceAxios({
    url: '/api/login',
    method: 'post',
    params
  })
}
