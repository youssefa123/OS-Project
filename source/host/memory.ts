module TSOS {

    export class Memory {
        
        //Ram memory 
        private _ram: Uint8Array;
        
        constructor() {
            this._ram = new Uint8Array(256);  // memory size of 256 bytes
        }
        
        
    
        // Initializes the memory in html by adding a table with the memory adressessssss......
        public init(): void {
            
            // main part of our table where the memory rows will 
            const tableBody = document.getElementById("memorytable").getElementsByTagName('tbody')[0];
            
            // starting point for our memory addresses. We'll display this and increase
            let address = 0;
            
            // 32 rows in this table becuase every project in the HOF has 32 rows
            for(let i = 0; i < 32; i++) {
                
                // new row in our table for memory data
                let row = tableBody.insertRow(i);
                
                // address header with  8 cells after the address, each containing the value "00"
                let headerCell = row.insertCell(0);
                
                // Also the address in hexadecimal form
                headerCell.innerHTML = "0x" + address.toString(16).toUpperCase().padStart(3, '0');
                
                // Loop 8 times to create 8 data cells in each row.
                for(let j = 1; j <= 8; j++) {
                    
                    // Insert a new cell for data.
                    let dataCell = row.insertCell(j);
                    
                    // the default value for each memory cell to is "00".
                    dataCell.innerHTML = "00";
                }
                
                // Increasing the memory address by 8 for the next row.
                address += 8;
            }
        } public setMemoryValue(index: number, value: number): void {
            this._ram[index] = value;

            const tableBody = document.getElementById("memorytable").getElementsByTagName('tbody')[0];
            const rowIndex = Math.floor(index / 8);
            const cellIndex = (index % 8) + 1;  // +1 because 0th cell is for address
            tableBody.rows[rowIndex].cells[cellIndex].innerHTML = value.toString(16).toUpperCase().padStart(2, '0');
        }

        public getMemoryValue(index: number): number {
            return this._ram[index];
        }

        public refreshDataTable(): void {
            // Select the data table from the document using its ID
            const dataTable= document.getElementById("memorytable").getElementsByTagName('tbody')[0];           
            // Loop through each row of the table
            for (let rowIndex: number = 0; rowIndex < dataTable.rows.length; rowIndex++) {
                // Get the current row
                let currentRow: HTMLTableRowElement = dataTable.rows[rowIndex];
               
                // The actual data resides in cells from index 1 to 8
                for (let cellIndex: number = 1; cellIndex <= 8; cellIndex++) {
                    // Update cell's content using utility method
                    currentRow.children[cellIndex].innerHTML = Utils.formatHex(this._ram[rowIndex * 8 + cellIndex - 1], 2, false);
                }
            }
        }
       
    }
}