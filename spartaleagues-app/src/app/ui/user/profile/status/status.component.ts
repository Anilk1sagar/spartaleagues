import { Component, OnInit } from '@angular/core';
import { ParticipateService } from '../../../../services/api';
import { LocalStorageService } from '../../../../services';
import { PartcipantsUser } from '../../../../models';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

	// Login User
	user: any;
	// Participant User
	Puser: any;

	_tabsData: any;

	_selectedTab: string;
	selectedTabGame: string;


	constructor(private participatService: ParticipateService, private localSS: LocalStorageService) {
		
	}

	ngOnInit() {
		this.user = this.localSS.getUser();

		this.participatService.getParticipantUserStatus(this.user.email).subscribe(data => {

			console.log(data.length);

			if(data.length == 0) {
				console.log("No Particpant Users Found!");
			} else {

				this.selectedTabGame = data[0].gameName;
				console.log("Service data: ", data);
				this._tabsData = data;

				// Store Data From Local Storage
				localStorage.setItem('ProfileStatus', JSON.stringify(data));

				// Calling Selected Tab First Time
				this.getSelectedTab();

				//this.Puser = this.filterData(data, 'CS:GO', 1)[0];
			}
		});
	}

	// Get Data From Local Storage
	getData() {
		return JSON.parse(localStorage.getItem("ProfileStatus"));
	}

	// Filter Competetion Data
	filterData(pData, pKey: string, pLength): any[] {
		let count = 0;
		let data = [];
		let length = pData.length;

		for(let i = 0; i <= pData.length; i++) {

			let name: string = pData[i].gameName;

			if(name.toLowerCase().includes(pKey.toLowerCase())) {
				count++;

				data.push(pData[i]);

				if(count == pLength){

					return data;
				}
				
			}

		}
		
		return data;
	}


	// Get Player Mode
	getSelectedTab() {
		this._selectedTab = this.selectedTabGame;
		//console.log(this._selectedTab);

		let data = this.getData();

		this.Puser = this.filterData(data, this._selectedTab, 1)[0];

	}
}
