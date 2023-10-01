// Main memory for the system.
module TSOS {

    export class Memory {
        
        
        constructor() { }

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
        }
    }
}
