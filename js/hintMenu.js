class HintMenu {
    #current = 0;
    #amount;

    #elementId;
    #hints;



    constructor(elementId, hints) {
        if (hints.length === 0) {
            throw "no hints";
        }

        if (hints.length > 7) {
            throw "too many hints";
        }

        if (hints[0].length)
        this.#elementId = "#" + elementId;
        this.#hints = hints;
        this.#amount = hints.length;
    }

    display() {
        if (localStorage.getItem("hintMenu-show-again") === "false") return;

        this.#addHintContainer();
        this.#addSlider();
        this.#addCloseButtons();
        this.#setCurrent(0);

        $(this.#elementId).removeClass("hidden");
    }

    keypress(key) {
        switch (key) {
            case 37: // <-
                this.#setPrev();
                break;
            case 39: // ->
                this.#setNext();
                break;
            case 27: // esc
                this.#onCloseOnceClick();
                break;
        }
    }

    #addHintContainer() {
        $(this.#elementId).append('' +
            '<div class="hintMenu-hint-container">' +
                '<span class="hintMenu-message"></span>' +
                '<span class="hintMenu-description"></span>'+
            '</div>');
    }

    #addSlider() {
        let dots = '';
        for (let i = 0; i < this.#amount; i++) {
            let id = "hintMenu-dot-" + i;
            dots += `<div class="hintMenu-dot" id="${id}"></div>`;
        }

        $(this.#elementId).append('' +
            '<div class="hintMenu-slider">' +
            '<button class="hintMenu-slider-button" id="hintMenu-slide-prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>' +
            '<div class="hintMenu-slider-dots">' +
            dots +
            '</div>' +
            '<button class="hintMenu-slider-button" id="hintMenu-slide-next"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>' +
            '</div>');

        $(".hintMenu-dot").on("click", (e) => this.#setCurrent(e.target.id.slice(-1)));
        $("#hintMenu-slide-prev").on("click", () => this.#setPrev());
        $("#hintMenu-slide-next").on("click", () => this.#setNext());
    }

    #addCloseButtons() {
        $(this.#elementId).append('' +
            '<div class="hintMenu-close-container">' +
            '<button class="hintMenu-once-button">Close for now</button>' +
            '<button class="hintMenu-never-button">Don\'t show again</button>' +
            '</div>');
        $(".hintMenu-close-container .hintMenu-once-button").on("click", () => this.#onCloseOnceClick());
        $(".hintMenu-close-container .hintMenu-never-button").on("click", () => this.#onCloseEverClick());
    }

    #setNext() {
        let index = (this.#current + 1) % this.#amount;
        this.#setCurrent(index);
    }

    #setPrev() {
        let index = this.#current - 1;
        if (index < 0) {
            index = this.#amount - 1;
        }

        this.#setCurrent(index);
    }


    #setCurrent(index) {
        if (index < 0 || index >= this.#amount) {
            throw "Invalid range";
        }

        $("#hintMenu-dot-" + this.#current).removeClass("active");
        this.#current = index;
        $("#hintMenu-dot-" + this.#current).addClass("active");

        $(".hintMenu-hint-container .hintMenu-message").text(hints[this.#current][0]);
        $(".hintMenu-hint-container .hintMenu-description").text(hints[this.#current][1]);
    }

    #onCloseOnceClick() {
        $(this.#elementId).addClass("hidden");
    }

    #onCloseEverClick() {
        localStorage.setItem("hintMenu-show-again", "false");
        this.#onCloseOnceClick();
    }
}
