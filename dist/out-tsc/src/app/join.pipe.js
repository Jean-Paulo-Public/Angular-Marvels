/* join.pipe.ts  */
import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let JoinPipe = class JoinPipe {
    transform(value, separator = ',') {
        return value.join(separator);
    }
};
JoinPipe = __decorate([
    Pipe({ name: 'join' })
], JoinPipe);
export { JoinPipe };
//# sourceMappingURL=join.pipe.js.map