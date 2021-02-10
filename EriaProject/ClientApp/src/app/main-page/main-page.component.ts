import { DataSource } from '@angular/cdk/table';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatInput, MatPaginator, MatSelect, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Chore } from '../shared/models/task.model';
import { ChoreService } from '../shared/services/chore.service';
import { RemoveDialogComponent } from './remove-dialog/remove-dialog.component';
import { filter, switchMap } from 'rxjs/operators';
import { empty, EMPTY, interval, Observable, Subscription } from 'rxjs';
import { ModifyDialogComponent } from './modify-dialog/modify-dialog.component';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { AddKindDialogComponent } from './add-kind-dialog/add-kind-dialog.component';
import { KindService } from '../shared/services/kind.service';
import { Kind } from '../shared/models/kind.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewInit {

  form: FormGroup = null;

  dataSource: MatTableDataSource<Chore> = null;

  displayedColumns = ['name', 'kind', 'timeStart', 'timeEnd', 'modify', 'delete'];

  kindOptions: Kind[] = [];

  @ViewChild('formDirective', {static: false}) formDirective: NgForm;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @ViewChild('selectFilter', {static: false}) selectFilter: MatSelect;
  @ViewChild('dateStartFilter', {static: false}) dateStartFilter: ElementRef;
  @ViewChild('dateEndFilter', {static: false}) dateEndFilter: ElementRef;

  stopwatch$: Subscription = null;

  constructor(
    private fb: FormBuilder,
    private choreService: ChoreService,
    private kindService: KindService,
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
      this.dataSource.paginator = this.paginator;
    });

    this.kindService.getAll().subscribe(data => {
      this.kindOptions = data;
    });

  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    if (this.form.controls['timeStart'].value > this.form.controls['timeEnd'].value) {
      this.form.controls['timeEnd'].setErrors({biggerDate: false});
      return;
    }
    this.stopStopwatch();
    this.postChore(this.form.value);

    this.formDirective.resetForm();
    this.updateTable();
  }

  postChore(chore: Chore): void {
    this.choreService.post(chore).subscribe(data => {
      this.snackBar.open('Pridano', 'Zavrit', {duration: 3000});
      this.dataSource.data.push(data);
      this.updateTable();
    },
    err => this.snackBar.open('Doslo k chybe', 'Zavrit', {duration: 3000}));
  }
  setTimeInput(name: string): void {
    this.form.controls[name].setValue(new Date().toISOString().split('.')[0]);
  }
  deleteChore(chore: Chore): void {
    const dialogRef = this.dialog.open(RemoveDialogComponent);

    dialogRef.afterClosed().pipe(
      filter(res => res),
      switchMap(res => {
        return this.choreService.delete(chore.choreID);
      })).subscribe(
        () => {
          this.snackBar.open('Smazano', 'Zavrit', {duration: 3000});
          this.dataSource.data.splice(this.dataSource.data.findIndex(c => c.choreID === chore.choreID), 1);
          this.updateTable();
        },
        err => this.snackBar.open('Doslo k chybe', 'Zavrit', {duration: 3000}));
  }
  updateTable(): void {
    this.dataSource.data = this.dataSource.data;
  }
  startStopwatch(): void {
    this.setTimeInput('timeStart');
    this.setTimeInput('timeEnd');
    this.stopwatch$ = interval(1000).subscribe(() => this.setTimeInput('timeEnd'));
  }
  stopStopwatch(): void {
    if (this.stopwatch$ != null) {
      this.stopwatch$.unsubscribe();
    }
    this.stopwatch$ = null;
  }
  modifyChore(chore: Chore): void {
    const dialogRef = this.dialog.open(ModifyDialogComponent, {
      data: {chore, kinds: this.kindOptions},
      width: '17%'
    });

    let updatedChore: Chore = null;

    dialogRef.afterClosed().pipe(
      filter(res => res),
      switchMap(res => {
        updatedChore = res;
        return this.choreService.put(res);
      })).subscribe(
        () => {
          this.snackBar.open('Upraveno', 'Zavrit', {duration: 3000});
          this.dataSource.data[this.dataSource.data.findIndex(c => c.choreID === chore.choreID)] = updatedChore;
          this.updateTable();
        },
        err => this.snackBar.open('Doslo k chybe', 'Zavrit', {duration: 3000}));
  }
  applyFilter() {
    let fValue = '|';
    if (this.selectFilter.value != null) {
      fValue = this.selectFilter.value + '|' + this.dateStartFilter.nativeElement.value + '|' + this.dateEndFilter.nativeElement.value ;
    } else {
      fValue = '|' + this.dateStartFilter.nativeElement.value + '|' + this.dateEndFilter.nativeElement.value;
    }

    this.dataSource.filterPredicate = (data: Chore, filterValue: string) => {

      const values = filterValue.split('|');



      return data.kind.trim().toLowerCase().indexOf(values[0].trim().toLocaleLowerCase()) !== -1 &&
      // looks like date, but its string
      // @ts-ignore
      data.timeStart.split('T')[0].indexOf(values[1].trim().toLocaleLowerCase()) !== -1 &&
      // @ts-ignore
      data.timeEnd.split('T')[0].indexOf(values[2].trim().toLocaleLowerCase()) !== -1;
    };

    this.dataSource.filter = fValue;
  }
  resetFilter() {
    this.selectFilter.value = '';
    this.dateStartFilter.nativeElement.value = '';
    this.dateEndFilter.nativeElement.value = '';
    this.applyFilter();
  }
  addKind() {
    const dialogRef = this.dialog.open(AddKindDialogComponent);

    let kindToAdd: Kind = null;

    dialogRef.afterClosed().pipe(
      filter(res => res),
      switchMap(res => {
        console.log(res);
        kindToAdd = {
          name: res
        };
        return this.kindService.post(kindToAdd);
        //return EMPTY;
      })).subscribe(
        () => {
          this.snackBar.open('Pridano', 'Zavrit', {duration: 3000});
          //this.dataSource.data[this.dataSource.data.findIndex(c => c.choreID === chore.choreID)] = updatedChore;
          this.kindOptions.push(kindToAdd);
          this.updateTable();
        },
        err => this.snackBar.open('Doslo k chybe', 'Zavrit', {duration: 3000}));
  }
}
