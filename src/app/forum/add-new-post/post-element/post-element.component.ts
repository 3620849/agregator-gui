import { Component, OnInit, Input, ViewChild, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { FileService } from 'src/app/shared/services/file.service';
import { NgxImageCompressService } from 'ngx-image-compress';

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
    var fileName: any;
    this.file = event.target.files[0];
    fileName = this.file['name'];
    let fileType = this.file['type'];
    //console.log(this.file);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        this.compressFile(this.localUrl, fileName,fileType)
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;

  compressFile(image, fileName,fileType) {
    this.loading = true;  
    var orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    //console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
    this.imageCompress.compressFile(image, orientation, 50, 50).then(
      result => {
        this.imgResultAfterCompress = result;
        this.localCompressedURl = result;
        this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);
        //console.warn('Size in bytes after compression:', this.sizeOFCompressedImage);
        // create file from byte
        const imageName = fileName;
        //console.log("fn: ",imageName);
        // call method that creates a blob from dataUri
        const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1],fileType);
        //imageFile created below is the new compressed file which can be send to API in form dataconst 
        const imageFile = new File([imageBlob], imageName, { type: fileType });
        this.sendFile(imageFile);
      });
  }

  dataURItoBlob(dataURI,fileType) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer); for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    } const blob = new Blob([int8Array], { type: fileType });
    return blob;
  }

  sendFile(file) {
    
    this.fileSrv.getImageLink(file).subscribe(res=>{
      if(res['url']){
      this.data.url = res['url']; 
      this.show=true;
      }else{
        this.show=false;
      }
      this.loading=false;
    },err=>{
      this.show=false;
      this.loading=false;
    })

  }
}
