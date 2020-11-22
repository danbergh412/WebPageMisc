class Logic
{
    constructor(items){
        this.detailItems = this.findDetailItems(items);

        this.winMatrix = [];

        this.detailItems.forEach((outerItem, i) => {
            var row = [];

            this.detailItems.forEach((innerItem, j) => {
                var char = i == j? null: .5;
                row.push({direct: char});
            })
            this.winMatrix.push(row);
        })
        this.findWinTrees();
        this.updateIndirect();
        this.findScores();
    }

    getItemNames(){
        return this.detailItems.map((item) => {
            return item.name;
        })
    }
    getItemNameByIndex(index){
        return this.detailItems[index].name;
    }

    updateIndirect(){
        for(var i = 0; i < this.winMatrix.length; i++)
        {
            for(var j = 0; j < this.winMatrix[i].length; j++)
            {
                if (this.winMatrix[i][j].direct == .5){
                    var numWinsJ = this.detailItems[j].winTree.getNodes(i).length;
                    var numWinsI = this.detailItems[i].winTree.getNodes(j).length;

                    if (numWinsJ == 0 && numWinsI == 0){
                        this.winMatrix[i][j].indirect = .5;
                    }
                    else
                    {
                        this.winMatrix[i][j].indirect = numWinsJ/(numWinsJ + numWinsI);
                    }
                }
                else
                {
                    this.winMatrix[i][j].indirect = this.winMatrix[i][j].direct;
                }
            }
        }
    }
    getDirectScore(bottomI, topI){
        return this.winMatrix[bottomI][topI].direct;
    }
    getIndirectScore(bottomI, topI){
        return this.winMatrix[bottomI][topI].indirect;
    }
    updateWinner(index1, index2, winnerIndex){
        if (winnerIndex == null) {
            this.winMatrix[index1][index2].direct = .5;
            this.winMatrix[index2][index1].direct = .5;
        }
        else if (winnerIndex == index1){
            this.winMatrix[index2][index1].direct = 1;
            this.winMatrix[index1][index2].direct = 0;
        }
        else if (winnerIndex == index2){
            this.winMatrix[index1][index2].direct = 1;
            this.winMatrix[index2][index1].direct = 0;
        }

        this.findWinTrees();
        this.updateIndirect();
        this.findScores();
    }

    
    findDetailItems(items){
        var detailItems = [];
        items.forEach((item, i) => {
            detailItems.push({
                name: item,
                index: i
            });
        })
        return detailItems;
    }

    getDetailItems(){
        return this.detailItems
        .map((item) => {
            return item;
        })
        .sort(function(a, b) {
            return b.score - a.score;
        });
    }

    findWinTrees(){
        this.detailItems.forEach((item, i) => {
            item.winTree = this.findWinTree(i);
        });
    }
    findScores(){
        this.detailItems.forEach((item, i) => {
            item.score = this.getScore(i);
        })
    }
    getScore(index){
        var score = 0;

        this.detailItems.forEach((item, i) => {
            score += this.getIndirectScore(i, index);
        })
        return score;
    }
    findWinTree(index){
        var tree = new Tree();
        this.addWinTree(tree, null, index);
        
        return tree;
    }
    addWinTree(tree, parentNode, index){
        var node = tree.addNode(index, parentNode);

        this.detailItems.forEach((item, i) => {
            if (this.getWinner(index, i) == index && !tree.hasParentValue(node, i)){
                this.addWinTree(tree, node, i);
            }
        });
    }

    getWinner(index1, index2){
        var result = this.winMatrix[index1][index2].direct;

        if (result == .5 || result == null){
            return null;
        }
        else if (result == 1){
            return index2;
        }
        else if (result == 0) {
            return index1;
        }
    }
    isWinner(testIndex, otherIndex){
        return this.getWinner(testIndex, otherIndex) == textIndex;
    }

    
}