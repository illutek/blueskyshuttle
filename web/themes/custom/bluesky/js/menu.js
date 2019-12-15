/**
 * Created by stefan on 01-11-2019.
 *
 */

(function () {
    'use strict';
  
    const openBtn = document.querySelector('.c-hamburger-btn');    
    const closeBtn = document.querySelector('.js-close-menu');    
    const menuOverlay = document.querySelector('.r-menu-overlay');    
    const openmenu = document.querySelector('.r-menu-overlay');
  
    // console.log(contactOverlay);
  
    /** 
     *  Functions
    */
  
    function closeMenu() {
      menuOverlay.classList.remove('r-menu-overlay--visible');
    }

    function openMenu() {
      menuOverlay.classList.toggle('r-menu-overlay--visible');
    }
 
    openBtn.addEventListener('click', openMenu);  
    closeBtn.addEventListener('click', closeMenu);    
    openmenu.addEventListener('click', () => setTimeout(closeMenu, 500));
  
  })();