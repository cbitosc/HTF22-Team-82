import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewquizComponent } from './newquiz.component';

describe('NewquizComponent', () => {
  let component: NewquizComponent;
  let fixture: ComponentFixture<NewquizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewquizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
