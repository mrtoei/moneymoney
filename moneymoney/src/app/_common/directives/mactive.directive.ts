import {AfterViewInit, Directive, ElementRef, Renderer2} from "@angular/core";
import {Router} from "@angular/router";

@Directive({
    selector: '[mactive]'
})
export class MenuActiveDirective implements AfterViewInit
{
    constructor(private renderer: Renderer2, private el: ElementRef, private router: Router)
    {
    }

    ngAfterViewInit()
    {
        this.router.events.subscribe((val)=>{
            this.active();
        })
    }

    private active()
    {
        let routePath = this.el.nativeElement.getAttribute('mactive');
        let curRoutePath = this.router.url;
       if(curRoutePath === routePath){
           this.renderer.addClass(this.el.nativeElement, 'active');
        }
        else{
           this.renderer.removeClass(this.el.nativeElement, 'active');
        }
    }
}