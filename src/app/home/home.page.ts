import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Participant } from './home-model';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  participants: Participant[] = [
    {
      nameFrom: 'alan',
      emailFrom: 'alanfedrizzi@gmail.com',
    },
    {
      nameFrom: 'alex',
      emailFrom: 'alexfedrizzi@gmail.com',
    },
    {
      nameFrom: 'beatriz',
      emailFrom: 'beatrizferronatofedrizzi@gmail.com',
    },
    {
      nameFrom: 'joeci',
      emailFrom: 'jobeasa49@gmail.com',
    },
    {
      nameFrom: 'sarah',
      emailFrom: 'sarah.fedrizzi@gmail.com',
    },
  ];
  alreadyRun = false;
  isLoading = false;

  constructor(private http: HttpClient) {}

  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  run() {
    this.isLoading = true;
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

    return (
      this.http
        .post(``, this.participants)
        // .pipe(
        //   tap((resData) => {
        //     console.log(resData);
        //   })
        // )
        .subscribe(() => {
          this.isLoading = false;
        })
    );

    // enviar email - sendgrid
  }
}
