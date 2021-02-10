import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-kind-dialog',
  templateUrl: './add-kind-dialog.component.html',
  styleUrls: ['./add-kind-dialog.component.css']
})
export class AddKindDialogComponent implements OnInit {

  name = '';

  constructor() { }

  ngOnInit() {
  }

}
