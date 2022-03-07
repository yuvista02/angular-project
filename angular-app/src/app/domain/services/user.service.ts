import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userList$!: ReplaySubject<any>;

  public currentUserID!: number;
  
  constructor(private _httpClient: HttpClient) {}

  protected GetURLPrefix(): string {
    return `http://localhost:3000/posts`;
  }

  public ResetListObservable() {
    this.userList$ = new ReplaySubject<any>();
  }

  GetList(): Observable<any> {
    return this._httpClient.get<any>(`${this.GetURLPrefix()}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  GetById(id: number): Observable<any> {
    return this._httpClient.get(`${this.GetURLPrefix()}/${id}`);
  }

  public LoadList() {
    this._httpClient.get(`${this.GetURLPrefix()}`).subscribe((items: any) => {
      this.userList$.next(items);
    });
  }

  Create(user: any) {
    return this._httpClient.post<any>(`${this.GetURLPrefix()}`, user).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  Update(userUpdate: any, id: number) {
    return this._httpClient
      .put<any>(`${this.GetURLPrefix()}/${id}`, userUpdate)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  Remove(user: User) {
    return this._httpClient.delete(`${this.GetURLPrefix()}/${user.id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
