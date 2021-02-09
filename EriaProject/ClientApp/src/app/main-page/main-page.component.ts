import { DataSource } from '@angular/cdk/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Chore } from '../shared/models/task.model';
import { ChoreService } from '../shared/services/chore.service';
import { RemoveDialogComponent } from './remove-dialog/remove-dialog.component';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewInit {

  form: FormGroup = null;

  dataSource: MatTableDataSource<Chore> = null;

  displayedColumns = ['name', 'kind', 'timeStart', 'timeEnd', 'delete'];

  kindOptions = [
    'Programování',
    'Meeting',
    'Pauza'
  ];

  @ViewChild('formDirective', {static: false}) formDirective: NgForm;

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private choreService: ChoreService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      kind: [''],
      dateStart: [''],
      dateEnd: [''],
      timeStart: [''],
      timeEnd: [''],
    });


  }
  ngAfterViewInit() {
    this.choreService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource<Chore>(data);
      this.dataSource.sort = this.sort;
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const chore = this.createChore();




    this.postChore(chore);

    this.formDirective.resetForm();
    this.updateTable();

  }

  postChore(chore: Chore): void {
    this.choreService.post(chore).subscribe(
    () => {
      this.snackBar.open('Pridano', 'Zavrit', {duration: 3000});
      this.dataSource.data.push(chore);
      this.updateTable();
    },
    err => this.snackBar.open('Doslo k chybe, nazev mozna uz existuje', 'Zavrit', {duration: 3000}));
  }
  setTimeInput(name: string): void {
    this.form.controls[name].setValue(this.getTimeNow());
  }
  getTimeNow(): string {
    const date = new Date();
    const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return h + ':' + m;
  }
  createChore(): Chore {
    const d = new Date();

    const chore: Chore = {
      choreID: 0,
      kind: this.form.controls['kind'].value,
      name: this.form.controls['name'].value,
      timeStart: new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDay(),
        Number.parseInt(this.form.controls['timeStart'].value.slice(0, 2)),
        Number.parseInt(this.form.controls['timeStart'].value.slice(3, 5)),
        0),
      timeEnd: new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDay(),
        Number.parseInt(this.form.controls['timeEnd'].value.slice(0, 2)),
        Number.parseInt(this.form.controls['timeEnd'].value.slice(3, 5)),
        0)
    };

    return chore;
  }
  deleteChore(chore: Chore): void {
    const dialogRef = this.dialog.open(RemoveDialogComponent);

    dialogRef.afterClosed().pipe(
      filter(res => res),
      switchMap(res => {
        return this.choreService.delete(chore);
      })).subscribe(
        () => {
          this.snackBar.open('Smazano', 'Zavrit', {duration: 3000});
          this.dataSource.data.splice(this.dataSource.data.findIndex(c => c.name === chore.name), 1);
          this.updateTable();
        },
        err => this.snackBar.open('Doslo k chybe', 'Zavrit', {duration: 3000}));
  }
  updateTable(): void {
    this.dataSource.data = this.dataSource.data;
  }
}
