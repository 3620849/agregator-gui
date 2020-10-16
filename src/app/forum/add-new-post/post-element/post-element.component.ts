import { Component, OnInit, Input, ViewChild, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { FileService } from 'src/app/shared/services/file.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { BehaviorSubject } from 'rxjs';

declare var EXIF: any;

@Component({
  selector: 'app-post-element',
  templateUrl: './post-element.component.html',
  styleUrls: ['./post-element.component.scss']
})
export class PostElementComponent implements OnInit {
  @Input()
  data;
  imgUrl
  show = false;
  loading = false;

  @ViewChild('videoPlayer') videoplayer: ElementRef;

toggleVideo() {
    this.videoplayer.nativeElement.play();
}
  constructor(private fileSrv: FileService, private imageCompress: NgxImageCompressService) { }

  ngOnInit(): void {
  }
  setImage() {
    this.show = true;
    this.data.url = this.imgUrl;

  }

  file: any;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;

  sizeOFCompressedImage: number;

  handleFileInput(event: any) {
    this.loading = true;
    var fileName: any;
    this.file = event.target.files[0];
    fileName = this.file['name'];
    let fileType = this.file['type'];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        let compress = this.compressIfAndSendFile(this.localUrl, fileName, fileType, -1)
        let obs = new BehaviorSubject(500);
        EXIF.getData(this.file, function (compress) {
          const orientation = EXIF.getTag(this, 'Orientation');
          obs.next(orientation);
        });
        obs.subscribe(orientation => {
          if (orientation != 500) {
            if (orientation == undefined || orientation == null) {
              orientation = -1;
            }
            this.compressIfAndSendFile(this.localUrl, fileName, fileType, orientation)
          }
        })
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;

  compressIfAndSendFile(image, fileName, fileType, orientation) {
   
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    if (this.sizeOfOriginalImage > 1.5) {
      this.compressAndSend(image, fileName, fileType, orientation)
    } else {
      this.compressAndSend(image, fileName, fileType, orientation,100,90)
    }


  }
  compressAndSend(image, fileName, fileType, orientation,ratio?,quality?) {
    if(!ratio){ratio=50;}
    if(!quality){quality=50;}
    this.imageCompress.compressFile(image, orientation, ratio, quality).then(
      result => {
        this.imgResultAfterCompress = result;
        this.localCompressedURl = result;
        this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);
        // create file from byte
        const imageName = fileName;
        // call method that creates a blob from dataUri
        const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1], fileType);
        //imageFile created below is the new compressed file which can be send to API in form dataconst 
        const imageFile = new File([imageBlob], imageName, { type: fileType });
        this.sendFile(imageFile);
      });
  }
  dataURItoBlob(dataURI, fileType) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer); for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    } const blob = new Blob([int8Array], { type: fileType });
    return blob;
  }

  sendFile(file) {

    this.fileSrv.getImageLink(file).subscribe(res => {
      if (res['url']) {
        this.data.url = res['url'];
        this.show = true;
      } else {
        this.show = false;
      }
      this.loading = false;
    }, err => {
      this.show = false;
      this.loading = false;
    })

  }

  handleVideoInput(event: any){
    this.loading = true;
    var fileName: any;
    this.file = event.target.files[0]; 
    if(this.file.size < 5000000){
      this.sendFile(this.file);
    } else {
      console.log("can't load file more than 50mb");
      this.loading = false;

    }
  }
}
