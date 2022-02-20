document.addEventListener('DOMContentLoaded', function () {

    /////////// Initialize grid and functionalities /////////// 
    var grid = null;
    var gridElement = document.querySelector('.photos');
    var addItemsElement = document.querySelector('input[type="file"]');

    initGrid();

    // Upload and Remove from the grid
    var count = 0;
    addItemsElement.addEventListener('change', function (){
        addItems(this)
    });

    gridElement.addEventListener('click', function (e) {
        console.log(e.target)
        if (elementMatches(e.target, '#remove-item-button')) {
            removeItem(e);
        }
    });
    ///////////////////////////////////////////////////////////
    


    /////////// Grid Settings
    function initGrid() {
        grid = new Muuri(gridElement, {
            dragEnabled: true,
            // dragStartPredicate: {
            //     distance: 2,
            //     delay: 100
            // }
            dragStartPredicate: function (item, event) {
                var isRemoveAction = elementMatches(event.target, '#remove-item-button');
                return !isRemoveAction ? Muuri.ItemDrag.defaultStartPredicate(item, event) : false;
              }
        })
    }
    ///////////

    
    /////////// Function to add images to the grid
    function addItems(imgToUpload) {

        var outterDiv = document.createElement('div');
        outterDiv.className = 'item';
        gridElement.appendChild(outterDiv); 

        var innerDiv = document.createElement('div');
        innerDiv.className = 'item-content';
        outterDiv.appendChild(innerDiv); 

        var removeItem = document.createElement('div');
        removeItem.className = 'remove-item';
        innerDiv.appendChild(removeItem);

        var removeItemSvg = document.createElement('img')
        removeItemSvg.src = "SVG/cross.svg";
        removeItemSvg.id = 'remove-item-button';
        removeItem.appendChild(removeItemSvg);

        var theImg = document.createElement('img');
        theImg.id = `img_${count}`;
        innerDiv.appendChild(theImg); 

        var newItem = grid.add(outterDiv, { index: 0 })

        if (imgToUpload.files && imgToUpload.files[0]) {
            var img = document.getElementById(`img_${count}`);
            img.onload = () => {
                URL.revokeObjectURL(img.src);
            }
            img.src = URL.createObjectURL(imgToUpload.files[0]);
            console.log(`Image Uploaded: ${count}`)
        }
        count++
    }
    ///////////

    
    /////////// Function to remove items from the grid
    function removeItem(e) {

        var removeButton = e.target;
        var elemToRemove = grid.getItems(removeButton.closest('.item'));
        grid.remove(elemToRemove, {removeElements: true});
        console.log('Removed Image');
    }
    ///////////


    /////////// Helper Functions
    function elementMatches(element, selector) {

        var p = Element.prototype;
        return (p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector).call(element, selector);
    
    }
    ///////////


});