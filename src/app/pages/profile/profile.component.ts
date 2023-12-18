import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/common/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    user: User = {};

    selectedImage: File | null = null;
    selectedImageSrc: string | null = null;

    constructor(
        private authService: AuthService,
        private afStorage: AngularFireStorage,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.user = user;
            }
        )
    }

    onSubmit() {
        if (this.selectedImage) {
            const imageRef = this.afStorage.ref(`Avatar/${this.selectedImage.name}`);
            const uploadTask = imageRef.put(this.selectedImage);

            uploadTask.snapshotChanges().subscribe(
                (snapshot) => {
                    if (snapshot?.state === 'success') {
                        imageRef.getDownloadURL().subscribe((downloadUrl) => {
                            this.user.photoURL = downloadUrl;
                            this.saveUser();
                        });
                    }
                }
            );
        } else {
            this.saveUser();
        }
    }

    saveUser() {
        this.authService.updateProfileUser(this.user)
            .then(() => {
                this.toastr.info('Thông tin đã được cập nhật.', 'Cập nhật thành công!');
            });
    }

    onImageSelected(event: any) {
        this.selectedImage = event.target.files[0];
        this.selectedImageSrc = URL.createObjectURL(this.selectedImage!);
    }
}
