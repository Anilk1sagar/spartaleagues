import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/api';
import { LocalStorageService } from '../../../services';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

	public static BASE_URL: string = environment.baseUrl;

	user: any;

	//Test Url = http://localhost:4040/api/payments/paymentStatus
	// Prod = https://www.spartaleagues.com/api/payments/paymentStatus

	// test Card no. = 4012001037141112;
	// Payment form
	// Test mkey = gtKFFx , Prod mkey = 7FB28Cnk

	redirectUrl: String = CheckoutComponent.BASE_URL + 'payments/paymentStatus';


	mkey:String = 'gtKFFx';
    productInfo:String = 'SpartaLeagues Participate';
    txnid:String = this.makeid();
    amount:Number;
    id:String = '6140507';
    email:String = '';
    phone:Number;
    lastName:String = '';
    firstName:String = '';
	surl:String = this.redirectUrl;
	furl:String = this.redirectUrl;
    hash:String = '';

	constructor(private paymentS: PaymentService, private router: Router, private localSS: LocalStorageService) {

		this.user = this.localSS.getParticipantUser();
		console.log("Particpant User", this.user);

		// Get Competetion Price
		const playerMode = this.user.mode;

		//Set Amount By Player Mode
		if(playerMode == 'singlePlayerMode') {
			this.amount = this.localSS.getCompetetion().entryFees.singlePlayerMode;
		} else{ 
			this.amount = this.localSS.getCompetetion().entryFees.multiPlayerMode;
		}

		//console.log(this.amount);

		if(!this.user) {
			this.router.navigate(['/participate']);
		}
	}

	ngOnInit() {

		console.log("Checkout Redirect URL: ", this.redirectUrl);

	}

	makeid() {
		let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
			
        return text;
	}

	presubmit() {
		const data = { 
			preHashString: this.mkey + '|' + this.txnid + '|' + this.amount + '|' + this.productInfo + '|' + this.firstName + '|' + this.email + '|' + this.id + '||||||||||' 
		};

		// Creating hash 
		this.paymentS.createHash(data).subscribe(data => {
			if(data.success) {
				const hashElement = <HTMLInputElement>document.getElementById('hash');
				hashElement.value = data.hash;
				const SubmitElement = <HTMLFormElement>document.getElementById('paymentForm');
				SubmitElement.submit();
			}
		});
	}
}
