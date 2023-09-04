export class GraphEdge {
  public readonly startVertexIndex: number
  public readonly endVertexIndex: number
  public readonly weight: number

  public constructor (start: number, end: number, weight: number) {
    this.startVertexIndex = start
    this.endVertexIndex = end
    this.weight = weight
  }
}

export class GraphNode<T> {
  public readonly value: T
  public readonly edges: GraphEdge[]

  public constructor (value: T) {
    this.value = value
    this.edges = []
  }
}

export class Graph<T> {
  private readonly nodes: Array<GraphNode<T>>

  public constructor () {
    this.nodes = []
  }
}
