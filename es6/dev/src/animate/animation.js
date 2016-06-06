import { DateWrapper, StringWrapper, RegExpWrapper, NumberWrapper, isPresent } from 'angular2/src/facade/lang';
import { Math } from 'angular2/src/facade/math';
import { camelCaseToDashCase } from 'angular2/src/platform/dom/util';
import { StringMapWrapper } from 'angular2/src/facade/collection';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';
export class Animation {
    /**
     * Stores the start time and starts the animation
     * @param element
     * @param data
     * @param browserDetails
     */
    constructor(element, data, browserDetails) {
        this.element = element;
        this.data = data;
        this.browserDetails = browserDetails;
        /** functions to be called upon completion */
        this.callbacks = [];
        /** functions for removing event listeners */
        this.eventClearFunctions = [];
        /** flag used to track whether or not the animation has finished */
        this.completed = false;
        this._stringPrefix = '';
        this.startTime = DateWrapper.toMillis(DateWrapper.now());
        this._stringPrefix = DOM.getAnimationPrefix();
        this.setup();
        this.wait((timestamp) => this.start());
    }
    /** total amount of time that the animation should take including delay */
    get totalTime() {
        let delay = this.computedDelay != null ? this.computedDelay : 0;
        let duration = this.computedDuration != null ? this.computedDuration : 0;
        return delay + duration;
    }
    wait(callback) {
        // Firefox requires 2 frames for some reason
        this.browserDetails.raf(callback, 2);
    }
    /**
     * Sets up the initial styles before the animation is started
     */
    setup() {
        if (this.data.fromStyles != null)
            this.applyStyles(this.data.fromStyles);
        if (this.data.duration != null)
            this.applyStyles({ 'transitionDuration': this.data.duration.toString() + 'ms' });
        if (this.data.delay != null)
            this.applyStyles({ 'transitionDelay': this.data.delay.toString() + 'ms' });
    }
    /**
     * After the initial setup has occurred, this method adds the animation styles
     */
    start() {
        this.addClasses(this.data.classesToAdd);
        this.addClasses(this.data.animationClasses);
        this.removeClasses(this.data.classesToRemove);
        if (this.data.toStyles != null)
            this.applyStyles(this.data.toStyles);
        var computedStyles = DOM.getComputedStyle(this.element);
        this.computedDelay =
            Math.max(this.parseDurationString(computedStyles.getPropertyValue(this._stringPrefix + 'transition-delay')), this.parseDurationString(this.element.style.getPropertyValue(this._stringPrefix + 'transition-delay')));
        this.computedDuration = Math.max(this.parseDurationString(computedStyles.getPropertyValue(this._stringPrefix + 'transition-duration')), this.parseDurationString(this.element.style.getPropertyValue(this._stringPrefix + 'transition-duration')));
        this.addEvents();
    }
    /**
     * Applies the provided styles to the element
     * @param styles
     */
    applyStyles(styles) {
        StringMapWrapper.forEach(styles, (value, key) => {
            var dashCaseKey = camelCaseToDashCase(key);
            if (isPresent(DOM.getStyle(this.element, dashCaseKey))) {
                DOM.setStyle(this.element, dashCaseKey, value.toString());
            }
            else {
                DOM.setStyle(this.element, this._stringPrefix + dashCaseKey, value.toString());
            }
        });
    }
    /**
     * Adds the provided classes to the element
     * @param classes
     */
    addClasses(classes) {
        for (let i = 0, len = classes.length; i < len; i++)
            DOM.addClass(this.element, classes[i]);
    }
    /**
     * Removes the provided classes from the element
     * @param classes
     */
    removeClasses(classes) {
        for (let i = 0, len = classes.length; i < len; i++)
            DOM.removeClass(this.element, classes[i]);
    }
    /**
     * Adds events to track when animations have finished
     */
    addEvents() {
        if (this.totalTime > 0) {
            this.eventClearFunctions.push(DOM.onAndCancel(this.element, DOM.getTransitionEnd(), (event) => this.handleAnimationEvent(event)));
        }
        else {
            this.handleAnimationCompleted();
        }
    }
    handleAnimationEvent(event) {
        let elapsedTime = Math.round(event.elapsedTime * 1000);
        if (!this.browserDetails.elapsedTimeIncludesDelay)
            elapsedTime += this.computedDelay;
        event.stopPropagation();
        if (elapsedTime >= this.totalTime)
            this.handleAnimationCompleted();
    }
    /**
     * Runs all animation callbacks and removes temporary classes
     */
    handleAnimationCompleted() {
        this.removeClasses(this.data.animationClasses);
        this.callbacks.forEach(callback => callback());
        this.callbacks = [];
        this.eventClearFunctions.forEach(fn => fn());
        this.eventClearFunctions = [];
        this.completed = true;
    }
    /**
     * Adds animation callbacks to be called upon completion
     * @param callback
     * @returns {Animation}
     */
    onComplete(callback) {
        if (this.completed) {
            callback();
        }
        else {
            this.callbacks.push(callback);
        }
        return this;
    }
    /**
     * Converts the duration string to the number of milliseconds
     * @param duration
     * @returns {number}
     */
    parseDurationString(duration) {
        var maxValue = 0;
        // duration must have at least 2 characters to be valid. (number + type)
        if (duration == null || duration.length < 2) {
            return maxValue;
        }
        else if (duration.substring(duration.length - 2) == 'ms') {
            let value = NumberWrapper.parseInt(this.stripLetters(duration), 10);
            if (value > maxValue)
                maxValue = value;
        }
        else if (duration.substring(duration.length - 1) == 's') {
            let ms = NumberWrapper.parseFloat(this.stripLetters(duration)) * 1000;
            let value = Math.floor(ms);
            if (value > maxValue)
                maxValue = value;
        }
        return maxValue;
    }
    /**
     * Strips the letters from the duration string
     * @param str
     * @returns {string}
     */
    stripLetters(str) {
        return StringWrapper.replaceAll(str, RegExpWrapper.create('[^0-9]+$', ''), '');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1mWHllV01ucC50bXAvYW5ndWxhcjIvc3JjL2FuaW1hdGUvYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQ0wsV0FBVyxFQUNYLGFBQWEsRUFDYixhQUFhLEVBQ2IsYUFBYSxFQUNiLFNBQVMsRUFDVixNQUFNLDBCQUEwQjtPQUMxQixFQUFDLElBQUksRUFBQyxNQUFNLDBCQUEwQjtPQUN0QyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZ0NBQWdDO09BQzNELEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxnQ0FBZ0M7T0FDeEQsRUFBQyxHQUFHLEVBQUMsTUFBTSx1Q0FBdUM7QUFLekQ7SUE0QkU7Ozs7O09BS0c7SUFDSCxZQUFtQixPQUFvQixFQUFTLElBQXlCLEVBQ3RELGNBQThCO1FBRDlCLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFxQjtRQUN0RCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFsQ2pELDZDQUE2QztRQUM3QyxjQUFTLEdBQWUsRUFBRSxDQUFDO1FBVzNCLDZDQUE2QztRQUM3Qyx3QkFBbUIsR0FBZSxFQUFFLENBQUM7UUFFckMsbUVBQW1FO1FBQ25FLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFbkIsa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFpQmpDLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFjLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFD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Q0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUQsSUFBSSxFQUFFLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3RFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0IsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztnQkFBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLENBQUM7UUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsWUFBWSxDQUFDLEdBQVc7UUFDdEIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7QUFDSCxDQUFDO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEYXRlV3JhcHBlcixcbiAgU3RyaW5nV3JhcHBlcixcbiAgUmVnRXhwV3JhcHBlcixcbiAgTnVtYmVyV3JhcHBlcixcbiAgaXNQcmVzZW50XG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge01hdGh9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbWF0aCc7XG5pbXBvcnQge2NhbWVsQ2FzZVRvRGFzaENhc2V9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vdXRpbCc7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0RPTX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5cbmltcG9ydCB7QnJvd3NlckRldGFpbHN9IGZyb20gJy4vYnJvd3Nlcl9kZXRhaWxzJztcbmltcG9ydCB7Q3NzQW5pbWF0aW9uT3B0aW9uc30gZnJvbSAnLi9jc3NfYW5pbWF0aW9uX29wdGlvbnMnO1xuXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uIHtcbiAgLyoqIGZ1bmN0aW9ucyB0byBiZSBjYWxsZWQgdXBvbiBjb21wbGV0aW9uICovXG4gIGNhbGxiYWNrczogRnVuY3Rpb25bXSA9IFtdO1xuXG4gIC8qKiB0aGUgZHVyYXRpb24gKG1zKSBvZiB0aGUgYW5pbWF0aW9uICh3aGV0aGVyIGZyb20gQ1NTIG9yIG1hbnVhbGx5IHNldCkgKi9cbiAgY29tcHV0ZWREdXJhdGlvbjogbnVtYmVyO1xuXG4gIC8qKiB0aGUgYW5pbWF0aW9uIGRlbGF5IChtcykgKHdoZXRoZXIgZnJvbSBDU1Mgb3IgbWFudWFsbHkgc2V0KSAqL1xuICBjb21wdXRlZERlbGF5OiBudW1iZXI7XG5cbiAgLyoqIHRpbWVzdGFtcCBvZiB3aGVuIHRoZSBhbmltYXRpb24gc3RhcnRlZCAqL1xuICBzdGFydFRpbWU6IG51bWJlcjtcblxuICAvKiogZnVuY3Rpb25zIGZvciByZW1vdmluZyBldmVudCBsaXN0ZW5lcnMgKi9cbiAgZXZlbnRDbGVhckZ1bmN0aW9uczogRnVuY3Rpb25bXSA9IFtdO1xuXG4gIC8qKiBmbGFnIHVzZWQgdG8gdHJhY2sgd2hldGhlciBvciBub3QgdGhlIGFuaW1hdGlvbiBoYXMgZmluaXNoZWQgKi9cbiAgY29tcGxldGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfc3RyaW5nUHJlZml4OiBzdHJpbmcgPSAnJztcblxuICAvKiogdG90YWwgYW1vdW50IG9mIHRpbWUgdGhhdCB0aGUgYW5pbWF0aW9uIHNob3VsZCB0YWtlIGluY2x1ZGluZyBkZWxheSAqL1xuICBnZXQgdG90YWxUaW1lKCk6IG51bWJlciB7XG4gICAgbGV0IGRlbGF5ID0gdGhpcy5jb21wdXRlZERlbGF5ICE9IG51bGwgPyB0aGlzLmNvbXB1dGVkRGVsYXkgOiAwO1xuICAgIGxldCBkdXJhdGlvbiA9IHRoaXMuY29tcHV0ZWREdXJhdGlvbiAhPSBudWxsID8gdGhpcy5jb21wdXRlZER1cmF0aW9uIDogMDtcbiAgICByZXR1cm4gZGVsYXkgKyBkdXJhdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9yZXMgdGhlIHN0YXJ0IHRpbWUgYW5kIHN0YXJ0cyB0aGUgYW5pbWF0aW9uXG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBwYXJhbSBicm93c2VyRGV0YWlsc1xuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwdWJsaWMgZGF0YTogQ3NzQW5pbWF0aW9uT3B0aW9ucyxcbiAgICAgICAgICAgICAgcHVibGljIGJyb3dzZXJEZXRhaWxzOiBCcm93c2VyRGV0YWlscykge1xuICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZVdyYXBwZXIudG9NaWxsaXMoRGF0ZVdyYXBwZXIubm93KCkpO1xuICAgIHRoaXMuX3N0cmluZ1ByZWZpeCA9IERPTS5nZXRBbmltYXRpb25QcmVmaXgoKTtcbiAgICB0aGlzLnNldHVwKCk7XG4gICAgdGhpcy53YWl0KCh0aW1lc3RhbXA6IGFueSkgPT4gdGhpcy5zdGFydCgpKTtcbiAgfVxuXG4gIHdhaXQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgLy8gRmlyZWZveCByZXF1aXJlcyAyIGZyYW1lcyBmb3Igc29tZSByZWFzb25cbiAgICB0aGlzLmJyb3dzZXJEZXRhaWxzLnJhZihjYWxsYmFjaywgMik7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB1cCB0aGUgaW5pdGlhbCBzdHlsZXMgYmVmb3JlIHRoZSBhbmltYXRpb24gaXMgc3RhcnRlZFxuICAgKi9cbiAgc2V0dXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGF0YS5mcm9tU3R5bGVzICE9IG51bGwpIHRoaXMuYXBwbHlTdHlsZXModGhpcy5kYXRhLmZyb21TdHlsZXMpO1xuICAgIGlmICh0aGlzLmRhdGEuZHVyYXRpb24gIT0gbnVsbClcbiAgICAgIHRoaXMuYXBwbHlTdHlsZXMoeyd0cmFuc2l0aW9uRHVyYXRpb24nOiB0aGlzLmRhdGEuZHVyYXRpb24udG9TdHJpbmcoKSArICdtcyd9KTtcbiAgICBpZiAodGhpcy5kYXRhLmRlbGF5ICE9IG51bGwpXG4gICAgICB0aGlzLmFwcGx5U3R5bGVzKHsndHJhbnNpdGlvbkRlbGF5JzogdGhpcy5kYXRhLmRlbGF5LnRvU3RyaW5nKCkgKyAnbXMnfSk7XG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgdGhlIGluaXRpYWwgc2V0dXAgaGFzIG9jY3VycmVkLCB0aGlzIG1ldGhvZCBhZGRzIHRoZSBhbmltYXRpb24gc3R5bGVzXG4gICAqL1xuICBzdGFydCgpOiB2b2lkIHtcbiAgICB0aGlzLmFkZENsYXNzZXModGhpcy5kYXRhLmNsYXNzZXNUb0FkZCk7XG4gICAgdGhpcy5hZGRDbGFzc2VzKHRoaXMuZGF0YS5hbmltYXRpb25DbGFzc2VzKTtcbiAgICB0aGlzLnJlbW92ZUNsYXNzZXModGhpcy5kYXRhLmNsYXNzZXNUb1JlbW92ZSk7XG4gICAgaWYgKHRoaXMuZGF0YS50b1N0eWxlcyAhPSBudWxsKSB0aGlzLmFwcGx5U3R5bGVzKHRoaXMuZGF0YS50b1N0eWxlcyk7XG4gICAgdmFyIGNvbXB1dGVkU3R5bGVzID0gRE9NLmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50KTtcbiAgICB0aGlzLmNvbXB1dGVkRGVsYXkgPVxuICAgICAgICBNYXRoLm1heCh0aGlzLnBhcnNlRHVyYXRpb25TdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICBjb21wdXRlZFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKHRoaXMuX3N0cmluZ1ByZWZpeCArICd0cmFuc2l0aW9uLWRlbGF5JykpLFxuICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlRHVyYXRpb25TdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSh0aGlzLl9zdHJpbmdQcmVmaXggKyAndHJhbnNpdGlvbi1kZWxheScpKSk7XG4gICAgdGhpcy5jb21wdXRlZER1cmF0aW9uID0gTWF0aC5tYXgodGhpcy5wYXJzZUR1cmF0aW9uU3RyaW5nKGNvbXB1dGVkU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0cmluZ1ByZWZpeCArICd0cmFuc2l0aW9uLWR1cmF0aW9uJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VEdXJhdGlvblN0cmluZyh0aGlzLmVsZW1lbnQuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RyaW5nUHJlZml4ICsgJ3RyYW5zaXRpb24tZHVyYXRpb24nKSkpO1xuICAgIHRoaXMuYWRkRXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyB0aGUgcHJvdmlkZWQgc3R5bGVzIHRvIHRoZSBlbGVtZW50XG4gICAqIEBwYXJhbSBzdHlsZXNcbiAgICovXG4gIGFwcGx5U3R5bGVzKHN0eWxlczoge1trZXk6IHN0cmluZ106IGFueX0pOiB2b2lkIHtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goc3R5bGVzLCAodmFsdWU6IGFueSwga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgIHZhciBkYXNoQ2FzZUtleSA9IGNhbWVsQ2FzZVRvRGFzaENhc2Uoa2V5KTtcbiAgICAgIGlmIChpc1ByZXNlbnQoRE9NLmdldFN0eWxlKHRoaXMuZWxlbWVudCwgZGFzaENhc2VLZXkpKSkge1xuICAgICAgICBET00uc2V0U3R5bGUodGhpcy5lbGVtZW50LCBkYXNoQ2FzZUtleSwgdmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBET00uc2V0U3R5bGUodGhpcy5lbGVtZW50LCB0aGlzLl9zdHJpbmdQcmVmaXggKyBkYXNoQ2FzZUtleSwgdmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0aGUgcHJvdmlkZWQgY2xhc3NlcyB0byB0aGUgZWxlbWVudFxuICAgKiBAcGFyYW0gY2xhc3Nlc1xuICAgKi9cbiAgYWRkQ2xhc3NlcyhjbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjbGFzc2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSBET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCBjbGFzc2VzW2ldKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBwcm92aWRlZCBjbGFzc2VzIGZyb20gdGhlIGVsZW1lbnRcbiAgICogQHBhcmFtIGNsYXNzZXNcbiAgICovXG4gIHJlbW92ZUNsYXNzZXMoY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gY2xhc3Nlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykgRE9NLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudCwgY2xhc3Nlc1tpXSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudHMgdG8gdHJhY2sgd2hlbiBhbmltYXRpb25zIGhhdmUgZmluaXNoZWRcbiAgICovXG4gIGFkZEV2ZW50cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50b3RhbFRpbWUgPiAwKSB7XG4gICAgICB0aGlzLmV2ZW50Q2xlYXJGdW5jdGlvbnMucHVzaChET00ub25BbmRDYW5jZWwoXG4gICAgICAgICAgdGhpcy5lbGVtZW50LCBET00uZ2V0VHJhbnNpdGlvbkVuZCgpLCAoZXZlbnQ6IGFueSkgPT4gdGhpcy5oYW5kbGVBbmltYXRpb25FdmVudChldmVudCkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oYW5kbGVBbmltYXRpb25Db21wbGV0ZWQoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVBbmltYXRpb25FdmVudChldmVudDogYW55KTogdm9pZCB7XG4gICAgbGV0IGVsYXBzZWRUaW1lID0gTWF0aC5yb3VuZChldmVudC5lbGFwc2VkVGltZSAqIDEwMDApO1xuICAgIGlmICghdGhpcy5icm93c2VyRGV0YWlscy5lbGFwc2VkVGltZUluY2x1ZGVzRGVsYXkpIGVsYXBzZWRUaW1lICs9IHRoaXMuY29tcHV0ZWREZWxheTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoZWxhcHNlZFRpbWUgPj0gdGhpcy50b3RhbFRpbWUpIHRoaXMuaGFuZGxlQW5pbWF0aW9uQ29tcGxldGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogUnVucyBhbGwgYW5pbWF0aW9uIGNhbGxiYWNrcyBhbmQgcmVtb3ZlcyB0ZW1wb3JhcnkgY2xhc3Nlc1xuICAgKi9cbiAgaGFuZGxlQW5pbWF0aW9uQ29tcGxldGVkKCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3Nlcyh0aGlzLmRhdGEuYW5pbWF0aW9uQ2xhc3Nlcyk7XG4gICAgdGhpcy5jYWxsYmFja3MuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjaygpKTtcbiAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgIHRoaXMuZXZlbnRDbGVhckZ1bmN0aW9ucy5mb3JFYWNoKGZuID0+IGZuKCkpO1xuICAgIHRoaXMuZXZlbnRDbGVhckZ1bmN0aW9ucyA9IFtdO1xuICAgIHRoaXMuY29tcGxldGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuaW1hdGlvbiBjYWxsYmFja3MgdG8gYmUgY2FsbGVkIHVwb24gY29tcGxldGlvblxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICogQHJldHVybnMge0FuaW1hdGlvbn1cbiAgICovXG4gIG9uQ29tcGxldGUoY2FsbGJhY2s6IEZ1bmN0aW9uKTogQW5pbWF0aW9uIHtcbiAgICBpZiAodGhpcy5jb21wbGV0ZWQpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyB0aGUgZHVyYXRpb24gc3RyaW5nIHRvIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzXG4gICAqIEBwYXJhbSBkdXJhdGlvblxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgcGFyc2VEdXJhdGlvblN0cmluZyhkdXJhdGlvbjogc3RyaW5nKTogbnVtYmVyIHtcbiAgICB2YXIgbWF4VmFsdWUgPSAwO1xuICAgIC8vIGR1cmF0aW9uIG11c3QgaGF2ZSBhdCBsZWFzdCAyIGNoYXJhY3RlcnMgdG8gYmUgdmFsaWQuIChudW1iZXIgKyB0eXBlKVxuICAgIGlmIChkdXJhdGlvbiA9PSBudWxsIHx8IGR1cmF0aW9uLmxlbmd0aCA8IDIpIHtcbiAgICAgIHJldHVybiBtYXhWYWx1ZTtcbiAgICB9IGVsc2UgaWYgKGR1cmF0aW9uLnN1YnN0cmluZyhkdXJhdGlvbi5sZW5ndGggLSAyKSA9PSAnbXMnKSB7XG4gICAgICBsZXQgdmFsdWUgPSBOdW1iZXJXcmFwcGVyLnBhcnNlSW50KHRoaXMuc3RyaXBMZXR0ZXJzKGR1cmF0aW9uKSwgMTApO1xuICAgICAgaWYgKHZhbHVlID4gbWF4VmFsdWUpIG1heFZhbHVlID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmIChkdXJhdGlvbi5zdWJzdHJpbmcoZHVyYXRpb24ubGVuZ3RoIC0gMSkgPT0gJ3MnKSB7XG4gICAgICBsZXQgbXMgPSBOdW1iZXJXcmFwcGVyLnBhcnNlRmxvYXQodGhpcy5zdHJpcExldHRlcnMoZHVyYXRpb24pKSAqIDEwMDA7XG4gICAgICBsZXQgdmFsdWUgPSBNYXRoLmZsb29yKG1zKTtcbiAgICAgIGlmICh2YWx1ZSA+IG1heFZhbHVlKSBtYXhWYWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gbWF4VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogU3RyaXBzIHRoZSBsZXR0ZXJzIGZyb20gdGhlIGR1cmF0aW9uIHN0cmluZ1xuICAgKiBAcGFyYW0gc3RyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBzdHJpcExldHRlcnMoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwoc3RyLCBSZWdFeHBXcmFwcGVyLmNyZWF0ZSgnW14wLTldKyQnLCAnJyksICcnKTtcbiAgfVxufVxuIl19