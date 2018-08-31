(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-multiselect-dropdown', ['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
    (factory((global['ng-multiselect-dropdown'] = {}),global.ng.core,global.ng.forms,global.ng.common));
}(this, (function (exports,core,forms,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ListItem = (function () {
        function ListItem(source) {
            if (typeof source === 'string') {
                this.id = this.text = source;
            }
            if (typeof source === 'object') {
                this.id = source.id;
                this.text = source.text;
            }
        }
        return ListItem;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ DROPDOWN_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return MultiSelectComponent; }),
        multi: true
    };
    var /** @type {?} */ noop = function () { };
    var MultiSelectComponent = (function () {
        function MultiSelectComponent(cdr) {
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
            this.onFilterChange = new core.EventEmitter();
            this.onSelect = new core.EventEmitter();
            this.onDeSelect = new core.EventEmitter();
            this.onSelectAll = new core.EventEmitter();
            this.onDeSelectAll = new core.EventEmitter();
            this.onEnterChange = new core.EventEmitter();
            this.onTouchedCallback = noop;
            this.onChangeCallback = noop;
        }
        Object.defineProperty(MultiSelectComponent.prototype, "placeholder", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                if (value) {
                    this._placeholder = value;
                }
                else {
                    this._placeholder = 'Select';
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MultiSelectComponent.prototype, "settings", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                if (value) {
                    this._settings = Object.assign(this.defaultSettings, value);
                }
                else {
                    this._settings = Object.assign(this.defaultSettings);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MultiSelectComponent.prototype, "data", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                var _this = this;
                if (!value) {
                    this._data = [];
                }
                else {
                    // const _items = value.filter((item: any) => {
                    //   if (typeof item === 'string' || (typeof item === 'object' && item && item[this._settings.idField] && item[this._settings.textField])) {
                    //     return item;
                    //   }
                    // });
                    this._data = value.map(function (item) {
                        return typeof item === 'string'
                            ? new ListItem(item)
                            : new ListItem({
                                id: item[_this._settings.idField],
                                text: item[_this._settings.textField]
                            });
                    });
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} $event
         * @return {?}
         */
        MultiSelectComponent.prototype.onFilterTextChange = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                this.onFilterChange.emit($event);
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        MultiSelectComponent.prototype.onEnterKeydownChange = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
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
                        var /** @type {?} */ dataArray_1 = [];
                        this._data.map(function (item) {
                            dataArray_1.push(item[this._settings.textField]);
                        });
                        this.onEnterChange.emit(dataArray_1);
                    }
                }
            };
        /**
         * @param {?} $event
         * @param {?} item
         * @return {?}
         */
        MultiSelectComponent.prototype.onItemClick = /**
         * @param {?} $event
         * @param {?} item
         * @return {?}
         */
            function ($event, item) {
                if (this.disabled) {
                    return false;
                }
                var /** @type {?} */ found = this.isSelected(item);
                var /** @type {?} */ allowAdd = this._settings.limitSelection === -1 || (this._settings.limitSelection > 0 && this.selectedItems.length < this._settings.limitSelection);
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
            };
        /**
         * @param {?} value
         * @return {?}
         */
        MultiSelectComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                var _this = this;
                if (value !== undefined && value !== null) {
                    if (this._settings.singleSelection) {
                        try {
                            if (value.length >= 1) {
                                var /** @type {?} */ firstItem = (typeof value === 'string') ? value : value[0];
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
                        catch (e) {
                            // console.error(e.body.msg);
                        }
                    }
                    else if (value.length > 0) {
                        var /** @type {?} */ _data = value.map(function (item) {
                            return typeof item === 'string'
                                ? new ListItem(item)
                                : new ListItem({
                                    id: item[_this._settings.idField],
                                    text: item[_this._settings.textField]
                                });
                        });
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
            };
        // From ControlValueAccessor interface
        /**
         * @param {?} fn
         * @return {?}
         */
        MultiSelectComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onChangeCallback = fn;
            };
        // From ControlValueAccessor interface
        /**
         * @param {?} fn
         * @return {?}
         */
        MultiSelectComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onTouchedCallback = fn;
            };
        /**
         * @return {?}
         */
        MultiSelectComponent.prototype.onTouched = /**
         * @return {?}
         */
            function () {
                this.closeDropdown();
                this.onTouchedCallback();
            };
        /**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        MultiSelectComponent.prototype.trackByFn = /**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
            function (index, item) {
                return item.id;
            };
        /**
         * @param {?} clickedItem
         * @return {?}
         */
        MultiSelectComponent.prototype.isSelected = /**
         * @param {?} clickedItem
         * @return {?}
         */
            function (clickedItem) {
                var /** @type {?} */ found = false;
                this.selectedItems.forEach(function (item) {
                    if (clickedItem.id === item.id) {
                        found = true;
                    }
                });
                return found;
            };
        /**
         * @return {?}
         */
        MultiSelectComponent.prototype.isLimitSelectionReached = /**
         * @return {?}
         */
            function () {
                return this._settings.limitSelection === this.selectedItems.length;
            };
        /**
         * @return {?}
         */
        MultiSelectComponent.prototype.isAllItemsSelected = /**
         * @return {?}
         */
            function () {
                return this._data.length === this.selectedItems.length;
            };
        /**
         * @return {?}
         */
        MultiSelectComponent.prototype.showButton = /**
         * @return {?}
         */
            function () {
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
            };
        /**
         * @return {?}
         */
        MultiSelectComponent.prototype.itemShowRemaining = /**
         * @return {?}
         */
            function () {
                return this.selectedItems.length - this._settings.itemsShowLimit;
            };
        /**
         * @param {?} item
         * @return {?}
         */
        MultiSelectComponent.prototype.addSelected = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                if (this._settings.singleSelection) {
                    this.selectedItems = [];
                    this.selectedItems.push(item);
                }
                else {
                    this.selectedItems.push(item);
                }
                this.onChangeCallback(this.emittedValue(this.selectedItems));
                this.onSelect.emit(this.emittedValue(item));
            };
        /**
         * @param {?} itemSel
         * @return {?}
         */
        MultiSelectComponent.prototype.removeSelected = /**
         * @param {?} itemSel
         * @return {?}
         */
            function (itemSel) {
                var _this = this;
                this.selectedItems.forEach(function (item) {
                    if (itemSel.id === item.id) {
                        _this.selectedItems.splice(_this.selectedItems.indexOf(item), 1);
                    }
                });
                this.onChangeCallback(this.emittedValue(this.selectedItems));
                this.onDeSelect.emit(this.emittedValue(itemSel));
            };
        /**
         * @param {?} val
         * @return {?}
         */
        MultiSelectComponent.prototype.emittedValue = /**
         * @param {?} val
         * @return {?}
         */
            function (val) {
                var _this = this;
                var /** @type {?} */ selected = [];
                if (Array.isArray(val)) {
                    val.map(function (item) {
                        if (item.id === item.text) {
                            selected.push(item.text);
                        }
                        else {
                            selected.push(_this.objectify(item));
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
            };
        /**
         * @param {?} val
         * @return {?}
         */
        MultiSelectComponent.prototype.objectify = /**
         * @param {?} val
         * @return {?}
         */
            function (val) {
                var /** @type {?} */ obj = {};
                obj[this._settings.idField] = val.id;
                obj[this._settings.textField] = val.text;
                return obj;
            };
        /**
         * @param {?} evt
         * @return {?}
         */
        MultiSelectComponent.prototype.toggleDropdown = /**
         * @param {?} evt
         * @return {?}
         */
            function (evt) {
                evt.preventDefault();
                if (this.disabled && this._settings.singleSelection) {
                    return;
                }
                this.isDropdownOpen = !this.isDropdownOpen;
            };
        /**
         * @return {?}
         */
        MultiSelectComponent.prototype.closeDropdown = /**
         * @return {?}
         */
            function () {
                this.isDropdownOpen = false;
                // clear search text
                if (this._settings.clearSearchFilter) {
                    this.filter.text = '';
                }
            };
        /**
         * @return {?}
         */
        MultiSelectComponent.prototype.toggleSelectAll = /**
         * @return {?}
         */
            function () {
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
            };
        MultiSelectComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ng-multiselect-dropdown',
                        template: "<div tabindex=\"=0\" (blur)=\"onTouched()\" class=\"multiselect-dropdown\" (clickOutside)=\"closeDropdown()\">\n  <div [class.disabled]=\"disabled\">\n    <span tabindex=\"-1\" class=\"dropdown-btn\" (click)=\"toggleDropdown($event)\">\n      <span *ngIf=\"selectedItems.length == 0\">{{_placeholder}}</span>\n      <span class=\"selected-item\" *ngFor=\"let item of selectedItems;trackBy: trackByFn;let k = index\" [hidden]=\"k > _settings.itemsShowLimit-1\">\n        {{item.text}}\n        <a style=\"padding-top:2px;padding-left:2px;color:white\" (click)=\"onItemClick($event,item)\">x</a>\n      </span>\n      <span style=\"float:right !important;padding-right:4px\">\n        <span style=\"padding-right: 6px;\" *ngIf=\"itemShowRemaining()>0\">+{{itemShowRemaining()}}</span>\n        <span [ngClass]=\"isDropdownOpen ? 'dropdown-up' : 'dropdown-down'\"></span>\n      </span>\n    </span>\n  </div>\n  <div class=\"dropdown-list\" [hidden]=\"!isDropdownOpen\">\n    <ul class=\"item1\">\n      <li (click)=\"toggleSelectAll()\" *ngIf=\"_data.length > 0 && !_settings.singleSelection && _settings.enableCheckAll && _settings.limitSelection===-1\"\n        class=\"multiselect-item-checkbox\" style=\"border-bottom: 1px solid #ccc;padding:10px\">\n        <input type=\"checkbox\" [checked]=\"isAllItemsSelected()\" [disabled]=\"disabled || isLimitSelectionReached()\" />\n        <div>{{!isAllItemsSelected() ? _settings.selectAllText : _settings.unSelectAllText}}</div>\n      </li>\n      <li class=\"filter-textbox\" *ngIf=\"_data.length>0 && _settings.allowSearchFilter\">\n        <input type=\"text\" [readOnly]=\"disabled\" [placeholder]=\"_settings.searchPlaceholderText\" [(ngModel)]=\"filter.text\" (keydown.enter)=\"onEnterKeydownChange($event)\" (ngModelChange)=\"onFilterTextChange($event)\">\n      </li>\n    </ul>\n    <ul class=\"item2\" [style.maxHeight]=\"_settings.maxHeight+'px'\">\n      <li *ngFor=\"let item of _data | ng2ListFilter:filter; let i = index;\" (click)=\"onItemClick($event,item)\" class=\"multiselect-item-checkbox\">\n        <input type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"disabled || (isLimitSelectionReached() && !isSelected(item))\"\n        />\n        <div>{{item.text}}</div>\n      </li>\n      <li class='no-data' *ngIf=\"_data.length == 0\">\n        <h5>{{_settings.noDataAvailablePlaceholderText}}</h5>\n      </li>\n    </ul>\n  </div>\n</div>\n",
                        styles: [".multiselect-dropdown{position:relative;width:100%}.multiselect-dropdown .dropdown-btn{display:inline-block;border:1px solid #adadad;width:100%;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.52857143;text-align:left;vertical-align:middle;cursor:pointer;background-image:none;border-radius:4px}.multiselect-dropdown .dropdown-btn .selected-item{border:1px solid #337ab7;margin-right:4px;background:#337ab7;padding:0 5px;color:#fff;border-radius:2px;float:left}.multiselect-dropdown .dropdown-btn .selected-item a{text-decoration:none}.multiselect-dropdown .dropdown-btn .selected-item:hover{box-shadow:1px 1px #959595}.multiselect-dropdown .dropdown-btn .dropdown-down{display:inline-block;top:10px;width:0;height:0;border-top:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .dropdown-btn .dropdown-up{display:inline-block;width:0;height:0;border-bottom:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .disabled>span{background-color:#eceeef}.dropdown-list{position:absolute;padding-top:6px;width:100%;z-index:9999;border:1px solid #ccc;border-radius:3px;background:#fff;margin-top:10px;box-shadow:0 1px 5px #959595}.dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.dropdown-list li{padding:6px 10px;cursor:pointer;text-align:left}.dropdown-list .filter-textbox{border-bottom:1px solid #ccc;position:relative;padding:10px}.dropdown-list .filter-textbox input{border:0;width:100%;padding:0 0 0 26px}.dropdown-list .filter-textbox input:focus{outline:0}.multiselect-item-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.multiselect-item-checkbox input[type=checkbox]:focus+div:before,.multiselect-item-checkbox input[type=checkbox]:hover+div:before{border-color:#337ab7;background-color:#f2f2f2}.multiselect-item-checkbox input[type=checkbox]:active+div:before{transition-duration:0s}.multiselect-item-checkbox input[type=checkbox]+div{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;margin:0;color:#000}.multiselect-item-checkbox input[type=checkbox]+div:before{box-sizing:content-box;content:'';color:#337ab7;position:absolute;top:50%;left:0;width:14px;height:14px;margin-top:-9px;border:2px solid #337ab7;text-align:center;transition:.4s}.multiselect-item-checkbox input[type=checkbox]+div:after{box-sizing:content-box;content:'';position:absolute;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:50%;transform-origin:50%;transition:transform .2s ease-out,-webkit-transform .2s ease-out;background-color:transparent;top:50%;left:4px;width:8px;height:3px;margin-top:-4px;border-style:solid;border-color:#fff;border-width:0 0 3px 3px;-o-border-image:none;border-image:none;-webkit-transform:rotate(-45deg) scale(0);transform:rotate(-45deg) scale(0)}.multiselect-item-checkbox input[type=checkbox]:disabled+div:before{border-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:disabled:focus+div:before .multiselect-item-checkbox input[type=checkbox]:disabled:hover+div:before{background-color:inherit}.multiselect-item-checkbox input[type=checkbox]:disabled:checked+div:before{background-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:checked+div:after{content:'';transition:transform .2s ease-out,-webkit-transform .2s ease-out;-webkit-transform:rotate(-45deg) scale(1);transform:rotate(-45deg) scale(1)}.multiselect-item-checkbox input[type=checkbox]:checked+div:before{-webkit-animation:.2s ease-in borderscale;animation:.2s ease-in borderscale;background:#337ab7}@-webkit-keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}@keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}"],
                        providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR],
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        MultiSelectComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef, },
            ];
        };
        MultiSelectComponent.propDecorators = {
            "placeholder": [{ type: core.Input },],
            "disabled": [{ type: core.Input },],
            "settings": [{ type: core.Input },],
            "data": [{ type: core.Input },],
            "onFilterChange": [{ type: core.Output, args: ['onFilterChange',] },],
            "onSelect": [{ type: core.Output, args: ['onSelect',] },],
            "onDeSelect": [{ type: core.Output, args: ['onDeSelect',] },],
            "onSelectAll": [{ type: core.Output, args: ['onSelectAll',] },],
            "onDeSelectAll": [{ type: core.Output, args: ['onDeSelectAll',] },],
            "onEnterChange": [{ type: core.Output, args: ['onEnterChange',] },],
            "onTouched": [{ type: core.HostListener, args: ['blur',] },],
        };
        return MultiSelectComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ClickOutsideDirective = (function () {
        function ClickOutsideDirective(_elementRef) {
            this._elementRef = _elementRef;
            this.clickOutside = new core.EventEmitter();
        }
        /**
         * @param {?} event
         * @param {?} targetElement
         * @return {?}
         */
        ClickOutsideDirective.prototype.onClick = /**
         * @param {?} event
         * @param {?} targetElement
         * @return {?}
         */
            function (event, targetElement) {
                if (!targetElement) {
                    return;
                }
                var /** @type {?} */ clickedInside = this._elementRef.nativeElement.contains(targetElement);
                if (!clickedInside) {
                    this.clickOutside.emit(event);
                }
            };
        ClickOutsideDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[clickOutside]'
                    },] },
        ];
        /** @nocollapse */
        ClickOutsideDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef, },
            ];
        };
        ClickOutsideDirective.propDecorators = {
            "clickOutside": [{ type: core.Output },],
            "onClick": [{ type: core.HostListener, args: ['document:click', ['$event', '$event.target'],] },],
        };
        return ClickOutsideDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ListFilterPipe = (function () {
        function ListFilterPipe() {
        }
        /**
         * @param {?} items
         * @param {?} filter
         * @return {?}
         */
        ListFilterPipe.prototype.transform = /**
         * @param {?} items
         * @param {?} filter
         * @return {?}
         */
            function (items, filter) {
                var _this = this;
                if (!items || !filter) {
                    return items;
                }
                return items.filter(function (item) { return _this.applyFilter(item, filter); });
            };
        /**
         * @param {?} item
         * @param {?} filter
         * @return {?}
         */
        ListFilterPipe.prototype.applyFilter = /**
         * @param {?} item
         * @param {?} filter
         * @return {?}
         */
            function (item, filter) {
                return !(filter.text && item.text && item.text.toLowerCase().indexOf(filter.text.toLowerCase()) === -1);
            };
        ListFilterPipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'ng2ListFilter',
                        pure: false
                    },] },
        ];
        return ListFilterPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgMultiSelectDropDownModule = (function () {
        function NgMultiSelectDropDownModule() {
        }
        /**
         * @return {?}
         */
        NgMultiSelectDropDownModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: NgMultiSelectDropDownModule
                };
            };
        NgMultiSelectDropDownModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, forms.FormsModule],
                        declarations: [MultiSelectComponent, ClickOutsideDirective, ListFilterPipe],
                        exports: [MultiSelectComponent]
                    },] },
        ];
        return NgMultiSelectDropDownModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.MultiSelectComponent = MultiSelectComponent;
    exports.NgMultiSelectDropDownModule = NgMultiSelectDropDownModule;
    exports.ɵb = ClickOutsideDirective;
    exports.ɵc = ListFilterPipe;
    exports.ɵa = DROPDOWN_CONTROL_VALUE_ACCESSOR;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbXVsdGlzZWxlY3QtZHJvcGRvd24udW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi9tdWx0aXNlbGVjdC5tb2RlbC50cyIsIm5nOi8vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24vbXVsdGlzZWxlY3QuY29tcG9uZW50LnRzIiwibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi9jbGljay1vdXRzaWRlLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24vbGlzdC1maWx0ZXIucGlwZS50cyIsIm5nOi8vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24ubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgSURyb3Bkb3duU2V0dGluZ3Mge1xuICBzaW5nbGVTZWxlY3Rpb24/OiBib29sZWFuO1xuICBhbGxvd0FkZENob2ljZT86IGJvb2xlYW47XG4gIGlkRmllbGQ/OiBzdHJpbmc7XG4gIHRleHRGaWVsZD86IHN0cmluZztcbiAgZW5hYmxlQ2hlY2tBbGw/OiBib29sZWFuO1xuICBzZWxlY3RBbGxUZXh0Pzogc3RyaW5nO1xuICB1blNlbGVjdEFsbFRleHQ/OiBzdHJpbmc7XG4gIGFsbG93U2VhcmNoRmlsdGVyPzogYm9vbGVhbjtcbiAgY2xlYXJTZWFyY2hGaWx0ZXI/OiBib29sZWFuO1xuICBtYXhIZWlnaHQ/OiBudW1iZXI7XG4gIGl0ZW1zU2hvd0xpbWl0PzogbnVtYmVyO1xuICBsaW1pdFNlbGVjdGlvbj86IG51bWJlcjtcbiAgc2VhcmNoUGxhY2Vob2xkZXJUZXh0Pzogc3RyaW5nO1xuICBub0RhdGFBdmFpbGFibGVQbGFjZWhvbGRlclRleHQ/OiBzdHJpbmc7XG4gIGNsb3NlRHJvcERvd25PblNlbGVjdGlvbj86IGJvb2xlYW47XG4gIHNob3dTZWxlY3RlZEl0ZW1zQXRUb3A/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW0ge1xuICBpZDogU3RyaW5nO1xuICB0ZXh0OiBTdHJpbmc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNvdXJjZTogYW55KSB7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLmlkID0gdGhpcy50ZXh0ID0gc291cmNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMuaWQgPSBzb3VyY2UuaWQ7XG4gICAgICB0aGlzLnRleHQgPSBzb3VyY2UudGV4dDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSG9zdExpc3RlbmVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IExpc3RJdGVtLCBJRHJvcGRvd25TZXR0aW5ncyB9IGZyb20gJy4vbXVsdGlzZWxlY3QubW9kZWwnO1xuXG5leHBvcnQgY29uc3QgRFJPUERPV05fQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTXVsdGlTZWxlY3RDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcbmNvbnN0IG5vb3AgPSAoKSA9PiB7IH07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLW11bHRpc2VsZWN0LWRyb3Bkb3duJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IHRhYmluZGV4PVwiPTBcIiAoYmx1cik9XCJvblRvdWNoZWQoKVwiIGNsYXNzPVwibXVsdGlzZWxlY3QtZHJvcGRvd25cIiAoY2xpY2tPdXRzaWRlKT1cImNsb3NlRHJvcGRvd24oKVwiPlxuICA8ZGl2IFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgIDxzcGFuIHRhYmluZGV4PVwiLTFcIiBjbGFzcz1cImRyb3Bkb3duLWJ0blwiIChjbGljayk9XCJ0b2dnbGVEcm9wZG93bigkZXZlbnQpXCI+XG4gICAgICA8c3BhbiAqbmdJZj1cInNlbGVjdGVkSXRlbXMubGVuZ3RoID09IDBcIj57e19wbGFjZWhvbGRlcn19PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzZWxlY3RlZC1pdGVtXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc2VsZWN0ZWRJdGVtczt0cmFja0J5OiB0cmFja0J5Rm47bGV0IGsgPSBpbmRleFwiIFtoaWRkZW5dPVwiayA+IF9zZXR0aW5ncy5pdGVtc1Nob3dMaW1pdC0xXCI+XG4gICAgICAgIHt7aXRlbS50ZXh0fX1cbiAgICAgICAgPGEgc3R5bGU9XCJwYWRkaW5nLXRvcDoycHg7cGFkZGluZy1sZWZ0OjJweDtjb2xvcjp3aGl0ZVwiIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsaXRlbSlcIj54PC9hPlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gc3R5bGU9XCJmbG9hdDpyaWdodCAhaW1wb3J0YW50O3BhZGRpbmctcmlnaHQ6NHB4XCI+XG4gICAgICAgIDxzcGFuIHN0eWxlPVwicGFkZGluZy1yaWdodDogNnB4O1wiICpuZ0lmPVwiaXRlbVNob3dSZW1haW5pbmcoKT4wXCI+K3t7aXRlbVNob3dSZW1haW5pbmcoKX19PC9zcGFuPlxuICAgICAgICA8c3BhbiBbbmdDbGFzc109XCJpc0Ryb3Bkb3duT3BlbiA/ICdkcm9wZG93bi11cCcgOiAnZHJvcGRvd24tZG93bidcIj48L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgPC9zcGFuPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImRyb3Bkb3duLWxpc3RcIiBbaGlkZGVuXT1cIiFpc0Ryb3Bkb3duT3BlblwiPlxuICAgIDx1bCBjbGFzcz1cIml0ZW0xXCI+XG4gICAgICA8bGkgKGNsaWNrKT1cInRvZ2dsZVNlbGVjdEFsbCgpXCIgKm5nSWY9XCJfZGF0YS5sZW5ndGggPiAwICYmICFfc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uICYmIF9zZXR0aW5ncy5lbmFibGVDaGVja0FsbCAmJiBfc2V0dGluZ3MubGltaXRTZWxlY3Rpb249PT0tMVwiXG4gICAgICAgIGNsYXNzPVwibXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveFwiIHN0eWxlPVwiYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7cGFkZGluZzoxMHB4XCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJpc0FsbEl0ZW1zU2VsZWN0ZWQoKVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCBpc0xpbWl0U2VsZWN0aW9uUmVhY2hlZCgpXCIgLz5cbiAgICAgICAgPGRpdj57eyFpc0FsbEl0ZW1zU2VsZWN0ZWQoKSA/IF9zZXR0aW5ncy5zZWxlY3RBbGxUZXh0IDogX3NldHRpbmdzLnVuU2VsZWN0QWxsVGV4dH19PC9kaXY+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzPVwiZmlsdGVyLXRleHRib3hcIiAqbmdJZj1cIl9kYXRhLmxlbmd0aD4wICYmIF9zZXR0aW5ncy5hbGxvd1NlYXJjaEZpbHRlclwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBbcmVhZE9ubHldPVwiZGlzYWJsZWRcIiBbcGxhY2Vob2xkZXJdPVwiX3NldHRpbmdzLnNlYXJjaFBsYWNlaG9sZGVyVGV4dFwiIFsobmdNb2RlbCldPVwiZmlsdGVyLnRleHRcIiAoa2V5ZG93bi5lbnRlcik9XCJvbkVudGVyS2V5ZG93bkNoYW5nZSgkZXZlbnQpXCIgKG5nTW9kZWxDaGFuZ2UpPVwib25GaWx0ZXJUZXh0Q2hhbmdlKCRldmVudClcIj5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgICA8dWwgY2xhc3M9XCJpdGVtMlwiIFtzdHlsZS5tYXhIZWlnaHRdPVwiX3NldHRpbmdzLm1heEhlaWdodCsncHgnXCI+XG4gICAgICA8bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2YgX2RhdGEgfCBuZzJMaXN0RmlsdGVyOmZpbHRlcjsgbGV0IGkgPSBpbmRleDtcIiAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LGl0ZW0pXCIgY2xhc3M9XCJtdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94XCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJpc1NlbGVjdGVkKGl0ZW0pXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkIHx8IChpc0xpbWl0U2VsZWN0aW9uUmVhY2hlZCgpICYmICFpc1NlbGVjdGVkKGl0ZW0pKVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxkaXY+e3tpdGVtLnRleHR9fTwvZGl2PlxuICAgICAgPC9saT5cbiAgICAgIDxsaSBjbGFzcz0nbm8tZGF0YScgKm5nSWY9XCJfZGF0YS5sZW5ndGggPT0gMFwiPlxuICAgICAgICA8aDU+e3tfc2V0dGluZ3Mubm9EYXRhQXZhaWxhYmxlUGxhY2Vob2xkZXJUZXh0fX08L2g1PlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5tdWx0aXNlbGVjdC1kcm9wZG93bntwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDAlfS5tdWx0aXNlbGVjdC1kcm9wZG93biAuZHJvcGRvd24tYnRue2Rpc3BsYXk6aW5saW5lLWJsb2NrO2JvcmRlcjoxcHggc29saWQgI2FkYWRhZDt3aWR0aDoxMDAlO3BhZGRpbmc6NnB4IDEycHg7bWFyZ2luLWJvdHRvbTowO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoxLjUyODU3MTQzO3RleHQtYWxpZ246bGVmdDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7Y3Vyc29yOnBvaW50ZXI7YmFja2dyb3VuZC1pbWFnZTpub25lO2JvcmRlci1yYWRpdXM6NHB4fS5tdWx0aXNlbGVjdC1kcm9wZG93biAuZHJvcGRvd24tYnRuIC5zZWxlY3RlZC1pdGVte2JvcmRlcjoxcHggc29saWQgIzMzN2FiNzttYXJnaW4tcmlnaHQ6NHB4O2JhY2tncm91bmQ6IzMzN2FiNztwYWRkaW5nOjAgNXB4O2NvbG9yOiNmZmY7Ym9yZGVyLXJhZGl1czoycHg7ZmxvYXQ6bGVmdH0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0biAuc2VsZWN0ZWQtaXRlbSBhe3RleHQtZGVjb3JhdGlvbjpub25lfS5tdWx0aXNlbGVjdC1kcm9wZG93biAuZHJvcGRvd24tYnRuIC5zZWxlY3RlZC1pdGVtOmhvdmVye2JveC1zaGFkb3c6MXB4IDFweCAjOTU5NTk1fS5tdWx0aXNlbGVjdC1kcm9wZG93biAuZHJvcGRvd24tYnRuIC5kcm9wZG93bi1kb3due2Rpc3BsYXk6aW5saW5lLWJsb2NrO3RvcDoxMHB4O3dpZHRoOjA7aGVpZ2h0OjA7Ym9yZGVyLXRvcDoxMHB4IHNvbGlkICNhZGFkYWQ7Ym9yZGVyLWxlZnQ6MTBweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItcmlnaHQ6MTBweCBzb2xpZCB0cmFuc3BhcmVudH0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0biAuZHJvcGRvd24tdXB7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MDtoZWlnaHQ6MDtib3JkZXItYm90dG9tOjEwcHggc29saWQgI2FkYWRhZDtib3JkZXItbGVmdDoxMHB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yaWdodDoxMHB4IHNvbGlkIHRyYW5zcGFyZW50fS5tdWx0aXNlbGVjdC1kcm9wZG93biAuZGlzYWJsZWQ+c3BhbntiYWNrZ3JvdW5kLWNvbG9yOiNlY2VlZWZ9LmRyb3Bkb3duLWxpc3R7cG9zaXRpb246YWJzb2x1dGU7cGFkZGluZy10b3A6NnB4O3dpZHRoOjEwMCU7ei1pbmRleDo5OTk5O2JvcmRlcjoxcHggc29saWQgI2NjYztib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kOiNmZmY7bWFyZ2luLXRvcDoxMHB4O2JveC1zaGFkb3c6MCAxcHggNXB4ICM5NTk1OTV9LmRyb3Bkb3duLWxpc3QgdWx7cGFkZGluZzowO2xpc3Qtc3R5bGU6bm9uZTtvdmVyZmxvdzphdXRvO21hcmdpbjowfS5kcm9wZG93bi1saXN0IGxpe3BhZGRpbmc6NnB4IDEwcHg7Y3Vyc29yOnBvaW50ZXI7dGV4dC1hbGlnbjpsZWZ0fS5kcm9wZG93bi1saXN0IC5maWx0ZXItdGV4dGJveHtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjY2NjO3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmc6MTBweH0uZHJvcGRvd24tbGlzdCAuZmlsdGVyLXRleHRib3ggaW5wdXR7Ym9yZGVyOjA7d2lkdGg6MTAwJTtwYWRkaW5nOjAgMCAwIDI2cHh9LmRyb3Bkb3duLWxpc3QgLmZpbHRlci10ZXh0Ym94IGlucHV0OmZvY3Vze291dGxpbmU6MH0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XXtib3JkZXI6MDtjbGlwOnJlY3QoMCAwIDAgMCk7aGVpZ2h0OjFweDttYXJnaW46LTFweDtvdmVyZmxvdzpoaWRkZW47cGFkZGluZzowO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjFweH0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpmb2N1cytkaXY6YmVmb3JlLC5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmhvdmVyK2RpdjpiZWZvcmV7Ym9yZGVyLWNvbG9yOiMzMzdhYjc7YmFja2dyb3VuZC1jb2xvcjojZjJmMmYyfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmFjdGl2ZStkaXY6YmVmb3Jle3RyYW5zaXRpb24tZHVyYXRpb246MHN9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF0rZGl2e3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmctbGVmdDoyZW07dmVydGljYWwtYWxpZ246bWlkZGxlOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTtjdXJzb3I6cG9pbnRlcjttYXJnaW46MDtjb2xvcjojMDAwfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdK2RpdjpiZWZvcmV7Ym94LXNpemluZzpjb250ZW50LWJveDtjb250ZW50OicnO2NvbG9yOiMzMzdhYjc7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtsZWZ0OjA7d2lkdGg6MTRweDtoZWlnaHQ6MTRweDttYXJnaW4tdG9wOi05cHg7Ym9yZGVyOjJweCBzb2xpZCAjMzM3YWI3O3RleHQtYWxpZ246Y2VudGVyO3RyYW5zaXRpb246LjRzfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdK2RpdjphZnRlcntib3gtc2l6aW5nOmNvbnRlbnQtYm94O2NvbnRlbnQ6Jyc7cG9zaXRpb246YWJzb2x1dGU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjo1MCU7dHJhbnNmb3JtLW9yaWdpbjo1MCU7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjJzIGVhc2Utb3V0LC13ZWJraXQtdHJhbnNmb3JtIC4ycyBlYXNlLW91dDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O3RvcDo1MCU7bGVmdDo0cHg7d2lkdGg6OHB4O2hlaWdodDozcHg7bWFyZ2luLXRvcDotNHB4O2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItY29sb3I6I2ZmZjtib3JkZXItd2lkdGg6MCAwIDNweCAzcHg7LW8tYm9yZGVyLWltYWdlOm5vbmU7Ym9yZGVyLWltYWdlOm5vbmU7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC00NWRlZykgc2NhbGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpIHNjYWxlKDApfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmRpc2FibGVkK2RpdjpiZWZvcmV7Ym9yZGVyLWNvbG9yOiNjY2N9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06ZGlzYWJsZWQ6Zm9jdXMrZGl2OmJlZm9yZSAubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpkaXNhYmxlZDpob3ZlcitkaXY6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6aW5oZXJpdH0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpkaXNhYmxlZDpjaGVja2VkK2RpdjpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjojY2NjfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmNoZWNrZWQrZGl2OmFmdGVye2NvbnRlbnQ6Jyc7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjJzIGVhc2Utb3V0LC13ZWJraXQtdHJhbnNmb3JtIC4ycyBlYXNlLW91dDstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKSBzY2FsZSgxKTt0cmFuc2Zvcm06cm90YXRlKC00NWRlZykgc2NhbGUoMSl9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCtkaXY6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uOi4ycyBlYXNlLWluIGJvcmRlcnNjYWxlO2FuaW1hdGlvbjouMnMgZWFzZS1pbiBib3JkZXJzY2FsZTtiYWNrZ3JvdW5kOiMzMzdhYjd9QC13ZWJraXQta2V5ZnJhbWVzIGJvcmRlcnNjYWxlezUwJXtib3gtc2hhZG93OjAgMCAwIDJweCAjMzM3YWI3fX1Aa2V5ZnJhbWVzIGJvcmRlcnNjYWxlezUwJXtib3gtc2hhZG93OjAgMCAwIDJweCAjMzM3YWI3fX1gXSxcbiAgcHJvdmlkZXJzOiBbRFJPUERPV05fQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBwdWJsaWMgX3NldHRpbmdzOiBJRHJvcGRvd25TZXR0aW5ncztcbiAgcHVibGljIF9kYXRhOiBBcnJheTxMaXN0SXRlbT4gPSBbXTtcbiAgcHVibGljIHNlbGVjdGVkSXRlbXM6IEFycmF5PExpc3RJdGVtPiA9IFtdO1xuICBwdWJsaWMgaXNEcm9wZG93bk9wZW4gPSBmYWxzZTtcbiAgX3BsYWNlaG9sZGVyID0gJ1NlbGVjdCc7XG4gIGZpbHRlcjogTGlzdEl0ZW0gPSBuZXcgTGlzdEl0ZW0odGhpcy5kYXRhKTtcbiAgZGVmYXVsdFNldHRpbmdzOiBJRHJvcGRvd25TZXR0aW5ncyA9IHtcbiAgICBzaW5nbGVTZWxlY3Rpb246IGZhbHNlLFxuICAgIGFsbG93QWRkQ2hvaWNlOiBmYWxzZSxcbiAgICBpZEZpZWxkOiAnaWQnLFxuICAgIHRleHRGaWVsZDogJ3RleHQnLFxuICAgIGVuYWJsZUNoZWNrQWxsOiB0cnVlLFxuICAgIHNlbGVjdEFsbFRleHQ6ICdTZWxlY3QgQWxsJyxcbiAgICB1blNlbGVjdEFsbFRleHQ6ICdVblNlbGVjdCBBbGwnLFxuICAgIGFsbG93U2VhcmNoRmlsdGVyOiBmYWxzZSxcbiAgICBsaW1pdFNlbGVjdGlvbjogLTEsXG4gICAgY2xlYXJTZWFyY2hGaWx0ZXI6IHRydWUsXG4gICAgbWF4SGVpZ2h0OiAxOTcsXG4gICAgaXRlbXNTaG93TGltaXQ6IDk5OTk5OTk5OTk5OSxcbiAgICBzZWFyY2hQbGFjZWhvbGRlclRleHQ6ICdTZWFyY2gnLFxuICAgIG5vRGF0YUF2YWlsYWJsZVBsYWNlaG9sZGVyVGV4dDogJ05vIGRhdGEgYXZhaWxhYmxlJyxcbiAgICBjbG9zZURyb3BEb3duT25TZWxlY3Rpb246IGZhbHNlLFxuICAgIHNob3dTZWxlY3RlZEl0ZW1zQXRUb3A6IGZhbHNlXG4gIH07XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBwbGFjZWhvbGRlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wbGFjZWhvbGRlciA9ICdTZWxlY3QnO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgc2V0dGluZ3ModmFsdWU6IElEcm9wZG93blNldHRpbmdzKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0U2V0dGluZ3MsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdFNldHRpbmdzKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IEFycmF5PGFueT4pIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aGlzLl9kYXRhID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbnN0IF9pdGVtcyA9IHZhbHVlLmZpbHRlcigoaXRlbTogYW55KSA9PiB7XG4gICAgICAvLyAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycgfHwgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtICYmIGl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0gJiYgaXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdKSkge1xuICAgICAgLy8gICAgIHJldHVybiBpdGVtO1xuICAgICAgLy8gICB9XG4gICAgICAvLyB9KTtcbiAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZS5tYXAoXG4gICAgICAgIChpdGVtOiBhbnkpID0+XG4gICAgICAgICAgdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IG5ldyBMaXN0SXRlbShpdGVtKVxuICAgICAgICAgICAgOiBuZXcgTGlzdEl0ZW0oe1xuICAgICAgICAgICAgICBpZDogaXRlbVt0aGlzLl9zZXR0aW5ncy5pZEZpZWxkXSxcbiAgICAgICAgICAgICAgdGV4dDogaXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdXG4gICAgICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdvbkZpbHRlckNoYW5nZScpIG9uRmlsdGVyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TGlzdEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgnb25TZWxlY3QnKSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPExpc3RJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoJ29uRGVTZWxlY3QnKSBvbkRlU2VsZWN0OiBFdmVudEVtaXR0ZXI8TGlzdEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgnb25TZWxlY3RBbGwnKSBvblNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PExpc3RJdGVtPj4gPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XG5cbiAgQE91dHB1dCgnb25EZVNlbGVjdEFsbCcpIG9uRGVTZWxlY3RBbGw6IEV2ZW50RW1pdHRlcjxBcnJheTxMaXN0SXRlbT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xuXG4gIEBPdXRwdXQoJ29uRW50ZXJDaGFuZ2UnKSBvbkVudGVyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8QXJyYXk8TGlzdEl0ZW0+PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8YW55Pj4oKTtcblxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBvbkZpbHRlclRleHRDaGFuZ2UoJGV2ZW50KSB7XG4gICAgdGhpcy5vbkZpbHRlckNoYW5nZS5lbWl0KCRldmVudCk7XG4gIH1cblxuICBvbkVudGVyS2V5ZG93bkNoYW5nZSgkZXZlbnQpIHtcbiAgICBpZiAodGhpcy5maWx0ZXIudGV4dCAmJiB0aGlzLl9zZXR0aW5ncy5hbGxvd0FkZENob2ljZSkge1xuICAgICAgaWYgKHRoaXMuX2RhdGEuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICByZXR1cm4gaXRlbSA9PT0gdGhpcy5maWx0ZXIudGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gaXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdID09PSB0aGlzLmZpbHRlci50ZXh0O1xuICAgICAgICB9XG4gICAgICB9KS5sZW5ndGggPT09IDBcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9kYXRhLnB1c2gobmV3IExpc3RJdGVtKHRoaXMuZmlsdGVyLnRleHQpKTtcbiAgICAgICAgY29uc3QgZGF0YUFycmF5ID0gW107XG4gICAgICAgIHRoaXMuX2RhdGEubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgZGF0YUFycmF5LnB1c2goaXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25FbnRlckNoYW5nZS5lbWl0KGRhdGFBcnJheSk7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgfVxuXG4gIG9uSXRlbUNsaWNrKCRldmVudDogYW55LCBpdGVtOiBMaXN0SXRlbSkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgZm91bmQgPSB0aGlzLmlzU2VsZWN0ZWQoaXRlbSk7XG4gICAgY29uc3QgYWxsb3dBZGQgPSB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA9PT0gLTEgfHwgKHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID4gMCAmJiB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoIDwgdGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24pO1xuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGlmIChhbGxvd0FkZCkge1xuICAgICAgICB0aGlzLmFkZFNlbGVjdGVkKGl0ZW0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkKGl0ZW0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uICYmIHRoaXMuX3NldHRpbmdzLmNsb3NlRHJvcERvd25PblNlbGVjdGlvbikge1xuICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9ICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSA/IHZhbHVlIDogdmFsdWVbMF07XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXG4gICAgICAgICAgICAgIHR5cGVvZiBmaXJzdEl0ZW0gPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgPyBuZXcgTGlzdEl0ZW0oZmlyc3RJdGVtKVxuICAgICAgICAgICAgICAgIDogbmV3IExpc3RJdGVtKHtcbiAgICAgICAgICAgICAgICAgIGlkOiBmaXJzdEl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0sXG4gICAgICAgICAgICAgICAgICB0ZXh0OiBmaXJzdEl0ZW1bdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZS5ib2R5Lm1zZyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBfZGF0YSA9IHZhbHVlLm1hcChcbiAgICAgICAgICAoaXRlbTogYW55KSA9PlxuICAgICAgICAgICAgdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgID8gbmV3IExpc3RJdGVtKGl0ZW0pXG4gICAgICAgICAgICAgIDogbmV3IExpc3RJdGVtKHtcbiAgICAgICAgICAgICAgICBpZDogaXRlbVt0aGlzLl9zZXR0aW5ncy5pZEZpZWxkXSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBpdGVtW3RoaXMuX3NldHRpbmdzLnRleHRGaWVsZF1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID4gMCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IF9kYXRhLnNwbGljZSgwLCB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gX2RhdGE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgfVxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBTZXQgdG91Y2hlZCBvbiBibHVyXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBwdWJsaWMgb25Ub3VjaGVkKCkge1xuICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIHRyYWNrQnlGbihpbmRleCwgaXRlbSkge1xuICAgIHJldHVybiBpdGVtLmlkO1xuICB9XG5cbiAgaXNTZWxlY3RlZChjbGlja2VkSXRlbTogTGlzdEl0ZW0pIHtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChjbGlja2VkSXRlbS5pZCA9PT0gaXRlbS5pZCkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9XG5cbiAgaXNMaW1pdFNlbGVjdGlvblJlYWNoZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09PSB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO1xuICB9XG5cbiAgaXNBbGxJdGVtc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kYXRhLmxlbmd0aCA9PT0gdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtcbiAgfVxuXG4gIHNob3dCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcbiAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA+IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gdGhpcy5fc2V0dGluZ3MuZW5hYmxlQ2hlY2tBbGwgPSB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA9PT0gLTEgPyB0cnVlIDogZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTsgLy8gIXRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbiAmJiB0aGlzLl9zZXR0aW5ncy5lbmFibGVDaGVja0FsbCAmJiB0aGlzLl9kYXRhLmxlbmd0aCA+IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNob3VsZCBiZSBkaXNhYmxlZCBpbiBzaW5nbGUgc2VsZWN0aW9uIG1vZGVcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpdGVtU2hvd1JlbWFpbmluZygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoIC0gdGhpcy5fc2V0dGluZ3MuaXRlbXNTaG93TGltaXQ7XG4gIH1cblxuICBhZGRTZWxlY3RlZChpdGVtOiBMaXN0SXRlbSkge1xuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KHRoaXMuZW1pdHRlZFZhbHVlKGl0ZW0pKTtcbiAgfVxuXG4gIHJlbW92ZVNlbGVjdGVkKGl0ZW1TZWw6IExpc3RJdGVtKSB7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbVNlbC5pZCA9PT0gaXRlbS5pZCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMuc3BsaWNlKHRoaXMuc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGl0ZW0pLCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XG4gICAgdGhpcy5vbkRlU2VsZWN0LmVtaXQodGhpcy5lbWl0dGVkVmFsdWUoaXRlbVNlbCkpO1xuICB9XG5cbiAgZW1pdHRlZFZhbHVlKHZhbDogYW55KTogYW55IHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IFtdO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIHZhbC5tYXAoaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmlkID09PSBpdGVtLnRleHQpIHtcbiAgICAgICAgICBzZWxlY3RlZC5wdXNoKGl0ZW0udGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZWN0ZWQucHVzaCh0aGlzLm9iamVjdGlmeShpdGVtKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodmFsKSB7XG4gICAgICAgIGlmICh2YWwuaWQgPT09IHZhbC50ZXh0KSB7XG4gICAgICAgICAgcmV0dXJuIHZhbC50ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdGlmeSh2YWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzZWxlY3RlZDtcbiAgfVxuXG4gIG9iamVjdGlmeSh2YWw6IExpc3RJdGVtKSB7XG4gICAgY29uc3Qgb2JqID0ge307XG4gICAgb2JqW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdID0gdmFsLmlkO1xuICAgIG9ialt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdID0gdmFsLnRleHQ7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHRvZ2dsZURyb3Bkb3duKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLmRpc2FibGVkICYmIHRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmlzRHJvcGRvd25PcGVuID0gIXRoaXMuaXNEcm9wZG93bk9wZW47XG4gIH1cblxuICBjbG9zZURyb3Bkb3duKCkge1xuICAgIHRoaXMuaXNEcm9wZG93bk9wZW4gPSBmYWxzZTtcbiAgICAvLyBjbGVhciBzZWFyY2ggdGV4dFxuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5jbGVhclNlYXJjaEZpbHRlcikge1xuICAgICAgdGhpcy5maWx0ZXIudGV4dCA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVNlbGVjdEFsbCgpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNBbGxJdGVtc1NlbGVjdGVkKCkpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IHRoaXMuX2RhdGEuc2xpY2UoKTtcbiAgICAgIHRoaXMub25TZWxlY3RBbGwuZW1pdCh0aGlzLmVtaXR0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICB0aGlzLm9uRGVTZWxlY3RBbGwuZW1pdCh0aGlzLmVtaXR0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKTtcbiAgICB9XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuZW1pdHRlZFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpO1xuICB9XG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2NsaWNrT3V0c2lkZV0nXG59KVxuZXhwb3J0IGNsYXNzIENsaWNrT3V0c2lkZURpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBjbGlja091dHNpZGUgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50JywgJyRldmVudC50YXJnZXQnXSlcbiAgICBwdWJsaWMgb25DbGljayhldmVudDogTW91c2VFdmVudCwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0YXJnZXRFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjbGlja2VkSW5zaWRlID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRhcmdldEVsZW1lbnQpO1xuICAgICAgICBpZiAoIWNsaWNrZWRJbnNpZGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tPdXRzaWRlLmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMaXN0SXRlbSB9IGZyb20gJy4vbXVsdGlzZWxlY3QubW9kZWwnO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogJ25nMkxpc3RGaWx0ZXInLFxuICAgIHB1cmU6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIExpc3RGaWx0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKGl0ZW1zOiBMaXN0SXRlbVtdLCBmaWx0ZXI6IExpc3RJdGVtKTogTGlzdEl0ZW1bXSB7XG4gICAgICAgIGlmICghaXRlbXMgfHwgIWZpbHRlcikge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtcy5maWx0ZXIoKGl0ZW06IExpc3RJdGVtKSA9PiB0aGlzLmFwcGx5RmlsdGVyKGl0ZW0sIGZpbHRlcikpO1xuICAgIH1cblxuICAgIGFwcGx5RmlsdGVyKGl0ZW06IExpc3RJdGVtLCBmaWx0ZXI6IExpc3RJdGVtKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhKGZpbHRlci50ZXh0ICYmIGl0ZW0udGV4dCAmJiBpdGVtLnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlci50ZXh0LnRvTG93ZXJDYXNlKCkpID09PSAtMSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE11bHRpU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9tdWx0aXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2xpY2tPdXRzaWRlRGlyZWN0aXZlIH0gZnJvbSAnLi9jbGljay1vdXRzaWRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBMaXN0RmlsdGVyUGlwZSB9IGZyb20gJy4vbGlzdC1maWx0ZXIucGlwZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTXVsdGlTZWxlY3RDb21wb25lbnQsIENsaWNrT3V0c2lkZURpcmVjdGl2ZSwgTGlzdEZpbHRlclBpcGVdLFxuICBleHBvcnRzOiBbTXVsdGlTZWxlY3RDb21wb25lbnRdXG59KVxuXG5leHBvcnQgY2xhc3MgTmdNdWx0aVNlbGVjdERyb3BEb3duTW9kdWxlIHtcbiAgICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5nTW9kdWxlOiBOZ011bHRpU2VsZWN0RHJvcERvd25Nb2R1bGVcbiAgICAgIH07XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIk5HX1ZBTFVFX0FDQ0VTU09SIiwiZm9yd2FyZFJlZiIsIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIkNoYW5nZURldGVjdGlvblN0cmF0ZWd5IiwiQ2hhbmdlRGV0ZWN0b3JSZWYiLCJJbnB1dCIsIk91dHB1dCIsIkhvc3RMaXN0ZW5lciIsIkRpcmVjdGl2ZSIsIkVsZW1lbnRSZWYiLCJQaXBlIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQW1CQSxJQUFBOzBCQUlxQixNQUFXO1lBQzVCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO2dCQUM5QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO2FBQzlCO1lBQ0QsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ3pCOzt1QkE5Qkw7UUFnQ0MsQ0FBQTs7Ozs7O0FDaENELHlCQWFhLCtCQUErQixHQUFRO1FBQ2xELE9BQU8sRUFBRUEsdUJBQWlCO1FBQzFCLFdBQVcsRUFBRUMsZUFBVSxDQUFDLGNBQU0sT0FBQSxvQkFBb0IsR0FBQSxDQUFDO1FBQ25ELEtBQUssRUFBRSxJQUFJO0tBQ1osQ0FBQztJQUNGLHFCQUFNLElBQUksR0FBRyxlQUFTLENBQUM7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