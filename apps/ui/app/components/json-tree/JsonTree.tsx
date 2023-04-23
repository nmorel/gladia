import {JSONTree} from 'react-json-tree'
import {theme} from './theme'

export function JsonTree<T>({
  data,
  expandNode = 1,
}: {
  data: T
  expandNode?: number | ((path: readonly (string | number)[], level: number) => boolean)
}) {
  const shouldExpandNodeInitially = (
    path: readonly (string | number)[],
    _: unknown,
    level: number
  ) => {
    if (typeof expandNode === 'function') {
      return expandNode(path, level)
    } else {
      return level <= expandNode
    }
  }
  return (
    <JSONTree
      data={data}
      theme={theme}
      invertTheme
      sortObjectKeys
      hideRoot
      shouldExpandNodeInitially={shouldExpandNodeInitially}
    />
  )
}
