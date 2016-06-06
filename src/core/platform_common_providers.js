'use strict';"use strict";
var lang_1 = require('angular2/src/facade/lang');
var di_1 = require('angular2/src/core/di');
var console_1 = require('angular2/src/core/console');
var reflection_1 = require('./reflection/reflection');
var reflector_reader_1 = require('./reflection/reflector_reader');
var testability_1 = require('angular2/src/core/testability/testability');
function reflectorFactory() {
    return reflection_1.reflector;
}
/**
 * A default set of providers which should be included in any Angular platform.
 */
exports.PLATFORM_COMMON_PROVIDERS = lang_1.CONST_EXPR([
    new di_1.Provider(reflection_1.Reflector, { useFactory: reflectorFactory, deps: [] }),
    new di_1.Provider(reflector_reader_1.ReflectorReader, { useExisting: reflection_1.Reflector }),
    testability_1.TestabilityRegistry,
    console_1.Console
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fY29tbW9uX3Byb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtSzlLQTNhblQudG1wL2FuZ3VsYXIyL3NyYy9jb3JlL3BsYXRmb3JtX2NvbW1vbl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUFzRSwwQkFBMEIsQ0FBQyxDQUFBO0FBQ2pHLG1CQUF1RCxzQkFBc0IsQ0FBQyxDQUFBO0FBQzlFLHdCQUFzQiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ2xELDJCQUFtQyx5QkFBeUIsQ0FBQyxDQUFBO0FBQzdELGlDQUE4QiwrQkFBK0IsQ0FBQyxDQUFBO0FBQzlELDRCQUFrQywyQ0FBMkMsQ0FBQyxDQUFBO0FBRTlFO0lBQ0UsTUFBTSxDQUFDLHNCQUFTLENBQUM7QUFDbkIsQ0FBQztBQUVEOztHQUVHO0FBQ1UsaUNBQXlCLEdBQW1DLGlCQUFVLENBQUM7SUFDbEYsSUFBSSxhQUFRLENBQUMsc0JBQVMsRUFBRSxFQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUM7SUFDakUsSUFBSSxhQUFRLENBQUMsa0NBQWUsRUFBRSxFQUFDLFdBQVcsRUFBRSxzQkFBUyxFQUFDLENBQUM7SUFDdkQsaUNBQW1CO0lBQ25CLGlCQUFPO0NBQ1IsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUeXBlLCBpc0JsYW5rLCBpc1ByZXNlbnQsIGFzc2VydGlvbnNFbmFibGVkLCBDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtwcm92aWRlLCBQcm92aWRlciwgSW5qZWN0b3IsIE9wYXF1ZVRva2VufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge0NvbnNvbGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NvbnNvbGUnO1xuaW1wb3J0IHtSZWZsZWN0b3IsIHJlZmxlY3Rvcn0gZnJvbSAnLi9yZWZsZWN0aW9uL3JlZmxlY3Rpb24nO1xuaW1wb3J0IHtSZWZsZWN0b3JSZWFkZXJ9IGZyb20gJy4vcmVmbGVjdGlvbi9yZWZsZWN0b3JfcmVhZGVyJztcbmltcG9ydCB7VGVzdGFiaWxpdHlSZWdpc3RyeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvdGVzdGFiaWxpdHkvdGVzdGFiaWxpdHknO1xuXG5mdW5jdGlvbiByZWZsZWN0b3JGYWN0b3J5KCk6IFJlZmxlY3RvciB7XG4gIHJldHVybiByZWZsZWN0b3I7XG59XG5cbi8qKlxuICogQSBkZWZhdWx0IHNldCBvZiBwcm92aWRlcnMgd2hpY2ggc2hvdWxkIGJlIGluY2x1ZGVkIGluIGFueSBBbmd1bGFyIHBsYXRmb3JtLlxuICovXG5leHBvcnQgY29uc3QgUExBVEZPUk1fQ09NTU9OX1BST1ZJREVSUzogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+ID0gQ09OU1RfRVhQUihbXG4gIG5ldyBQcm92aWRlcihSZWZsZWN0b3IsIHt1c2VGYWN0b3J5OiByZWZsZWN0b3JGYWN0b3J5LCBkZXBzOiBbXX0pLFxuICBuZXcgUHJvdmlkZXIoUmVmbGVjdG9yUmVhZGVyLCB7dXNlRXhpc3Rpbmc6IFJlZmxlY3Rvcn0pLFxuICBUZXN0YWJpbGl0eVJlZ2lzdHJ5LFxuICBDb25zb2xlXG5dKTtcbiJdfQ==