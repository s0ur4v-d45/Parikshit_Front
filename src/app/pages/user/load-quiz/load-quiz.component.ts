import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
  cid: any;
  quizzes: any;
  constructor(private _active: ActivatedRoute, private _quiz: QuizService) {}

  ngOnInit(): void {
    this._active.params.subscribe((param) => {
      this.cid = param['cid'];

      if (this.cid == 0) {
        this._quiz.getActiveQuizzess().subscribe(
          (data: any) => {
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error) => Swal.fire('error', 'Error in loading quiz', 'error')
        );
      } else {
        this._quiz.getActiveQuizzessOfCategory(this.cid).subscribe(
          (data: any) => {
            this.quizzes = data;
            // console.log(this.quizzes);
          },
          (error) => {
            alert('Error in loading data');
          }
        );
      }
    });
  }
}
