import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { Items } from '../modal/Items.model';
import { AuthService } from '../Services/auth.service';
import { ItemsService } from '../Services/items.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {
  items: Items[]
  loggedIn: boolean = false;
  subs: Subscription;
  constructor(private itemsService: ItemsService, private authService: AuthService, private toaster: ToastrService, private router: Router) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe
  }

  ngOnInit() {

    this.subs = this.itemsService.getItems().subscribe((itemsRes: Items[]) => {
      this.items = itemsRes;
    })

    this.subs = this.authService.user.pipe(take(1)).subscribe(user => {
      this.loggedIn = !!user
      // console.log(user)
    })
    //console.log(this.loggedIn);
  }
  //     items:Items[] = [{
  //     imageUrl:"https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2021/09/realme-gt-neo-1632316326-1632740974.jpg",
  //     description:"Realme Gt Neo 2"
  //   },
  //   { imageUrl:"https://cdn.pocket-lint.com/r/s/1200x/assets/images/157747-phones-review-hands-on-oneplus-nord-2-review-image11-8sxrpujdtq.jpg",
  //   description:"One Plus Nord 2"},
  //   {
  //     imageUrl:"https://www.photographyblog.com/uploads/entryImages/_1280xAUTO_crop_center-center_none/apple_iphone_13_pro_review.jpg",
  //     description:"Iphone 13 Max Pro"
  //   }
  // ];




  addToCart(addItem: Items) {
    if (this.loggedIn) {
      this.toaster.success("Added to cart", 'success');
      this.subs= this.itemsService.addToCart(addItem).subscribe(data => {
        console.log(data);

      });
      //console.log(addItem);

    }
    else {
      this.toaster.error("Please Logged in to continue", 'error')
    }
  }
}
