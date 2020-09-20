import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
// import { DataStoreService } from '../../services/data-store.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @ViewChild('absoluteArea', { static: true }) absoluteArea: ElementRef;

    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef
        // private _storeData: DataStoreService
    ) { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.go();
    }

    public go() {
        let road = this.absoluteArea.nativeElement;
        console.log('road: ', road);

        let childs = road.childNodes;
        console.log('childs: ', childs);
        // let newRow = road.childNodes[childs.length - 1].cloneNode(true);
        let velocity: number = 0;
        // let count: number = 0;
        // let k: number = 16;

        setInterval(() => {
            // count += 10;
            velocity += 2;
            // let elapsedCount: number = count;
            // velocity = count / k;
            console.log('bottom: ', `-${velocity}`);
            if (velocity % 800 === 0) {
                // this.renderer.removeChild(road, road.childNodes[childs.length - 1]);
                road.prepend(road.childNodes[childs.length - 1]);
                console.log('new road 2: ', road);
                // let currentBottom = road.style.bottom;
                velocity = velocity - 800;
                // this.renderer.setStyle(road, 'bottom', `-${bottom}px`);
            } else {
                this.renderer.setStyle(road, 'bottom', `-${velocity}px`);
            }
        }, 1);
    }
}
