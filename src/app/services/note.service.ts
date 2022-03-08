import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, collection, collectionData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) { }

  getNotes(): Observable<Note[]> {
    const user = this.auth.currentUser;
    const userNotesDocRef = collection(this.firestore, `users/${user.uid}/notes`)
    return collectionData(userNotesDocRef, { idField: 'id'}) as Observable<Note[]>;
  }

  getNoteById(id): Observable<Note> {
    const user = this.auth.currentUser;
    const userNotesDocRef = doc(this.firestore, `users/${user.uid}/notes/${id}`)
    return docData(userNotesDocRef, { idField: 'id'}) as Observable<Note>;
  }

  addNote(note: Note) {
    const user = this.auth.currentUser;
    const userNotesDocRef = collection(this.firestore, `users/${user.uid}/notes`)
    return addDoc(userNotesDocRef, note);
  }

  deleteNote(note: Note) {
    const user = this.auth.currentUser;
    const userNotesDocRef = doc(this.firestore, `users/${user.uid}/notes/${note.id}`)
    return deleteDoc(userNotesDocRef);
  }

  updateNote(note: Note) {
    const user = this.auth.currentUser;
    const userNotesDocRef = doc(this.firestore, `users/${user.uid}/notes/${note.id}`)
    return updateDoc(userNotesDocRef, {title: note.title, text: note.text });
  }

}
