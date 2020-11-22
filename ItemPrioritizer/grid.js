class Grid
{
    constructor(container, logic, onGridClick){
        this.container = container;
        this.logic = logic;
        this.onGridClick = onGridClick;
    }


    render(){
        var gridDef = {
            tag: "table",
            attributes: {
                border: 1
            },
            children: []
        }

        var rowDef = {
            tag: "tr",
            children: [
                {
                    tag: "td", 
                    attributes: {
                        style: "padding: 10px"
                    }
                }
            ]
        };

        var items = this.logic.getItemNames();

        items.forEach((item) => {
            rowDef.children.push({
                tag: "td", 
                attributes: {
                    style: "padding: 10px"
                }, 
                text: item
            });
        });
        gridDef.children.push(rowDef);

        items.forEach((item, i) => {
            rowDef = {
                tag: "tr",
                children: [
                    {
                        tag: "td", 
                        attributes: {
                            style: "padding: 10px"
                        }, 
                        text: item
                    }
                ]
            };
            items.forEach((subItem, j) => {
                rowDef.children.push({
                    tag: "td", 
                    attributes: {
                        style: "padding: 10px", 
                        class: "open-selector", 
                        "top-i": j, 
                        "bottom-i": i
                    }, 
                    text: this.getGridChar(i, j)
                });
            })
            gridDef.children.push(rowDef);
        });

        $(this.container).html(HtmlUtil.buildElement(gridDef));

        $(this.container).find(".open-selector").click((event) => {
            var elem = event.target;

            var topI = $(elem).attr("top-i");
            var bottomI = $(elem).attr("bottom-i");

            if (topI != bottomI){
                this.onGridClick(Number(bottomI), Number(topI));
            }
        })
    }
    getGridChar(bottomI, topI){
        var directScore = this.logic.getDirectScore(bottomI, topI);
        var indirectScore = this.logic.getIndirectScore(bottomI, topI);

        if (directScore == null){
            return "";
        }
        else if (directScore == 1){
            return "W";
        }
        else if (directScore == 0){
            return "L";
        }
        else if (indirectScore == 1){
            return "w";
        }
        else if (indirectScore == 0){
            return "l";
        }
        else if (indirectScore == .5){
            return "??";
        }
        else if (indirectScore > .5){
            return "w?";
        }
        else if (indirectScore < .5){
            return "l?";
        }
    }
}