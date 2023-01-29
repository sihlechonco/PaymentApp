import { Component, OnInit } from '@angular/core';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service:PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateform(selectedRecord: PaymentDetail)
  {
    this.service.formData = Object.assign({},selectedRecord);
  }

  onDelete(id:number)
  {
    if(confirm("Are you sure you want to delete this data?"))
    {
      this.service.deletePaymentDetail(id).subscribe({
        error: (e) => console.error(e),
        complete: () => {this.service.refreshList(),this.toastr.error("Payment Details successfully deleted!","Payment Details Deleted")}
      });
    }
  }

}
