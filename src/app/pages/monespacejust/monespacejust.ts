import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-monespacejust',
  imports: [FormsModule],
  templateUrl: './monespacejust.html',
  styleUrl: './monespacejust.scss',
})
export class Monespacejust {
  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.location.hash = id;
    }
  }
  formData = {
    nom: '',
    prenom: '',
    entreprise: '',
    fonction: '',
    email: '',
    telephone: '',
    typeEspace: '',
    message: '',
  };

  formErrors: { [key: string]: string } = {};
  formSubmitted = false;

  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;

    if (!this.formData.nom.trim()) {
      this.formErrors['nom'] = 'Le nom est requis.';
      isValid = false;
    }
    if (!this.formData.prenom.trim()) {
      this.formErrors['prenom'] = 'Le prénom est requis.';
      isValid = false;
    }
    if (!this.formData.entreprise.trim()) {
      this.formErrors['entreprise'] = "Le nom de l'entreprise est requis.";
      isValid = false;
    }
    if (!this.formData.fonction.trim()) {
      this.formErrors['fonction'] = 'La fonction est requise.';
      isValid = false;
    }
    if (!this.formData.email.trim()) {
      this.formErrors['email'] = "L'adresse email est requise.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
      this.formErrors['email'] = "L'adresse email n'est pas valide.";
      isValid = false;
    }
    if (!this.formData.telephone.trim()) {
      this.formErrors['telephone'] = 'Le numéro de téléphone est requis.';
      isValid = false;
    }
    if (!this.formData.typeEspace) {
      this.formErrors['typeEspace'] = "Veuillez sélectionner un type d'espace.";
      isValid = false;
    }
    if (!this.formData.message.trim()) {
      this.formErrors['message'] = 'Le message est requis.';
      isValid = false;
    }

    return isValid;
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (!this.validateForm()) {
      return;
    }

    const subject = encodeURIComponent(
      `Demande d'accès Mon Espace Just — ${this.formData.typeEspace}`
    );
    const body = encodeURIComponent(
      `Nom : ${this.formData.nom}\n` +
        `Prénom : ${this.formData.prenom}\n` +
        `Entreprise : ${this.formData.entreprise}\n` +
        `Fonction : ${this.formData.fonction}\n` +
        `Email : ${this.formData.email}\n` +
        `Téléphone : ${this.formData.telephone}\n` +
        `Type d'espace demandé : ${this.formData.typeEspace}\n\n` +
        `Message :\n${this.formData.message}`
    );

    window.location.href = `mailto:contact@justagrogroup.com?subject=${subject}&body=${body}`;
  }
}
