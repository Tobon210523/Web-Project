import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPropertieComponent } from './edit-propertie.component';

describe('EditPropertieComponent', () => {
  let component: EditPropertieComponent;
  let fixture: ComponentFixture<EditPropertieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPropertieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPropertieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
