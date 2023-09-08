module TSOS {

    // Extends DeviceDriver
    export class DeviceDriverKeyboard extends DeviceDriver {

        constructor() {
            super();
            this.driverEntry = this.krnKbdDriverEntry;
            this.isr = this.krnKbdDispatchKeyPress;
        }

        public krnKbdDriverEntry() {
            this.status = "loaded";
        }

        public krnKbdDispatchKeyPress(params) {
            var keyCode = params[0];
            var isShifted = params[1];
            _Kernel.krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
            var chr = "";
            
            if ((keyCode >= 65) && (keyCode <= 90)) { 
                if (isShifted) { 
                    chr = String.fromCharCode(keyCode);
                } else {
                    chr = String.fromCharCode(keyCode + 32);
                }
                _KernelInputQueue.enqueue(chr);
            } else {
                chr = this.getSpecialCharacter(keyCode, isShifted);
                if (chr !== null) {
                    _KernelInputQueue.enqueue(chr);
                }
            }
        }

        private getSpecialCharacter(keyCode, isShifted): string {
            let specialCharsMap = {
                48: isShifted ? ')' : '0',
                49: isShifted ? '!' : '1',
                // ... you can continue to add more mappings here
                32: ' ', // space
                33: '!', // exclamation mark
                13: '\n' // Enter
            };
            
            return specialCharsMap[keyCode] || null;
        }
    }
}
