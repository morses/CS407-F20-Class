

function p1(inputString)
{
    // Which tree traversal method are we supposed to use?
    let treeMethod = $('input[name="tree-method"]:checked').val();
    console.log(treeMethod);
    // Send this input off to our server
    $.ajax({
        method: 'POST',
        url: 'problem1',
        data: {input: inputString, treeMethod: treeMethod},
        dataType: 'html'
    }).done(function(html){
        console.log(html);
        $('#p1-output').empty().html(html);
        // !! Dangerous to put raw html from a remote source into the DOM!!;
        // This would normally be vulnerable to XSS but jQuery reportedly strips out script elements
        // and does not execute them.
    });
}

