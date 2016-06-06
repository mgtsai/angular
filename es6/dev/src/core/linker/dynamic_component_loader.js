var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from 'angular2/src/core/di';
import { ComponentResolver } from './component_resolver';
import { isPresent } from 'angular2/src/facade/lang';
/**
 * Service for instantiating a Component and attaching it to a View at a specified location.
 */
export class DynamicComponentLoader {
}
export let DynamicComponentLoader_ = class DynamicComponentLoader_ extends DynamicComponentLoader {
    constructor(_compiler) {
        super();
        this._compiler = _compiler;
    }
    loadAsRoot(type, overrideSelectorOrNode, injector, onDispose, projectableNodes) {
        return this._compiler.resolveComponent(type).then(componentFactory => {
            var componentRef = componentFactory.create(injector, projectableNodes, isPresent(overrideSelectorOrNode) ? overrideSelectorOrNode : componentFactory.selector);
            if (isPresent(onDispose)) {
                componentRef.onDestroy(onDispose);
            }
            return componentRef;
        });
    }
    loadNextToLocation(type, location, providers = null, projectableNodes = null) {
        return this._compiler.resolveComponent(type).then(componentFactory => {
            return location.createComponent(componentFactory, location.length, providers, projectableNodes);
        });
    }
};
DynamicComponentLoader_ = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [ComponentResolver])
], DynamicComponentLoader_);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pY19jb21wb25lbnRfbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1mWHllV01ucC50bXAvYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2R5bmFtaWNfY29tcG9uZW50X2xvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7T0FBTyxFQUFxRCxVQUFVLEVBQUMsTUFBTSxzQkFBc0I7T0FDNUYsRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHNCQUFzQjtPQUMvQyxFQUEwQixTQUFTLEVBQUMsTUFBTSwwQkFBMEI7QUFJM0U7O0dBRUc7QUFDSDtBQWdHQSxDQUFDO0FBR0QsMkVBQTZDLHNCQUFzQjtJQUNqRSxZQUFvQixTQUE0QjtRQUFJLE9BQU8sQ0FBQztRQUF4QyxjQUFTLEdBQVQsU0FBUyxDQUFtQjtJQUFhLENBQUM7SUFFOUQsVUFBVSxDQUFDLElBQVUsRUFBRSxzQkFBb0MsRUFBRSxRQUFrQixFQUNwRSxTQUFzQixFQUFFLGdCQUEwQjtRQUMzRCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCO1lBQ2hFLElBQUksWUFBWSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FDdEMsUUFBUSxFQUFFLGdCQUFnQixFQUMxQixTQUFTLENBQUMsc0JBQXNCLENBQUMsR0FBRyxzQkFBc0IsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1RixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3BDLENBQUM7WUFDRCxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGtCQUFrQixDQUFDLElBQVUsRUFBRSxRQUEwQixFQUFFLFNBQVMsR0FBdUIsSUFBSSxFQUM1RSxnQkFBZ0IsR0FBWSxJQUFJO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0I7WUFDaEUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQzVDLGdCQUFnQixDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0FBQ0gsQ0FBQztBQXhCRDtJQUFDLFVBQVUsRUFBRTs7MkJBQUE7QUF3QloiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0tleSwgSW5qZWN0b3IsIFJlc29sdmVkUHJvdmlkZXIsIFByb3ZpZGVyLCBwcm92aWRlLCBJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge0NvbXBvbmVudFJlc29sdmVyfSBmcm9tICcuL2NvbXBvbmVudF9yZXNvbHZlcic7XG5pbXBvcnQge2lzVHlwZSwgVHlwZSwgc3RyaW5naWZ5LCBpc1ByZXNlbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0NvbXBvbmVudFJlZn0gZnJvbSAnLi9jb21wb25lbnRfZmFjdG9yeSc7XG5pbXBvcnQge1ZpZXdDb250YWluZXJSZWZ9IGZyb20gJy4vdmlld19jb250YWluZXJfcmVmJztcblxuLyoqXG4gKiBTZXJ2aWNlIGZvciBpbnN0YW50aWF0aW5nIGEgQ29tcG9uZW50IGFuZCBhdHRhY2hpbmcgaXQgdG8gYSBWaWV3IGF0IGEgc3BlY2lmaWVkIGxvY2F0aW9uLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRHluYW1pY0NvbXBvbmVudExvYWRlciB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIGEgQ29tcG9uZW50IGB0eXBlYCBhbmQgYXR0YWNoZXMgaXQgdG8gdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhlXG4gICAqIHBsYXRmb3JtLXNwZWNpZmljIGdsb2JhbCB2aWV3IHRoYXQgbWF0Y2hlcyB0aGUgY29tcG9uZW50J3Mgc2VsZWN0b3IuXG4gICAqXG4gICAqIEluIGEgYnJvd3NlciB0aGUgcGxhdGZvcm0tc3BlY2lmaWMgZ2xvYmFsIHZpZXcgaXMgdGhlIG1haW4gRE9NIERvY3VtZW50LlxuICAgKlxuICAgKiBJZiBuZWVkZWQsIHRoZSBjb21wb25lbnQncyBzZWxlY3RvciBjYW4gYmUgb3ZlcnJpZGRlbiB2aWEgYG92ZXJyaWRlU2VsZWN0b3JgLlxuICAgKlxuICAgKiBZb3UgY2FuIG9wdGlvbmFsbHkgcHJvdmlkZSBgaW5qZWN0b3JgIGFuZCB0aGlzIHtAbGluayBJbmplY3Rvcn0gd2lsbCBiZSB1c2VkIHRvIGluc3RhbnRpYXRlIHRoZVxuICAgKiBDb21wb25lbnQuXG4gICAqXG4gICAqIFRvIGJlIG5vdGlmaWVkIHdoZW4gdGhpcyBDb21wb25lbnQgaW5zdGFuY2UgaXMgZGVzdHJveWVkLCB5b3UgY2FuIGFsc28gb3B0aW9uYWxseSBwcm92aWRlXG4gICAqIGBvbkRpc3Bvc2VgIGNhbGxiYWNrLlxuICAgKlxuICAgKiBSZXR1cm5zIGEgcHJvbWlzZSBmb3IgdGhlIHtAbGluayBDb21wb25lbnRSZWZ9IHJlcHJlc2VudGluZyB0aGUgbmV3bHkgY3JlYXRlZCBDb21wb25lbnQuXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIGBgYFxuICAgKiBAQ29tcG9uZW50KHtcbiAgICogICBzZWxlY3RvcjogJ2NoaWxkLWNvbXBvbmVudCcsXG4gICAqICAgdGVtcGxhdGU6ICdDaGlsZCdcbiAgICogfSlcbiAgICogY2xhc3MgQ2hpbGRDb21wb25lbnQge1xuICAgKiB9XG4gICAqXG4gICAqIEBDb21wb25lbnQoe1xuICAgKiAgIHNlbGVjdG9yOiAnbXktYXBwJyxcbiAgICogICB0ZW1wbGF0ZTogJ1BhcmVudCAoPGNoaWxkIGlkPVwiY2hpbGRcIj48L2NoaWxkPiknXG4gICAqIH0pXG4gICAqIGNsYXNzIE15QXBwIHtcbiAgICogICBjb25zdHJ1Y3RvcihkY2w6IER5bmFtaWNDb21wb25lbnRMb2FkZXIsIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgKiAgICAgZGNsLmxvYWRBc1Jvb3QoQ2hpbGRDb21wb25lbnQsICcjY2hpbGQnLCBpbmplY3Rvcik7XG4gICAqICAgfVxuICAgKiB9XG4gICAqXG4gICAqIGJvb3RzdHJhcChNeUFwcCk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBSZXN1bHRpbmcgRE9NOlxuICAgKlxuICAgKiBgYGBcbiAgICogPG15LWFwcD5cbiAgICogICBQYXJlbnQgKFxuICAgKiAgICAgPGNoaWxkIGlkPVwiY2hpbGRcIj5DaGlsZDwvY2hpbGQ+XG4gICAqICAgKVxuICAgKiA8L215LWFwcD5cbiAgICogYGBgXG4gICAqL1xuICBhYnN0cmFjdCBsb2FkQXNSb290KHR5cGU6IFR5cGUsIG92ZXJyaWRlU2VsZWN0b3JPck5vZGU6IHN0cmluZyB8IGFueSwgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgIG9uRGlzcG9zZT86ICgpID0+IHZvaWQsIHByb2plY3RhYmxlTm9kZXM/OiBhbnlbXVtdKTogUHJvbWlzZTxDb21wb25lbnRSZWY+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIGEgQ29tcG9uZW50IGFuZCBhdHRhY2hlcyBpdCB0byB0aGUgVmlldyBDb250YWluZXIgZm91bmQgYXQgdGhlXG4gICAqIGBsb2NhdGlvbmAgc3BlY2lmaWVkIGFzIHtAbGluayBWaWV3Q29udGFpbmVyUmVmfS5cbiAgICpcbiAgICogWW91IGNhbiBvcHRpb25hbGx5IHByb3ZpZGUgYHByb3ZpZGVyc2AgdG8gY29uZmlndXJlIHRoZSB7QGxpbmsgSW5qZWN0b3J9IHByb3Zpc2lvbmVkIGZvciB0aGlzXG4gICAqIENvbXBvbmVudCBJbnN0YW5jZS5cbiAgICpcbiAgICogUmV0dXJucyBhIHByb21pc2UgZm9yIHRoZSB7QGxpbmsgQ29tcG9uZW50UmVmfSByZXByZXNlbnRpbmcgdGhlIG5ld2x5IGNyZWF0ZWQgQ29tcG9uZW50LlxuICAgKlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiBgYGBcbiAgICogQENvbXBvbmVudCh7XG4gICAqICAgc2VsZWN0b3I6ICdjaGlsZC1jb21wb25lbnQnLFxuICAgKiAgIHRlbXBsYXRlOiAnQ2hpbGQnXG4gICAqIH0pXG4gICAqIGNsYXNzIENoaWxkQ29tcG9uZW50IHtcbiAgICogfVxuICAgKlxuICAgKiBAQ29tcG9uZW50KHtcbiAgICogICBzZWxlY3RvcjogJ215LWFwcCcsXG4gICAqICAgdGVtcGxhdGU6ICdQYXJlbnQnXG4gICAqIH0pXG4gICAqIGNsYXNzIE15QXBwIHtcbiAgICogICBjb25zdHJ1Y3RvcihkY2w6IER5bmFtaWNDb21wb25lbnRMb2FkZXIsIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICogICAgIGRjbC5sb2FkTmV4dFRvTG9jYXRpb24oQ2hpbGRDb21wb25lbnQsIHZpZXdDb250YWluZXJSZWYpO1xuICAgKiAgIH1cbiAgICogfVxuICAgKlxuICAgKiBib290c3RyYXAoTXlBcHApO1xuICAgKiBgYGBcbiAgICpcbiAgICogUmVzdWx0aW5nIERPTTpcbiAgICpcbiAgICogYGBgXG4gICAqIDxteS1hcHA+UGFyZW50PC9teS1hcHA+XG4gICAqIDxjaGlsZC1jb21wb25lbnQ+Q2hpbGQ8L2NoaWxkLWNvbXBvbmVudD5cbiAgICogYGBgXG4gICAqL1xuICBhYnN0cmFjdCBsb2FkTmV4dFRvTG9jYXRpb24odHlwZTogVHlwZSwgbG9jYXRpb246IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcnM/OiBSZXNvbHZlZFByb3ZpZGVyW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0YWJsZU5vZGVzPzogYW55W11bXSk6IFByb21pc2U8Q29tcG9uZW50UmVmPjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIER5bmFtaWNDb21wb25lbnRMb2FkZXJfIGV4dGVuZHMgRHluYW1pY0NvbXBvbmVudExvYWRlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbXBpbGVyOiBDb21wb25lbnRSZXNvbHZlcikgeyBzdXBlcigpOyB9XG5cbiAgbG9hZEFzUm9vdCh0eXBlOiBUeXBlLCBvdmVycmlkZVNlbGVjdG9yT3JOb2RlOiBzdHJpbmcgfCBhbnksIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICBvbkRpc3Bvc2U/OiAoKSA9PiB2b2lkLCBwcm9qZWN0YWJsZU5vZGVzPzogYW55W11bXSk6IFByb21pc2U8Q29tcG9uZW50UmVmPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVyLnJlc29sdmVDb21wb25lbnQodHlwZSkudGhlbihjb21wb25lbnRGYWN0b3J5ID0+IHtcbiAgICAgIHZhciBjb21wb25lbnRSZWYgPSBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcbiAgICAgICAgICBpbmplY3RvciwgcHJvamVjdGFibGVOb2RlcyxcbiAgICAgICAgICBpc1ByZXNlbnQob3ZlcnJpZGVTZWxlY3Rvck9yTm9kZSkgPyBvdmVycmlkZVNlbGVjdG9yT3JOb2RlIDogY29tcG9uZW50RmFjdG9yeS5zZWxlY3Rvcik7XG4gICAgICBpZiAoaXNQcmVzZW50KG9uRGlzcG9zZSkpIHtcbiAgICAgICAgY29tcG9uZW50UmVmLm9uRGVzdHJveShvbkRpc3Bvc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbXBvbmVudFJlZjtcbiAgICB9KTtcbiAgfVxuXG4gIGxvYWROZXh0VG9Mb2NhdGlvbih0eXBlOiBUeXBlLCBsb2NhdGlvbjogVmlld0NvbnRhaW5lclJlZiwgcHJvdmlkZXJzOiBSZXNvbHZlZFByb3ZpZGVyW10gPSBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgcHJvamVjdGFibGVOb2RlczogYW55W11bXSA9IG51bGwpOiBQcm9taXNlPENvbXBvbmVudFJlZj4ge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlci5yZXNvbHZlQ29tcG9uZW50KHR5cGUpLnRoZW4oY29tcG9uZW50RmFjdG9yeSA9PiB7XG4gICAgICByZXR1cm4gbG9jYXRpb24uY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnksIGxvY2F0aW9uLmxlbmd0aCwgcHJvdmlkZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0YWJsZU5vZGVzKTtcbiAgICB9KTtcbiAgfVxufVxuIl19