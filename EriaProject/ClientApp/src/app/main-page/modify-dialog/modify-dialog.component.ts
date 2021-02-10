import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Kind } from 'src/app/shared/models/kind.model';
import { Chore } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-modify-dialog',
  templateUrl: './modify-dialog.component.html',
  styleUrls: ['./modify-dialog.component.css']
})
export class ModifyDialogComponent implements OnInit {

  form: FormGroup = null;

  kindOptions: Kind[] = [];

  changed = false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {chore: Chore, kinds: Kind[]},
    public dialogRef: MatDialogRef<ModifyDialogComponent>
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data.chore.name],
      kind: [this.data.chore.kind],
      timeStart: [this.data.chore.timeStart],
      timeEnd: [this.data.chore.timeEnd],
    });

    this.form.valueChanges.subscribe(() => {
      this.changed = true;
    });

    this.kindOptions = this.data.kinds;
  }

  sendData(): void {
    const chore: Chore = {
      choreID: this.data.chore.choreID,
      kind: this.form.controls['kind'].value,
      name: this.form.controls['name'].value,
      timeEnd: this.form.controls['timeEnd'].value,
      timeStart: this.form.controls['timeStart'].value
    }

    this.dialogRef.close(chore);
  }
}
