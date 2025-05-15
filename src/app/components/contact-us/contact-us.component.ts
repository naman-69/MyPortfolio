import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  success = false;
  error = false;
  loading = false;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
    
    emailjs.init("Ft0nqi1SKsfRoX0nI");
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
  this.submitted = true;

  if (this.contactForm.invalid) {
    return;
  }

  this.loading = true;

  const templateParams = {
    from_name: this.contactForm.get('name')?.value,
    reply_to: this.contactForm.get('email')?.value,
    message: this.contactForm.get('message')?.value
  };

  emailjs.send(
    'service_3i85cto',
    'template_702hkti',
    templateParams
  )
  .then((response: any) => {
    console.log('SUCCESS!', response.status, response.text);
    this.success = true;
    this.error = false;
    this.contactForm.reset();
    this.submitted = false;
    this.loading = false;

    Swal.fire({
      icon: 'success',
      title: 'Message Sent!',
      text: 'Your message was successfully sent. We will contact you soon.',
      confirmButtonColor: '#3085d6',
      timer: 3000,
    });

    setTimeout(() => this.success = false, 5000);
  }, (err: any) => {
    console.log('FAILED...', err);
    this.error = true;
    this.success = false;
    this.loading = false;

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong. Please try again later!',
      confirmButtonColor: '#d33',
      timer: 3000,
    });
  });
}

}