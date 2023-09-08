/* ----------------------------------
   DeviceDriverKeyboard.ts

   The Kernel Keyboard Device Driver.
   ---------------------------------- */

   module TSOS {

    // Extends DeviceDriver
    export class DeviceDriverKeyboard extends DeviceDriver {

        constructor() {
            // Override the base method pointers.

            // The code below cannot run because "this" can only be
            // accessed after calling super.
            // super(this.krnKbdDriverEntry, this.krnKbdDispatchKeyPress);
            // So instead...
            super();
            this.driverEntry = this.krnKbdDriverEntry;
            this.isr = this.krnKbdDispatchKeyPress;
        }

        public krnKbdDriverEntry() {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        }

        public krnKbdDispatchKeyPress(params) {
            var keyCode = params[0];
            var isShifted = params[1];
            _Kernel.krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
            var chr = "";
        
            if ((keyCode >= 65) && (keyCode <= 90)) { // letter
                if (isShifted) {
                    chr = String.fromCharCode(keyCode); // Uppercase A-Z
                } else {
                    chr = String.fromCharCode(keyCode + 32); // Lowercase a-z
                }
                _KernelInputQueue.enqueue(chr);
            } else if ((keyCode >= 48) && (keyCode <= 57)) { // digits
                if (isShifted) {
                    switch (keyCode) {
                        //Mapping numbers to special charachters, simplest approach
                        case 49: chr = "!"; break;  //!
                        case 50: chr = "@"; break;  // @
                        case 51: chr = "#"; break;  // #
                        case 52: chr = "$"; break;  // $ MONEY MONEY MONEY
                        case 53: chr = "%"; break;  // %
                        case 54: chr = "^"; break;  // ^
                        case 55: chr = "&"; break;  // &
                        case 56: chr = "*"; break;  // You get the point 
                        case 57: chr = "("; break;
                        case 58: chr = ")"; break;
                        default: chr = String.fromCharCode(keyCode);
                    }
                } else {
                    chr = String.fromCharCode(keyCode);
                }
                _KernelInputQueue.enqueue(chr);
            } else if (keyCode == 32 || keyCode == 13) {  // space or enter
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
            
        }
    }
}