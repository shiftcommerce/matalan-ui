// ===========================
// Mapbox
// ===========================
require('../vendors/mapbox');

$('body').on('click', '.find-store', function() {
    $('.o-map-container').show();
    L.mapbox.accessToken = 'pk.eyJ1IjoiYW5keWpvbmVzIiwiYSI6ImNpajRkdjU1bDAwMWF2cW0zNXJ0cWJqNzMifQ.tZSGgAMou1DiYN3TUK3yEQ';

    var geojson = require('json!../../data/locations.json');


    var geolocate = document.getElementById('geolocate');

    var map = L.mapbox.map('map', 'mapbox.streets').setView([54.89, -4.11], 6);

    map.scrollWheelZoom.disable();

    var listings = document.getElementById('listings');
    var locations = L.mapbox.featureLayer().addTo(map);

    // This uses the HTML5 geolocation API, which is available on
    // most mobile browsers and modern browsers, but not in Internet Explorer
    //
    // See this chart of compatibility for details:
    // http://caniuse.com/#feat=geolocation
    if (!navigator.geolocation) {
        geolocate.innerHTML = 'Geolocation is not available';
    } else {
        geolocate.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            map.locate();
        };
    }

    map.on('locationfound', function(e) {
        map.fitBounds(e.bounds);
        map.setView([e.latlng.lat, e.latlng.lng], 12);


    });

    // If the user chooses not to allow their location
    // to be shared, display an error message.
    map.on('locationerror', function() {
        geolocate.innerHTML = 'Position could not be found';
    });

    locations.setGeoJSON(geojson);

    function setActive(el) {
        var siblings = listings.getElementsByTagName('div');
        for (var i = 0; i < siblings.length; i++) {
            siblings[i].className = siblings[i].className
                .replace(/active/, '').replace(/\s\s*$/, '');
        }

        el.className += ' active';
    }

    function setupMap(el) {
        locations.eachLayer(function(locale) {

            // Shorten locale.feature.properties to just `prop` so we're not
            // writing this long form over and over again.
            var prop = locale.feature.properties;

            // Each marker on the map.
            var popup = '<h3>Matalan</h3><div>' + prop.city;
            var link = listings.appendChild(document.createElement('a'));
            link.href = '#';
            var wrapper = link.appendChild(document.createElement('div'));
            wrapper.className = 'o-store-locator__listings-wrapper';



            var detailsRow = wrapper.appendChild(document.createElement('div'));
            detailsRow.className = "row o-store-locator__listings-content u-pad-v-small";

            var listing = detailsRow.appendChild(document.createElement('div'));
            listing.className = 'col-12@xs col-6@lg';



            listing.innerHTML = '<div class="o-store-locator__listings-city">' + prop.city + '</div>';
            if (prop.address) {
                listing.innerHTML += '<div class="o-store-locator__listings-distance">Distance from ' + prop.city + ' - 0.4 miles</div>';
                listing.innerHTML += '<div class="o-store-locator__listings-address u-mar-t-medium">' + prop.address + '</div>';
                listing.innerHTML += '<div class="o-store-locator__listings-postcode">' + prop.postcode + '</div>';
                popup += '<div class="quiet">' + prop.address + '</div>';
            }

            var tel = listing.appendChild(document.createElement('div'));
            tel.className = 'o-store-locator__listings-phone u-mar-t-medium';

            if (prop.phone) {
                tel.innerHTML = '<a href="tel:' + prop.phone + '">' + prop.phoneFormatted + '</a>';
            }



            var details = detailsRow.appendChild(document.createElement('div'));
            details.className = "col-12@xs col-6@lg";
            var opening = details.appendChild(document.createElement('div'));
            opening.className = 'o-store-locator__opening';
            opening.innerHTML = "";
            if (prop.hours) {
                opening.innerHTML += prop.hours;
            }

            listing.onclick = function() {
                setActive(wrapper);

                // When a menu item is clicked, animate the map to center
                // its associated locale and open its popup.
                map.setView(locale.getLatLng(), 16);
                locale.openPopup();
                return false;
            };

            // Marker interaction
            locale.on('click', function(e) {
                // 1. center the map on the selected marker.
                map.panTo(locale.getLatLng());

                // 2. Set active the markers associated listing.
                setActive(wrapper);
            });

            popup += '</div>';
            locale.bindPopup(popup);

            locale.setIcon(L.icon({
                iconUrl: './img/marker.png',
                iconSize: [56, 56],
                iconAnchor: [35, 35],
                popupAnchor: [0, -34]
            }));

        });
    }

    setupMap();
});
// ===========================
// Mapbox End
// ===========================