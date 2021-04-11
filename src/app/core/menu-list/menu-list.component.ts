import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NavItem } from '../navigation/nav-item.model';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styles: []
})
export class MenuListComponent implements OnInit , AfterViewInit{

  @Input() navItems: NavItem[] = [];


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // tslint:disable-next-line:prefer-const
    let dropdown = document.getElementsByClassName('dropdown-btn');
    // console.log(dropdown);
    let i;
    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener('click', function () {
        this.classList.toggle('active');
        // tslint:disable-next-line:prefer-const
        let dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === 'block') {
          dropdownContent.style.display = 'none';
        } else {
          dropdownContent.style.display = 'block';
        }
      });
    }

  }

}
