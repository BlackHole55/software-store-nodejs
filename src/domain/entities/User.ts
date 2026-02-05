export interface User {
    id?: string;
    username: string;
    email: string;
    role: "user" | "admin";
    password_hash?: string; 
    library: ILibrary[];
    createdAt: Date;
    updatedAt: Date | null;

}

export interface ILibrary {
    game_id: string;
    added_at: Date;
    playtime_hours: number;
}