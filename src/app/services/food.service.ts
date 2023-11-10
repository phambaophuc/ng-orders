import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Food } from '../common/food';

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
        return this.foodRef.valueChanges();
    }
}
