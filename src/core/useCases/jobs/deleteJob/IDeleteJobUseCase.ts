export interface IDeleteJobUseCase {
  execute(id: string): Promise<void>;
}
