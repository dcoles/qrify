/*
 * Copyright 2011 David Coles. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice,
 *     this list of conditions and the following disclaimer.
 *
 *  2. Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
 * DAMAGE.
 *
 */

/* QRify: A JavaScript Bookmarklet to show a QR Code for the currently 
 * selected text or the current page's URL.
 * Author: David Coles
 */

// Use a function to avoid polluting the browser's global namespace
function qrify()
{
    var qr_size = 350;
    var txt='';

    // Get the text of the current selection
    if (window.getSelection)
    {
        txt = window.getSelection();
    }
    else if (document.getSelection)
    {
        txt = document.getSelection();
    }
    else if (document.selection)
    {
        txt = document.selection.createRange().text;
    }

    // If txt is still empty, use the current document's URL instead
    if (txt == '')
    {
        txt = document.location.href;
    }

    // Add a popup div to display the QR code
    var body = document.body;
    var popup = document.createElement("div");
    var qr_image_url = "https://chart.googleapis.com/chart?chs=" + qr_size +
            "x" + qr_size + "&cht=qr&chl=" + encodeURIComponent(txt);

    // Handler to close on click
    popup.addEventListener("click", function()
    {
        body.removeChild(popup);
    }, false);

    // CSS of popup
    popup.style.display = "block";
    popup.style.position = "absolute";
    popup.style.width = qr_size + "px";
    popup.style.height = "auto";
    popup.style.top = 0;
    popup.style.right = 0;
    popup.style.zIndex = 99;
    popup.style.backgroundColor = "#fff";
    popup.style.border = "solid 1px black";

    // Add title
    var title = document.createElement("div");
    title.innerHTML = "QRify: Click anywhere to close";
    popup.appendChild(title);

    // Add QR code image
    var qr_image = document.createElement("img");
    qr_image.src = qr_image_url;
    popup.appendChild(qr_image);

    // Finally add the image to the DOM
    body.appendChild(popup);

    // Ensure that clicking the bookmarklet does not redirect the current page
    // (Tested in Firefox, not a problem in Chrome)
    return undefined;
}
// Actually call the function
qrify();
