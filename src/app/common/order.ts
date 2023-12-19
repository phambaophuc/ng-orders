import { Food } from "./food";

export class Order {
    key?: string;
    address?: string;
    dateScheduled?: string;
    timeScheduled?: string;
    foods?: Food[];
    isScheduled?: boolean;
    name?: string;
    paymentMethod?: string;
    phoneNumber?: string;
    shopId?: string;
    status?: string;
    cancellationReason?: string;
    acceptedTime?: string;
    acceptedDate?: string;
    userId?: string;
}
