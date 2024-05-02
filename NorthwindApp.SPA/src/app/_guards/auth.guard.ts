import { inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { map } from "rxjs";
import { UsersService } from "../_services/users.service";
import { Router } from "@angular/router";

export const AuthGuard = () => {
    const userService = inject(UsersService);
    const toastr = inject(ToastrService);
    const router = inject(Router);

    return userService.currentUser$.pipe(
        map(user => {
            if (user) return true;
            else {
                toastr.error('User not logged!!');
                router.navigate(['/home']);
                return false;
            }
        })
    )
};
