import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    user: any;

    selectedImage: File | null = null;
    selectedImageSrc: string | null = null;

    constructor(
        private authService: AuthService,
        private afStorage: AngularFireStorage,
        private snackbarSerice: SnackBarService
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
                        imageRef.getDownloadURL().subscribe(
                            (downloadUrl) => {
                                this.user.photoURL = downloadUrl;
                                this.saveUser();
                            }
                        )
                    }
                }
            )
        } else {
            this.saveUser();
        }
    }

    saveUser() {
        this.authService.updateUserData(this.user).then(
            () => {
                this.snackbarSerice.openSnackBar('Cập nhật thông tin thành công.');
            }
        );
    }

    onImageSelected(event: any) {
        this.selectedImage = event.target.files[0];
        this.selectedImageSrc = URL.createObjectURL(this.selectedImage!);
    }
}
