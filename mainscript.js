// Variables
let highlightedText = {};

// Highlight text and display sticky note
document.addEventListener('mouseup', function() {
    var selection = window.getSelection().toString().trim();
    if (selection !== '') {
        var range = window.getSelection().getRangeAt(0);
        var span = document.createElement('span');
        span.className = 'highlighted';
        span.appendChild(range.extractContents());
        range.insertNode(span);

        // Show sticky note
        showStickyNote(selection, range.getBoundingClientRect().bottom + window.scrollY, range.getBoundingClientRect().left + window.scrollX);
    }
});

// Display sticky note
function showStickyNote(text, top, left) {
    var note = document.createElement('div');
    note.className = 'sticky-note';
    note.style.top = top + 'px';
    note.style.left = left + 'px';
    note.innerHTML = '<textarea class="note-text" rows="3">' + (highlightedText[text] || '') + '</textarea>';
    document.body.appendChild(note);
}

// Save highlighted text and notes
document.addEventListener('input', function(e) {
    if (e.target && e.target.classList.contains('note-text')) {
        var selectedText = e.target.parentElement.innerText.split('\n')[0].trim();
        highlightedText[selectedText] = e.target.value;
        localStorage.setItem('highlightedText', JSON.stringify(highlightedText));
    }
});

// Restore highlighted text and notes on page load
window.onload = function() {
    var storedHighlights = localStorage.getItem('highlightedText');
    if (storedHighlights) {
        highlightedText = JSON.parse(storedHighlights);
        Object.keys(highlightedText).forEach(function(text) {
            var selection = window.getSelection();
            if (selection.toString().trim() === text) {
                showStickyNote(text, selection.getRangeAt(0).getBoundingClientRect().bottom + window.scrollY, selection.getRangeAt(0).getBoundingClientRect().left + window.scrollX);
            }
        });
    }
};

// Save changes and export as PDF
window.addEventListener('beforeunload', function(e) {
    if (confirm('Do you want to save your changes?')) {
        // Save changes to localStorage
        localStorage.setItem('pageContent', document.documentElement.outerHTML);

        // Generate PDF
        var doc = new jsPDF();
        doc.html(document.documentElement.outerHTML, {
            callback: function(pdf) {
                pdf.save('page.pdf');
            }
        });
    }
});
