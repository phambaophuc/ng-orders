import { Food } from './../common/food';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Option } from '../common/option';
import { OptionItem } from '../common/option-item';

@Injectable({
    providedIn: 'root'
})
export class FoodService {

    private baseObject = 'Foods';
    private foodRef: AngularFireList<Food>;

    constructor(private db: AngularFireDatabase) {
        this.foodRef = db.list(this.baseObject);
    }

    getAllFoods(): Observable<any> {
        return this.foodRef.snapshotChanges().pipe(
            map(changes => changes.map(
                c => ({ key: c.payload.key, ...c.payload.val() })
            ))
        );
    }

    addFood(newFood: Food): Promise<any> {
        const foodKey = this.foodRef.push(null!).key;
        
        return this.db.object(`${this.baseObject}/${foodKey}`).set(newFood);
    }

    deleteFood(key: string): Promise<void> {
        return this.foodRef.remove(key);
    }

    updateFood(key: string, updatedFood: any): Promise<any> {
        return this.foodRef.update(key, updatedFood);
    }

    addOptionFood(food: Food, option: Option) {
        if (!food.options) {
            food.options = [option];
        } else {
            food.options.push(option);
        }

        return this.foodRef.update(food.key!, food);
    }

    deleteOptionFood(food: Food, option: Option) {
        if (food.options) {
            food.options = food.options.filter(opt => opt !== option);
        }

        return this.foodRef.update(food.key!, food);
    }

    AddOptionItemFood(food: Food, optionIndex: number, optionItem: OptionItem) {
        if (food.options && optionIndex >= 0 && optionIndex < food.options.length) {
            // Kiểm tra xem food.options có tồn tại và optionIndex có nằm trong phạm vi mảng hay không
            const option = food.options[optionIndex];

            if (!option.optionList) {
                // Nếu option.optionList chưa tồn tại, tạo một mảng mới
                option.optionList = [];
            }
            option.optionList.push(optionItem);
        }

        return this.foodRef.update(food.key!, food);
    }

    deleteOptionItemFood(food: Food, optionIndex: number, optionItem: OptionItem) {
        if (food.options && optionIndex >= 0 && optionIndex < food.options.length) {
            const option = food.options[optionIndex];

            if (option.optionList) {
                // Lọc bỏ optionItem khỏi mảng optionList
                option.optionList = option.optionList.filter(opt => opt !== optionItem);
            }
        }

        return this.foodRef.update(food.key!, food);
    }
}
