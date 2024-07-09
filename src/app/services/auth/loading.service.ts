import { ChangeDetectorRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
    isLoading:Subject<boolean> = new BehaviorSubject(false);

    load() {
        this.isLoading.next(true);
    }

    loaded() {
        this.isLoading.next(false);
    }

    loading() {
        return this.isLoading;
    }
}
