class Results
{
    constructor(container, logic) {
        this.container = container;
        this.logic = logic;
    }
    render(){
        var data = "";

        this.logic.getDetailItems().forEach((item) => {
            data += `<div>${item.name} - ${item.score}`;
        })

        $(this.container).html(data);
    }
}