class Main
{
    constructor(){
        this.items = new Items("#itemsContainer", this.onItemsSubmit);
        
    }
    render(){
        this.items.render();
    }
    onItemsSubmit = (items) => {
        this.items.hide();
        this.logic = new Logic(items);
        this.results = new Results("#resultsContainer", this.logic);
        this.grid = new Grid("#gridContainer", this.logic, this.onGridClick);
        this.grid.render();
        this.results.render();
    }
    onGridClick = (bottomI, topI) => {
        this.selector = new Selector("#selectorContainer", this.logic, bottomI, topI, this.onSelectWinner);
        this.selector.render();
    }
    onSelectWinner = () => {
        this.logic.updateWinner(this.selector.getIndex1(), this.selector.getIndex2(), this.selector.getWinner());
        this.results.render();
        this.selector.hide();
        this.grid.render();
    }
}

var main = new Main();
main.render();




