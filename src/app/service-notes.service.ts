import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceNotesService {
 
  constructor() { }
  notes:string[]=[];
  notesFiltrer:string[]=[];
  result: boolean=false;

  ajouteNote(note:string)
  {this.notes.push(note);

  }

  getNotes()
  {/*return this.notes;*/
    
    return JSON.parse(JSON.stringify(this.notes));
  }

  filtrer(searchString:string)
  { 
    for(let i=0;i<this.notes.length;i++)
     { this.result=this.notes[i].includes(searchString) && searchString!='';
       if (this.result && this.notesFiltrer.indexOf(this.notes[i])==-1)
           this.notesFiltrer.push(this.notes[i]);}
     console.log(this.notesFiltrer.length);
   }
   getfilternotes()
   {return JSON.parse(JSON.stringify(this.notesFiltrer));}
   cacherfilt()
   {this.notesFiltrer=[];}
 

   modifierNote(index: number, modifiedNote: string) {
      if (modifiedNote !== null) {
        this.notes[index] = modifiedNote;
      }}

  
    deleteAll()
      {this.notes=[];}

   deleteNote(i: number) {
    if (i >= 0 && i < this.notes.length) {
      this.notes.splice(i,1); // Supprime l'élément à l'indice i de la liste
      
    }
  }






  
}
