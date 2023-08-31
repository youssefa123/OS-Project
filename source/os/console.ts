/* ------------
     Console.ts

     The OS Console - stdIn and stdOut by default.
     Note: This is not the Shell. The Shell is the "command line interface" (CLI) or interpreter for this console.
     ------------ */

module TSOS {

    export class Console {

        constructor(public currentFont = _DefaultFontFamily,
                    public currentFontSize = _DefaultFontSize,
                    public currentXPosition = 0,
                    public currentYPosition = _DefaultFontSize,
                    public buffer = "") {
        }

        public init(): void {
            this.clearScreen();
            this.resetXY();
        }

        public clearScreen(): void {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        }

        public resetXY(): void {
            this.currentXPosition = 0;
            this.currentYPosition = this.currentFontSize;
        }

        public handleInput(): void {
            while (_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = _KernelInputQueue.dequeue();
                // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
                if (chr === String.fromCharCode(13)) { // the Enter key
                    // The enter key marks the end of a console command, so ...
                    // ... tell the shell ...
                    _OsShell.handleInput(this.buffer);
                    // ... and reset our buffer.
                    this.buffer = "";
                } else {
                    // This is a "normal" character, so ...
                    // ... draw it on the screen...
                    this.putText(chr);
                    // ... and add it to our buffer.
                    this.buffer += chr;
                }
                // TODO: Add a case for Ctrl-C that would allow the user to break the current program.
            }
        }

        public putText(text): void {
            /*  My first inclination here was to write two functions: putChar() and putString().
                Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
                between the two. (Although TypeScript would. But we're compiling to JavaScipt anyway.)
                So rather than be like PHP and write two (or more) functions that
                do the same thing, thereby encouraging confusion and decreasing readability, I
                decided to write one function and use the term "text" to connote string or char.
            */
            if (text !== "") {
                // Draw the text at the current X and Y coordinates.
                _DrawingContext.drawText(this.currentFont, this.currentFontSize, this.currentXPosition, this.currentYPosition, text);
                // Move the current X position.
                var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, text);
                this.currentXPosition = this.currentXPosition + offset;
            }
         }

        public advanceLine(scroll = true): void {  //Changed to a boolean value so if true it scrolls and if false, >never built off this.
            this.currentXPosition = 0;

            /*
             * Font size measures from the baseline to the highest point in the font.
             * Font descent measures from the baseline to the lowest point in the font.
             * Font height margin is extra spacing between the lines.
             */
            this.currentYPosition += _DefaultFontSize + 
                                     _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                                     _FontHeightMargin;
            
            // Please just scroll 
            // Possible solution. When the text goes beyond the visible canvas area, simulate scrolling.
            // What scroll amount is doing is that it's finding how much text is going beyond the visible area on the canvas 
            if(this.currentYPosition > _Canvas.height || this.currentXPosition > _Canvas.width) {  // if the text exceeds the height of the canvas 
                if(scroll) {  
                    const scrollAmountY = Math.max(0, this.currentYPosition - _Canvas.height);
                    const scrollAmountX = Math.max(0, this.currentYPosition - _Canvas.height);
                     
                    
                    const imageData = _DrawingContext.getImageData(scrollAmountX,  scrollAmountY, _Canvas.height - scrollAmountX, _Canvas.height - scrollAmountY);
                     
                    //Simulating scrolling by clearing the canvas
                    this.clearScreen();  
                    
                    // And then... redraw the remaining text 
                    _DrawingContext.putImageData(imageData, 0, 0);

                    this.currentYPosition = Math.min(_Canvas.height, this.currentYPosition + scrollAmountY);
                    this.currentXPosition = Math.min(_Canvas.width, this.currentXPosition + scrollAmountX);

                }
            } //ChatGPT answer: Calculates both scrollAmountY and scrollAmountX which represent how much content exceeds the canvas height and width respectively.
            //Calculate both scrollAmountY and scrollAmountX which represent how much content exceeds the canvas height and width respectively.
            //Clear the entire canvas.
            //Restore the saved content using putImageData but shifted up by scrollAmount.
            //Update currentYPosition to be at the bottom of the visible area after scrolling.
            // TODO: Handle scrolling. (iProject 1)
        }
    }
 }
