import { useEffect, useState } from 'react'

import TreeNode from './TreeNode'

import { getTree, type INode } from '../utils/tree'

import Styles from './Board.module.css'

const Board = () => {
  const [loading, setLoading] = useState(true)
  const [selectedNode, setSelectedNode] = useState<INode>()
  const [treeData, setTreeData] = useState<INode[]>([])

  useEffect(() => {
    getTree().then((tree) => {
      setLoading(false)
      setTreeData(tree || [])
    })
  }, [])

  return (
    <>
      {loading ? (
        <p className={Styles.loading}>Loading...</p>
      ) : (
        <div className={Styles.board}>
          <div className={Styles.column}>
            <h2>Nested Set Tree</h2>
            {treeData.length > 0 && !loading && (
              <ul>
                {treeData.map((node) => (
                  <TreeNode
                    key={node.id}
                    node={node}
                    onSelect={setSelectedNode}
                  />
                ))}
              </ul>
            )}
            <div>
              {treeData.length === 0 && !loading && <p>No data available</p>}
            </div>
          </div>

          <div className={Styles.column}>
            <h2>Selected Node</h2>
            <div className={Styles.result}>
              {selectedNode ? (
                <pre>{JSON.stringify(selectedNode, null, 2)}</pre>
              ) : (
                <p className={Styles.noselected}>No node selected</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Board
