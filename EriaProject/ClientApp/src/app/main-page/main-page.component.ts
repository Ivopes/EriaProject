import { DataSource } from '@angular/cdk/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Chore } from '../shared/models/task.model';
import { ChoreService } from '../shared/services/chore.service';
import { RemoveDialogComponent } from './remove-dialog/remove-dialog.component';
import { filter, switchMap } from 'rxjs/operators';
import { interval, Observable, Subscription } from 'rxjs';

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

  stopwatch$: Subscription = null;

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
    this.postChore(this.form.value);

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
    this.form.controls[name].setValue(new Date().toISOString().split('.')[0]);
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
  startStopwatch(): void {
    console.log('start');
    this.setTimeInput('timeStart');
    this.setTimeInput('timeEnd');
    this.stopwatch$ = interval(1000).subscribe(() => this.setTimeInput('timeEnd'));
  }
  stopStopwatch(): void {
    this.stopwatch$.unsubscribe();
    this.stopwatch$ = null;
  }
}
