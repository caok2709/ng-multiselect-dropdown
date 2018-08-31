/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function IDropdownSettings() { }
function IDropdownSettings_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    IDropdownSettings.prototype.singleSelection;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.allowAddChoice;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.idField;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.textField;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.enableCheckAll;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.selectAllText;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.unSelectAllText;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.allowSearchFilter;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.clearSearchFilter;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.maxHeight;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.itemsShowLimit;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.limitSelection;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.searchPlaceholderText;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.noDataAvailablePlaceholderText;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.closeDropDownOnSelection;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.showSelectedItemsAtTop;
}
var ListItem = /** @class */ (function () {
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
export { ListItem };
function ListItem_tsickle_Closure_declarations() {
    /** @type {?} */
    ListItem.prototype.id;
    /** @type {?} */
    ListItem.prototype.text;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzZWxlY3QubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi8iLCJzb3VyY2VzIjpbIm11bHRpc2VsZWN0Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxJQUFBO3NCQUlxQixNQUFXO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztTQUM5QjtRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztTQUN6Qjs7bUJBOUJMO0lBZ0NDLENBQUE7QUFiRCxvQkFhQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgSURyb3Bkb3duU2V0dGluZ3Mge1xuICBzaW5nbGVTZWxlY3Rpb24/OiBib29sZWFuO1xuICBhbGxvd0FkZENob2ljZT86IGJvb2xlYW47XG4gIGlkRmllbGQ/OiBzdHJpbmc7XG4gIHRleHRGaWVsZD86IHN0cmluZztcbiAgZW5hYmxlQ2hlY2tBbGw/OiBib29sZWFuO1xuICBzZWxlY3RBbGxUZXh0Pzogc3RyaW5nO1xuICB1blNlbGVjdEFsbFRleHQ/OiBzdHJpbmc7XG4gIGFsbG93U2VhcmNoRmlsdGVyPzogYm9vbGVhbjtcbiAgY2xlYXJTZWFyY2hGaWx0ZXI/OiBib29sZWFuO1xuICBtYXhIZWlnaHQ/OiBudW1iZXI7XG4gIGl0ZW1zU2hvd0xpbWl0PzogbnVtYmVyO1xuICBsaW1pdFNlbGVjdGlvbj86IG51bWJlcjtcbiAgc2VhcmNoUGxhY2Vob2xkZXJUZXh0Pzogc3RyaW5nO1xuICBub0RhdGFBdmFpbGFibGVQbGFjZWhvbGRlclRleHQ/OiBzdHJpbmc7XG4gIGNsb3NlRHJvcERvd25PblNlbGVjdGlvbj86IGJvb2xlYW47XG4gIHNob3dTZWxlY3RlZEl0ZW1zQXRUb3A/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW0ge1xuICBpZDogU3RyaW5nO1xuICB0ZXh0OiBTdHJpbmc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNvdXJjZTogYW55KSB7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLmlkID0gdGhpcy50ZXh0ID0gc291cmNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMuaWQgPSBzb3VyY2UuaWQ7XG4gICAgICB0aGlzLnRleHQgPSBzb3VyY2UudGV4dDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==