import { Component, OnInit } from '@angular/core';
import { student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
studentList = new Array<student>()

  dni: string;
  lastName: string;
  firstName: string;
  email: string;

  id2: number;
  dni2: string;
  lastName2: string;
  firstName2: string;
  email2: string;

  dni3: string;
  lastName3: string;
  firstName3: string;
  email3: string;

  constructor(private studentService: StudentService, private modalService: NgbModal){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.studentService.getAll().subscribe(response => {
      this.studentList = response
      this.dni = ''
      this.lastName = ''
      this.firstName = ''
      this.email = ''
      document.getElementsByTagName('input')[0].focus()
    }, error => {
      console.error(error)
      alert('Error: ' + error.error.message)
    })
  }

  add() {
    if (this.dni.trim() !== '' && this.lastName.trim() !== '') {
      let estudiante = new student()
      estudiante.dni = this.dni
      estudiante.lastName = this.lastName
      estudiante.firstName = this.firstName
      estudiante.email = this.email
      estudiante.cohort = 0
      estudiante.status = 'activo'
      estudiante.gender = 'masculino'
      estudiante.adress = 'abc123'
      estudiante.phone = '000' 

    this.studentService.save(estudiante).subscribe( () => {
      location.reload()
    }, error => {
      console.error(error)
      alert('Error: ' + error.error.message)
      document.getElementsByTagName('input')[0].focus()
    });
    }
  }

  delete(id: number) {
    this.studentService.delete(id).subscribe(() => {
      location.reload()
    }, error => {
      console.error(error)
      alert('Error: ' + error.error.message)
    })
  }

  view(ver: any, estudiante: student) {
    this.id2 = estudiante.id
    this.dni2 = estudiante.dni
    this.lastName2 = estudiante.lastName
    this.firstName2 = estudiante.firstName
    this.email2 = estudiante.email

    this.dni3 = estudiante.dni
    this.lastName3 = estudiante.lastName
    this.firstName3 = estudiante.firstName
    this.email3 = estudiante.email
    
    this.modalService.open(ver).result.then(() => {
      if(this.dni2.trim() !== '' && this.lastName2.trim() !== '' && this.firstName2.trim() !== '' && this.email2.trim() !== '' && 
      (this.dni2.trim() !== this.dni3.trim() || this.lastName2.trim() !== this.lastName3.trim() || this.firstName2.trim() !== this.firstName3.trim() || this.email2.trim() !== this.email3.trim())) {
        let s = new student()
        s.id = this.id2
        s.dni = this.dni2
        s.lastName = this.lastName2
        s.firstName = this.firstName2
        s.email = this.email2
        s.cohort = 0
        s.status = 'activo'
        s.gender = 'masculino'
        s.adress = 'abc123'
        s.phone = '000' 

        this.studentService.update(s).subscribe(() => {
          location.reload()
        }, error => {
          console.error(error)
          alert('Error: ' + error.error.message)
        })
      }
    })
  }
}