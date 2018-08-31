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
export class ListItem {
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
function ListItem_tsickle_Closure_declarations() {
    /** @type {?} */
    ListItem.prototype.id;
    /** @type {?} */
    ListItem.prototype.text;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzZWxlY3QubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi8iLCJzb3VyY2VzIjpbIm11bHRpc2VsZWN0Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxNQUFNOzs7O2dCQUllLE1BQVc7UUFDNUIsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1NBQzlCO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ3pCOztDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBJRHJvcGRvd25TZXR0aW5ncyB7XG4gIHNpbmdsZVNlbGVjdGlvbj86IGJvb2xlYW47XG4gIGFsbG93QWRkQ2hvaWNlPzogYm9vbGVhbjtcbiAgaWRGaWVsZD86IHN0cmluZztcbiAgdGV4dEZpZWxkPzogc3RyaW5nO1xuICBlbmFibGVDaGVja0FsbD86IGJvb2xlYW47XG4gIHNlbGVjdEFsbFRleHQ/OiBzdHJpbmc7XG4gIHVuU2VsZWN0QWxsVGV4dD86IHN0cmluZztcbiAgYWxsb3dTZWFyY2hGaWx0ZXI/OiBib29sZWFuO1xuICBjbGVhclNlYXJjaEZpbHRlcj86IGJvb2xlYW47XG4gIG1heEhlaWdodD86IG51bWJlcjtcbiAgaXRlbXNTaG93TGltaXQ/OiBudW1iZXI7XG4gIGxpbWl0U2VsZWN0aW9uPzogbnVtYmVyO1xuICBzZWFyY2hQbGFjZWhvbGRlclRleHQ/OiBzdHJpbmc7XG4gIG5vRGF0YUF2YWlsYWJsZVBsYWNlaG9sZGVyVGV4dD86IHN0cmluZztcbiAgY2xvc2VEcm9wRG93bk9uU2VsZWN0aW9uPzogYm9vbGVhbjtcbiAgc2hvd1NlbGVjdGVkSXRlbXNBdFRvcD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBMaXN0SXRlbSB7XG4gIGlkOiBTdHJpbmc7XG4gIHRleHQ6IFN0cmluZztcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioc291cmNlOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuaWQgPSB0aGlzLnRleHQgPSBzb3VyY2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc291cmNlID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5pZCA9IHNvdXJjZS5pZDtcbiAgICAgIHRoaXMudGV4dCA9IHNvdXJjZS50ZXh0O1xuICAgIH1cbiAgfVxufVxuIl19