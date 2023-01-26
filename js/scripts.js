/*!
* Start Bootstrap - Creative v7.0.6 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
//

function magnify(imgID, zoom) {
    var img, glass, w, h, bw;
    // img = document.getElementById(imgID);
    img = $(imgID);
    console.log(img.naturalWidth);
    /*create magnifier glass:*/
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");
    /*insert magnifier glass:*/
    img.parentElement.insertBefore(glass, img);
    /*set background properties for the magnifier glass:*/
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.naturalWidth * zoom) + "px " + (img.naturalHeight * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
    /*execute a function when someone moves the magnifier glass over the image:*/
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
        var pos, x, y;
        /*prevent any other actions that may occur when moving over the image*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /*prevent the magnifier glass from being positioned outside the image:*/
        if (x > img.naturalWidth - (w / zoom)) {x = img.naturalWidth - (w / zoom);}
        if (x < w / zoom) {x = w / zoom;}
        if (y > img.naturalHeight - (h / zoom)) {y = img.naturalHeight - (h / zoom);}
        if (y < h / zoom) {y = h / zoom;}
        /*set the position of the magnifier glass:*/
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        /*display what the magnifier glass "sees":*/
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }
    function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x : x, y : y};
    }
}

window.addEventListener('DOMContentLoaded', event => {

    //popper
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    let editor;

    // --- Keys table ---

    $('#keyTable tfoot th').each(function() {
        let title = $(this).text();
        $(this).html('<div class="d-flex justify-content-start align-items-center">' +
            '<input type="text" class="form-control form-control-lg" placeholder="' + title + '" />' +
            '<i class="bi bi-search"></i></div>');
    });

    let table = $('#keyTable').DataTable({
        responsive: true,
        select: true,
        "pagingType": "simple_numbers",
        searchPanes: {
            viewTotal: true,
            i18n: {
                count: '{total} found',
                countFiltered: '{shown} ({total})'
            }
        },
        dom: 'Plfrtip'
    });

    table.columns().every( function() {
        let column = this;

        $('input', this.footer()).on('keyup change', function() {
            if (column.search() !== this.value) {
                column
                    .search(this.value)
                    .draw();
            }
        });
    });

    // --- Cyphers Table ---

    $('#cypherTable tfoot th').each(function() {        // load foot, add to each element in foot function
        let title = $(this).text();                     // get title of footer element
        $(this).html('<div class="d-flex justify-content-start align-items-center">' +
            '<input type="text" class="form-control form-control-lg" placeholder="' + title + '" />' +
            '<i class="bi bi-search"></i></div>');
    });

    // inicialize table
    let cypherTable = $('#cypherTable').DataTable({
        responsive: true,
        select: true,
        "pagingType": "simple_numbers",
        searchPanes: {
            viewTotal: true,
            i18n: {
                count: '{total} found',
                countFiltered: '{shown} ({total})'
            }
        },
        dom: 'Plfrtip'
    });

    // add to every column function
    cypherTable.columns().every( function() {
        let column = this;

        $('input', this.footer()).on('keyup change', function() {   // to input add on keyup  function
            if (column.search() !== this.value) {
                column
                    .search(this.value)
                    .draw();
            }
        });
    });

    // --- Advanced table ---

    // inicialize table
    let advancedTable = $('#advancedCypherTable').DataTable({
        "columns": [
            { "width": "15.5%" },
            { "width": "12.5%" },
            { "width": "14.5%" },
            { "width": "10.5%" },
            { "width": "10.5%" },
            { "width": "9.5%" },
            { "width": "13.5%" },
            { "width": "13.5%" }
          ],
        fixedHeader: {
            headerOffset: $('#mainNav').outerHeight()-10,
        },
        responsive: true,
        select: true,
        "pagingType": "simple_numbers",
        searchPanes: {
            viewTotal: true,
            i18n: {
                count: '{total} found',
                countFiltered: '{shown} ({total})'
            }
        },
        dom: 'PlBfrtip',
        buttons: {
            buttons: [
                     {
                        className: 'btn-link pt-0',
                        text : '<button class="btn btn-link mt-0" data-bs-toggle="offcanvas" data-bs-target="#tagsSideBar" aria-controls="tagsSideBar">Filter by Tags <i class="bi bi-funnel-fill fa-lg"></i></button>',
                     },

                     {
                        className: 'btn-link pt-0',
                        text : '<button class="btn btn-link mt-0" data-bs-toggle="offcanvas" data-bs-target="#dateSideBar" aria-controls="dateSideBar">Filter by Date <i class="bi bi-calendar-minus fa-lg"></i></button>',
                     }
                ],
            dom: {
              button: {
                   className: 'btn btn-link'
              },
              buttonLiner: {
                   tag: null
              }
            }
        }
    });

    advancedTable.columns([0,2,5,6,7]).every( function() {  // for specific columns add function
        let column = this;
        let title = $(this.footer()).text();
        $(this.footer()).html('<div class="d-flex justify-content-start align-items-center">' +
            '<input type="text" class="form-control form-control-lg" placeholder="' + title + '" />' +
            '<i class="bi bi-search"></i></div>');

        $('input', this.footer()).on('keyup change', function() {
            if (column.search() !== this.value) {
                column
                    .search(this.value)
                    .draw();
            }
        });
    });

    advancedTable.columns([1,3,4]).every( function() {
        let column = this;
        var select = $('<select class="form-select form-select-lg" ><option value="">Show all</option></select>')
                        .appendTo($(column.footer()).empty())
                        .on('change', function () {             // on change in select option, add function
                            // !!! in val SHOULD be specific option (value of the selected option)
                            // INSTEAD there is the whole div tag (<div class="..."> Option1 </div>)
                            var val = $.fn.dataTable.util.escapeRegex($(this).val());
                            console.log(this.value);
                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        });
        // d = option value (val), j = index of the option
        column
            .data()
            .unique()
            .sort()
            .each(function (d, j) {
                // d in option value is being compared to the value in the Database
                // $(d).text() is there because of the whole div being in val/d, $(d).text() gets text value of div
                select.append('<option value="' + $(d).text() + '">' + d + '</option>')
            });
    });

    // Show/hide Tables
    document.getElementById("advancedCyphersTable").style.display = "none";
    $('#simpleButton').click(function(){
        // toggle switches between hidden/visible, "slow" is referring to animation
        $('#cyphersTable').slideToggle("slow");
        $('#advancedCyphersTable').slideToggle("slow");
    });
    $('#advancedButton').click(function(){
        $('#advancedCyphersTable').slideToggle("slow");
        $('#cyphersTable').slideToggle("slow");
    });


    // Navbar shrink function
    let navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');

        let logos = document.getElementsByClassName('hc-logo');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
            for(let i = 0; i < logos.length; i++){
                logos[i].classList.remove("logo-dark");
            }
        } else {
            console.log('robim navbar')
            navbarCollapsible.classList.add('navbar-shrink');
            for(let i = 0; i < logos.length; i++){
                logos[i].classList.add("logo-dark");
            }
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});

// SOURCE code: https://github.com/habibmhamadi/multi-select-tag
new MultiSelectTag('tags', {
    rounded: true,    // default true
    shadow: true      // default false
})

// SOURCE code: https://www.codingnepalweb.com/price-range-slider-html-css-javascript/
const rangeInput = document.querySelectorAll(".range-input input"),
yearInput = document.querySelectorAll(".year-input input"),
range = document.querySelector(".slider .progress");
let yearGap = 1;
yearInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minYear = parseInt(yearInput[0].value),
        maxYear = parseInt(yearInput[1].value);

        if((maxYear - minYear >= yearGap) && maxYear <= rangeInput[1].max){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minYear;
                range.style.left = ((minYear / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxYear;
                range.style.right = 100 - (maxYear / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});
rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);
        if((maxVal - minVal) < yearGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - yearGap
            }else{
                rangeInput[1].value = minVal + yearGap;
            }
        }else{
            yearInput[0].value = minVal;
            yearInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});

