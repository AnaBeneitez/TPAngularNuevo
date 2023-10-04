import { Component, OnInit } from '@angular/core';
import { student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
studentList = new Array<student>()

  dni!: string;
  lastName!: string;
  firstName!: string;
  email!: string;

  constructor(private studentService: StudentService){}

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

  add(): void {
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
      this.getAll()
    }, error => {
      console.error(error)
      alert('Error: ' + error.error.message)
      document.getElementsByTagName('input')[0].focus()
    });
    }
  }
}