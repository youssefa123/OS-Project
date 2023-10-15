var TSOS;
(function (TSOS) {
    class Memory {
        constructor() {
            this.base = 0;
            this.limit = 256; //Memory limit is 256 bytes 
        }
        init() {
            this.base = 0;
            this.limit = 256;
            // Initialize the storage array with the size of limit of 256 bytes
            this.storage = new Array(this.limit).fill('00'); // Filling with '00' as a default memory value
        }
    }
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memory.js.map