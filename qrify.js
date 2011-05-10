// QRify
// Author: David Coles

// Use a function to avoid polluting the browser's global namespace
function qrify()
{
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

    // Open the selection in a new window
    window.open("https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl="
                + encodeURIComponent(txt));

    // Ensure that clicking the bookmarklet does not redirect the current page
    // (Tested in Firefox, not a problem in Chrome)
    return undefined;
}
// Actually call the function
qrify();
