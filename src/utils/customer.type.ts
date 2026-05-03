export interface CustomerProps{
    id: string;
    userId: string | null;
    name: string;
    phone: string;
    email: string;
    address?: string | null;
    created_at: Date | null;
    updated_at: Date | null;
}