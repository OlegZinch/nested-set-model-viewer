export enum TYPES {
  LISTEN = 'LISTEN',
  WAIT = 'WAIT',
  ACTION = 'ACTION',
  DECISION = 'DECISION',
  DECISION_ITEM = 'DECISION_ITEM',
}

interface INodeRaw {
  id: number
  lft: number
  rgt: number
  type: TYPES
}

export type INode = INodeRaw & {
  depth: number
  children: INode[]
}

interface IItem {
  [key: number]: INodeRaw
  depth: number
}

const transformToTree = (data: IItem[]) => {
  const stack: INode[] = []
  const tree: INode[] = []

  data.forEach((item) => {
    const node = { ...item['0'], depth: item.depth, children: [] }

    while (stack.length && stack[stack.length - 1].rgt < node.lft) {
      stack.pop()
    }

    if (stack.length) {
      stack[stack.length - 1].children.push(node)
    } else {
      tree.push(node)
    }

    stack.push(node)
  })

  return tree
}

export const getTree = async () => {
  let tree: INode[] = []
  try {
    const response = await fetch('https://api.mocki.io/v2/7brybvwl')
    if (!response.ok) {
      throw new Error('Failed to fetch cards')
    }
    const data: IItem[] = await response.json()
    tree = transformToTree(data)
    return tree
  } catch (error) {
    console.log(error)
    return tree
  }
}
