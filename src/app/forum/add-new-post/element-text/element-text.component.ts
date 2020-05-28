import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-element-text',
  templateUrl: './element-text.component.html',
  styleUrls: ['./element-text.component.scss']
})
export class ElementTextComponent implements OnInit {
  @ViewChild('textAr') textArea: ElementRef;; 
  @Input()
  data
  userInput;

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() { 
    let area = this.textArea.nativeElement;
    area.setAttribute('style', 'height:' + 32 + 'px;overflow-y:hidden;');
    area.addEventListener("input", OnInput, false);
     

    function OnInput() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }
  }
  onKey($event){
    this.data.text=this.userInput;
    
    
  }
  public cleanField(){
    this.data.text=undefined;
    this.userInput="";
    let area = this.textArea.nativeElement;
    area.setAttribute('style', 'height:' + 32 + 'px;overflow-y:hidden;');
  }
}
