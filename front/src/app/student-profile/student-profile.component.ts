import { StudentServiceService } from './../student.service';
import { AuthService } from './../auth.service';
import { data } from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentModel } from './student.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent implements OnInit {
  id: string;
  image: '';
  changephoto: boolean;
  showEditButton: boolean;
  showDeleteButton: boolean;
  changeOption() {
    this.changephoto = !this.changephoto;
  }

  readonly: boolean = true;
  update() {
    this.readonly = !this.readonly;
  }
  discard() {
    this.readonly = !this.readonly;
    this.ngOnInit();
  }

  photoUpdateForm: FormGroup = new FormGroup({
    img: new FormControl(''),
  });
  studentUpdateForm: FormGroup;

  Student: StudentModel = {
    _id: '',
    Suid:'',
    image: {
      data: {},
      contentType: '',
    },
    imageUrl: '',
    Name: '',
    Email: '',
    Phone: '',
    State: '',
    HighestQualification: '',
    PassOfYear: '',
    SkillSet: '',
    EmploymentStatus: '',
    Course: '',
    DOB: '',
    Password: '',
  };

  constructor(
    private _http: HttpClient,
    private _ActivatedRoute: ActivatedRoute,
    private _router: Router,
    private _auth: AuthService,
    private _studentService: StudentServiceService
  ) {}

  isAllowedToEdit() {
    if (
      this._auth.loggedIn() &&
      (this._auth.getUser() == 'admin' || this._auth.getUser() == 'user')
    ) {
      console.log('true');
      this.showEditButton = true;
      return true;
    } else {
      // this._router.navigate(['/'])
      this.showDeleteButton = false;
      return false;
    }
  }

  isAdmin() {
    if (this._auth.loggedIn() && this._auth.getUser() == 'admin') {
      this.showDeleteButton = true;
      return true;
    } else {
      this.showDeleteButton = false;
      return false;
    }
  }

  ngOnInit(): void {
    this.isAllowedToEdit();
    this.isAdmin();
    this.changephoto = false;
    this.readonly = true;
    this.id = this._ActivatedRoute.snapshot.params['_id'];

    this._studentService.fetchStudent(this.id).subscribe(
      (studentData: any) => {
        if (studentData.error) {
          this._router.navigate(['/error'], { state: studentData });
        }
        this.Student = JSON.parse(JSON.stringify(studentData));
        console.log(this.Student);
        this.Student.imageUrl = this.arrayBufferToBase64(
          this.Student.image.data.data
        );
        this.studentUpdateForm = new FormGroup({
          Name: new FormControl(this.Student.Name, [Validators.required]),
          Email: new FormControl(this.Student.Email, [Validators.required]),
          Phone: new FormControl(this.Student.Phone, [Validators.required]),
          State: new FormControl(this.Student.State, [Validators.required]),
          HighestQualification: new FormControl(
            this.Student.HighestQualification,
            [Validators.required]
          ),
          PassOfYear: new FormControl(this.Student.PassOfYear, [
            Validators.required,
          ]),
          SkillSet: new FormControl(this.Student.SkillSet, [
            Validators.required,
          ]),
          EmploymentStatus: new FormControl(this.Student.EmploymentStatus, [
            Validators.required,
          ]),
          Course: new FormControl(this.Student.Course, [Validators.required]),
          DOB: new FormControl(this.Student.DOB, [Validators.required]),
          Password: new FormControl(this.Student.Password, [
            Validators.required,
          ]),
          // img:new FormControl('')
        });
      },
      (errorMessage) => {
        Swal.fire('danger!!', 'some internal error', 'error');
      }
    );
  }
  editProfile(item: any) {
    return this._http.put(
      `http://localhost:3000/students/${this.Student._id}`,
      {
        Student: item,
      }
    );
  }
  updateStudent() {
    // console.log(this.studentUpdateForm.value);
    if (
      this.studentUpdateForm.invalid &&
      this._auth.loggedIn &&
      (this._auth.getUser() == 'admin' || this._auth.getUser() == 'user')
    ) {
      console.log(this.studentUpdateForm.value);
      return;
    }
    this.editProfile(this.studentUpdateForm.value).subscribe(
      (studentData: any) => {
        if (studentData.error) {
          Swal.fire({
            title: 'warning!!',
            text: 'something went wrong',
            icon: 'error',
            timer: 500,
            showConfirmButton: false,
          }).then((refresh) => {
            this.readonly = !this.readonly;
            this._router.navigate(['/error'], { state: studentData });
          });
        } else {
          Swal.fire({
            title: 'Good Job!!',
            text: 'profile updated successfully',
            icon: 'success',
            timer: 500,
            showConfirmButton: false,
          }).then((refresh) => {
            this.Student = JSON.parse(JSON.stringify(studentData));
            this.readonly = !this.readonly;
            this.ngOnInit();
          });
        }
      },
      (errorMessage) => {
        Swal.fire({
          title: 'danger!!',
          text: 'some internal error',
          icon: 'error',
          timer: 1000,
          showConfirmButton: false,
        }).then((refresh) => {
          this.readonly = !this.readonly;
        });
      }
    );
  }

  deleteProfile() {
    return this._http
      .delete(`http://localhost:3000/students/${this.Student._id}`)
      .subscribe(
        (studentData) => {
          this._router.navigate([`/students`]);
        },
        (errorMessage) => {
          Swal.fire('danger!!', 'some internal error', 'error').then(
            (refresh) => {}
          );
        }
      );
  }

  arrayBufferToBase64(buffer: any) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
      this.photoUpdateForm.get('img')!.setValue(this.image);
    }
  }
  uploadPic(pic: any) {
    console.log(pic);
    return this._http.put(
      `http://localhost:3000/students/${this.Student._id}/profilepic`,
      pic
    );
  }

  add_pic() {
    const formData = new FormData();
    formData.append('img', this.photoUpdateForm.get('img')!.value);
    this.uploadPic(formData).subscribe((res) => {
      setTimeout(() => {
        this.ngOnInit();
      }, 7000);

      // this.ngOnInit();
      // Swal.fire({
      //   title: 'Good Job!!',
      //   text: 'profile updated successfully',
      //   icon: 'success',
      //   timer: 500,
      //   showConfirmButton: false,
      // }).then((refresh) => {
      //   this.ngOnInit();
      // });
    });
  }
}
