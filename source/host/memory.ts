module TSOS {

    export class Memory {
        
        //The main memory (RAM) of our system.
        private _ram: Uint8Array;
        
        constructor() {
            this._ram = new Uint8Array(256);  // Initializes memory with a size of 256 bytes
            this.init();
        }
        
        
        // Displaying the memory as a table in the UI.
        public init(): void {
            
            // Grabbing the memory table from the UI.
            const tableBody = document.getElementById("memorytable").getElementsByTagName('tbody')[0];
            
            // sSetting the starting point for memory addresses
            let address = 0;
            
            // Making table rows one for each block of memory.
            for(let i = 0; i < 32; i++) {
                
                // Create a new row to represent a block of memory
                let row = tableBody.insertRow(i);
                
                // address header with  8 cells after the address, each containing the value "00"
                let headerCell = row.insertCell(0);
                headerCell.innerHTML = "0x" + address.toString(16).toUpperCase().padStart(3, '0');
                
                // Filling up the row with memory value "00". 
                for(let j = 1; j <= 8; j++) {
                    let dataCell = row.insertCell(j);
                    dataCell.innerHTML = "00";
                }
                
                // Increasing the memory address by 8 for the next row.
                address += 8;
            }
          
        } 
        
    }}