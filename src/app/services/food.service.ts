import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, map, take } from 'rxjs';
import { Food } from '../common/food';
import { Option } from '../common/option';

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

    getOptionByFood(foodKey: string): Observable<any> {
        const path = `${this.baseObject}/${foodKey}/options`;

        return this.db.list(path).snapshotChanges().pipe(
            map(changes => changes.map(
                c => {
                    const payloadVal = c.payload.val();
                    return payloadVal ? { key: c.payload.key, ...payloadVal } : null;
                }
            ))
        );
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
}
