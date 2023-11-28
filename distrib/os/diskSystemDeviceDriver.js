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
        krnKbdDriverEntry() {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        }
    }
    TSOS.DiskSystemDeviceDriver = DiskSystemDeviceDriver;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=diskSystemDeviceDriver.js.map