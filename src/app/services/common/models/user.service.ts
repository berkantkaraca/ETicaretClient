import { Injectable } from '@angular/core';
import { Toast } from 'ngx-toastr';
import { firstValueFrom, observable, Observable } from 'rxjs';
import { User } from '../../../entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';
import { Create_User } from 'src/app/contracts/users/create_user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    }, user);

    return await firstValueFrom(observable) as Create_User;
  }

  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void) : Promise<void> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "users",
      action: "login"
    }, { userNameOrEmail, password })
    
    await firstValueFrom(observable);

    callBackFunction();
  }
}
