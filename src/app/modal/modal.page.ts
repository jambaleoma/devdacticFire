import { NoteService } from './../services/note.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Note } from '../models/note';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() id: string;
  note: Note = null;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.getNoteById(this.id).subscribe(res => {
      this.note = res;
    });
  }

  async updateNote() {
    this.noteService.updateNote(this.note);
    const toast = await this.toastCtrl.create({
      message: 'Note updated!',
      duration: 1000
    });
    toast.present();
  }

  async deleteNote() {
    await this.noteService.deleteNote(this.note);
    this.modalCtrl.dismiss();
  }

}
