// QRify
// Author: David Coles

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

// Open the selection in a new window
window.open("https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl="
            + encodeURIComponent(txt));
