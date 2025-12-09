export class SessionDTO {
  constructor(
    public id: string,
    public user_id: string,
    public token: string,
    public created_at: Date,
    public expires_at: Date | null = null,
  ) {}
}
