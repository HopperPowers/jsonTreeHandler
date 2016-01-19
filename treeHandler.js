
$(document).ready(function () {
    var jsonString = '{"name":"root","action":"RootAction","data":[{"name":"BranchOne","action":null,"data":[{"name":"BranchOne,LeafOne","action":"LeafOneClicked","data":null},{"name":"BranchOne,SubBranch","action":null,"data":[{"name":"BranchOne,SubBranch,Leaf","action":"B1SBL","data":null}]}]},{"name":"BranchTwo","action":null,"data":[{"name":"B2L1","action":"B2L1","data":null},{"name":"B2L2","action":"B2L2","data":null}]},{"name":"RL","action":"RL","data":null}]}';
    var jsonObject = JSON.parse(jsonString);

    // Working Method
    /*
    $('#treeview').append(MakeList(jsonObject));
    // <ul>
    function MakeList(data) {
        var childList = $("<ul>");
        if ($.isArray(data)) {
            $.each(data, function (key, value) {
                childList.append(MakeItem(value));
            });
        }
        else {
            childList.append(MakeItem(data));
        }
        return childList;
    }
    // <li>
    function MakeItem(value) {
        var childItem = $("<li>");
        childItem.html(value.name);
        if (value.data != null) {
            childItem.append(MakeList(value.data));
        }
        return childItem;
    }
    */

    /**/
    // This method is OVERLY active and creates new <ul> and numbers them.  This is great but is just not what THIS project wants/needs
    // Grab the container DOM element
    var tree = document.getElementById('treeview'),
        ul = document.createElement('ul'),
        li;

    $.each(jsonObject, function (key, val) {
        // Make a <ul> to hold the current tree node's children (if any)
        tree.appendChild(ul);

        recursiveFunction(key, val, null)
    });
    function recursiveFunction(key, value, node) {
        var tree = document.getElementById('treeview'),
            ul = document.createElement('ul'),
            li;
            tree.appendChild(ul);

        // Create an <li> element
        li = document.createElement('li');
        li.innerHTML = key + ": ";

        var k;
        if (value instanceof Object) {                
            // Remember to add the <li> to the <ul>!
            ul.appendChild(li);

            var ulNew = document.createElement('ul');
            li.appendChild(ulNew);
            
            $.each(value, function (k, val) {
                recursiveFunction(k, val, ulNew)
            });
            
        } else {
            // Otherwise just print the "value" text (eg. "BranchOne")
            li.innerHTML += value;
        }

        // Remember to add the <li> to the <ul>!
        if (node != null) {
            node.appendChild(li);
        } else {
            ul.appendChild(li);
        }
        var ul = document.createElement("ul");

        return ul;
    }
    /**/


    $("li").on('click', function (event) {
        if ($(event.target).children().length > 0) {;
            if ($(this).css("font-weight") == "bold") {
                $(event.target).css("font-weight", "normal").css("font-style", "normal").css("cursor", "default").find($(this).children()).stop().slideToggle(500);
                event.stopPropagation();
            } else {
                $(event.target).css("font-weight", "bold").css("font-style", "italic").css("cursor", "pointer").find($(this).children()).stop().slideToggle(500);
                event.stopPropagation();
            }
        }
    });
});