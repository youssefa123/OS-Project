/* ----------------------------------
   diskSystemDeviceDrivers.ts

   The Kernel Disk System Device Driver.
   ----------------------------------
   
   [
    t1[
        s1[
            b1[
                0,0,0,0,0,0,0
            ]
            b2
            ...
            b8
        ],
        ,s2,
        ,s3,
        s4
        s5
        s8
    ],
    t2,
    t3,
    t4

   ]
   
   
   
   
   */




const trackCount =4;
const sectorCount = 8;
const blockCount = 8;
const byteCount = 64;


   module TSOS {

    // Extends DeviceDriver
    export class DiskSystemDeviceDriver extends DeviceDriver {

        public tracks = [];
        public blocks = [];
        public myBlocks = 0;

        public mySectors = 0;
        public myTracks = 0;
        

        constructor() {
            // Override the base method pointers.

            // The code below cannot run because "this" can only be
            // accessed after calling super.
            // super(this.krnKbdDriverEntry, this.krnKbdDispatchKeyPress);
            // So instead...
            super();
            this.driverEntry = this.krnKbdDriverEntry;
            //this.isr = this.krnKbdDispatchKeyPress;

            this.tracks = [];
            this.blocks = [];
            this.myBlocks = 0;
            this.mySectors = 0;
            this.myTracks = 0;

        }

        public format(){
            this.tracks = [];
            this.blocks = [];
            this.myTracks = 0;
            this.mySectors = 0;
            this.myBlocks = 0;
            for (var t = 0; t < trackCount; t++){
                this.myTracks++;
                for (var s = 0; s < sectorCount; s++){
                    this.mySectors++;
                    for (var b = 0; b < blockCount; b++){
                        var myBlock = {
                            name: `${t}:${s}:${b}`,
                            data: []
                        }
                        
                        for (let i = 0; i < byteCount; i++){
                            myBlock.data.push(0x00);
                        }
                        sessionStorage.setItem(myBlock.name, JSON.stringify(myBlock.data));
                        this.myBlocks++;

                    }
                }
            }
            console.log("Tracks created: ", trackCount)
        }

        public getNextFreeBlock(){
            for (var t = 0; t < this.myTracks; t++){
                for (var s = 0; s < 8; s++){
                    for (var b = 0; b < 8; b++){
                        var blockName = `${t}:${s}:${b}`
                        var blockString = sessionStorage.getItem(blockName);
                        var blockData = JSON.parse(blockString);
                        if (blockData[60] == 0x00 && blockName != `0:0:0`){
                            return blockName;
                        }
                    }
                }
            }
    
            console.log("Failed to find a free block")
            return null;
        }
        public getNextFreeContentBlock(){
            for (var t = 1; t < this.myTracks; t++){
                for (var s = 0; s < 8; s++){
                    for (var b = 0; b < 8; b++){
                        var blockName = `${t}:${s}:${b}`
                        var blockString = sessionStorage.getItem(blockName);
                        var blockData = JSON.parse(blockString);
                        if (blockData[60] == 0x00){
                            return blockName;
                        }
                    }
                }
            }
    
            console.log("Failed to find a free block")
            return null;
        }

        public getFileBlock(name:string){
            for (var s = 0; s < 8; s++){
                for (var b = 0; b < 8; b++){
                    var blockName = `0:${s}:${b}`
                    var blockString = sessionStorage.getItem(blockName);
                    var blockData = JSON.parse(blockString);
                    if (blockData[60] == 0x00){
                        continue;
                    }
                    var matched = true;

                    for (let i = 0; i < name.length; i++){
                        if (blockData[i] != name.charCodeAt(i)){
                            matched = false;
                        }
                    }


                    if (matched == true){
                        return blockName;
                    }
                }
            }
            
            
            console.log("Failed to find a file");
            return null;

        }



        public create(filename:string){
            var myBlockName = this.getNextFreeBlock();
            
            let newBlockData = Array(64).fill(0);

            // writing the file name into the system
            for (let i = 0; i < filename.length; i++){
                newBlockData[i] = filename.charCodeAt(i);
            }
            // set inUse to true
            newBlockData[60] = 1;

            // get name of next block we can use to write stuff in
            var myContentBlockName = this.getNextFreeContentBlock();
            var newContentData = Array(64).fill(0);
            // set content block inUse to true
            newContentData[60] = 1;
            `t:s:b:`
            

            newBlockData[61] = parseInt(myContentBlockName.charAt(0));
            newBlockData[62] = parseInt(myContentBlockName.charAt(2));
            newBlockData[63] = parseInt(myContentBlockName.charAt(4));
            
            sessionStorage.setItem(myBlockName, JSON.stringify(newBlockData));
            sessionStorage.setItem(myContentBlockName,JSON.stringify(newContentData));
        }


        public write(filename:string, content: string){
            var myBlock = this.getFileBlock(filename);
            if (myBlock == null){
                _StdOut.putText("Could not find file: "+filename);
            }
            var blockData = JSON.parse(sessionStorage.getItem(myBlock))

            var firstContentBlock = `${blockData[61]}:${blockData[62]}:${blockData[63]}`
            
            var currentContentBlock = firstContentBlock;
            
            var counter = 0;
            var blockInput = Array(64).fill(0x00);
            while (content.length > 0){
                var nextCharacter = content.charCodeAt(0);
                content = content.substring(1);
                blockInput[counter] = (nextCharacter);
                counter++;
                if (counter == 60){
                    // reset and make new block
                    counter = 0;
                    var nextBlockName = this.getNextFreeContentBlock();
                    blockInput[60]=(0x01); // set current block inUse to true
                    blockInput[61]=(parseInt(nextBlockName.charAt(0)));
                    blockInput[62]=(parseInt(nextBlockName.charAt(2)));
                    blockInput[63] = (parseInt(nextBlockName.charAt(4)));

                    // write data to old block
                    sessionStorage.setItem(currentContentBlock, JSON.stringify(blockInput));

                    // set currentContentBlock to new block
                    currentContentBlock = nextBlockName;
                    blockInput = Array(64).fill(0x00);
                    blockInput[60] = 1;
                    sessionStorage.setItem(nextBlockName, JSON.stringify(blockInput));
                }
            }
            blockInput[60]=(0x01); // set current block inUse to true
            blockInput[61]=(0x00);
            blockInput[62]=(0x00);
            blockInput[63]=(0x00);
            sessionStorage.setItem(currentContentBlock, JSON.stringify(blockInput));

            
        }

        public read(filename:string, print:boolean = true):string{
            var myBlock = this.getFileBlock(filename);
            if (myBlock == null){
                _StdOut.putText("Could not find file: "+filename);
            }
            var blockData = JSON.parse(sessionStorage.getItem(myBlock))

            var firstContentBlock = `${blockData[61]}:${blockData[62]}:${blockData[63]}`
            
            var currentContentBlock = firstContentBlock;
            var currentBlockData = JSON.parse(sessionStorage.getItem(currentContentBlock))
            var nextContentBlock = `${currentBlockData[61]}:${currentBlockData[62]}:${currentBlockData[63]}`
            var counter = 0;
            var content = "";

            while (currentBlockData[counter]!= 0x00 && counter < 60){
                let char = String.fromCharCode(currentBlockData[counter]);
                if (print){
                    _StdOut.putText(char);
                }
                content = content + char;
                counter = counter + 1;
                if (counter >= 60 && nextContentBlock != "0:0:0"){
                    counter = 0;
                    currentContentBlock = nextContentBlock;
                    currentBlockData = JSON.parse(sessionStorage.getItem(currentContentBlock))
                    nextContentBlock = `${currentBlockData[61]}:${currentBlockData[62]}:${currentBlockData[63]}`
                }

            }

            return content;
        }

        public list(){
            for (var s = 0; s < 8; s++){
                for (var b = 0; b < 8; b++){
                    var blockName = `0:${s}:${b}`
                    var blockString = sessionStorage.getItem(blockName);
                    var blockData = JSON.parse(blockString);
                    if (blockData[60] == 0x00){
                        continue;
                    }
                    // Printing out the file name;
                    var nextChar = 0;
                    while (blockData[nextChar] != 0x00 && nextChar < blockData.length){
                        let char = String.fromCharCode(blockData[nextChar]);
                        _StdOut.putText(char);
                        nextChar = nextChar + 1;
                    }
                    _StdOut.advanceLine();
                    
                    
                }
            }

            
        }

        public copy(sourcename:string, copyname:string){
            this.create(copyname);
            var content = this.read(sourcename, false);
            this.write(copyname, content);
        }


        public krnKbdDriverEntry() {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        }

        public rename(filename:string, newname:string){
            var myBlock = this.getFileBlock(filename);
            if (myBlock == null){
                _StdOut.putText("Could not find file: "+filename);
            }
            var oldBlockData = JSON.parse(sessionStorage.getItem(myBlock))

            let newBlockData = Array(64).fill(0x00);
            // writing the file name into the system
            for (let i = 0; i < newname.length; i++){
                newBlockData[i] = newname.charCodeAt(i);
            }
            // set inUse to true
            newBlockData[60] = 1;
            newBlockData[61] = oldBlockData[61];
            newBlockData[62] = oldBlockData[62];
            newBlockData[63] = oldBlockData[63];
            
            sessionStorage.setItem(myBlock, JSON.stringify(newBlockData));

        }


        public delete(filename:string){
            var myBlock = this.getFileBlock(filename);
            if (myBlock == null){
                _StdOut.putText("Could not find file: "+filename);
            }

            var blockData = JSON.parse(sessionStorage.getItem(myBlock))
            var nextBlock = `${blockData[61]}:${blockData[62]}:${blockData[63]}`

            while (nextBlock != `0:0:0` || blockData[60] != 0){
                var wipedData = Array(64).fill(0x00);
                sessionStorage.setItem(myBlock,JSON.stringify(wipedData));            
                
                myBlock = nextBlock;
                blockData = JSON.parse(sessionStorage.getItem(myBlock))
                nextBlock = `${blockData[61]}:${blockData[62]}:${blockData[63]}`
            } 


        }

        
        public saveProcess(pid:number, memory:Array<number>){
            this.create("p"+pid);
            this.write("p"+pid, JSON.stringify(memory));
        }

        public loadProcess(pid:number){
            let storedString = this.read("p"+pid, false);

            let array = JSON.parse(storedString);

            this.delete("p"+pid);

            return array;
        }



    }
}