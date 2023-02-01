import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  id: any = 0;
  title:any = 0;
  public Editor = ClassicEditor;
  question = {
    quiz: {
      qid: '',
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private _active: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.id = this._active.snapshot.paramMap.get('id');
    this.title=this._active.snapshot.paramMap.get('title');
    this.question.quiz.qid = this.id;
  }

  formSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      // Swal.fire('Error', "content Can't be null", 'error');
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      // Swal.fire('Error', "option1 Can't be null", 'error');
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      // Swal.fire('Error', "option2 Can't be null", 'error');
      return;
    }
     
    // this.question.content.replace( /(<[^>]+)>)/ig,'');
    this._question.addQuestion(this.question).subscribe(
      (data) => {
        document.querySelector('form')?.reset();
        Swal.fire('Success', 'Question added', 'success');
        this.question.content='';
        this.question.option1='';
        this.question.option2='';
        this.question.option3='';
        this.question.option4='';
        this.question.answer='';
      },
      (error) => {
        Swal.fire('Error', 'Error while adding Question', 'error');
      }
    );
  }
}
