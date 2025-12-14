export interface WialonRepository {
  login(): Promise<string>;
  getRawItems(sid: string): Promise<any[]>;
}
