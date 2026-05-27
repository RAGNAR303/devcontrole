export interface TicketProps {
    id: string;
    tickeCode: string | null
    name: string;
    created_at: Date | null;
    updated_at: Date | null;
    userId: string | null;
    description: string;
    status: string;
    customerId: string | null;

}