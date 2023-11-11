import { Section } from "./section";

export class Shop {
    key?: string;
    closingTime?: string;
    isOpening?: boolean;
    openingTime?: string;
    ratingScore?: number;
    sections?: Section[];
    shopAddress?: string;
    shopImage?: string;
    shopName?: string;
}
