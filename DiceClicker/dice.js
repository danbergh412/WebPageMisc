class Dice
{
    constructor(container){
        this.container = container;
    }

    getDice(num){
        switch(num){
            case 1:
                return new DiceSideOne(this.container);
            case 2:
                return new DiceSideTwo(this.container);
            case 3:
                return new DiceSideThree(this.container);
            case 4:
                return new DiceSideFour(this.container);
            case 5:
                return new DiceSideFive(this.container);
            case 6:
                return new DiceSideSix(this.container);
        }
    }

    renderRandomDice(){
        var dice = this.getDice(Util.getRandomInt(1,6));
        dice.render();
    }

    render(){
        this.renderRandomDice();

        if ($(this.container).data("Dice") == null)
        {
            $(this.container).data("Dice", this);

            $(this.container).click(() => {
                this.renderRandomDice();
            })
        }
    }
}


class BaseDiceSide
{
    constructor(container){
        this.container = container;
        this.holes = [
            container + " .top-left",
            container + " .top-center",
            container + " .top-right",
            container + " .middle-left",
            container + " .middle-center",
            container + " .middle-right",
            container + " .bottom-left",
            container + " .bottom-center",
            container + " .bottom-right"
        ]
    }
    showHoles(){
        return [
            false, false, false, 
            false, false, false, 
            false, false, false
        ];
    }

    render(){
        if ($(this.container).data("DiceSide") == null)
        {
            $(this.container).data("DiceSide", this);
            $(this.container).addClass("dice-side");
            $(this.container).html(`
                <span class='dice-hole top-left'></span>
                <span class='dice-hole top-center'></span>
                <span class='dice-hole top-right'></span>
                <span class='dice-hole middle-left'></span>
                <span class='dice-hole middle-center'></span>
                <span class='dice-hole middle-right'></span>
                <span class='dice-hole bottom-left'></span>
                <span class='dice-hole bottom-center'></span>
                <span class='dice-hole bottom-right'></span>
            `);
        }
        
        var showHolesArray = this.showHoles();

        this.holes.forEach((hole, i) => {
            $(hole).css("visibility", showHolesArray[i]? "visible": "hidden");
        });
    }
}

class DiceSideOne extends BaseDiceSide
{
    showHoles(){
        return [
            false, false, false, 
            false, true, false, 
            false, false, false
        ];
    }
}

class DiceSideTwo extends BaseDiceSide
{
    showHoles(){
        return [
            true, false, false, 
            false, false, false, 
            false, false, true
        ];
    }
}

class DiceSideThree extends BaseDiceSide
{
    showHoles(){
        return [
            true, false, false, 
            false, true, false, 
            false, false, true
        ];
    }
}

class DiceSideFour extends BaseDiceSide
{
    showHoles(){
        return [
            true, false, true, 
            false, false, false, 
            true, false, true
        ];
    }
}

class DiceSideFive extends BaseDiceSide
{
    showHoles(){
        return [
            true, false, true, 
            false, true, false, 
            true, false, true
        ];
    }
}
class DiceSideSix extends BaseDiceSide
{
    showHoles(){
        return [
            true, false, true, 
            true, false, true, 
            true, false, true
        ];
    }
}
