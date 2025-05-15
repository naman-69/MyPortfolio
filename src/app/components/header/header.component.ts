import { CommonModule } from '@angular/common';
import { Component, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuOpen = false;
  currentSection = 'home';

  constructor(private renderer: Renderer2) {
    // Add event listener to close menu when clicking outside
    this.renderer.listen('window', 'click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#menu') && !target.closest('.navbar') && this.menuOpen) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    // Toggle between hamburger and close icon
    const menuIcon = document.getElementById('menu');
    if (menuIcon) {
      if (this.menuOpen) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
      } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
      }
    }
  }

  closeMenu() {
    if (this.menuOpen) {
      this.menuOpen = false;
      const menuIcon = document.getElementById('menu');
      if (menuIcon) {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach((section: any) => {
      if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
        this.currentSection = section.getAttribute('id');
      }
    });
  }
}




//  public currentSection: string = 'home'; // ✅ Declare the property

//   @HostListener('window:scroll', [])
//   onWindowScroll() {
//     const sections = document.querySelectorAll('section');
//     let scrollY = window.pageYOffset;

//     sections.forEach((section: any) => {
//       const sectionTop = section.offsetTop - 100;
//       const sectionHeight = section.offsetHeight;
//       const sectionId = section.getAttribute('id');

//       if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
//         this.currentSection = sectionId;
//       }
//     });
//   }
// }