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
                        //Used this website to create the special characters btw. Put you on ! https://www.toptal.com/developers/keycode
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
                        case 48: chr = ")"; break;  //works 
                        default: chr = String.fromCharCode(keyCode);
                    }
                } else {
                    chr = String.fromCharCode(keyCode);
                }
                _KernelInputQueue.enqueue(chr);
            } 
            // get ready for a 100 else if statements
            else if (keyCode == 189) {
                if (isShifted) {
                    chr = "_";
                } else {
                    chr = "-";
                }
                _KernelInputQueue.enqueue(chr)
            }
            else if (keyCode == 187) {
                if (isShifted) {
                    chr = "+";   
                } else {
                    chr = "=";
                }
                _KernelInputQueue.enqueue(chr)
            }

            else if (keyCode == 219) {
                if (isShifted) {
                    chr = "{";   
                } else {
                    chr = "[";
                }
                _KernelInputQueue.enqueue(chr)
            }
            
            else if (keyCode == 221) {
                if (isShifted) {
                    chr = "}";   
                } else {
                    chr = "]";
                }
                _KernelInputQueue.enqueue(chr);
            }

            else if (keyCode == 188) {
                if (isShifted) {
                    chr = ">";   
                } else {
                    chr = ",";
                }
                _KernelInputQueue.enqueue(chr);
            }

            else if (keyCode == 190) {
                if (isShifted) {
                    chr = ">";   
                } else {
                    chr = ".";
                }
                _KernelInputQueue.enqueue(chr);
            }

            else if (keyCode == 191) {
                if (isShifted) {
                    chr = "?";   
                } else {
                    chr = "/";
                }
                _KernelInputQueue.enqueue(chr);
            }

            
            
            else if (keyCode == 32 || keyCode == 13) {  // space or enter
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
            
        }
    }
}