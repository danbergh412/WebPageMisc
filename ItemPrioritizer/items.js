class Items
{
    constructor(container, onSubmit){
        this.container = container;
        this.onSubmit = onSubmit;
    }

    render(){
        $(this.container).html(`
            <p>Enter Items:</p>
            <textarea class='items' rows='10' cols='40'></textarea><br/>
            <button type='button' class='submit'>Submit</button>
        `);

        $(this.container).find(".submit").click(() => {
            var items = $(this.container).find(".items").val();
            items = items.split("\n");
            items = items.map((item) => {
                return item.trim();
            })
            .filter((item) => {
                return item.length > 0;
            })
            
            this.onSubmit(items);
        })
    }
    hide(){
        $(this.container).hide();
    }
}