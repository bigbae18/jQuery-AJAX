(function ($) {
    $('document').ready(function () {
        getBreeds();
    });

    function addHandler() {
        $('#breedList span').click((breed) => {
            $('#imgBreed').html('');
            $('#spinnerLoad').removeClass('d-none');
            let $this = $(this);
            getRandomImg($this.data('ref'));
            console.log('done!')
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
                    $('#spinnerLoad').addClass('d-none');
                    $('#imgBreed').html(
                        '<img src=' + response.message + '/>'
                    );
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
                                $('#breeds').append('<span class="breedItem col btn btn-dark" data-ref="https://dog.ceo/api/breed/' + dog + '/' + breed[i] + '/images/random"> ' + breed[i] + ' ' + dog + '</span>')
                            }
                        } else {
                            $('#breeds').append('<span class="breedItem col btn btn-dark" data-ref="https://dog.ceo/api/breed/' + dog + '/images/random"> ' + dog + '</span>')
                        };
                        $("#spinnerLoad").addClass('d-none');
                        console.log('done! getBreed');
                        addHandler();
                    }, 700)
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