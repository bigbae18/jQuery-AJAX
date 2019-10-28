(function ($) {
    $('document').ready(function () {
        getBreeds();
    });

    function addHandler() {
        console.log('hii!');
        $('#breeds div').click(function(breed) {
            $('#imgBreed').html('');
            $('#spinnerLoad').removeClass('d-none');
            let thisBreed = $(this);
            getRandomImg(thisBreed.data('ref'));
        })
    }

    function getRandomImg(data) {
        $.ajax({
            url: data,
            dataType: "json",
            data: {
                type: "json"
            },
            success: function (response) {
                console.log(response.message);
                setTimeout(function () {
                    $('#spinnerLoad').addClass('d-none');
                    $('#imgBreed').html('<img src="' + response.message + '"></img>');
                }, 1000);
            },
            error: function (err) {
                console.log(
                    `Ha habido un error
                ${err}`);
            }
        })
    }

    function getBreeds() {
        $.ajax({
            url: "https://dog.ceo/api/breeds/list/all",
            dataType: "json",
            data: {
                type: "json"
            },
            success: function (breeds) {
                let dogList = breeds.message;
                $.each(dogList, function (dog, breed) {
                    setTimeout(function () {
                        if (breed.length >= 1) {
                            for (i = 0; i < breed.length; i++) {
                                $('#breeds').append(`<div class="breedItem col btn btn-dark" data-ref="https://dog.ceo/api/breed/${dog}-${breed[i]}/image/random/">${breed[i]} ${dog}</div>`);
                            }
                        } else {
                            $('#breeds').append(`<div class="breedItem col btn btn-dark" data-ref="https://dog.ceo/api/breed/${dog}/image/random/">${dog}</div>`);
                        };
                        $("#spinnerLoad").addClass('d-none');
                        console.log('done! getBreed');
                        addHandler();
                    }, 1000)
                })
            },
            error: function (error) {
                console.log(
                    `Ha habido un error
                ${error}`);
            }
        });
    }
})(jQuery);