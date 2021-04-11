import { Component, OnInit } from '@angular/core';
import { NavItem } from './nav-item.model';
import { NavigationService } from '../auth/service/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  newNavItems: NavItem[] = [];

  constructor(
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.addRemoveToggle();
    this.getAuthMenuList();
  }

  addRemoveToggle(){
    $(document).ready(function () {
      $('#close-sidebar').click(function () {
        $('.page-wrapper').removeClass('toggled');
      });
      $('#show-sidebar').click(function () {
        $('.page-wrapper').addClass('toggled');
      });
    });
  }

  
  getAuthMenuList() {
    this.navigationService.findAuthMenuList().subscribe(
      resp => {
        if (resp.success) {
          this.processMenuTree(resp.items);
        } else {
          console.log(resp.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  processMenuTree(menuList: any[]) {
    let roots = [];
    let nodes = [];
    let dispvaal = [];
    let j = 0;

    for (let i in menuList) {
      let menu = menuList[i];
      dispvaal[j] = menu.pageLink;
      j++;
      nodes[menu.childId] = {
        displayName: menu.displayValue,
        childId: menu.childId,
        route: menu.pageLink,
        iconName: menu.iconName,
        children: []
      };
      if (menu.parentId == 0) {
        roots.push(nodes[menu.childId]);
      }
      else {
        nodes[menu.parentId].children.push(nodes[menu.childId]);
      }
    }
    this.newNavItems = roots;
  }


}
