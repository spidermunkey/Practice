export default class Timer {
    constructor(root, arg) {

     root.innerHTML = Timer.getHTML(arg);
     

     this.el = {

         minutes: root.querySelector(".timer__part--minutes"),
         seconds: root.querySelector(".timer__part--seconds"),
         control: root.querySelector(".timer__btn--control"),
         reset: root.querySelector(".timer__btn--reset"),
         clear : root.querySelector('.clear'),
         set : root.querySelector('.set'),
     };

     this.interval = null;
     this.remainingSeconds = 90;
     

     this.updateInterfaceTime();
     this.updateInterfaceControls();

     this.el.control.addEventListener("click", () => {
         if (this.interval === null) {
             this.start();
         } else {
             this.stop();
         }
     });
     this.el.set.addEventListener("click", () => {
        
        const inputMinutes = prompt("Enter number of minutes:");

        if (inputMinutes <= 90) {
            this.stop();
            this.remainingSeconds = inputMinutes * 60;
            this.updateInterfaceTime();
        }
     });

     this.el.clear.addEventListener("click", () => {
         this.remainingSeconds = 0;
         this.updateInterfaceTime();
     })


    }

    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;

        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
        
    }

    updateInterfaceControls() {
        if (this.interval === null) {
            this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        } else {
            this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }

    start() {

        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();
            if (this.remainingSeconds === 0) {
                this.stop();
            }
        }, 1000);

        this.updateInterfaceControls();
        
    
}

    stop() {
        clearInterval(this.interval);
        
        this.interval = null;

        this.updateInterfaceControls();
    }



    static getHTML(a) {
        if (a === "new") {
            return `
            <div class="timer">
            <span class="timer__part timer__part--minutes">00</span>
            <span class="timer__part">:</span>
            <span class="timer__part timer__part--seconds">00</span>
            <button type="button" class="timer--btn timer__btn--control timer__btn--start">
                <span class="material-icons">play_arrow</span>
            </button>
            <button type="button" class="timer--btn timer__btn--control timer__btn--reset">
                <span class="material-icons">timer</span>
            </button>
            </div>
                <button type="button" class="remove config">remove</button>
                <button type="button" class="clear config">clear</button>
                <button type="button" class="set config">set</button>
            `
        }
        return `
            <div class="timer">
            <span class="timer__part timer__part--minutes">00</span>
            <span class="timer__part">:</span>
            <span class="timer__part timer__part--seconds">00</span>
            <button type="button" class="timer--btn timer__btn--control timer__btn--start">
                <span class="material-icons">play_arrow</span>
            </button>
            <button type="button" class="timer--btn timer__btn--control timer__btn--reset">
                <span class="material-icons">timer</span>
            </button>
            </div>
                <button type="button" class="add config">add</button>
                <button type="button" class="clear config">clear</button>
                <button type="button" class="set config">set</button>
        `;
    }
}


