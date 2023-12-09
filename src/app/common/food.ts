import { Option } from "./option";

export class Food {
    key?: string;
    foodDescription?: string;
    foodImage?: string;
    foodName?: string;
    foodPrice?: number;
    foodType?: string;
    foodNote?: string;
    isOutOfStock?: boolean;
    options?: Option[];
    sectionId?: string;
    shopId?: string;
}
