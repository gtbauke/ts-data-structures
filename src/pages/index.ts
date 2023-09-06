import { BinaryTree } from '../graphs/binary-tree/binary-tree'

function main (): void {
  const app = document.getElementById('app')

  if (app === null) {
    return
  }

  const binaryTree = new BinaryTree()
  binaryTree.insert(10)
  binaryTree.insert(5)
  binaryTree.insert(15)

  binaryTree.inOrderTraversal((node) => {
    const nodeElement = document.createElement('div')
    nodeElement.innerText = String(node.value)
    nodeElement.classList.add('node')

    app.appendChild(nodeElement)
  })
}

main()
