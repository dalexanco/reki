
export default interface INativeJob<Input, Output> {
  run(params: Input): Promise<Output>;
}
