import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent implements OnInit {
  constructor() {}
  readonly: boolean = true;
  update() {
    this.readonly = !this.readonly;
  }
  save() {
    this.readonly = !this.readonly;
  }
  discard() {
    this.readonly = !this.readonly;
  }
  ngOnInit(): void {}
}
