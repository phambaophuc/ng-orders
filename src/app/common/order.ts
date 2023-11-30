import { Food } from "./food";

export class Order {
    address?: string;
    dateScheduled?: Date;
    foods?: Food[];
    isScheduled?: boolean;
    name?: string;
    paymentMethod?: string;
    phoneNumber?: string;
    shopId?: string;
    status?: Status;
    timeScheduled?: Date;
    userId?: string; 
}
