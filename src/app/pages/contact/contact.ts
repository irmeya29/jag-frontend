import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };

  onSubmit() {
    console.log('Form submitted:', this.formData);
    // TODO: Intégrer l'envoi vers un backend ou un service email
    alert('Merci ! Votre message a bien été envoyé. Nous vous recontacterons très bientôt.');
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    };
  }
}
