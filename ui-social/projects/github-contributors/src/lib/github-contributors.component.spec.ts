import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubContributorsComponent } from './github-contributors.component';

describe('GithubContributorsComponent', () => {
  let component: GithubContributorsComponent;
  let fixture: ComponentFixture<GithubContributorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubContributorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubContributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
