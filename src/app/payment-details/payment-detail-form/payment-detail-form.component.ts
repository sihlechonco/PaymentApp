import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrls: ['./payment-detail-form.component.css']
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service:PaymentDetailService, private toastr: ToastrService) { } 

  ngOnInit(): void {
  }

  onSubmit(form:NgForm)
  { 
    if(this.service.formData.paymentDetailId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm)
  {
    this.service.postPaymentDetail().subscribe({
      error: (e) => console.error(e),
      complete: () => {this.resetForm(form),this.service.refreshList(), this.toastr.success("Payment Details successfully stored!","Payment Details Registered")}
    });
  }

  updateRecord(form:NgForm)
  {
    this.service.putPaymentDetail().subscribe({
      error: (e) => console.error(e),
      complete: () => {this.resetForm(form),this.service.refreshList(),  this.toastr.info("Payment Details successfully updated!","Payment Details Registered")}
    });
  }

  resetForm(form:NgForm)
  {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }
}
