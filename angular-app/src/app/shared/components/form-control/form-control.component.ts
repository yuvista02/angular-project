import {Component, Input, OnInit, ViewEncapsulation}    from '@angular/core';
import {FormControl}                                    from '@angular/forms';

@Component({
    selector: 'form-control',
    templateUrl: './form-control.component.html',
    styleUrls: ['./form-control.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class FormControlComponent implements OnInit {
    @Input() label: any;
    @Input() control: any;
    @Input() labelSize: any;
    @Input() size: any;
    @Input() hint: any;
    @Input() required: any;
    @Input() list: any;

    isRequired = false;

    constructor() {

    }

    ngOnInit(): void {
        if  (this.control) {
            const validators = this.control.validator ? this.control.validator(new FormControl('')) : false;
            this.isRequired = validators && validators.required;
        }
    }

    validators() {
        return this.control.validator(this.control);
    }
}
