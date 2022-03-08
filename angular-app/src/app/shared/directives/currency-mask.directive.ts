import {
  Directive,
  ElementRef,
  HostListener,
  AfterViewInit,
  Input,
  forwardRef,
  Renderer2,
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormGroup,
} from '@angular/forms';

import { CurrencyMaskService } from 'src/app/shared/services/currency-mask.service';

const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CurrencyMaskDirective),
  multi: true,
};

@Directive({
  selector: '[yubCurrencyMask]',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class CurrencyMaskDirective
  implements AfterViewInit, ControlValueAccessor
{
  private el: any;
  // Keeps track of the value without formatting
  private innerValue: any;
  // Optional Parameter to allow for negative number interaction
  @Input('allowNegative')
  allowNegative!: boolean;

  @Input() form!: FormGroup;
  @Input() type!: string;

  constructor(
    private elementRef: ElementRef,
    private currencyMaskService: CurrencyMaskService,
    private renderer: Renderer2
  ) {
    this.el = elementRef.nativeElement;
  }

  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (a: any) => void = noop;

  // set getter
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.el.value = this.currencyMaskService.transform(
        value,
        this.allowNegative,
        this.type
      );
      if (value) {
        this.renderer.setAttribute(
          this.elementRef.nativeElement,
          'value',
          value
        );
      }
      this.innerValue = value;
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngAfterViewInit() {
    this.el.style.textAlign = 'left';
  }

  // On Focus remove all non-digit or decimal separator values
  @HostListener('focus', ['$event.target.value'])
  onfocus(value: any) {
    this.el.value = this.currencyMaskService.parse(value, this.allowNegative);
  }

  // On Blue remove all symbols except last . and set to currency format
  @HostListener('blur', ['$event.target.value'])
  onBlur(value: any) {
    this.onTouchedCallback();
    this.el.value = this.currencyMaskService.transform(
      value,
      this.allowNegative,
      this.type
    );
    this.innerValue = this.currencyMaskService.parse(
      this.el.value,
      this.allowNegative
    );
    if (this.innerValue == '') {
      this.onChangeCallback(null);
    } else {
      this.onChangeCallback(this.innerValue);
    }
    if (this.innerValue) {
      this.renderer.setAttribute(
        this.elementRef.nativeElement,
        'value',
        this.innerValue
      );
    }
  }

  // On Change remove all symbols except last . and set to currency format
  @HostListener('change', ['$event.target.value'])
  onChange(value: any) {
    this.el.value = this.currencyMaskService.transform(
      value,
      this.allowNegative,
      this.type
    );
    this.innerValue = this.currencyMaskService.parse(
      this.el.value,
      this.allowNegative
    );
    this.onChangeCallback(this.innerValue);
    if (this.innerValue) {
      this.renderer.setAttribute(
        this.elementRef.nativeElement,
        'value',
        this.innerValue
      );
    }
  }

  // Prevent user to enter anything but digits and decimal separator
  @HostListener('keypress', ['$event'])
  onKeyPress(event: any) {
    const key = event.which || event.keyCode || 0;
    if (key === 45 && !this.allowNegative) {
      event.preventDefault();
    } else if (key === 45 && this.allowNegative) {
      // allow negative numbers
    } else if (key !== 46 && key > 31 && (key < 48 || key > 57)) {
      event.preventDefault();
    }
    this.form.markAsDirty();
  }
}
