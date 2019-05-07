let cols,
    colStore = {},
    controlArr  =[],
    sortables   = [],
    $rows       = $('.app-row');

function updateDraggableStore(){
    controlArr.forEach(function(rowArr, i){
        rowArr.forEach(function(colArr, j){
            colStore[controlArr[i][j]].rowIndex = i;
            colStore[controlArr[i][j]].colIndex = j;
        })
    });
}

function handleDrop(e){
    console.log(e)
    // define vars
    let fromRow = e.from.dataset.rowIndex,
        toRow   = e.to.dataset.rowIndex,
        fromCol = e.oldIndex,
        toCol   = e.newIndex;

    // test whether move was consequential
    if(fromRow === toRow && fromCol === toCol) return;
    
    let movedItem = controlArr[fromRow].splice(fromCol, 1);
    controlArr[toRow].splice(toCol, 0, movedItem[0]);

    // update store objects
    updateDraggableStore();

}

function init(){
    $rows.each(function(i, rowEl){

        $(this).attr('id', 'appRow-' + i);
        $(this).attr('data-row-index', i);
    
        $cols = $(this).find('.list-group-item')
        controlArr[i] = Array.apply(null, new Array($cols.length)).map((v, j) => {
            return i + '-' + j
        });
    
        let colId;
        // apply attributes and text, and create col object
        $cols.each((k, col) => {
            colId = i + '-' + k
            $(col).attr('id', colId)
            colStore[colId] = {
                element: col,
                $element: $(col),
                rowIndex: i,
                colIndex: k,
                key: colId
            }
            $(col).find('.text-content').text(i + '.' + k);
        });
    
        sortables[i] = Sortable.create(this, {
            handle: '.oi-move',
            group: 'app-row',
            scroll: true,
            animation: 150,
            onEnd: function(e){
                handleDrop(e);
            }
        });
    
    });
}

init();

console.log(controlArr);
console.log(colStore);