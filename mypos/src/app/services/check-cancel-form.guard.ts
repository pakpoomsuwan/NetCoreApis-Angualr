import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CheckCancelFormGuard implements CanDeactivate<any> {
  constructor(private location: Location,private router: Router){}
  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (component.mIsSubmitted) {
      return true;
    }
    // mIsSubmitted is status submit of StockCreateComponent, StockEditComponent
    // Fix wrong route history error
    const currentUrlTree = this.router.createUrlTree([], currentRoute);
    this.location.go(currentUrlTree.toString());
    return window.confirm('Are you sure?');
  }


}
