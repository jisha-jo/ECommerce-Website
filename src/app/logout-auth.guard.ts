import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logoutAuthGuard: CanActivateFn = (route, state) => {

  const token=sessionStorage.getItem('token')
  const router=inject(Router)
  if(token){
    router.navigate(['home'])
    return false
  }else{
    return true
  }
  return true;
};
