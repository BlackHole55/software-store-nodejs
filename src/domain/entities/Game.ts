export interface Game {
    id?: string;
    publisher_id: string;
    developer_id: string;
    emulation_id?: string;
    user_id?: string;
    original_system: string;
    title: string;
    description?: string;
    release_date?: Date;
    price: number;
    is_verified: boolean;
    category?: string[];
    created_at: Date;
    updated_At: Date;
}