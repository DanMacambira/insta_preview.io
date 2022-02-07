// Initialise grid
var grid = new Muuri('.photos', {
    dragEnabled: true,
});

// Upload and add to the grid
let count = 0;
window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        // Create new div for image
        const photos = document.getElementById("photos");

        var OutterDiv = document.createElement('div');
        OutterDiv.className = 'item';
        // OutterDiv.id = `item_${count}`;
        OutterDiv.setAttribute("data-id", `data_${count}`)
        photos.appendChild(OutterDiv); 

        var InnerDiv = document.createElement('div');
        InnerDiv.className = 'item-content';
        // InnerDiv.id = `content_${count}`;
        OutterDiv.appendChild(InnerDiv); 

        var TheImg = document.createElement('img');
        TheImg.id = `img_${count}`;
        // TheImg.setAttribute("data-id", `data_img_${count}`)
        InnerDiv.appendChild(TheImg); 

        // Append to the gird
        var newItem = grid.add(OutterDiv, { index: 0 })

        // Select and return image
        if (this.files && this.files[0]) {
            var img = document.getElementById(`img_${count}`);
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }

        count++
    });
  });