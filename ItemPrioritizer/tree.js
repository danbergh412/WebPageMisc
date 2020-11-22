class Node
{
    constructor(value, parent){
        this.value = value;
        this.parent = parent;
        this.children = [];
    }
    addChild(childNode){
        this.children.push(childNode);
    }
    getChildren(){
        return this.children;
    }
    getValue(){
        return this.value;
    }
    getParent(){
        return this.parent;
    }
}

class Tree
{
    constructor(){
        this.root = null;
        this.list = [];
    }
    addNode(value, parent){
        if (!parent && this.root){
            return;
        }

        var child = new Node(value, parent);

        if (parent){
            parent.addChild(child);
        }
        else
        {
            this.root = child;
        }
        
        this.list.push(child);
        return child;
    }
    getNodes(value){
        return this.list.filter((node) => {
            return node.getValue() == value;
        });
    }
    hasParentValue(node, parentValue) {
        while(true){
            if (node == null){
                return false;
            }
            else if (node.getValue() == parentValue){
                return true;
            }
            node = node.getParent();
        }
    }

    hasValue(value){
        return this.list.some((node) => {
            return node.getValue() == value;
        });
    }
}

