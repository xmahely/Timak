/*!
* Start Bootstrap - Creative v7.0.6 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
//

let editor;

window.addEventListener('DOMContentLoaded', event => {

    //Datatables
    // $('#keyTable').DataTable({
    //     responsive: true,
    //     select: true,
    //     "pagingType": "simple_numbers"
    // });

    $('#keyTable tfoot th').each(function() {
        let title = $(this).text();
        $(this).html('<div class="d-flex justify-content-start align-items-center">' +
            '<input type="text" class="form-control form-control-sm" placeholder="' + title + '" />' +
            '<i class="bi bi-search"></i></div>');
        // $(this).html('<i class="bi bi-search"></i>');
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
        let that = this;

        $('input', this.footer()).on('keyup change', function() {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });
    });

    // Navbar shrink function
    let navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
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


