export interface Game {
    id?: string;
    publisherId: string;
    developerId: string;
    emulationId?: string;
    userId?: string;
    originalSystem: string;
    title: string;
    description?: string;
    releaseDate?: Date;
    price: number;
    isVerified: boolean;
    category?: string[];
    createdAt: Date;
    updatedAt: Date;
}