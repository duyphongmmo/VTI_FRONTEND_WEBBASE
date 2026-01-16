import { matchPath } from 'react-router-dom'

export function matchPathList(pathname, paths = []) {
  for (let path of paths) {
    const match = matchPath(pathname, { path })
    if (match?.isExact) return true
  }
  return false
}
