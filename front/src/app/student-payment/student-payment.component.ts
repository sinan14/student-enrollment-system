import { StudentServiceService } from './../student.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-payment',
  templateUrl: './student-payment.component.html',
  styleUrls: ['./student-payment.component.css'],
})
export class StudentPaymentComponent implements OnInit {
  id: string;
  fee: number;
  studentId: string;
  courseFee = {
    MeanStack: 21000,
    CyberSecurity: 24000,
    DataScience: 30000,
    Robotics: 25000,
  };
  Student = {
    _id: '',
    Name: '',
    Email: '',
    Course: '',
    State: '',
    Post: '',
    District: '',
    Status: 'Active',
    PaymentDate: new Date(),
  };
  constructor(
    private _StudentService: StudentServiceService,
    private _router: Router,
    private _http: HttpClient,
    private _activatedRoute: ActivatedRoute
  ) {}

  editProfile(studentPaymentInfo) {
    return this._http
      .put(`http://localhost:3000/students/${this.id}/pay`, {
        Student: {
          Course: `${this.Student.Course}`,
          Email: `${this.Student.Email}`,
          Status: 'Active',
          PaymentDate: new Date(),
        },
      })
      .subscribe(
        (response) => {
          if (response) {
            Swal.fire({
              title: 'Good Job',
              icon: 'success',
              text: 'payment accepted',
            });
          } else {
            Swal.fire({
              title: 'errpr',
              icon: 'error',
              text: 'something went wrong',
            });
          }
        },
        (errorMessage) => {
          Swal.fire('danger!!', 'some internal error', 'error');
        }
      );
  }
  updateProfile() {
    this.editProfile(this.Student);
  }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params['_id'];
    this._StudentService.fetchStudent(this.id).subscribe(
      (studentData: any) => {
        if (studentData.error) {
          this._router.navigate(['/error'], { state: studentData });
        }
        this.Student = JSON.parse(JSON.stringify(studentData));
        this.fee = this.courseFee[this.Student.Course];
        // console.log(this.Student);
      },
      (errorMessage) => {
        Swal.fire('danger!!', 'some internal error', 'error');
      }
    );
  }
}
