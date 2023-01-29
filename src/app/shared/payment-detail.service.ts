import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import {HttpClient} from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  constructor(private http:HttpClient) { }

  formData:PaymentDetail = new PaymentDetail();
  list:PaymentDetail[];
  readonly baseURL = 'https://localhost:44311/api/PaymentDetail';

  postPaymentDetail()
  {
    return this.http.post(this.baseURL,this.formData);
  }

  async refreshList()
  {
    return await lastValueFrom(this.http.get(this.baseURL)).then(res => this.list = res as PaymentDetail[]);
  }

  putPaymentDetail()
  {
    return this.http.put(this.baseURL,this.formData);
  }

  deletePaymentDetail(id:number)
  {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
