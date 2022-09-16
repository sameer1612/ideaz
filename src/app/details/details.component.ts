import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Idea } from '../home/home.component';
import { FormBuilder, Validators } from '@angular/forms';
import { IdeasService } from '../ideas.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  idea: Idea | undefined;
  editing: boolean;
  err: any;

  editIdeaForm = this.fb.group({
    userId: undefined,
    id: undefined,
    title: ['', Validators.required],
    body: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ideasService: IdeasService
  ) {
    this.editing = false;
  }

  ngOnInit(): void {
    this.idea = history.state.idea;

    this.idea && this.editIdeaForm.setValue(this.idea);
  }

  editIdea() {
    this.editing = true;
  }

  updateIdea() {
    const idea = <Idea>this.editIdeaForm.value;
    this.ideasService.updateIdea(idea).subscribe(
      (response) => {
        this.idea = response;
      },
      (error) => {
        this.err = error;
      },
      () => {}
    );
    this.editIdeaForm.reset();
    this.editing = false;
  }
}
