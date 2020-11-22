class HtmlUtil
{
    //tag, text, children, attributes
    static buildElement(definition){
        var currentStr = "";

        definition.guid = TypeUtil.createGuid();

        currentStr += `<${definition.tag}`;

        currentStr += ` guid='${definition.guid}'`;

        if (definition.attributes){
            $.each(definition.attributes, function(key,val){
                currentStr += ` ${key}='${val}'`;
            });
        }
        
        currentStr += ">";

        if (definition.text){
            currentStr += definition.text;
        }

        if (definition.children){
            definition.children.forEach((child) => {
                currentStr += this.buildElement(child);
            });
        }
        currentStr += `</${definition.tag}>`

        return currentStr;
    }

    static addElementData(containerElement, definition){
        if (definition.data){
            $.each(definition.data, function(key,val){
                $(`[guid=${definition.guid}]`).data(key, val);
            });
        }

        if (definition.children){
            definition.children.forEach((child) => {
                this.addElementData(containerElement, child);
            });
        }
    }

}