import {Component, OnDestroy} from '@angular/core';
import {AppService} from "./app.service";
import {HttpResponse} from "@angular/common/http";
import {TokenStorageService} from "./service/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  private roles: string[];
  isLoggedIn = false;
  username: string;

  isLoading = false;
  title = 'my-app';
  user;

  constructor(private appService: AppService, private tokenStorageService: TokenStorageService) {

    var random= Math.floor(Math.random() * 4) + 0;
    var bigSize = ["url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2FafbgXtj.jpg&f=1')",
      "url('https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgetwallpapers.com%2Fwallpaper%2Ffull%2F7%2Fe%2F3%2F148140.jpg')",
      "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhdqwalls.com%2Fwallpapers%2Fcute-kitty.jpg&f=1&nofb=1')",
      "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rxwallpaper.site%2Fwp-content%2Fuploads%2Fbest-cute-cat-wallpaper-high-resolution-widescreen-cats-of-laptop-800x800.jpg')",
];
    document.getElementById("body").style.backgroundImage=bigSize[random];

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }

    let user = appService.getUsers();
    appService.getUsers().subscribe(
      (res) => {
        console.error(res.body);
        this.isLoading = false;
        // this.paginateHashtags(res.body, res.headers);
      },
      () => {
        // this.isLoading = false;
      });
  }


  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


  // protected paginateHashtags(data: IHashtag[] | null, headers: HttpHeaders): void {
    // this.links = this.parseLinks.parse(headers.get('link') ?? '');
    // if (data) {
    //   for (const d of data) {
    //     this.hashtags.push(d);
    //   }
    // }
  // }
}
