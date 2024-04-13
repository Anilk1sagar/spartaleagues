import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../../services/api';
import { LocalStorageService } from '../../../services';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
	selector: 'app-payment-status',
	templateUrl: './payment-status.component.html',
	styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {
	
	user: any;
	count: Number = 0;

	status:String;
	payment_id:String;
	txnId:String;

	constructor(private route: ActivatedRoute, private paymentS: PaymentService, private flashMessage:FlashMessagesService, private localSS: LocalStorageService) {
		
		this.user = this.localSS.getParticipantUser();
		// Getting parameter
		this.route.params.subscribe(params => {
			this.payment_id = params['payment_id'];
			this.txnId = params['txnId'];
			this.status = params['status'];

			const paymentStatus = {
				payment_id: this.payment_id,
				txnId: this.txnId
			}

			this.localSS.storePaymentStatus(paymentStatus);

			if(this.status == 'success') {
				if(this.count < 1) {
					this.addParticipantUser();
					this.sendInvoice();
				} else {
					// If invoice sent already
					this.flashAlert('Invoice already sent!', 'flashMeassage-danger', 3000);
				}
				localStorage.removeItem('ParticipateUser');
			}
		});
	}

	ngOnInit() {
	}

	//Add user after payment success
	addParticipantUser() {
		console.log("Add participant user Function!");

		// Get Payment Details
		const paymentStatus = this.localSS.getPaymentStatus();
		// Get Competetion Details
        const competetion = this.localSS.getCompetetion();

        const pData = {
            competetionName: competetion.name,
            competetionDate: competetion.date,
            gameName: competetion.gameName,
            payment_id: paymentStatus.payment_id,
			txnId: paymentStatus.txnId,
			mode: this.user.mode,
            teamName: this.user.teamName.toLowerCase(),
			contact: this.user.contact,
            emails: this.user.emails
        }

		console.log("Add participant User Data: " , pData);

		this.paymentS.addParticipantUser(pData).subscribe(data => {
			if(data.success) {
				this.count = 1;
				this.flashAlert(data.msg, 'flashMeassage-success', 5000);
			} else {
				this.count = 0;
				this.flashAlert(data.msg, 'flashMeassage-success', 7000);
			}
		});
	}

	//Send Payment Invoice
	sendInvoice() {
		console.log("Send Invoice Function runs!");

		const paymentStatus = this.localSS.getPaymentStatus();
		const competetion = this.localSS.getCompetetion();

		// Check Participant User Mode And set Amount
		let amount: Number;
		if(this.user.mode == 'singlePlayerMode') {
			amount = competetion.entryFees.singlePlayerMode;
		} else {
			amount = competetion.entryFees.multiPlayerMode;
		}

        const pData = {
            competetionName: competetion.name,
            amount: amount,
            payment_id: paymentStatus.payment_id,
            txnId: paymentStatus.txnId,
            emails: this.user.emails
        }

		console.log("Payment Invoice Data: " , pData);

		// Calling Checkout Service API
		this.paymentS.sendPaymentInvoice(pData).subscribe(data => {
			if(data.success) {
				this.count = 1;
				this.flashAlert(data.msg, 'flashMeassage-success', 3000);
			} else {
				this.count = 0;
			}
		});
	}


	flashAlert(msg, type, time) {
		this.flashMessage.show(msg, {cssClass: type, timeout: time});
	}
}
