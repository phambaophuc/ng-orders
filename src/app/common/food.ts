import { Option } from "./option";

export class Food {
    key?: string;
    foodDescription?: string;
    foodImage?: string;
    foodName?: string;
    foodPrice?: number;
    foodType?: string;
    isOutOfStock?: boolean;
    options?: Option[];
    shopId?: string;
}
