export function setLocalStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
export function getLocalStore(key) {
  return JSON.parse(localStorage.getItem(key))
}
export function remLocalStore(key) {
  localStorage.removeItem(key)
}
export function setSessStore(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value))
}
export function getSessStore(key) {
  return JSON.parse(sessionStorage.getItem(key))
}
export function remSessStore(key) {
  sessionStorage.removeItem(key)
}
