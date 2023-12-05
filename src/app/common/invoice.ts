import { Food } from "./food";

export class Invoice {
    key?: string;
    name?: string;
    phoneNumber?: string;
    address?: string;
    totalPrice?: number;
    createdDate?: string;
    foods?: Food[];
    shopId?: string;
    userId?: string;
}
