import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {

  quizzes = [
    {
      qid:23,
      title:'b',
      description:'f',
      maxMarks:'50',
      numberOfQuestions:'15',
      active:'',
      category:
      {
        title:'pr'
      }
    },
   
  ];

  constructor(private _quiz: QuizService) {}

  ngOnInit(): void {
     this._quiz.quizzes().subscribe(
       (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
       },
       (error) => {
         console.log(error);
        Swal.fire('Error !', 'Error in loading data !', 'error');
       }
     );
  }


  deleteQuiz(qid:number) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //delete...

        this._quiz.deletQuiz(qid).subscribe(
          (data) => {
            this.quizzes = this.quizzes.filter((quiz:any) => quiz.qid != qid);
            Swal.fire('Success', 'Quiz deleted ', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error in deleting quiz', 'error');
          }
        );
      }
    });
  }


  // quizzes: any = [];
  // p: any;
  // totalPages: any;

  // constructor(private _quiz: QuizService, private router: Router) {}

  // ngOnInit(): void {
  //   this._quiz.quizzes().subscribe(
  //     (data: any) => {
  //       this.quizzes = data.content;
  //       this.totalPages = data.totalElements;
  //       this.p = data.totalPages;
  //       console.log(data);
  //       console.log(this.p);
  //     },
  //     (error) => Swal.fire('Error', 'Error in loading data', 'error')
  //   );
  // }

  // deleteQuiz(Id: number) {
  //   Swal.fire({
  //     icon: 'info',
  //     title: 'are you sure ?',
  //     confirmButtonText: 'Delete',
  //     showCancelButton: true,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this._quiz.deletQuiz(Id).subscribe(
  //         (data) => {
  //           this.quizzes = this.quizzes.filter((quiz: any) => quiz.id != Id);
  //           this.totalPages -= 1;
  //           Swal.fire('Success', 'Quiz Deleted', 'success').then(() => {
  //             if (this.totalPages % 3 == 0) {
  //               this.router.navigate(['/admin/quizzes']).then(() => {
  //                 window.location.reload();
  //               });
  //             }
  //           });
  //         },
  //         (error) => {
  //           Swal.fire('Error', 'Error while Deleteing Quiz', 'error');
  //         }
  //       );
  //     }
  //   });
  // }
}
