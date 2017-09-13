class Observable {
    constructor() {
        this.observer = []
    }
    subscribe(next, err, complete) {
        let lenght = this.observer.push({
            next,
            err,
            complete
        })
        let subscriber = function() {
            this.observer.splice(lenght - 1, 1)
        }
        return {
            unsubscribe: subscriber.bind(this)
        }
    }
    changeState() {
        setTimeout(() => {
            this.observer.forEach((eachObserver) => {
                if (eachObserver.next) {
                    eachObserver.next("Data");
                }
                if (eachObserver.error) {
                    eachObserver.error();
                }
                if (eachObserver.complete) {
                    eachObserver.complete();
                }
            });

        }, 1000);
    }
}


let obserable = new Observable();
let subscriber = obserable.subscribe((val) => {
    console.log(val)
}, (err) => {
    console.log(err)
}, () => {
    console.log("complete")
})

subscriber.unsubscribe()




obserable.changeState();