import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SEOService {

  constructor(
    private titleService: Title,
    private meta: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute
) { }
updateMetaInfo(tag, content) {
  this.meta.updateTag({ name: tag, content: content });
}

updateTitle(title?: string) {
  if (!title) {
      this.router.events
          .pipe(
              filter((event) => event instanceof NavigationEnd),
              map(() => this.activatedRoute),
              map((route) => {
                  while (route.firstChild) { route = route.firstChild; }
                  return route;
              }),
              filter((route) => route.outlet === 'primary'),
              mergeMap((route) => route.data)).subscribe((event) => {
                  this.titleService.setTitle(event['title'] + ' | Pakdim.com');
              });
  } else {
      this.titleService.setTitle(title + ' | Pakdim.com');
  }
}

}
