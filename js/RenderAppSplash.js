class _RenderAppSplash {
    #app_splash;
    #btn_start;

    constructor() {
        this.#app_splash = document.getElementById('app-splash');
    }

    #into_div(child) {
        const div = document.createElement('div');
        div.appendChild(child);
        return div;
    }

    init() {
        this.#btn_start = document.createElement('button');
        this.#btn_start.textContent = 'Start';
        this.#btn_start.addEventListener("mousedown", (e) => e_splash_start(e));
        this.#app_splash.appendChild(this.#into_div(this.#btn_start));
    }

    remove() {
        this.#app_splash.remove();
    }
}

class RenderAppSplash  {
    static instance;

    static get_instance() {
        if (this.instance === undefined) {
            this.instance = new _RenderAppSplash;
        }
        return this.instance;
    }
};
