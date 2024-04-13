import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/api/auth.service';

@Component({
  selector: 'app-participate',
  templateUrl: './participate.component.html',
  styleUrls: ['./participate.component.scss']
})
export class ParticipateComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit() {
	}

}
