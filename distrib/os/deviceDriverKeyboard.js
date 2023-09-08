/* ----------------------------------
   DeviceDriverKeyboard.ts

   The Kernel Keyboard Device Driver.
   ---------------------------------- */
var TSOS;
(function (TSOS) {
    // Extends DeviceDriver
    class DeviceDriverKeyboard extends TSOS.DeviceDriver {
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
        krnKbdDriverEntry() {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        }
        krnKbdDispatchKeyPress(params) {
            var keyCode = params[0];
            var isShifted = params[1];
            _Kernel.krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
            var chr = "";
            if ((keyCode >= 65) && (keyCode <= 90)) { // letter
                if (isShifted) {
                    chr = String.fromCharCode(keyCode); // Uppercase A-Z
                }
                else {
                    chr = String.fromCharCode(keyCode + 32); // Lowercase a-z
                }
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode >= 48) && (keyCode <= 57)) { // digits
                if (isShifted) {
                    switch (keyCode) {
                        //Used this website to create the special characters btw, https://theasciicode.com.ar
                        //Mapping numbers to special charachters, simplest approach
                        case 49:
                            chr = "!";
                            break; //!
                        case 50:
                            chr = "@";
                            break; // @
                        case 51:
                            chr = "#";
                            break; // #
                        case 52:
                            chr = "$";
                            break; // $ MONEY MONEY MONEY
                        case 53:
                            chr = "%";
                            break; // %
                        case 54:
                            chr = "^";
                            break; // ^
                        case 55:
                            chr = "&";
                            break; // &
                        case 56:
                            chr = "*";
                            break; // You get the point 
                        case 57:
                            chr = "(";
                            break;
                        case 48:
                            chr = ")";
                            break; //works 
                        default: chr = String.fromCharCode(keyCode);
                    }
                }
                else {
                    chr = String.fromCharCode(keyCode);
                }
                _KernelInputQueue.enqueue(chr);
            } // get ready for a 100 else if statements
            else if (keyCode == 189) {
                if (isShifted) {
                    chr = "_";
                }
                else {
                    chr = "-";
                }
                _KernelInputQueue.enqueue(chr);
            }
            else if (keyCode == 187) {
                if (isShifted) {
                    chr = "+";
                }
                else {
                    chr = "=";
                }
                _KernelInputQueue.enqueue(chr);
            }
            else if (keyCode == 219) {
                if (isShifted) {
                    chr = "{";
                }
                else {
                    chr = "[";
                }
                _KernelInputQueue.enqueue(chr);
            }
            else if (keyCode == 32 || keyCode == 13) { // space or enter
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
        }
    }
    TSOS.DeviceDriverKeyboard = DeviceDriverKeyboard;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=deviceDriverKeyboard.js.map