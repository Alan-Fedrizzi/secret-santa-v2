import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { Participant } from './home-model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  participants: Participant[] = [
    {
      nameFrom: '',
      emailFrom: '',
    },
    {
      nameFrom: '',
      emailFrom: '',
    },
    {
      nameFrom: '',
      emailFrom: '',
    },
    {
      nameFrom: '',
      emailFrom: '',
    },
    {
      nameFrom: '',
      emailFrom: '',
    },
  ];
  dataFromParticipants: Participant[];
  alreadyRun = false;
  // isLoading = false;
  firebaseId: string;
  userName: string;
  userGot: any;

  constructor(private http: HttpClient) {}

  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  run() {
    // this.isLoading = true;
    const participantsCopy = JSON.parse(JSON.stringify(this.participants));

    this.participants.forEach((_, index) => {
      let number = this.randomNumber(0, participantsCopy.length - 1);
      while (
        this.participants[index].nameFrom === participantsCopy[number].nameFrom
      ) {
        number = this.randomNumber(0, participantsCopy.length - 1);
      }
      this.participants[index].nameTo = participantsCopy[number].nameFrom;
      this.participants[index].emailTo = participantsCopy[number].emailFrom;
      participantsCopy.splice(number, 1);
    });

    console.log(this.participants);
    this.alreadyRun = true;

    return this.http
      .post<{ name: string }>(``, this.participants)
      .pipe(
        tap((resData) => {
          this.firebaseId = resData.name;
          console.log(`this.firebaseId: ${this.firebaseId}`);
          console.log(resData);
        })
      )
      .subscribe
      // () => {this.isLoading = false;}
      ();

    // enviar email - sendgrid
  }

  getData() {
    // this.isLoading = true;
    return this.http
      .get<Participant[]>(``)
      .pipe(
        tap((resData) => {
          // console.log(resData);
          this.dataFromParticipants = resData;
        })
      )
      .subscribe
      // () => {this.isLoading = false;}
      ();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    // demos o nome do input de 'email'
    const email = form.value.email;

    this.dataFromParticipants.forEach((obj) => {
      if (obj.emailFrom === email) {
        this.userName = obj.nameFrom;
        this.userGot = obj.nameTo;
      }
    });
  }
}
