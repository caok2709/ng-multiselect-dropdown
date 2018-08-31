import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ListItem, IDropdownSettings } from './multiselect.model';
export declare const DROPDOWN_CONTROL_VALUE_ACCESSOR: any;
export declare class MultiSelectComponent implements ControlValueAccessor {
    private cdr;
    _settings: IDropdownSettings;
    _data: Array<ListItem>;
    selectedItems: Array<ListItem>;
    isDropdownOpen: boolean;
    _placeholder: string;
    filter: ListItem;
    defaultSettings: IDropdownSettings;
    placeholder: string;
    disabled: boolean;
    settings: IDropdownSettings;
    data: Array<any>;
    onFilterChange: EventEmitter<ListItem>;
    onSelect: EventEmitter<ListItem>;
    onDeSelect: EventEmitter<ListItem>;
    onSelectAll: EventEmitter<Array<ListItem>>;
    onDeSelectAll: EventEmitter<Array<ListItem>>;
    onEnterChange: EventEmitter<Array<ListItem>>;
    private onTouchedCallback;
    private onChangeCallback;
    onFilterTextChange($event: any): void;
    onEnterKeydownChange($event: any): void;
    constructor(cdr: ChangeDetectorRef);
    onItemClick($event: any, item: ListItem): boolean;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onTouched(): void;
    trackByFn(index: any, item: any): any;
    isSelected(clickedItem: ListItem): boolean;
    isLimitSelectionReached(): boolean;
    isAllItemsSelected(): boolean;
    showButton(): boolean;
    itemShowRemaining(): number;
    addSelected(item: ListItem): void;
    removeSelected(itemSel: ListItem): void;
    emittedValue(val: any): any;
    objectify(val: ListItem): {};
    toggleDropdown(evt: any): void;
    closeDropdown(): void;
    toggleSelectAll(): boolean;
}
