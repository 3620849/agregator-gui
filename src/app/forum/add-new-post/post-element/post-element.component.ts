import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-post-element',
  templateUrl: './post-element.component.html',
  styleUrls: ['./post-element.component.scss']
})
export class PostElementComponent implements OnInit {
  @Input()
  data;
  @ViewChild('textAr') textArea; 

  constructor() { }
  ngAfterViewInit() {
    let area = this.textArea.nativeElement;
    area.setAttribute('style', 'height:' + 32 + 'px;overflow-y:hidden;');
    area.addEventListener("input", OnInput, false);
     

    function OnInput() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }
  }
  ngOnInit(): void {
  }

}
