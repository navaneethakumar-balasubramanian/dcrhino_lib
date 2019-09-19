define([], function() {
    /** canvas max size is around 8000px x 8000px, (depending of the browser)
     *  we need to use tiles to print the entire image
     */
    function print(root, tileWidth, tileHeight) {

        //get Bound limits
        var devLimits = root.getDeviceLimits();

        //create a new frame and add it at the bottom of the html code
        var frm = window.document.createElement("iframe");
        frm.style.display = "none";
        window.document.body.appendChild(frm);

        //IE issue when trying to print a iframe
        // we open it in a new tabulation
        var isIE = navigator.appName.indexOf("Internet Explorer") != -1;

        var newWindow = isIE ? window.open("","_blank") :  frm.contentWindow;
        var doc = isIE ? newWindow.document : frm.contentDocument;

        var html= '<!doctype html><html>' +
            '<head><title>Print</title><meta http-equiv="X-UA-Compatible" content="IE=edge" /></head>' +
            '<body><div id="container" style="line-height:0"></div></body>' +
            '</html>';
        doc.write(html);

        var container = doc.getElementById("container");

        //frame resizeTo device limits
        frm.style.width = devLimits.getWidth();
        frm.style.height = devLimits.getHeight();

        //compute the number of tiles needed
        var numberOfTilesX = Math.ceil(devLimits.getWidth() / tileWidth);
        var numberOfTilesY =  Math.ceil(devLimits.getHeight() /tileHeight);

        var i = 0, j = 0;
        for(j= 0; j< numberOfTilesY; ++j) {

            var div = doc.createElement("div");

            for(i = 0; i< numberOfTilesX ; ++i) {

                //create the tile rectangle
                var rect = new geotoolkit.util.Rect(
                    i * tileWidth,
                    j * tileHeight,
                    i * tileWidth + tileWidth,
                    j * tileHeight + tileHeight
                );

                //create img from root node
                var img = geotoolkit.scene.exports.NodeExport.exportToImage(
                    root,
                    tileWidth,
                    tileHeight,
                    root.isHorizontalFlip(),
                    root.isVerticalFlip(),
                    rect,
                    null
                );

                //add img to document
                //IE doesn't support to add a new element from an other document,
                //we have to create a new element and copy the data
                var elem = doc.createElement("img");
                elem.src = img.src;
                div.appendChild(elem);
            }

            //add a return line tag at the end of the lineX
            container.appendChild(div);
          }

        if(isIE)
        {//IE requirements
            newWindow.document.close();
            newWindow.focus();
        }

        // print document
        newWindow.print();

        window.document.body.removeChild(frm);
        if(isIE) newWindow.close();
    }
    return print;
});