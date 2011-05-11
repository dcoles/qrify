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

// Use a object to avoid polluting the browser's global namespace
var qrify =
{
    // QR codes can have up to 4296 characters but Google's chart API is 
    // limited to URLs of 2048 bytes with GET requests.
    urllimit: 2048,
    size: 350,

    // Generate the Google chart URL for a QRCode
    make_qr: function(text)
    {
        var url = "https://chart.googleapis.com/chart?chs=" + this.size +
                "x" + this.size + "&cht=qr&chl=" + encodeURIComponent(text);
        if(url.length > this.urllimit) {
            return false;
        } else {
            return url;
        }
    },

    // Gets the currenty selected text
    selection: function() {
        if (window.getSelection)
        {
            return window.getSelection();
        }
        else if (document.getSelection)
        {
            // Firefox
            return document.getSelection();
        }
        else if (document.selection)
        {
            // IE
            return document.selection.createRange().text;
        }
    },

    // Show the QR popup with the selected text or the current URL if no text 
    // is selected
    show: function()
    {
        // Get the text of the current selection
        var txt = this.selection();

        // If txt is empty, use the current document's URL instead
        if (txt == '')
        {
            txt = document.location.href;
        }

        // Create URL and check we haven't blown the URL size limit
        var qr_image_url = this.make_qr(txt);
        if(!qr_image_url) {
            window.alert("The current text is too large to be made into a QR code");
            return undefined;
        }

        // Add a popup div to display the QR code
        var body = document.body;
        var popup = document.createElement("div");

        // CSS of popup
        popup.style.display = "block";
        popup.style.position = "fixed";
        popup.style.width = this.size + "px";
        popup.style.height = "auto";
        popup.style.top = 0;
        popup.style.right = 0;
        popup.style.zIndex = 99;
        popup.style.backgroundColor = "#fff";
        popup.style.border = "solid 1px black";

        // Add title
        var title = document.createElement("div");
        title.innerHTML = "QRify: Click the image to close";
        popup.appendChild(title);

        // Add QR code image
        var qr_image = document.createElement("img");
        qr_image.src = qr_image_url;
        qr_image.width = this.size;
        qr_image.height = this.size;
        popup.appendChild(qr_image);

        // Add text preview
        var text_preview = document.createElement("textarea");
        text_preview.value = txt;
        text_preview.style.width = "100%";
        text_preview.style.padding = 0;
        text_preview.style.border = "none";
        text_preview.style.borderTop = "solid 1px #ccc";
        text_preview.style.backgroundColor = "#eee";
        text_preview.style.color = "#666";
        text_preview.style.resize = "none";
        text_preview.setAttribute("readonly", "readonly");
        popup.appendChild(text_preview);

        // Handler to close on click
        qr_image.addEventListener("click", function()
        {
            body.removeChild(popup);
        }, false);

        // Finally add the image to the DOM
        body.appendChild(popup);

        // Ensure that clicking the bookmarklet does not redirect the current page
        // (Tested in Firefox, not a problem in Chrome)
        return undefined;
    }
}
// Show the popup on load
qrify.show();
