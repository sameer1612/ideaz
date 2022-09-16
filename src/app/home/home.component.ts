import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IdeasService } from '../ideas.service';

export interface Idea {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ideas: Idea[] = [];
  err = '';
  loading = true;
  theme = 'light';

  newIdeaForm = this.fb.group({
    userId: [1],
    id: undefined,
    title: ['', Validators.required],
    body: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private ideasService: IdeasService) {}

  ngOnInit(): void {
    this.ideasService.getIdeas().subscribe(
      (response) => {
        this.ideas = response.sort((a, b) => b.id - a.id);
      },
      (error) => {
        this.err = error;
      },
      () => {
        this.loading = false;
      }
    );
  }

  createNewIdea() {
    const idea = <Idea>this.newIdeaForm.value;
    this.ideasService.createIdea(idea).subscribe(
      (response) => {
        this.ideas = [response, ...this.ideas];
      },
      (error) => {
        this.err = error;
      },
      () => {}
    );
    this.newIdeaForm.reset();
  }

  deleteIdea(idea: Idea) {
    this.ideasService.deleteIdea(idea).subscribe();
    this.ideas = this.ideas.filter((i: Idea) => i.id !== idea.id);
    this.newIdeaForm.reset();
  }

  toggleTheme() {
    this.theme = this.theme == 'dark' ? 'light' : 'dark';
  }
}
