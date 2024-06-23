import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 for generating unique IDs

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<any>();
  form!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [uuidv4(), Validators.required], // Generate unique ID here
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const userData = this.form.value;
      this.form.get('id')!.setValue(uuidv4());
      this.userService.addUser(userData).subscribe({
       next: (response) => {
          console.log('User added successfully:', response);
          this.form.reset();
          this.initializeForm();
          this.userService.formData.next(this.form.value)
        },
       error: (error) => {
          console.error('Error adding user:', error);
       }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
