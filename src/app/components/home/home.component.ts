import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
// import { DataStoreService } from '../../services/data-store.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @ViewChild('absoluteArea', { static: true }) absoluteArea: ElementRef;
    @ViewChild('racer', { static: true }) racer: ElementRef;
    public left: number = -335;
    public bottom: number = 50;

    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef
        // private _storeData: DataStoreService
    ) { }

    ngOnInit() {
        this.renderer.listen('document', 'keydown', (event) => {
            console.log(event.key);
            if (event.key === 'ArrowRight') {
                this.toRight();
            }

            if (event.key === 'ArrowLeft') {
                this.toLeft();
            }

            if (event.key === 'ArrowUp') {
                console.log('ArrowUp');
                this.speedUp();
            }

            if (event.key === 'ArrowDown') {
                this.speedDown();
            }
        });
    }

    ngAfterViewInit() {
        this.go();
        // console.log('this.renderer: ', this.renderer);
    }

    public go() {
        let road = this.absoluteArea.nativeElement;
        // console.log('road: ', road);

        let childs = road.childNodes;
        // console.log('childs: ', childs);
        let velocity: number = 0;

        setInterval(() => {
            velocity += 2;
            // console.log('bottom: ', `-${velocity}`);
            if (velocity % 800 === 0) {
                road.prepend(road.childNodes[childs.length - 1]);
                // console.log('new road 2: ', road);
                velocity = velocity - 800;
            } else {
                this.renderer.setStyle(road, 'bottom', `-${velocity}px`); // first way: better and the way of saving the application from xss attacks
                road.style.bottom = `-${velocity}px`; // second way
                // this.renderer.setStyle(this.racer.nativeElement, 'bottom', `${velocity}px`)
            }
        }, 1);
    }

    public toRight() {
        let increment = 10;
        console.log('this.left: ', this.left);
        if (this.left < 255 && this.left >= -395) {
            this.left += increment;
            this.renderer.setStyle(this.racer.nativeElement, 'left', `calc(50% + ${this.left}px)`);
        }
    }

    public toLeft() {
        let increment = 10;
        console.log('this.left: ', this.left);
        if (this.left <= 255 && this.left > -395) {
            this.left -= increment;
            this.renderer.setStyle(this.racer.nativeElement, 'left', `calc(50% + ${this.left}px)`);
        }
    }

    public speedUp() {
        let increment = 3;
        console.log('increment: ', increment);
        if (this.bottom < 800) {
            this.bottom += increment;
            this.renderer.setStyle(this.racer.nativeElement, 'bottom', `${this.bottom}px`);
        }
    }

    public speedDown() {
        let increment = -5;
        console.log('increment: ', increment);
        if (this.bottom > 50) {
            this.bottom += increment;
            this.renderer.setStyle(this.racer.nativeElement, 'bottom', `${this.bottom}px`);
        }
    }
}
