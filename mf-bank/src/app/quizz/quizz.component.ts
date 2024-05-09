import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankaacountService } from '../services/bankaacount.service';
import { QuestionDto } from '../models/QuestionDto';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  constructor(private router: Router, private bankservice: BankaacountService){
    this.selectedSubject = "Select a subject";
    this.selectedOption = "";
  }
  questionLists: string[] = [];
  selectedOption: string;
  isSubject: boolean = false;
  loading: boolean = false;
ngOnInit(): void {

}
  navigateTousers(){
    this.router.navigate(['/dashboard']);
  }

  selectedSubject: string;
  onTypeChange(selectedValue: string) {
    this.loading = true;
    this.retrieveQuestion(this.selectedSubject);
  }

  questiondto!: QuestionDto;
  question!: string;
  correctresponse!: string;
  retrieveQuestion(topic: string) {
    this.bankservice.generateQuestion(topic).subscribe(
      (data) => {
        this.questiondto = data;
        this.question = this.questiondto.question;
        this.questionLists = [this.questiondto.response1 , this.questiondto.response2 , this.questiondto.response3]
        this.questionListsBackground = new Array(this.questionLists.length).fill('');
        this.correctresponse = this.questiondto.correct;
        this.loading = false;
        this.isSubject = true;
        console.log("Correct Response is : " + this.correctresponse);

      }
    );

  }
  questionListsBackground: string[] = [];

  giveResponse: boolean = false;
  onSubmit() {
    console.log("Selected Option:", this.selectedOption);
    const containsCorrectResponse = this.correctresponse.split(' ').some(word => this.selectedOption.includes(word));
    this.questionListsBackground = this.questionLists.map(option => {
      return option === this.selectedOption ? (containsCorrectResponse ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)') : '';
    });
    this.giveResponse = true;
  }


}
