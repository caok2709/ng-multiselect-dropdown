import { Component, HostListener, forwardRef, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Directive, ElementRef, Pipe, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ListItem {
    /**
     * @param {?} source
     */
    constructor(source) {
        if (typeof source === 'string') {
            this.id = this.text = source;
        }
        if (typeof source === 'object') {
            this.id = source.id;
            this.text = source.text;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ DROPDOWN_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectComponent),
    multi: true
};
const /** @type {?} */ noop = () => { };
class MultiSelectComponent {
    /**
     * @param {?} cdr
     */
    constructor(cdr) {
        this.cdr = cdr;
        this._data = [];
        this.selectedItems = [];
        this.isDropdownOpen = false;
        this._placeholder = 'Select';
        this.filter = new ListItem(this.data);
        this.defaultSettings = {
            singleSelection: false,
            allowAddChoice: false,
            idField: 'id',
            textField: 'text',
            enableCheckAll: true,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            allowSearchFilter: false,
            limitSelection: -1,
            clearSearchFilter: true,
            maxHeight: 197,
            itemsShowLimit: 999999999999,
            searchPlaceholderText: 'Search',
            noDataAvailablePlaceholderText: 'No data available',
            closeDropDownOnSelection: false,
            showSelectedItemsAtTop: false
        };
        this.disabled = false;
        this.onFilterChange = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onDeSelect = new EventEmitter();
        this.onSelectAll = new EventEmitter();
        this.onDeSelectAll = new EventEmitter();
        this.onEnterChange = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set placeholder(value) {
        if (value) {
            this._placeholder = value;
        }
        else {
            this._placeholder = 'Select';
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set settings(value) {
        if (value) {
            this._settings = Object.assign(this.defaultSettings, value);
        }
        else {
            this._settings = Object.assign(this.defaultSettings);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set data(value) {
        if (!value) {
            this._data = [];
        }
        else {
            // const _items = value.filter((item: any) => {
            //   if (typeof item === 'string' || (typeof item === 'object' && item && item[this._settings.idField] && item[this._settings.textField])) {
            //     return item;
            //   }
            // });
            this._data = value.map((item) => typeof item === 'string'
                ? new ListItem(item)
                : new ListItem({
                    id: item[this._settings.idField],
                    text: item[this._settings.textField]
                }));
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onFilterTextChange($event) {
        this.onFilterChange.emit($event);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onEnterKeydownChange($event) {
        if (this.filter.text && this._settings.allowAddChoice) {
            if (this._data.filter(function (item) {
                if (typeof item === 'string') {
                    return item === this.filter.text;
                }
                else {
                    return item[this._settings.textField] === this.filter.text;
                }
            }).length === 0) {
                this._data.push(new ListItem(this.filter.text));
                const /** @type {?} */ dataArray = [];
                this._data.map(function (item) {
                    dataArray.push(item[this._settings.textField]);
                });
                this.onEnterChange.emit(dataArray);
            }
        }
    }
    /**
     * @param {?} $event
     * @param {?} item
     * @return {?}
     */
    onItemClick($event, item) {
        if (this.disabled) {
            return false;
        }
        const /** @type {?} */ found = this.isSelected(item);
        const /** @type {?} */ allowAdd = this._settings.limitSelection === -1 || (this._settings.limitSelection > 0 && this.selectedItems.length < this._settings.limitSelection);
        if (!found) {
            if (allowAdd) {
                this.addSelected(item);
            }
        }
        else {
            this.removeSelected(item);
        }
        if (this._settings.singleSelection && this._settings.closeDropDownOnSelection) {
            this.closeDropdown();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== undefined && value !== null) {
            if (this._settings.singleSelection) {
                try {
                    if (value.length >= 1) {
                        const /** @type {?} */ firstItem = (typeof value === 'string') ? value : value[0];
                        this.selectedItems = [
                            typeof firstItem === 'string'
                                ? new ListItem(firstItem)
                                : new ListItem({
                                    id: firstItem[this._settings.idField],
                                    text: firstItem[this._settings.textField]
                                })
                        ];
                    }
                }
                catch (/** @type {?} */ e) {
                    // console.error(e.body.msg);
                }
            }
            else if (value.length > 0) {
                const /** @type {?} */ _data = value.map((item) => typeof item === 'string'
                    ? new ListItem(item)
                    : new ListItem({
                        id: item[this._settings.idField],
                        text: item[this._settings.textField]
                    }));
                if (this._settings.limitSelection > 0) {
                    this.selectedItems = _data.splice(0, this._settings.limitSelection);
                }
                else {
                    this.selectedItems = _data;
                }
            }
        }
        else {
            this.selectedItems = [];
        }
        this.onChangeCallback(value);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @return {?}
     */
    onTouched() {
        this.closeDropdown();
        this.onTouchedCallback();
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackByFn(index, item) {
        return item.id;
    }
    /**
     * @param {?} clickedItem
     * @return {?}
     */
    isSelected(clickedItem) {
        let /** @type {?} */ found = false;
        this.selectedItems.forEach(item => {
            if (clickedItem.id === item.id) {
                found = true;
            }
        });
        return found;
    }
    /**
     * @return {?}
     */
    isLimitSelectionReached() {
        return this._settings.limitSelection === this.selectedItems.length;
    }
    /**
     * @return {?}
     */
    isAllItemsSelected() {
        return this._data.length === this.selectedItems.length;
    }
    /**
     * @return {?}
     */
    showButton() {
        if (!this._settings.singleSelection) {
            if (this._settings.limitSelection > 0) {
                return false;
            }
            // this._settings.enableCheckAll = this._settings.limitSelection === -1 ? true : false;
            return true; // !this._settings.singleSelection && this._settings.enableCheckAll && this._data.length > 0;
        }
        else {
            // should be disabled in single selection mode
            return false;
        }
    }
    /**
     * @return {?}
     */
    itemShowRemaining() {
        return this.selectedItems.length - this._settings.itemsShowLimit;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    addSelected(item) {
        if (this._settings.singleSelection) {
            this.selectedItems = [];
            this.selectedItems.push(item);
        }
        else {
            this.selectedItems.push(item);
        }
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onSelect.emit(this.emittedValue(item));
    }
    /**
     * @param {?} itemSel
     * @return {?}
     */
    removeSelected(itemSel) {
        this.selectedItems.forEach(item => {
            if (itemSel.id === item.id) {
                this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
            }
        });
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onDeSelect.emit(this.emittedValue(itemSel));
    }
    /**
     * @param {?} val
     * @return {?}
     */
    emittedValue(val) {
        const /** @type {?} */ selected = [];
        if (Array.isArray(val)) {
            val.map(item => {
                if (item.id === item.text) {
                    selected.push(item.text);
                }
                else {
                    selected.push(this.objectify(item));
                }
            });
        }
        else {
            if (val) {
                if (val.id === val.text) {
                    return val.text;
                }
                else {
                    return this.objectify(val);
                }
            }
        }
        return selected;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    objectify(val) {
        const /** @type {?} */ obj = {};
        obj[this._settings.idField] = val.id;
        obj[this._settings.textField] = val.text;
        return obj;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    toggleDropdown(evt) {
        evt.preventDefault();
        if (this.disabled && this._settings.singleSelection) {
            return;
        }
        this.isDropdownOpen = !this.isDropdownOpen;
    }
    /**
     * @return {?}
     */
    closeDropdown() {
        this.isDropdownOpen = false;
        // clear search text
        if (this._settings.clearSearchFilter) {
            this.filter.text = '';
        }
    }
    /**
     * @return {?}
     */
    toggleSelectAll() {
        if (this.disabled) {
            return false;
        }
        if (!this.isAllItemsSelected()) {
            this.selectedItems = this._data.slice();
            this.onSelectAll.emit(this.emittedValue(this.selectedItems));
        }
        else {
            this.selectedItems = [];
            this.onDeSelectAll.emit(this.emittedValue(this.selectedItems));
        }
        this.onChangeCallback(this.emittedValue(this.selectedItems));
    }
}
MultiSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-multiselect-dropdown',
                template: `<div tabindex="=0" (blur)="onTouched()" class="multiselect-dropdown" (clickOutside)="closeDropdown()">
  <div [class.disabled]="disabled">
    <span tabindex="-1" class="dropdown-btn" (click)="toggleDropdown($event)">
      <span *ngIf="selectedItems.length == 0">{{_placeholder}}</span>
      <span class="selected-item" *ngFor="let item of selectedItems;trackBy: trackByFn;let k = index" [hidden]="k > _settings.itemsShowLimit-1">
        {{item.text}}
        <a style="padding-top:2px;padding-left:2px;color:white" (click)="onItemClick($event,item)">x</a>
      </span>
      <span style="float:right !important;padding-right:4px">
        <span style="padding-right: 6px;" *ngIf="itemShowRemaining()>0">+{{itemShowRemaining()}}</span>
        <span [ngClass]="isDropdownOpen ? 'dropdown-up' : 'dropdown-down'"></span>
      </span>
    </span>
  </div>
  <div class="dropdown-list" [hidden]="!isDropdownOpen">
    <ul class="item1">
      <li (click)="toggleSelectAll()" *ngIf="_data.length > 0 && !_settings.singleSelection && _settings.enableCheckAll && _settings.limitSelection===-1"
        class="multiselect-item-checkbox" style="border-bottom: 1px solid #ccc;padding:10px">
        <input type="checkbox" [checked]="isAllItemsSelected()" [disabled]="disabled || isLimitSelectionReached()" />
        <div>{{!isAllItemsSelected() ? _settings.selectAllText : _settings.unSelectAllText}}</div>
      </li>
      <li class="filter-textbox" *ngIf="_data.length>0 && _settings.allowSearchFilter">
        <input type="text" [readOnly]="disabled" [placeholder]="_settings.searchPlaceholderText" [(ngModel)]="filter.text" (keydown.enter)="onEnterKeydownChange($event)" (ngModelChange)="onFilterTextChange($event)">
      </li>
    </ul>
    <ul class="item2" [style.maxHeight]="_settings.maxHeight+'px'">
      <li *ngFor="let item of _data | ng2ListFilter:filter; let i = index;" (click)="onItemClick($event,item)" class="multiselect-item-checkbox">
        <input type="checkbox" [checked]="isSelected(item)" [disabled]="disabled || (isLimitSelectionReached() && !isSelected(item))"
        />
        <div>{{item.text}}</div>
      </li>
      <li class='no-data' *ngIf="_data.length == 0">
        <h5>{{_settings.noDataAvailablePlaceholderText}}</h5>
      </li>
    </ul>
  </div>
</div>
`,
                styles: [`.multiselect-dropdown{position:relative;width:100%}.multiselect-dropdown .dropdown-btn{display:inline-block;border:1px solid #adadad;width:100%;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.52857143;text-align:left;vertical-align:middle;cursor:pointer;background-image:none;border-radius:4px}.multiselect-dropdown .dropdown-btn .selected-item{border:1px solid #337ab7;margin-right:4px;background:#337ab7;padding:0 5px;color:#fff;border-radius:2px;float:left}.multiselect-dropdown .dropdown-btn .selected-item a{text-decoration:none}.multiselect-dropdown .dropdown-btn .selected-item:hover{box-shadow:1px 1px #959595}.multiselect-dropdown .dropdown-btn .dropdown-down{display:inline-block;top:10px;width:0;height:0;border-top:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .dropdown-btn .dropdown-up{display:inline-block;width:0;height:0;border-bottom:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .disabled>span{background-color:#eceeef}.dropdown-list{position:absolute;padding-top:6px;width:100%;z-index:9999;border:1px solid #ccc;border-radius:3px;background:#fff;margin-top:10px;box-shadow:0 1px 5px #959595}.dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.dropdown-list li{padding:6px 10px;cursor:pointer;text-align:left}.dropdown-list .filter-textbox{border-bottom:1px solid #ccc;position:relative;padding:10px}.dropdown-list .filter-textbox input{border:0;width:100%;padding:0 0 0 26px}.dropdown-list .filter-textbox input:focus{outline:0}.multiselect-item-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.multiselect-item-checkbox input[type=checkbox]:focus+div:before,.multiselect-item-checkbox input[type=checkbox]:hover+div:before{border-color:#337ab7;background-color:#f2f2f2}.multiselect-item-checkbox input[type=checkbox]:active+div:before{transition-duration:0s}.multiselect-item-checkbox input[type=checkbox]+div{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;margin:0;color:#000}.multiselect-item-checkbox input[type=checkbox]+div:before{box-sizing:content-box;content:'';color:#337ab7;position:absolute;top:50%;left:0;width:14px;height:14px;margin-top:-9px;border:2px solid #337ab7;text-align:center;transition:.4s}.multiselect-item-checkbox input[type=checkbox]+div:after{box-sizing:content-box;content:'';position:absolute;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:50%;transform-origin:50%;transition:transform .2s ease-out,-webkit-transform .2s ease-out;background-color:transparent;top:50%;left:4px;width:8px;height:3px;margin-top:-4px;border-style:solid;border-color:#fff;border-width:0 0 3px 3px;-o-border-image:none;border-image:none;-webkit-transform:rotate(-45deg) scale(0);transform:rotate(-45deg) scale(0)}.multiselect-item-checkbox input[type=checkbox]:disabled+div:before{border-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:disabled:focus+div:before .multiselect-item-checkbox input[type=checkbox]:disabled:hover+div:before{background-color:inherit}.multiselect-item-checkbox input[type=checkbox]:disabled:checked+div:before{background-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:checked+div:after{content:'';transition:transform .2s ease-out,-webkit-transform .2s ease-out;-webkit-transform:rotate(-45deg) scale(1);transform:rotate(-45deg) scale(1)}.multiselect-item-checkbox input[type=checkbox]:checked+div:before{-webkit-animation:.2s ease-in borderscale;animation:.2s ease-in borderscale;background:#337ab7}@-webkit-keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}@keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}`],
                providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
MultiSelectComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
];
MultiSelectComponent.propDecorators = {
    "placeholder": [{ type: Input },],
    "disabled": [{ type: Input },],
    "settings": [{ type: Input },],
    "data": [{ type: Input },],
    "onFilterChange": [{ type: Output, args: ['onFilterChange',] },],
    "onSelect": [{ type: Output, args: ['onSelect',] },],
    "onDeSelect": [{ type: Output, args: ['onDeSelect',] },],
    "onSelectAll": [{ type: Output, args: ['onSelectAll',] },],
    "onDeSelectAll": [{ type: Output, args: ['onDeSelectAll',] },],
    "onEnterChange": [{ type: Output, args: ['onEnterChange',] },],
    "onTouched": [{ type: HostListener, args: ['blur',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClickOutsideDirective {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.clickOutside = new EventEmitter();
    }
    /**
     * @param {?} event
     * @param {?} targetElement
     * @return {?}
     */
    onClick(event, targetElement) {
        if (!targetElement) {
            return;
        }
        const /** @type {?} */ clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(event);
        }
    }
}
ClickOutsideDirective.decorators = [
    { type: Directive, args: [{
                selector: '[clickOutside]'
            },] },
];
/** @nocollapse */
ClickOutsideDirective.ctorParameters = () => [
    { type: ElementRef, },
];
ClickOutsideDirective.propDecorators = {
    "clickOutside": [{ type: Output },],
    "onClick": [{ type: HostListener, args: ['document:click', ['$event', '$event.target'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ListFilterPipe {
    /**
     * @param {?} items
     * @param {?} filter
     * @return {?}
     */
    transform(items, filter) {
        if (!items || !filter) {
            return items;
        }
        return items.filter((item) => this.applyFilter(item, filter));
    }
    /**
     * @param {?} item
     * @param {?} filter
     * @return {?}
     */
    applyFilter(item, filter) {
        return !(filter.text && item.text && item.text.toLowerCase().indexOf(filter.text.toLowerCase()) === -1);
    }
}
ListFilterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'ng2ListFilter',
                pure: false
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgMultiSelectDropDownModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: NgMultiSelectDropDownModule
        };
    }
}
NgMultiSelectDropDownModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule],
                declarations: [MultiSelectComponent, ClickOutsideDirective, ListFilterPipe],
                exports: [MultiSelectComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { MultiSelectComponent, NgMultiSelectDropDownModule, ClickOutsideDirective as ɵb, ListFilterPipe as ɵc, DROPDOWN_CONTROL_VALUE_ACCESSOR as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbXVsdGlzZWxlY3QtZHJvcGRvd24uanMubWFwIiwic291cmNlcyI6WyJuZzovL25nLW11bHRpc2VsZWN0LWRyb3Bkb3duL211bHRpc2VsZWN0Lm1vZGVsLnRzIiwibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi9tdWx0aXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL25nLW11bHRpc2VsZWN0LWRyb3Bkb3duL2NsaWNrLW91dHNpZGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi9saXN0LWZpbHRlci5waXBlLnRzIiwibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBJRHJvcGRvd25TZXR0aW5ncyB7XG4gIHNpbmdsZVNlbGVjdGlvbj86IGJvb2xlYW47XG4gIGFsbG93QWRkQ2hvaWNlPzogYm9vbGVhbjtcbiAgaWRGaWVsZD86IHN0cmluZztcbiAgdGV4dEZpZWxkPzogc3RyaW5nO1xuICBlbmFibGVDaGVja0FsbD86IGJvb2xlYW47XG4gIHNlbGVjdEFsbFRleHQ/OiBzdHJpbmc7XG4gIHVuU2VsZWN0QWxsVGV4dD86IHN0cmluZztcbiAgYWxsb3dTZWFyY2hGaWx0ZXI/OiBib29sZWFuO1xuICBjbGVhclNlYXJjaEZpbHRlcj86IGJvb2xlYW47XG4gIG1heEhlaWdodD86IG51bWJlcjtcbiAgaXRlbXNTaG93TGltaXQ/OiBudW1iZXI7XG4gIGxpbWl0U2VsZWN0aW9uPzogbnVtYmVyO1xuICBzZWFyY2hQbGFjZWhvbGRlclRleHQ/OiBzdHJpbmc7XG4gIG5vRGF0YUF2YWlsYWJsZVBsYWNlaG9sZGVyVGV4dD86IHN0cmluZztcbiAgY2xvc2VEcm9wRG93bk9uU2VsZWN0aW9uPzogYm9vbGVhbjtcbiAgc2hvd1NlbGVjdGVkSXRlbXNBdFRvcD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBMaXN0SXRlbSB7XG4gIGlkOiBTdHJpbmc7XG4gIHRleHQ6IFN0cmluZztcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc291cmNlOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuaWQgPSB0aGlzLnRleHQgPSBzb3VyY2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc291cmNlID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5pZCA9IHNvdXJjZS5pZDtcbiAgICAgIHRoaXMudGV4dCA9IHNvdXJjZS50ZXh0O1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBIb3N0TGlzdGVuZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTGlzdEl0ZW0sIElEcm9wZG93blNldHRpbmdzIH0gZnJvbSAnLi9tdWx0aXNlbGVjdC5tb2RlbCc7XG5cbmV4cG9ydCBjb25zdCBEUk9QRE9XTl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNdWx0aVNlbGVjdENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuY29uc3Qgbm9vcCA9ICgpID0+IHsgfTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctbXVsdGlzZWxlY3QtZHJvcGRvd24nLFxuICB0ZW1wbGF0ZTogYDxkaXYgdGFiaW5kZXg9XCI9MFwiIChibHVyKT1cIm9uVG91Y2hlZCgpXCIgY2xhc3M9XCJtdWx0aXNlbGVjdC1kcm9wZG93blwiIChjbGlja091dHNpZGUpPVwiY2xvc2VEcm9wZG93bigpXCI+XG4gIDxkaXYgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgPHNwYW4gdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwiZHJvcGRvd24tYnRuXCIgKGNsaWNrKT1cInRvZ2dsZURyb3Bkb3duKCRldmVudClcIj5cbiAgICAgIDxzcGFuICpuZ0lmPVwic2VsZWN0ZWRJdGVtcy5sZW5ndGggPT0gMFwiPnt7X3BsYWNlaG9sZGVyfX08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdGVkLWl0ZW1cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzZWxlY3RlZEl0ZW1zO3RyYWNrQnk6IHRyYWNrQnlGbjtsZXQgayA9IGluZGV4XCIgW2hpZGRlbl09XCJrID4gX3NldHRpbmdzLml0ZW1zU2hvd0xpbWl0LTFcIj5cbiAgICAgICAge3tpdGVtLnRleHR9fVxuICAgICAgICA8YSBzdHlsZT1cInBhZGRpbmctdG9wOjJweDtwYWRkaW5nLWxlZnQ6MnB4O2NvbG9yOndoaXRlXCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCxpdGVtKVwiPng8L2E+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBzdHlsZT1cImZsb2F0OnJpZ2h0ICFpbXBvcnRhbnQ7cGFkZGluZy1yaWdodDo0cHhcIj5cbiAgICAgICAgPHNwYW4gc3R5bGU9XCJwYWRkaW5nLXJpZ2h0OiA2cHg7XCIgKm5nSWY9XCJpdGVtU2hvd1JlbWFpbmluZygpPjBcIj4re3tpdGVtU2hvd1JlbWFpbmluZygpfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIFtuZ0NsYXNzXT1cImlzRHJvcGRvd25PcGVuID8gJ2Ryb3Bkb3duLXVwJyA6ICdkcm9wZG93bi1kb3duJ1wiPjwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L3NwYW4+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24tbGlzdFwiIFtoaWRkZW5dPVwiIWlzRHJvcGRvd25PcGVuXCI+XG4gICAgPHVsIGNsYXNzPVwiaXRlbTFcIj5cbiAgICAgIDxsaSAoY2xpY2spPVwidG9nZ2xlU2VsZWN0QWxsKClcIiAqbmdJZj1cIl9kYXRhLmxlbmd0aCA+IDAgJiYgIV9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24gJiYgX3NldHRpbmdzLmVuYWJsZUNoZWNrQWxsICYmIF9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbj09PS0xXCJcbiAgICAgICAgY2xhc3M9XCJtdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94XCIgc3R5bGU9XCJib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztwYWRkaW5nOjEwcHhcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIFtjaGVja2VkXT1cImlzQWxsSXRlbXNTZWxlY3RlZCgpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkIHx8IGlzTGltaXRTZWxlY3Rpb25SZWFjaGVkKClcIiAvPlxuICAgICAgICA8ZGl2Pnt7IWlzQWxsSXRlbXNTZWxlY3RlZCgpID8gX3NldHRpbmdzLnNlbGVjdEFsbFRleHQgOiBfc2V0dGluZ3MudW5TZWxlY3RBbGxUZXh0fX08L2Rpdj5cbiAgICAgIDwvbGk+XG4gICAgICA8bGkgY2xhc3M9XCJmaWx0ZXItdGV4dGJveFwiICpuZ0lmPVwiX2RhdGEubGVuZ3RoPjAgJiYgX3NldHRpbmdzLmFsbG93U2VhcmNoRmlsdGVyXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIFtyZWFkT25seV09XCJkaXNhYmxlZFwiIFtwbGFjZWhvbGRlcl09XCJfc2V0dGluZ3Muc2VhcmNoUGxhY2Vob2xkZXJUZXh0XCIgWyhuZ01vZGVsKV09XCJmaWx0ZXIudGV4dFwiIChrZXlkb3duLmVudGVyKT1cIm9uRW50ZXJLZXlkb3duQ2hhbmdlKCRldmVudClcIiAobmdNb2RlbENoYW5nZSk9XCJvbkZpbHRlclRleHRDaGFuZ2UoJGV2ZW50KVwiPlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICAgIDx1bCBjbGFzcz1cIml0ZW0yXCIgW3N0eWxlLm1heEhlaWdodF09XCJfc2V0dGluZ3MubWF4SGVpZ2h0KydweCdcIj5cbiAgICAgIDxsaSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBfZGF0YSB8IG5nMkxpc3RGaWx0ZXI6ZmlsdGVyOyBsZXQgaSA9IGluZGV4O1wiIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsaXRlbSlcIiBjbGFzcz1cIm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3hcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIFtjaGVja2VkXT1cImlzU2VsZWN0ZWQoaXRlbSlcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgKGlzTGltaXRTZWxlY3Rpb25SZWFjaGVkKCkgJiYgIWlzU2VsZWN0ZWQoaXRlbSkpXCJcbiAgICAgICAgLz5cbiAgICAgICAgPGRpdj57e2l0ZW0udGV4dH19PC9kaXY+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzPSduby1kYXRhJyAqbmdJZj1cIl9kYXRhLmxlbmd0aCA9PSAwXCI+XG4gICAgICAgIDxoNT57e19zZXR0aW5ncy5ub0RhdGFBdmFpbGFibGVQbGFjZWhvbGRlclRleHR9fTwvaDU+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLm11bHRpc2VsZWN0LWRyb3Bkb3due3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG57ZGlzcGxheTppbmxpbmUtYmxvY2s7Ym9yZGVyOjFweCBzb2xpZCAjYWRhZGFkO3dpZHRoOjEwMCU7cGFkZGluZzo2cHggMTJweDttYXJnaW4tYm90dG9tOjA7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjEuNTI4NTcxNDM7dGV4dC1hbGlnbjpsZWZ0O3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtjdXJzb3I6cG9pbnRlcjtiYWNrZ3JvdW5kLWltYWdlOm5vbmU7Ym9yZGVyLXJhZGl1czo0cHh9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLnNlbGVjdGVkLWl0ZW17Ym9yZGVyOjFweCBzb2xpZCAjMzM3YWI3O21hcmdpbi1yaWdodDo0cHg7YmFja2dyb3VuZDojMzM3YWI3O3BhZGRpbmc6MCA1cHg7Y29sb3I6I2ZmZjtib3JkZXItcmFkaXVzOjJweDtmbG9hdDpsZWZ0fS5tdWx0aXNlbGVjdC1kcm9wZG93biAuZHJvcGRvd24tYnRuIC5zZWxlY3RlZC1pdGVtIGF7dGV4dC1kZWNvcmF0aW9uOm5vbmV9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLnNlbGVjdGVkLWl0ZW06aG92ZXJ7Ym94LXNoYWRvdzoxcHggMXB4ICM5NTk1OTV9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLmRyb3Bkb3duLWRvd257ZGlzcGxheTppbmxpbmUtYmxvY2s7dG9wOjEwcHg7d2lkdGg6MDtoZWlnaHQ6MDtib3JkZXItdG9wOjEwcHggc29saWQgI2FkYWRhZDtib3JkZXItbGVmdDoxMHB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yaWdodDoxMHB4IHNvbGlkIHRyYW5zcGFyZW50fS5tdWx0aXNlbGVjdC1kcm9wZG93biAuZHJvcGRvd24tYnRuIC5kcm9wZG93bi11cHtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDowO2hlaWdodDowO2JvcmRlci1ib3R0b206MTBweCBzb2xpZCAjYWRhZGFkO2JvcmRlci1sZWZ0OjEwcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjEwcHggc29saWQgdHJhbnNwYXJlbnR9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kaXNhYmxlZD5zcGFue2JhY2tncm91bmQtY29sb3I6I2VjZWVlZn0uZHJvcGRvd24tbGlzdHtwb3NpdGlvbjphYnNvbHV0ZTtwYWRkaW5nLXRvcDo2cHg7d2lkdGg6MTAwJTt6LWluZGV4Ojk5OTk7Ym9yZGVyOjFweCBzb2xpZCAjY2NjO2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQ6I2ZmZjttYXJnaW4tdG9wOjEwcHg7Ym94LXNoYWRvdzowIDFweCA1cHggIzk1OTU5NX0uZHJvcGRvd24tbGlzdCB1bHtwYWRkaW5nOjA7bGlzdC1zdHlsZTpub25lO292ZXJmbG93OmF1dG87bWFyZ2luOjB9LmRyb3Bkb3duLWxpc3QgbGl7cGFkZGluZzo2cHggMTBweDtjdXJzb3I6cG9pbnRlcjt0ZXh0LWFsaWduOmxlZnR9LmRyb3Bkb3duLWxpc3QgLmZpbHRlci10ZXh0Ym94e2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNjY2M7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzoxMHB4fS5kcm9wZG93bi1saXN0IC5maWx0ZXItdGV4dGJveCBpbnB1dHtib3JkZXI6MDt3aWR0aDoxMDAlO3BhZGRpbmc6MCAwIDAgMjZweH0uZHJvcGRvd24tbGlzdCAuZmlsdGVyLXRleHRib3ggaW5wdXQ6Zm9jdXN7b3V0bGluZTowfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hde2JvcmRlcjowO2NsaXA6cmVjdCgwIDAgMCAwKTtoZWlnaHQ6MXB4O21hcmdpbjotMXB4O292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjA7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MXB4fS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmZvY3VzK2RpdjpiZWZvcmUsLm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06aG92ZXIrZGl2OmJlZm9yZXtib3JkZXItY29sb3I6IzMzN2FiNztiYWNrZ3JvdW5kLWNvbG9yOiNmMmYyZjJ9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06YWN0aXZlK2RpdjpiZWZvcmV7dHJhbnNpdGlvbi1kdXJhdGlvbjowc30ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XStkaXZ7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZy1sZWZ0OjJlbTt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO2N1cnNvcjpwb2ludGVyO21hcmdpbjowO2NvbG9yOiMwMDB9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF0rZGl2OmJlZm9yZXtib3gtc2l6aW5nOmNvbnRlbnQtYm94O2NvbnRlbnQ6Jyc7Y29sb3I6IzMzN2FiNztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6MDt3aWR0aDoxNHB4O2hlaWdodDoxNHB4O21hcmdpbi10b3A6LTlweDtib3JkZXI6MnB4IHNvbGlkICMzMzdhYjc7dGV4dC1hbGlnbjpjZW50ZXI7dHJhbnNpdGlvbjouNHN9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF0rZGl2OmFmdGVye2JveC1zaXppbmc6Y29udGVudC1ib3g7Y29udGVudDonJztwb3NpdGlvbjphYnNvbHV0ZTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCk7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjUwJTt0cmFuc2Zvcm0tb3JpZ2luOjUwJTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMgZWFzZS1vdXQsLXdlYmtpdC10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7dG9wOjUwJTtsZWZ0OjRweDt3aWR0aDo4cHg7aGVpZ2h0OjNweDttYXJnaW4tdG9wOi00cHg7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci1jb2xvcjojZmZmO2JvcmRlci13aWR0aDowIDAgM3B4IDNweDstby1ib3JkZXItaW1hZ2U6bm9uZTtib3JkZXItaW1hZ2U6bm9uZTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKSBzY2FsZSgwKTt0cmFuc2Zvcm06cm90YXRlKC00NWRlZykgc2NhbGUoMCl9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06ZGlzYWJsZWQrZGl2OmJlZm9yZXtib3JkZXItY29sb3I6I2NjY30ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpkaXNhYmxlZDpmb2N1cytkaXY6YmVmb3JlIC5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmRpc2FibGVkOmhvdmVyK2RpdjpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0fS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmRpc2FibGVkOmNoZWNrZWQrZGl2OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiNjY2N9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCtkaXY6YWZ0ZXJ7Y29udGVudDonJzt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMgZWFzZS1vdXQsLXdlYmtpdC10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0Oy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpIHNjYWxlKDEpO3RyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKSBzY2FsZSgxKX0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpjaGVja2VkK2RpdjpiZWZvcmV7LXdlYmtpdC1hbmltYXRpb246LjJzIGVhc2UtaW4gYm9yZGVyc2NhbGU7YW5pbWF0aW9uOi4ycyBlYXNlLWluIGJvcmRlcnNjYWxlO2JhY2tncm91bmQ6IzMzN2FiN31ALXdlYmtpdC1rZXlmcmFtZXMgYm9yZGVyc2NhbGV7NTAle2JveC1zaGFkb3c6MCAwIDAgMnB4ICMzMzdhYjd9fUBrZXlmcmFtZXMgYm9yZGVyc2NhbGV7NTAle2JveC1zaGFkb3c6MCAwIDAgMnB4ICMzMzdhYjd9fWBdLFxuICBwcm92aWRlcnM6IFtEUk9QRE9XTl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIHB1YmxpYyBfc2V0dGluZ3M6IElEcm9wZG93blNldHRpbmdzO1xuICBwdWJsaWMgX2RhdGE6IEFycmF5PExpc3RJdGVtPiA9IFtdO1xuICBwdWJsaWMgc2VsZWN0ZWRJdGVtczogQXJyYXk8TGlzdEl0ZW0+ID0gW107XG4gIHB1YmxpYyBpc0Ryb3Bkb3duT3BlbiA9IGZhbHNlO1xuICBfcGxhY2Vob2xkZXIgPSAnU2VsZWN0JztcbiAgZmlsdGVyOiBMaXN0SXRlbSA9IG5ldyBMaXN0SXRlbSh0aGlzLmRhdGEpO1xuICBkZWZhdWx0U2V0dGluZ3M6IElEcm9wZG93blNldHRpbmdzID0ge1xuICAgIHNpbmdsZVNlbGVjdGlvbjogZmFsc2UsXG4gICAgYWxsb3dBZGRDaG9pY2U6IGZhbHNlLFxuICAgIGlkRmllbGQ6ICdpZCcsXG4gICAgdGV4dEZpZWxkOiAndGV4dCcsXG4gICAgZW5hYmxlQ2hlY2tBbGw6IHRydWUsXG4gICAgc2VsZWN0QWxsVGV4dDogJ1NlbGVjdCBBbGwnLFxuICAgIHVuU2VsZWN0QWxsVGV4dDogJ1VuU2VsZWN0IEFsbCcsXG4gICAgYWxsb3dTZWFyY2hGaWx0ZXI6IGZhbHNlLFxuICAgIGxpbWl0U2VsZWN0aW9uOiAtMSxcbiAgICBjbGVhclNlYXJjaEZpbHRlcjogdHJ1ZSxcbiAgICBtYXhIZWlnaHQ6IDE5NyxcbiAgICBpdGVtc1Nob3dMaW1pdDogOTk5OTk5OTk5OTk5LFxuICAgIHNlYXJjaFBsYWNlaG9sZGVyVGV4dDogJ1NlYXJjaCcsXG4gICAgbm9EYXRhQXZhaWxhYmxlUGxhY2Vob2xkZXJUZXh0OiAnTm8gZGF0YSBhdmFpbGFibGUnLFxuICAgIGNsb3NlRHJvcERvd25PblNlbGVjdGlvbjogZmFsc2UsXG4gICAgc2hvd1NlbGVjdGVkSXRlbXNBdFRvcDogZmFsc2VcbiAgfTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHBsYWNlaG9sZGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gJ1NlbGVjdCc7XG4gICAgfVxuICB9XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBzZXR0aW5ncyh2YWx1ZTogSURyb3Bkb3duU2V0dGluZ3MpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0gT2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRTZXR0aW5ncywgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0U2V0dGluZ3MpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZTogQXJyYXk8YW55Pikge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29uc3QgX2l0ZW1zID0gdmFsdWUuZmlsdGVyKChpdGVtOiBhbnkpID0+IHtcbiAgICAgIC8vICAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyB8fCAodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnICYmIGl0ZW0gJiYgaXRlbVt0aGlzLl9zZXR0aW5ncy5pZEZpZWxkXSAmJiBpdGVtW3RoaXMuX3NldHRpbmdzLnRleHRGaWVsZF0pKSB7XG4gICAgICAvLyAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0pO1xuICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlLm1hcChcbiAgICAgICAgKGl0ZW06IGFueSkgPT5cbiAgICAgICAgICB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gbmV3IExpc3RJdGVtKGl0ZW0pXG4gICAgICAgICAgICA6IG5ldyBMaXN0SXRlbSh7XG4gICAgICAgICAgICAgIGlkOiBpdGVtW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdLFxuICAgICAgICAgICAgICB0ZXh0OiBpdGVtW3RoaXMuX3NldHRpbmdzLnRleHRGaWVsZF1cbiAgICAgICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ29uRmlsdGVyQ2hhbmdlJykgb25GaWx0ZXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxMaXN0SXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCdvblNlbGVjdCcpIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8TGlzdEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgnb25EZVNlbGVjdCcpIG9uRGVTZWxlY3Q6IEV2ZW50RW1pdHRlcjxMaXN0SXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCdvblNlbGVjdEFsbCcpIG9uU2VsZWN0QWxsOiBFdmVudEVtaXR0ZXI8QXJyYXk8TGlzdEl0ZW0+PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8YW55Pj4oKTtcblxuICBAT3V0cHV0KCdvbkRlU2VsZWN0QWxsJykgb25EZVNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PExpc3RJdGVtPj4gPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XG5cbiAgQE91dHB1dCgnb25FbnRlckNoYW5nZScpIG9uRW50ZXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxBcnJheTxMaXN0SXRlbT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xuXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIG9uRmlsdGVyVGV4dENoYW5nZSgkZXZlbnQpIHtcbiAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlLmVtaXQoJGV2ZW50KTtcbiAgfVxuXG4gIG9uRW50ZXJLZXlkb3duQ2hhbmdlKCRldmVudCkge1xuICAgIGlmICh0aGlzLmZpbHRlci50ZXh0ICYmIHRoaXMuX3NldHRpbmdzLmFsbG93QWRkQ2hvaWNlKSB7XG4gICAgICBpZiAodGhpcy5fZGF0YS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHJldHVybiBpdGVtID09PSB0aGlzLmZpbHRlci50ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBpdGVtW3RoaXMuX3NldHRpbmdzLnRleHRGaWVsZF0gPT09IHRoaXMuZmlsdGVyLnRleHQ7XG4gICAgICAgIH1cbiAgICAgIH0pLmxlbmd0aCA9PT0gMFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX2RhdGEucHVzaChuZXcgTGlzdEl0ZW0odGhpcy5maWx0ZXIudGV4dCkpO1xuICAgICAgICBjb25zdCBkYXRhQXJyYXkgPSBbXTtcbiAgICAgICAgdGhpcy5fZGF0YS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICBkYXRhQXJyYXkucHVzaChpdGVtW3RoaXMuX3NldHRpbmdzLnRleHRGaWVsZF0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbkVudGVyQ2hhbmdlLmVtaXQoZGF0YUFycmF5KTtcbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICB9XG5cbiAgb25JdGVtQ2xpY2soJGV2ZW50OiBhbnksIGl0ZW06IExpc3RJdGVtKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBmb3VuZCA9IHRoaXMuaXNTZWxlY3RlZChpdGVtKTtcbiAgICBjb25zdCBhbGxvd0FkZCA9IHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09PSAtMSB8fCAodGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPiAwICYmIHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggPCB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbik7XG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgaWYgKGFsbG93QWRkKSB7XG4gICAgICAgIHRoaXMuYWRkU2VsZWN0ZWQoaXRlbSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlU2VsZWN0ZWQoaXRlbSk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24gJiYgdGhpcy5fc2V0dGluZ3MuY2xvc2VEcm9wRG93bk9uU2VsZWN0aW9uKSB7XG4gICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICB9XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgY29uc3QgZmlyc3RJdGVtID0gKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpID8gdmFsdWUgOiB2YWx1ZVswXTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtcbiAgICAgICAgICAgICAgdHlwZW9mIGZpcnN0SXRlbSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICA/IG5ldyBMaXN0SXRlbShmaXJzdEl0ZW0pXG4gICAgICAgICAgICAgICAgOiBuZXcgTGlzdEl0ZW0oe1xuICAgICAgICAgICAgICAgICAgaWQ6IGZpcnN0SXRlbVt0aGlzLl9zZXR0aW5ncy5pZEZpZWxkXSxcbiAgICAgICAgICAgICAgICAgIHRleHQ6IGZpcnN0SXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5lcnJvcihlLmJvZHkubXNnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IF9kYXRhID0gdmFsdWUubWFwKFxuICAgICAgICAgIChpdGVtOiBhbnkpID0+XG4gICAgICAgICAgICB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgPyBuZXcgTGlzdEl0ZW0oaXRlbSlcbiAgICAgICAgICAgICAgOiBuZXcgTGlzdEl0ZW0oe1xuICAgICAgICAgICAgICAgIGlkOiBpdGVtW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdLFxuICAgICAgICAgICAgICAgIHRleHQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXVxuICAgICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgICBpZiAodGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPiAwKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gX2RhdGEuc3BsaWNlKDAsIHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBfZGF0YTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIFNldCB0b3VjaGVkIG9uIGJsdXJcbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIHB1YmxpYyBvblRvdWNoZWQoKSB7XG4gICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgdHJhY2tCeUZuKGluZGV4LCBpdGVtKSB7XG4gICAgcmV0dXJuIGl0ZW0uaWQ7XG4gIH1cblxuICBpc1NlbGVjdGVkKGNsaWNrZWRJdGVtOiBMaXN0SXRlbSkge1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKGNsaWNrZWRJdGVtLmlkID09PSBpdGVtLmlkKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICBpc0xpbWl0U2VsZWN0aW9uUmVhY2hlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPT09IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7XG4gIH1cblxuICBpc0FsbEl0ZW1zU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGEubGVuZ3RoID09PSB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO1xuICB9XG5cbiAgc2hvd0J1dHRvbigpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID4gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyB0aGlzLl9zZXR0aW5ncy5lbmFibGVDaGVja0FsbCA9IHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09PSAtMSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlOyAvLyAhdGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uICYmIHRoaXMuX3NldHRpbmdzLmVuYWJsZUNoZWNrQWxsICYmIHRoaXMuX2RhdGEubGVuZ3RoID4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2hvdWxkIGJlIGRpc2FibGVkIGluIHNpbmdsZSBzZWxlY3Rpb24gbW9kZVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGl0ZW1TaG93UmVtYWluaW5nKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggLSB0aGlzLl9zZXR0aW5ncy5pdGVtc1Nob3dMaW1pdDtcbiAgfVxuXG4gIGFkZFNlbGVjdGVkKGl0ZW06IExpc3RJdGVtKSB7XG4gICAgaWYgKHRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLmVtaXR0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKTtcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQodGhpcy5lbWl0dGVkVmFsdWUoaXRlbSkpO1xuICB9XG5cbiAgcmVtb3ZlU2VsZWN0ZWQoaXRlbVNlbDogTGlzdEl0ZW0pIHtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtU2VsLmlkID09PSBpdGVtLmlkKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5zcGxpY2UodGhpcy5zZWxlY3RlZEl0ZW1zLmluZGV4T2YoaXRlbSksIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLmVtaXR0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKTtcbiAgICB0aGlzLm9uRGVTZWxlY3QuZW1pdCh0aGlzLmVtaXR0ZWRWYWx1ZShpdGVtU2VsKSk7XG4gIH1cblxuICBlbWl0dGVkVmFsdWUodmFsOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IHNlbGVjdGVkID0gW107XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgdmFsLm1hcChpdGVtID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uaWQgPT09IGl0ZW0udGV4dCkge1xuICAgICAgICAgIHNlbGVjdGVkLnB1c2goaXRlbS50ZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxlY3RlZC5wdXNoKHRoaXMub2JqZWN0aWZ5KGl0ZW0pKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgaWYgKHZhbC5pZCA9PT0gdmFsLnRleHQpIHtcbiAgICAgICAgICByZXR1cm4gdmFsLnRleHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0aWZ5KHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGVkO1xuICB9XG5cbiAgb2JqZWN0aWZ5KHZhbDogTGlzdEl0ZW0pIHtcbiAgICBjb25zdCBvYmogPSB7fTtcbiAgICBvYmpbdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0gPSB2YWwuaWQ7XG4gICAgb2JqW3RoaXMuX3NldHRpbmdzLnRleHRGaWVsZF0gPSB2YWwudGV4dDtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdG9nZ2xlRHJvcGRvd24oZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgJiYgdGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaXNEcm9wZG93bk9wZW4gPSAhdGhpcy5pc0Ryb3Bkb3duT3BlbjtcbiAgfVxuXG4gIGNsb3NlRHJvcGRvd24oKSB7XG4gICAgdGhpcy5pc0Ryb3Bkb3duT3BlbiA9IGZhbHNlO1xuICAgIC8vIGNsZWFyIHNlYXJjaCB0ZXh0XG4gICAgaWYgKHRoaXMuX3NldHRpbmdzLmNsZWFyU2VhcmNoRmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlci50ZXh0ID0gJyc7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlU2VsZWN0QWxsKCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghdGhpcy5pc0FsbEl0ZW1zU2VsZWN0ZWQoKSkge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gdGhpcy5fZGF0YS5zbGljZSgpO1xuICAgICAgdGhpcy5vblNlbGVjdEFsbC5lbWl0KHRoaXMuZW1pdHRlZFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgIHRoaXMub25EZVNlbGVjdEFsbC5lbWl0KHRoaXMuZW1pdHRlZFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpO1xuICAgIH1cbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbY2xpY2tPdXRzaWRlXSdcbn0pXG5leHBvcnQgY2xhc3MgQ2xpY2tPdXRzaWRlRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIGNsaWNrT3V0c2lkZSA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnLCAnJGV2ZW50LnRhcmdldCddKVxuICAgIHB1YmxpYyBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNsaWNrZWRJbnNpZGUgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnModGFyZ2V0RWxlbWVudCk7XG4gICAgICAgIGlmICghY2xpY2tlZEluc2lkZSkge1xuICAgICAgICAgICAgdGhpcy5jbGlja091dHNpZGUuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IExpc3RJdGVtIH0gZnJvbSAnLi9tdWx0aXNlbGVjdC5tb2RlbCc7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnbmcyTGlzdEZpbHRlcicsXG4gICAgcHVyZTogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgTGlzdEZpbHRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0oaXRlbXM6IExpc3RJdGVtW10sIGZpbHRlcjogTGlzdEl0ZW0pOiBMaXN0SXRlbVtdIHtcbiAgICAgICAgaWYgKCFpdGVtcyB8fCAhZmlsdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW1zLmZpbHRlcigoaXRlbTogTGlzdEl0ZW0pID0+IHRoaXMuYXBwbHlGaWx0ZXIoaXRlbSwgZmlsdGVyKSk7XG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXIoaXRlbTogTGlzdEl0ZW0sIGZpbHRlcjogTGlzdEl0ZW0pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEoZmlsdGVyLnRleHQgJiYgaXRlbS50ZXh0ICYmIGl0ZW0udGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyLnRleHQudG9Mb3dlckNhc2UoKSkgPT09IC0xKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTXVsdGlTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL211bHRpc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDbGlja091dHNpZGVEaXJlY3RpdmUgfSBmcm9tICcuL2NsaWNrLW91dHNpZGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IExpc3RGaWx0ZXJQaXBlIH0gZnJvbSAnLi9saXN0LWZpbHRlci5waXBlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtNdWx0aVNlbGVjdENvbXBvbmVudCwgQ2xpY2tPdXRzaWRlRGlyZWN0aXZlLCBMaXN0RmlsdGVyUGlwZV0sXG4gIGV4cG9ydHM6IFtNdWx0aVNlbGVjdENvbXBvbmVudF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBOZ011bHRpU2VsZWN0RHJvcERvd25Nb2R1bGUge1xuICAgIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmdNb2R1bGU6IE5nTXVsdGlTZWxlY3REcm9wRG93bk1vZHVsZVxuICAgICAgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O2dCQXVCcUIsTUFBVztRQUM1QixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM5QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDOUIsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztTQUN6Qjs7Q0FFSjs7Ozs7O0FDaENELHVCQWFhLCtCQUErQixHQUFRO0lBQ2xELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxNQUFNLG9CQUFvQixDQUFDO0lBQ25ELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUNGLHVCQUFNLElBQUksR0FBRyxTQUFTLENBQUM7Ozs7O0lBeUpyQixZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtxQkF6R1YsRUFBRTs2QkFDTSxFQUFFOzhCQUNsQixLQUFLOzRCQUNkLFFBQVE7c0JBQ0osSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzsrQkFDTDtZQUNuQyxlQUFlLEVBQUUsS0FBSztZQUN0QixjQUFjLEVBQUUsS0FBSztZQUNyQixPQUFPLEVBQUUsSUFBSTtZQUNiLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLGNBQWMsRUFBRSxJQUFJO1lB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