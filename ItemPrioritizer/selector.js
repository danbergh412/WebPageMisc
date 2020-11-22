class Selector
{
    constructor(container, logic, index1, index2, onSubmit){
        this.container = container;
        this.logic = logic;
        this.index1 = index1;
        this.index2 = index2;
        this.onSubmit = onSubmit;
    }
    render(){
        this.winner = null;

        var select1Text = this.logic.getWinner(this.index1, this.index2) == this.index1? "checked": "";
        var select2Text = this.logic.getWinner(this.index1, this.index2) == this.index2? "checked": "";
        var selectNoneText = this.logic.getWinner(this.index1, this.index2) == null? "checked": "";

        $(this.container).html(`
            <p>Select Favorite:</p>
            <label>
                <input type='radio' value="${this.index1}" class="selection" name="selection" ${select1Text}/>
                ${this.logic.getItemNameByIndex(this.index1)}
            </label><br/>
            <label>
                <input type='radio' value="${this.index2}" class="selection" name="selection" ${select2Text}/>
                ${this.logic.getItemNameByIndex(this.index2)}
            </label><br/>
            <label>
                <input type='radio' value="" class="selection" name="selection" ${selectNoneText}/>
                None
            </label><br/>
            <button type='button' class='submit'>Submit</button>
        `)
        $(this.container).show();

        $(this.container).find(".submit").click(() => {
            var result = $(this.container).find(".selection:checked").val();
            if (result != null && result.length > 0){
                this.winner = Number(result);
            }

            this.onSubmit();
        })
    }
    hide(){
        $(this.container).hide();
    }
    getIndex1(){
        return this.index1;
    }
    getIndex2(){
        return this.index2;
    }
    getWinner(){
        return this.winner;
    }
}