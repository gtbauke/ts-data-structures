export class ContainerDoesNotContain extends Error {
  public constructor (value: unknown) {
    super(`Container does not contain the value ${String(value)}`)
  }
}
