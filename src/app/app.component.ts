import { Component } from '@angular/core';
import { ServiceNotesService } from './service-notes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  titre= 'Bienvenu a Mon Projet !';
  title = 'Enter Note:';
  filtrage='filter : ';

  note : string="" ;
  color : string="" ;
  searchString : string="";
  filteredNotes: string[]=[];
  notes : string[]=[];
  colors : string[]=[];
  c :boolean=false;
  cf:boolean=false;
  result: boolean=false;


  constructor(private serviceNote : ServiceNotesService ) {}
 
  
  filtrer()
  { this.serviceNote.filtrer(this.searchString);
     this.filteredNotes=this.serviceNote.getfilternotes();
   }


 showfiltrer()
{ 
  this.filtrer();
   console.log(this.filteredNotes);
}
cacherfiltre()
{if (this.cf==false)
   {this.showfiltrer();
    this.cf=true;
   }
else
  { this.filteredNotes=[];
    this.serviceNote.cacherfilt();
    this.cf=false;}
}

showNote()
  {this.notes=this.serviceNote.getNotes();}

afficher()
{if (this.c==false)
   {this.showNote();
  this.c=true;}
  else
 { this.notes=[];
  this.c=false;}
   }


 AddNote()
  { if(this.note !='')
   { this.serviceNote.ajouteNote(this.note);
     this.colors.push(this.randomColor());
     this.note='';}
   }

  /*AddNote()
  { this.notes.push(this.note)
  this.colors.push(this.randomColor());
  this.note = '';}*/
  
  randomColor()
  { const letters="123456789ABCDEF";
  let color='#';
  for(let i=0;i<6;i++)
  {color+=letters[Math.floor(Math.random()*16)];
  }
  return color ;}
  


  showConfirmDialog() {
   Swal.fire({
      
      title: 'Êtes-vous sûr de vouloir supprimer toutes les notes?',
      text: 'Cette action est irréversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer tout!',
      cancelButtonText: 'Annuler',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // Supprimer toutes les notes ici
        this.serviceNote.deleteAll();
        this.notes = [];
        Swal.fire('Supprimé!', 'Toutes les notes ont été supprimées.', 'success');
        
      }
    });
  }

  deleteNote(i: number) {
   this.serviceNote.deleteNote(i);
    if (i >= 0 && i < this.notes.length) {
      this.notes.splice(i,1);
      this.colors.splice(i, 1); }
  }




  modifyNote(index: number,modifiedNote : string) {
    /*const modifiedNote = prompt('Modifiez la note :', this.notes[index]);*/
      this.serviceNote.modifierNote(index,modifiedNote);
      this.notes[index] = modifiedNote;
    
  }
  showConfirmModif(i: number) {
    
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir modifier cette note?',
      text: "Cette action est irréversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, modifier',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Entrez la modification',
          input: 'text',
          inputValue: this.notes[i] ,
          showCancelButton: true,
          confirmButtonText: 'Valider',
          cancelButtonText: 'Annuler'
        }).then((result) => {
          if (result.isConfirmed && result.value) {
            const userInput = result.value;
            this.modifyNote(i, userInput);
            Swal.fire('Modifié!', 'La liste de notes a été modifiée.', 'success');
          }
        });
      }
    });
  }






}