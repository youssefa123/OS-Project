module TSOS {

    export class Memory {
        public base: number = 0; //Iproject 3
        public limit: number = 256*4 //Memory limit is 256 bytes //IProject 3 
        public storage: Array<number>; // Storage for the memory contents
        
        //Tracking specific memory bytes to display when loading/running
        public instructionByte: number = null;
        public memoryByte: number = null;

        public init(): void {
            this.base = 0;
             // Initialize the storage array with the size of limit of 256 bytes
            this.storage = new Array<number>(this.limit).fill(0); // Filling with 0 as a default memory value

            this.updateMemoryDisplay();
        }

        public clear(){
            this.storage = new Array<number>(this.limit).fill(0); // Filling with 0 as a default memory value
            this.updateMemoryDisplay();

        }

        // Load data into the memory
        public load(data: Array<number>): void {
            // Logic to load data into the memory
            for (let i = 0; i < data.length && i < this.limit; i++) {
                this.storage[i] = data[i];
            }
            this.updateMemoryDisplay();
        }

        public updateMemoryDisplay(): void {
            const memoryTable = <HTMLTableElement>document.getElementById('memorytable');
            memoryTable.innerHTML = ''
            /*
             <tr>
              <td>0x000</td><td>00</td><td>00</td><td>00</td><td>00</td><td>00</td><td>00</td><td>00</td><td>00</td>
          </tr>
 
            */
            //console.log('memory displaying', this.storage)
            for (let i = 0; i < this.limit; i += 8) {
                let row = document.createElement('tr');

                let counter = document.createElement('td');
                counter.innerText = Utils.formatHex(i, 2, true);
                row.appendChild(counter);
                
                for (let j = 0; j < 8; j++) {
                    let cell = document.createElement('td');
                    cell.innerText = Utils.formatHex(this.storage[i + j], 2,false);
                    if (i + j == this.instructionByte){
                        cell.style.color = "white";
                        cell.style.backgroundColor = "red";
                    }
                    if (i + j == this.memoryByte){
                        cell.style.color = "white";
                        cell.style.backgroundColor = "blue";
                    }

                    row.appendChild(cell);
                }

                memoryTable.appendChild(row);
            }
        }
    }
}
        
        
   


