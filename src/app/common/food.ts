import { Option } from "./option";

export class Food {
    foodDescription?: string;
    foodImage?: string;
    foodName?: string;
    foodPrice?: number;
    foodType?: string;
    isOutOfStock?: boolean;
    options?: Option[];
    shopId?: number;
}
