import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  form: FormGroup = null;

  kindOptions = [
    'Programování',
    'Meeting',
    'Pauza'
  ];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      kind: [''],
      timeStart: [''],
      timeEnd: [''],
    });
  }

}
