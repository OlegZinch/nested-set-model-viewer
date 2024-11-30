import { FC } from 'react'
import type { INode } from '../utils/tree'

import Styles from './TreeNode.module.css'

interface Props {
  node: INode
  onSelect: (node: INode) => void
}

const TreeNode: FC<Props> = ({ node, onSelect }) => {
  return (
    <li className={Styles.node}>
      <div className={Styles.title} onClick={() => onSelect(node)}>
        <span>
          {node.type}&nbsp;(ID: {node.id})
        </span>
        <span>Depth: {node.depth}</span>
      </div>
      {node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} onSelect={onSelect} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default TreeNode
