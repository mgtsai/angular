'use strict';"use strict";
var lang_1 = require('angular2/src/facade/lang');
var lifecycle_annotations_impl_1 = require('./lifecycle_annotations_impl');
var reflection_1 = require('angular2/src/core/reflection/reflection');
function hasLifecycleHook(e, type) {
    if (!(type instanceof lang_1.Type))
        return false;
    return e.name in type.prototype;
}
exports.hasLifecycleHook = hasLifecycleHook;
function getCanActivateHook(type) {
    var annotations = reflection_1.reflector.annotations(type);
    for (var i = 0; i < annotations.length; i += 1) {
        var annotation = annotations[i];
        if (annotation instanceof lifecycle_annotations_impl_1.CanActivate) {
            return annotation.fn;
        }
    }
    return null;
}
exports.getCanActivateHook = getCanActivateHook;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVfbGlmZWN5Y2xlX3JlZmxlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtSzlLQTNhblQudG1wL2FuZ3VsYXIyL3NyYy9yb3V0ZXIvbGlmZWN5Y2xlL3JvdXRlX2xpZmVjeWNsZV9yZWZsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUE4QiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ3pELDJDQUE4Qyw4QkFBOEIsQ0FBQyxDQUFBO0FBQzdFLDJCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBRWxFLDBCQUFpQyxDQUFxQixFQUFFLElBQUk7SUFDMUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBWSxXQUFJLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDMUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQVMsSUFBSyxDQUFDLFNBQVMsQ0FBQztBQUN4QyxDQUFDO0FBSGUsd0JBQWdCLG1CQUcvQixDQUFBO0FBRUQsNEJBQW1DLElBQUk7SUFDckMsSUFBSSxXQUFXLEdBQUcsc0JBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMvQyxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsVUFBVSxZQUFZLHdDQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNkLENBQUM7QUFWZSwwQkFBa0IscUJBVWpDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGUsIGlzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7Um91dGVMaWZlY3ljbGVIb29rLCBDYW5BY3RpdmF0ZX0gZnJvbSAnLi9saWZlY3ljbGVfYW5ub3RhdGlvbnNfaW1wbCc7XG5pbXBvcnQge3JlZmxlY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0aW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0xpZmVjeWNsZUhvb2soZTogUm91dGVMaWZlY3ljbGVIb29rLCB0eXBlKTogYm9vbGVhbiB7XG4gIGlmICghKHR5cGUgaW5zdGFuY2VvZiBUeXBlKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gZS5uYW1lIGluKDxhbnk+dHlwZSkucHJvdG90eXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2FuQWN0aXZhdGVIb29rKHR5cGUpOiBGdW5jdGlvbiB7XG4gIHZhciBhbm5vdGF0aW9ucyA9IHJlZmxlY3Rvci5hbm5vdGF0aW9ucyh0eXBlKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbm5vdGF0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGxldCBhbm5vdGF0aW9uID0gYW5ub3RhdGlvbnNbaV07XG4gICAgaWYgKGFubm90YXRpb24gaW5zdGFuY2VvZiBDYW5BY3RpdmF0ZSkge1xuICAgICAgcmV0dXJuIGFubm90YXRpb24uZm47XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG4iXX0=