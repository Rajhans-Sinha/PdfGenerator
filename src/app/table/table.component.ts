import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/user.model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() users: User[] = [];
  editIndex: number | null = null;
  editedUser: User | null = null;
  pdfSrc: string | undefined;

  editForm: FormGroup;

  constructor(private fb: FormBuilder,private toastr:ToastrService) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required]
    });
  }

  editUser(index: number) {
    this.editIndex = index;
    this.editedUser = { ...this.users[index] };
    this.patchForm(this.editedUser);
  }

  patchForm(user: User) {
    this.editForm.patchValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address
    });
  }


  
  saveUser(user:User) {
    if (this.editForm.valid && this.editIndex !== null && this.editedUser) {
      this.editedUser.name = user.name;
      this.editedUser.email = user.email;
      this.editedUser.phone = user.phone;
      this.editedUser.address = user.address;
      this.users[this.editIndex] = { ...this.editedUser };
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editIndex = null;
    this.editedUser = null;
    this.editForm.reset();
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
  }

  generatePdf(users: User[]): jsPDF {
    const doc = new jsPDF();
    doc.text('Users List', 10, 10);
    (doc as any).autoTable({
      head: [['Name', 'Email', 'Phone Number', 'Address']],
      body: users.map((user: User) => [user.name, user.email, user.phone, user.address]),
      margin: { top: 20 },
    });
    this.toastr.success('PDF generated successfully!');
    return doc;
  }

  downloadPdf() {
    const doc = new jsPDF();
    const columns = ["Name", "Phone", "Address", "Email"];
    const rows = this.users.map(item => [item.name, item.phone, item.address, item.email]);
    (doc as any).autoTable({
      head: [columns],
      body: rows,
    });
    doc.save('data.pdf');
  }

  viewPdf(users: any) {
    const doc = this.generatePdf(users);
    doc.output('dataurlnewwindow');
  }
}
