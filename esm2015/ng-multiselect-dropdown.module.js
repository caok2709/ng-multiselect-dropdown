/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectComponent } from './multiselect.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { ListFilterPipe } from './list-filter.pipe';
export class NgMultiSelectDropDownModule {
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
function NgMultiSelectDropDownModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgMultiSelectDropDownModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgMultiSelectDropDownModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbXVsdGlzZWxlY3QtZHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24vIiwic291cmNlcyI6WyJuZy1tdWx0aXNlbGVjdC1kcm9wZG93bi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBUXBELE1BQU07Ozs7SUFDRixNQUFNLENBQUMsT0FBTztRQUNaLE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSwyQkFBMkI7U0FDdEMsQ0FBQztLQUNIOzs7WUFYSixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQztnQkFDcEMsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUUsY0FBYyxDQUFDO2dCQUMzRSxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzthQUNoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNdWx0aVNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vbXVsdGlzZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IENsaWNrT3V0c2lkZURpcmVjdGl2ZSB9IGZyb20gJy4vY2xpY2stb3V0c2lkZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTGlzdEZpbHRlclBpcGUgfSBmcm9tICcuL2xpc3QtZmlsdGVyLnBpcGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW011bHRpU2VsZWN0Q29tcG9uZW50LCBDbGlja091dHNpZGVEaXJlY3RpdmUsIExpc3RGaWx0ZXJQaXBlXSxcbiAgZXhwb3J0czogW011bHRpU2VsZWN0Q29tcG9uZW50XVxufSlcblxuZXhwb3J0IGNsYXNzIE5nTXVsdGlTZWxlY3REcm9wRG93bk1vZHVsZSB7XG4gICAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuZ01vZHVsZTogTmdNdWx0aVNlbGVjdERyb3BEb3duTW9kdWxlXG4gICAgICB9O1xuICAgIH1cbn1cbiJdfQ==