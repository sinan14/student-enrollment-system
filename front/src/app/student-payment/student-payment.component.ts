import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-payment',
  templateUrl: './student-payment.component.html',
  styleUrls: ['./student-payment.component.css'],
})
export class StudentPaymentComponent implements OnInit {
  id: string;
  Student = {
    Status: 'Active',
  };
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['_id'];
  }
  editProfile(item: any) {
    return this.http
      .put(`http://localhost:3000/students/${this.id}`, { Student: item })
      .subscribe((data) => {
        console.log(data);
      });
  }
  updateProfile() {
    this.editProfile(this.Student);
    this.router.navigate([`/students/${this.id}`]);
  }
}
