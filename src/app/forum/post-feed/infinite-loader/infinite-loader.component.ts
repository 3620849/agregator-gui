import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-infinite-loader',
  templateUrl: './infinite-loader.component.html',
  styleUrls: ['./infinite-loader.component.scss']
})
export class InfiniteLoaderComponent implements OnInit {
  @Output()
  scrolled = new EventEmitter<void>();
  obs!:IntersectionObserver;
  @ViewChild('anchor') anchor: ElementRef<HTMLElement>;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.scrolled.emit();
        }
      });

    })
    this.obs.observe(this.anchor.nativeElement);

  }
}
