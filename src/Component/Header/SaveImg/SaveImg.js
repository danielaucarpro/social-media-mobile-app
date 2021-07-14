
let imgObj = [];

const SaveImg = props => {
    const handleFileSelect = (evt) => {
        var files = evt.target.files; // FileList object

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = function (e) {
                displayImgData(e.target.result)
                addImage(e.target.result);
            };

            reader.readAsDataURL(f);
        }
    }

    const loadFromLocalStorage = () => {
        var images = JSON.parse(localStorage.getItem("images"))

        if (images && images.length > 0) {
            imagesObject = images;

            displayNumberOfImgs();
            images.forEach(displayImgData);
        }
    }

    const addImage = (imgData) => {
        imagesObject.push(imgData);
        displayNumberOfImgs();
        localStorage.setItem("images", JSON.stringify(imagesObject));
    }

    const displayImgData = (imgData) => {
        var span = document.createElement('span');
        span.innerHTML = '<img class="thumb" src="' + imgData + '"/>';
        document.getElementById('list').insertBefore(span, null);
    }

    const displayNumberOfImgs = () => {
        if (imagesObject.length > 0) {

            document.getElementById("state").innerHTML = imagesObject.length + " image" + ((imagesObject.length > 1) ? "s" : "") + " stored in your browser";

            document.getElementById("deleteImgs").style.display = "inline";

        } else {
            document.getElementById("state").innerHTML = "No images stored in your browser.";
            document.getElementById("deleteImgs").style.display = "none";
        }


    }

    const deleteImages = () => {
        imagesObject = [];
        localStorage.removeItem("images");
        displayNumberOfImgs()
        document.getElementById('list').innerHTML = "";
    }

    document.getElementById('files').addEventListener('change', handleFileSelect, false);
    document.getElementById('deleteImgs').addEventListener("click", deleteImages);
    loadFromLocalStorage();
}

export default SaveImg;