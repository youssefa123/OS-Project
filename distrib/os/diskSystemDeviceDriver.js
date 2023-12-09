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
const trackCount = 4;
const sectorCount = 8;
const blockCount = 8;
const byteCount = 64;
var TSOS;
(function (TSOS) {
    // Extends DeviceDriver
    class DiskSystemDeviceDriver extends TSOS.DeviceDriver {
        constructor() {
            // Override the base method pointers.
            // The code below cannot run because "this" can only be
            // accessed after calling super.
            // super(this.krnKbdDriverEntry, this.krnKbdDispatchKeyPress);
            // So instead...
            super();
            this.tracks = [];
            this.blocks = [];
            this.driverEntry = this.krnKbdDriverEntry;
            //this.isr = this.krnKbdDispatchKeyPress;
            this.tracks = [];
            this.blocks = [];
        }
        format() {
            this.tracks = [];
            this.blocks = [];
            for (var t = 0; t < trackCount; t++) {
                var myTrack = [];
                for (var s = 0; s < sectorCount; s++) {
                    var mySector = [];
                    for (var b = 0; b < blockCount; b++) {
                        var myBlock = {
                            track: t,
                            sector: s,
                            block: b,
                            name: `${t}:${s}:${b}`,
                            inUse: false,
                            nextName: 'F:F:F',
                            data: []
                        };
                        for (let i = 0; i < byteCount; i++) {
                            myBlock.data.push(0x00);
                        }
                        this.blocks.push(myBlock);
                        mySector.push(myBlock);
                    }
                    myTrack.push(mySector);
                }
                this.tracks.push(myTrack);
            }
            console.log("Formated disk", this.tracks);
        }
        getNextFreeBlock() {
            for (let b = 1; b < this.blocks.length; b++) {
                var myBlock = this.blocks[b];
                if (myBlock.inUse == false) {
                    return myBlock;
                }
            }
            console.log("Failed to find a free block");
            return null;
        }
        getNextFreeContentBlock() {
            for (let b = 1; b < this.blocks.length; b++) {
                var myBlock = this.blocks[b];
                if (myBlock.inUse == false && myBlock.track > 0) {
                    return myBlock;
                }
            }
            console.log("Failed to find a free content block");
            return null;
        }
        getFileBlock(name) {
            for (var block of this.blocks) {
                var found = true;
                if (block.inUse == false) {
                    found = false;
                }
                for (var i = 0; i < name.length; i++) {
                    if (block.data[i] != name.charCodeAt(i)) {
                        found = false;
                    }
                }
                if (found == true) {
                    return block;
                }
            }
            return null;
        }
        getBlock(blockName) {
            for (let block of this.blocks) {
                if (block.name == blockName) {
                    return block;
                }
            }
            return null;
        }
        create(filename) {
            var myBlock = this.getNextFreeBlock();
            myBlock.inUse = true;
            // writing the file name into the system
            for (let i = 0; i < filename.length; i++) {
                myBlock.data[i] = filename.charCodeAt(i);
            }
            var myContentBlock = this.getNextFreeContentBlock();
            myContentBlock.inUse = true;
            myBlock.nextName = myContentBlock.name;
        }
        write(filename, content) {
            var myBlock = this.getFileBlock(filename);
            if (myBlock == null) {
                _StdOut.putText("Could not find file: " + filename);
            }
            var firstContentBlock = this.getBlock(myBlock.nextName);
            var currentContentBlock = firstContentBlock;
            while (content.length > 0) {
                var nextCharacter = content.charAt(0);
                content = content.substring(1);
                var freespace = null;
                for (var i = 0; i < currentContentBlock.data.length && freespace == null; i++) {
                    if (currentContentBlock.data[i] == 0) {
                        console.log("Found free space");
                        freespace = i;
                    }
                }
                // create a new content block
                if (freespace == null) {
                    console.log("No free spaces, adding new block");
                    var nextBlock = this.getNextFreeContentBlock();
                    nextBlock.inUse = true;
                    currentContentBlock.nextName = nextBlock.name;
                    currentContentBlock = nextBlock;
                    freespace = 0;
                }
                currentContentBlock.data[freespace] = nextCharacter.charCodeAt(0);
            }
        }
        read(filename) {
        }
        krnKbdDriverEntry() {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        }
    }
    TSOS.DiskSystemDeviceDriver = DiskSystemDeviceDriver;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=diskSystemDeviceDriver.js.map