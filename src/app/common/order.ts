import { Food } from "./food";

export class Order {
    key?: string;
    address?: string;
    dateScheduled?: Date;
    foods?: Food[];
    isScheduled?: boolean;
    name?: string;
    paymentMethod?: string;
    phoneNumber?: string;
    shopId?: string;
    status?: string;
    timeScheduled?: Date;
    userId?: string; 
}
