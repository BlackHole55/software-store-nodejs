export interface User {
    id?: string;
    username: string;
    email: string;
    role: "user" | "admin";
    password_hash?: string; 
    library: IUserLibrary[];
    createdAt: Date;
    updatedAt: Date | null;

}

export interface IUserLibrary {
    game_id: string;
    added_at: Date;
    playtime_hours: number;
}